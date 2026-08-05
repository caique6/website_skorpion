"use client";

import { Check, Mic } from "lucide-react";
import { VOICE_CHARACTERS } from "../data/voice-characters";

interface Props {
  availableVoiceIds: string[];
  voiceId: string;
  label: string;
  hint: string;
  onSelect: (voiceId: string) => void;
}

export const DonationVoiceCard = ({ availableVoiceIds, voiceId, label, hint, onSelect }: Props) => (
  <aside className="flex flex-col gap-4 rounded-3xl border border-skorpion-black/10 bg-skorpion-black/[0.02] p-5">
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-skorpion-red">
        <Mic className="h-4 w-4" />
        <span className="text-[11px] font-black uppercase tracking-[0.25em]">{label}</span>
      </div>
      <p className="text-sm font-medium leading-relaxed text-skorpion-black/60">{hint}</p>
    </div>

    <div className="grid grid-cols-3 gap-3">
      {VOICE_CHARACTERS.map((character) => {
        const available = character.voiceId !== null && availableVoiceIds.includes(character.voiceId);
        const selected = available && character.voiceId === voiceId;
        return (
          <button
            key={character.name}
            type="button"
            aria-disabled={!available}
            onClick={() => available && character.voiceId && onSelect(character.voiceId)}
            className={`group flex flex-col items-center gap-1.5 ${
              available ? "cursor-pointer" : "cursor-default"
            }`}
          >
            <span className="relative block h-16 w-16">
              <span
                className={`relative block h-16 w-16 overflow-hidden rounded-full ring-2 transition ${
                  selected ? "ring-skorpion-red" : "ring-transparent"
                }`}
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className={`h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110 ${
                    available ? "" : "opacity-40 grayscale"
                  }`}
                />
                {!available && (
                  <span className="absolute inset-0 flex items-center justify-center bg-skorpion-black/60 opacity-0 transition duration-200 group-hover:opacity-100">
                    <span className="text-[8px] font-black uppercase tracking-wide text-white">
                      Indisponível
                    </span>
                  </span>
                )}
              </span>
              {selected && (
                <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-skorpion-red ring-2 ring-white">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </span>
              )}
            </span>
            <span
              className={`text-center text-[11px] font-bold leading-tight ${
                available
                  ? selected
                    ? "text-skorpion-red"
                    : "text-skorpion-black/70"
                  : "text-skorpion-black/40"
              }`}
            >
              {character.name}
            </span>
          </button>
        );
      })}
    </div>
  </aside>
);
