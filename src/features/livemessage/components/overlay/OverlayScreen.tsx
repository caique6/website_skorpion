"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useOverlayQueue } from "../../hooks/useOverlayQueue";
import { useTextToSpeech } from "../../hooks/useTextToSpeech";
import { OverlaySource } from "../../types";
import { OverlayAlertCard } from "./OverlayAlertCard";

const VISIBLE_FALLBACK_MS = 7000;

const clearBackground = (element: HTMLElement) => {
  element.style.setProperty("background", "transparent", "important");
  element.style.setProperty("background-color", "transparent", "important");
};

export const OverlayScreen = () => {
  const [source, setSource] = useState<OverlaySource>("idle");
  const [token, setToken] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const { alert, dismiss } = useOverlayQueue(source, token);
  const { play } = useTextToSpeech();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setMuted(params.get("mute") === "1");
    if (params.get("demo") === "1") {
      setSource("demo");
      return;
    }
    setToken(params.get("token"));
    setSource("live");
  }, []);

  useEffect(() => {
    clearBackground(document.documentElement);
    clearBackground(document.body);
    return () => {
      document.documentElement.style.removeProperty("background");
      document.documentElement.style.removeProperty("background-color");
      document.body.style.removeProperty("background");
      document.body.style.removeProperty("background-color");
    };
  }, []);

  useEffect(() => {
    if (!alert || alert.state !== "visible") return;
    if (!muted) play(`${alert.memberName} disse: ${alert.message}`);
    const timeout = setTimeout(dismiss, VISIBLE_FALLBACK_MS);
    return () => clearTimeout(timeout);
  }, [alert, play, dismiss, muted]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-transparent">
      <AnimatePresence>
        {alert && (
          <div key={alert.id} className="p-6">
            <OverlayAlertCard alert={alert} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
