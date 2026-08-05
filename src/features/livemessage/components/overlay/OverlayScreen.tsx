"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useOverlayQueue } from "../../hooks/useOverlayQueue";
import { useTextToSpeech } from "../../hooks/useTextToSpeech";
import { useDonationAudio } from "../../hooks/useDonationAudio";
import { formatBRL } from "../../utils/format-brl";
import { OverlaySource } from "../../types";
import { OverlayAlertCard } from "./OverlayAlertCard";

const MAX_VISIBLE_MS = 30000;
const MIN_VISIBLE_MS = 6500;
const READING_MS_PER_CHAR = 75;

const readingDuration = (message: string): number =>
  Math.min(Math.max(message.length * READING_MS_PER_CHAR, MIN_VISIBLE_MS), MAX_VISIBLE_MS);

const clearBackground = (element: HTMLElement) => {
  element.style.setProperty("background", "transparent", "important");
  element.style.setProperty("background-color", "transparent", "important");
};

export const OverlayScreen = () => {
  const [source, setSource] = useState<OverlaySource>("idle");
  const [token, setToken] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const { alert, dismiss } = useOverlayQueue(source, token);
  const { play: playSpeech, stop: stopSpeech } = useTextToSpeech();
  const { play: playRemote, stop: stopRemote } = useDonationAudio(token);

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

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      stopRemote();
      stopSpeech();
      dismiss();
    };

    const cap = setTimeout(finish, MAX_VISIBLE_MS);

    if (muted) {
      const readable = setTimeout(finish, readingDuration(alert.message));
      return () => {
        settled = true;
        clearTimeout(cap);
        clearTimeout(readable);
      };
    }

    const speech =
      alert.kind === "donation" && alert.amountCents != null
        ? `${alert.memberName} doou ${formatBRL(alert.amountCents)} e disse: ${alert.message}`
        : `${alert.memberName} disse: ${alert.message}`;

    const speak = async () => {
      const spoken = source === "live" && (await playRemote(speech, alert.voiceId ?? null));
      if (settled) return;
      if (spoken) return finish();
      await playSpeech(speech);
      finish();
    };
    speak();

    return () => {
      settled = true;
      clearTimeout(cap);
      stopRemote();
      stopSpeech();
    };
  }, [alert, playRemote, playSpeech, stopRemote, stopSpeech, dismiss, muted, source]);

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
