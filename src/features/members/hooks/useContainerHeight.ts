import { useEffect, useRef, useState } from "react";

export const useContainerHeight = (active: boolean) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const h = entry.contentRect.height;
      setHeight((prev) => (prev === undefined || h > prev ? h : prev));
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [active]);

  return { ref, height };
};