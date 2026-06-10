"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface IntroState {
  isComplete: boolean;
  complete: () => void;
}

const fallback: IntroState = { isComplete: true, complete: () => {} };

const IntroContext = createContext<IntroState | null>(null);

export const IntroProvider = ({ children }: { children: ReactNode }) => {
  const [isComplete, setIsComplete] = useState(false);
  const complete = useCallback(() => setIsComplete(true), []);
  const value = useMemo<IntroState>(
    () => ({ isComplete, complete }),
    [isComplete, complete],
  );

  return (
    <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
  );
};

export const useIntro = (): IntroState => useContext(IntroContext) ?? fallback;
