import { useState, useCallback, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ReclaimState, ReclaimStep, ReclaimError } from "../types";

const INITIAL_STATE: ReclaimState = {
  step: 1,
  isMember: null,
  code: "",
  tier: "",
  error: null,
  isLoading: false,
};

export const useReclaim = () => {
  const [state, setState] = useState<ReclaimState>(INITIAL_STATE);
  const { data: session } = useSession();
  const hasRedeemed = useRef(false);

  const goToStep = useCallback((step: ReclaimStep) => {
    setState((prev) => ({ ...prev, step, error: null }));
  }, []);

  const setIsMember = useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, isMember: value }));
  }, []);

  const handleGoogleSignIn = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await signIn("google", { redirect: false });
      if (result?.error) {
        setState((prev) => ({ ...prev, isLoading: false, error: "unauthorized" }));
      }
    } catch {
      setState((prev) => ({ ...prev, isLoading: false, error: "unknown" }));
    }
  }, []);

  const redeemCode = useCallback(async () => {
    if (!session?.user?.email) return;
    if (hasRedeemed.current) return;

    hasRedeemed.current = true;
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const baseUrl = window.location.origin;
      const response = await fetch(`${baseUrl}/api/members/redeem`, { method: "POST" });
      const data = await response.json();

      if (!response.ok) {
        hasRedeemed.current = false;
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: (data.error as ReclaimError) ?? "unknown",
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        code: data.code,
        tier: data.tier,
        step: 4,
      }));
    } catch {
      hasRedeemed.current = false;
      setState((prev) => ({ ...prev, isLoading: false, error: "unknown" }));
    }
  }, [session]);

  const handleSignOut = useCallback(async () => {
    await signOut({ redirect: false });
    hasRedeemed.current = false;
    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    session,
    goToStep,
    setIsMember,
    handleGoogleSignIn,
    redeemCode,
    handleSignOut,
  };
};