"use client";

import { useCallback, useState } from "react";

export const useTextToSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = useCallback(
    (text: string): Promise<void> =>
      new Promise((resolve) => {
        if (typeof window === "undefined" || !window.speechSynthesis) return resolve();

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "pt-BR";
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => {
          setIsPlaying(false);
          resolve();
        };
        utterance.onerror = () => {
          setIsPlaying(false);
          resolve();
        };
        window.speechSynthesis.speak(utterance);
      }),
    []
  );

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  return { play, stop, isPlaying };
};
