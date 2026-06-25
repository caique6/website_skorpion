"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { OVERLAY_DEMO } from "../data/overlay-demo";
import { OverlayAlert, OverlayPayload, OverlaySource } from "../types";

const ENTER_DELAY_MS = 400;
const EXIT_DURATION_MS = 420;
const DEMO_INTERVAL_MS = 9000;
const OVERLAY_EVENTS_URL = "/api/live-message/overlay";

export const useOverlayQueue = (source: OverlaySource, token: string | null) => {
  const [alert, setAlert] = useState<OverlayAlert | null>(null);
  const queueRef = useRef<OverlayPayload[]>([]);
  const processingRef = useRef(false);

  const processNext = useCallback(() => {
    if (processingRef.current || queueRef.current.length === 0) return;
    const next = queueRef.current.shift()!;
    processingRef.current = true;
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
    setAlert((prev) => (prev ? { ...prev, state: "exiting" } : null));
    setTimeout(() => {
      setAlert(null);
      processingRef.current = false;
      processNext();
    }, EXIT_DURATION_MS);
  }, [processNext]);

  useEffect(() => {
    if (source === "idle") return;

    if (source === "demo") {
      let index = 0;
      const push = () => {
        enqueue({ ...OVERLAY_DEMO[index % OVERLAY_DEMO.length], id: `demo-${index}` });
        index += 1;
      };
      push();
      const id = setInterval(push, DEMO_INTERVAL_MS);
      return () => clearInterval(id);
    }

    const url = token
      ? `${OVERLAY_EVENTS_URL}?token=${encodeURIComponent(token)}`
      : OVERLAY_EVENTS_URL;
    const eventSource = new EventSource(url);
    eventSource.addEventListener("alert", (event) => {
      enqueue(JSON.parse((event as MessageEvent).data) as OverlayPayload);
    });
    return () => eventSource.close();
  }, [source, token, enqueue]);

  return { alert, dismiss };
};
