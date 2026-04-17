import { useState, useCallback } from "react";
import { ReclaimState, ReclaimStep, ReclaimError } from "../types";

const INITIAL_STATE: ReclaimState = {
  step: 1,
  isMember: null,
  code: "",
  tier: "",
  error: null,
  isLoading: false,
};

const REDEEM_KEY = "reclaim_in_progress";

export const useReclaim = () => {
  const [state, setState] = useState<ReclaimState>(INITIAL_STATE);

  const goToStep = useCallback((step: ReclaimStep) => {
    setState((prev) => ({ ...prev, step, error: null }));
  }, []);

  const setIsMember = useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, isMember: value }));
  }, []);

  const redeemCode = useCallback(async (channelId: string) => {
    if (sessionStorage.getItem(REDEEM_KEY) === "true") return;

    sessionStorage.setItem(REDEEM_KEY, "true");
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const baseUrl = window.location.origin;
      const response = await fetch(`${baseUrl}/api/members/redeem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelId }),
      });

      const data = await response.json();

      if (!response.ok) {
        sessionStorage.removeItem(REDEEM_KEY);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: (data.error as ReclaimError) ?? "unknown",
          errorMessage: data.message ?? null,
        }));
        return;
      }

      sessionStorage.removeItem(REDEEM_KEY);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        code: data.code,
        tier: data.tier,
        step: 4,
      }));
    } catch {
      sessionStorage.removeItem(REDEEM_KEY);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "unknown",
      }));
    }
  }, []);

  const reset = useCallback(() => {
    sessionStorage.removeItem(REDEEM_KEY);
    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    goToStep,
    setIsMember,
    redeemCode,
    reset,
  };
};