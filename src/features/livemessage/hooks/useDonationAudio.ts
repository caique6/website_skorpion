"use client";

import { useCallback, useRef } from "react";
import { edgeFunctionUrl, edgeFunctionHeaders } from "@/lib/edge";

const ttsUrl = (token: string | null): string =>
  `${edgeFunctionUrl("live-tts")}${token ? `?token=${encodeURIComponent(token)}` : ""}`;

export const useDonationAudio = (token: string | null) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    if (audio.src) URL.revokeObjectURL(audio.src);
    audioRef.current = null;
  }, []);

  const play = useCallback(
    async (text: string, voiceId: string | null): Promise<boolean> => {
      try {
        const response = await fetch(ttsUrl(token), {
          method: "POST",
          headers: edgeFunctionHeaders(),
          body: JSON.stringify({ text, voiceId }),
        });
        if (!response.ok) return false;

        const blob = await response.blob();
        if (blob.size === 0) return false;

        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;

        await new Promise<void>((resolve) => {
          audio.onended = () => resolve();
          audio.onerror = () => resolve();
          audio.play().catch(() => resolve());
        });

        URL.revokeObjectURL(url);
        if (audioRef.current === audio) audioRef.current = null;
        return true;
      } catch {
        return false;
      }
    },
    [token],
  );

  return { play, stop };
};
