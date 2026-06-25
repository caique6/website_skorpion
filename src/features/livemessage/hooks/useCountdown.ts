"use client";

import { useEffect, useRef, useState } from "react";

interface Countdown {
  hours: number;
  minutes: number;
  seconds: number;
}

const split = (ms: number): Countdown => {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
};

export const useCountdown = (durationMs: number, onDone: () => void): Countdown => {
  const [target] = useState(() => Date.now() + durationMs);
  const [now, setNow] = useState(() => Date.now());
  const doneRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = target - now;

  useEffect(() => {
    if (remaining <= 0 && !doneRef.current) {
      doneRef.current = true;
      onDone();
    }
  }, [remaining, onDone]);

  return split(remaining);
};
