"use client";

import { useCallback, useState } from "react";
import { normalizeTier } from "@/lib/tier-utils";
import {
  LiveMessageError,
  LiveMessageFormData,
  LiveMessagePreview,
  LiveMessageState,
} from "../types";

const CODE_PATTERN = /^SKORP-[A-Z0-9]{4}-[A-Z0-9]{4}$/i;

const INITIAL_STATE: LiveMessageState = {
  status: "idle",
  error: null,
  preview: null,
  cooldownMs: null,
};

const errorState = (error: LiveMessageError): LiveMessageState => ({
  status: "error",
  error,
  preview: null,
  cooldownMs: null,
});

export const useLiveMessage = () => {
  const [state, setState] = useState<LiveMessageState>(INITIAL_STATE);
  const [pending, setPending] = useState<LiveMessageFormData | null>(null);

  const submit = useCallback(async (data: LiveMessageFormData) => {
    const code = data.code.trim().toUpperCase();
    const name = data.name.trim();
    const message = data.message.trim();

    if (!code) return setState(errorState("code_required"));
    if (!CODE_PATTERN.test(code)) return setState(errorState("invalid_code"));
    if (!name) return setState(errorState("name_required"));
    if (!message) return setState(errorState("message_required"));

    setPending({ code, name, message });
    setState((prev) => ({ ...prev, status: "validating", error: null }));

    try {
      const response = await fetch("/api/live-message/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const body = await response.json();

      if (response.status === 429) {
        if (typeof body.remainingMs === "number") {
          setState({ status: "blocked", error: null, preview: null, cooldownMs: body.remainingMs });
        } else {
          setState(errorState("too_many_requests"));
        }
        return;
      }

      if (!response.ok) {
        setState(errorState((body.error as LiveMessageError) ?? "unknown"));
        return;
      }

      const tier = normalizeTier(body.tier);
      if (!tier) return setState(errorState("invalid_tier"));

      const preview: LiveMessagePreview = {
        memberName: name,
        memberAvatarUrl: body.memberAvatarUrl ?? null,
        tier,
        message,
      };
      setState({ status: "previewing", error: null, preview, cooldownMs: null });
    } catch {
      setState(errorState("network"));
    }
  }, []);

  const confirm = useCallback(async () => {
    if (!pending) return;
    setState((prev) => ({ ...prev, status: "submitting" }));

    try {
      const response = await fetch("/api/live-message/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pending),
      });
      const body = await response.json().catch(() => ({}));

      if (response.status === 429) {
        if (typeof body.remainingMs === "number") {
          setState({ status: "blocked", error: null, preview: null, cooldownMs: body.remainingMs });
        } else {
          setState(errorState("too_many_requests"));
        }
        return;
      }

      if (!response.ok) {
        setState(errorState((body.error as LiveMessageError) ?? "unknown"));
        return;
      }

      setState((prev) => ({ ...prev, status: "success" }));
    } catch {
      setState(errorState("network"));
    }
  }, [pending]);

  const reset = useCallback(() => {
    setPending(null);
    setState(INITIAL_STATE);
  }, []);

  return { state, submit, confirm, reset };
};
