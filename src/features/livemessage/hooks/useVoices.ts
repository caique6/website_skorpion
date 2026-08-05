"use client";

import { useEffect, useState } from "react";
import { edgeFunctionUrl } from "@/lib/edge";
import { DEFAULT_VOICES } from "../data/voice-defaults";
import { VoiceOption } from "../types";

export const useVoices = (): VoiceOption[] => {
  const [voices, setVoices] = useState<VoiceOption[]>(DEFAULT_VOICES);

  useEffect(() => {
    let active = true;
    fetch(edgeFunctionUrl("livepix/voices"))
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (active && Array.isArray(data) && data.length > 0) setVoices(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return voices;
};
