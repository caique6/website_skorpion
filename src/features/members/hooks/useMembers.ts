import { useState, useCallback, useLayoutEffect, useRef } from "react";

export const useMembers = (total: number) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);

  const updateHeight = useCallback(() => {
    if (!containerRef.current) return;
    const active = containerRef.current.querySelector<HTMLDivElement>("[data-plan-card]");
    if (active) setCardHeight(active.scrollHeight);
  }, []);

  useLayoutEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [activeIndex, updateHeight]);

  const goTo = useCallback((index: number) => setActiveIndex(index), []);

  const goNext = useCallback(
    () => setActiveIndex((prev) => (prev + 1) % total),
    [total]
  );

  const goPrev = useCallback(
    () => setActiveIndex((prev) => (prev - 1 + total) % total),
    [total]
  );

  return { activeIndex, goTo, goNext, goPrev, containerRef, cardHeight };
};