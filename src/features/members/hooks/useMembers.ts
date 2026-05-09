import { useState, useCallback, useLayoutEffect, useRef } from "react";

export const useMembers = (total: number) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);

  const updateHeight = useCallback(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll<HTMLDivElement>("[data-plan-card]");
    const heights = Array.from(cards).map((c) => c.scrollHeight);
    if (heights.length > 0) setCardHeight(Math.max(...heights));
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
