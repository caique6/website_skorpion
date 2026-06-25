"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { OVERLAY_DEMO } from "../data/overlay-demo";
import { OverlayAlert, OverlayPayload, OverlaySource } from "../types";

const ENTER_DELAY_MS = 400;
const EXIT_DURATION_MS = 420;
const DEMO_INTERVAL_MS = 9000;
const POLL_INTERVAL_MS = 2000;

const overlayUrl = (token: string | null): string =>
  `/api/live-message/overlay${token ? `?token=${encodeURIComponent(token)}` : ""}`;

export const useOverlayQueue = (source: OverlaySource, token: string | null) => {
  const [alert, setAlert] = useState<OverlayAlert | null>(null);
  const queueRef = useRef<OverlayPayload[]>([]);
  const processingRef = useRef(false);
  const currentIdRef = useRef<string | null>(null);

  const post = useCallback(
    (action: string, id?: string) =>
      fetch(overlayUrl(token), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id ? { action, id } : { action }),
      }),
    [token],
  );

  const processNext = useCallback(() => {
    if (processingRef.current || queueRef.current.length === 0) return;
    const next = queueRef.current.shift()!;
    processingRef.current = true;
    currentIdRef.current = next.id;
    setAlert({ ...next, state: "entering" });
    setTimeout(
      () => setAlert((prev) => (prev ? { ...prev, state: "visible" } : null)),
      ENTER_DELAY_MS,
    );
  }, []);

  const enqueue = useCallback(
    (payload: OverlayPayload) => {
      queueRef.current.push(payload);
      processNext();
    },
    [processNext],
  );

  const dismiss = useCallback(() => {
    const id = currentIdRef.current;
    setAlert((prev) => (prev ? { ...prev, state: "exiting" } : null));
    setTimeout(() => {
      setAlert(null);
      processingRef.current = false;
      currentIdRef.current = null;
      if (id && source === "live") post("sent", id).catch(() => {});
    }, EXIT_DURATION_MS);
  }, [post, source]);

  useEffect(() => {
    if (source !== "demo") return;
    let index = 0;
    const push = () => {
      enqueue({ ...OVERLAY_DEMO[index % OVERLAY_DEMO.length], id: `demo-${index}` });
      index += 1;
    };
    push();
    const id = setInterval(push, DEMO_INTERVAL_MS);
    return () => clearInterval(id);
  }, [source, enqueue]);

  useEffect(() => {
    if (source !== "live") return;
    let active = true;

    const claim = async () => {
      if (!active || processingRef.current || queueRef.current.length > 0) return;
      try {
        const response = await post("claim");
        if (!response.ok) return;
        const payload: OverlayPayload | null = await response.json();
        if (active && payload && payload.id) enqueue(payload);
      } catch {}
    };

    post("reset").catch(() => {});
    claim();
    const id = setInterval(claim, POLL_INTERVAL_MS);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [source, post, enqueue]);

  return { alert, dismiss };
};
