"use client";

import { useCallback, useEffect, useState } from "react";
import { edgeFunctionUrl, edgeFunctionHeaders } from "@/lib/edge";
import { DonationError, DonationFormData, DonationState, DonationStatus } from "../types";

const POLL_INTERVAL_MS = 3000;
const MIN_FLOOR_CENTS = 500;

const INITIAL_STATE: DonationState = {
  status: "idle",
  error: null,
  pix: null,
  minCents: null,
};

const errorState = (error: DonationError, minCents: number | null = null): DonationState => ({
  status: "error",
  error,
  pix: null,
  minCents,
});

const resolveStatus = (remote: string): DonationStatus | null => {
  if (remote === "awaiting_approval") return "approved";
  if (remote === "published" || remote === "rejected") return remote;
  return null;
};

export const useDonation = () => {
  const [state, setState] = useState<DonationState>(INITIAL_STATE);

  const create = useCallback(async (data: DonationFormData, voiceId: string | null) => {
    const name = data.name.trim();
    const message = data.message.trim();

    if (!name) return setState(errorState("name_required"));
    if (!message) return setState(errorState("message_required"));
    if (!Number.isInteger(data.amountCents) || data.amountCents < MIN_FLOOR_CENTS) {
      return setState(errorState("amount_below_min", MIN_FLOOR_CENTS));
    }

    setState({ status: "creating", error: null, pix: null, minCents: null });

    try {
      const deviceId =
        typeof window !== "undefined" ? window.MP_DEVICE_SESSION_ID ?? null : null;

      const response = await fetch(edgeFunctionUrl("livepix/create"), {
        method: "POST",
        headers: edgeFunctionHeaders(),
        body: JSON.stringify({ name, message, amountCents: data.amountCents, voiceId, deviceId }),
      });
      const body = await response.json().catch(() => ({}));

      if (response.status === 429) return setState(errorState("too_many_requests"));
      if (!response.ok) {
        if (body.error === "amount_below_min") {
          return setState(errorState("amount_below_min", body.minCents ?? null));
        }
        return setState(errorState((body.error as DonationError) ?? "unknown"));
      }

      setState({
        status: "awaiting_payment",
        error: null,
        minCents: null,
        pix: {
          donationId: body.donationId,
          qrCode: body.qrCode,
          qrCodeBase64: body.qrCodeBase64,
        },
      });
    } catch {
      setState(errorState("network"));
    }
  }, []);

  const donationId = state.status === "awaiting_payment" ? state.pix?.donationId : undefined;

  useEffect(() => {
    if (!donationId) return;
    let active = true;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${edgeFunctionUrl("livepix/status")}?id=${donationId}`);
        const body = await response.json().catch(() => ({}));
        const next = typeof body.status === "string" ? resolveStatus(body.status) : null;
        if (active && next) setState((prev) => ({ ...prev, status: next }));
      } catch {}
    }, POLL_INTERVAL_MS);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [donationId]);

  const reset = useCallback(() => setState(INITIAL_STATE), []);

  return { state, create, reset };
};
