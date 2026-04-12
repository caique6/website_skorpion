import { useState, useCallback } from "react";
import { ReclaimState, ReclaimStep } from "../types";
import { generateCode } from "../utils/generateCode";

const INITIAL_STATE: ReclaimState = {
  step: 1,
  isMember: null,
  code: "",
};

export const useReclaim = () => {
  const [state, setState] = useState<ReclaimState>(INITIAL_STATE);

  const goToStep = useCallback((step: ReclaimStep) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const setIsMember = useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, isMember: value }));
  }, []);

  const generateAndAdvance = useCallback(() => {
    const code = generateCode();
    setState((prev) => ({ ...prev, code, step: 4 }));
  }, []);

  return {
    state,
    goToStep,
    setIsMember,
    generateAndAdvance,
  };
};