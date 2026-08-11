import { Clock, ListChecks, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { TIER_LABEL } from "../utils/tier-accent";
import { InfoContent } from "../types";

interface Props {
  content: InfoContent;
}

const CELL = "flex flex-col gap-3 rounded-2xl border border-skorpion-black/[0.07] bg-skorpion-white p-4";
const CELL_TITLE = "flex items-center gap-2 text-[11px] font-black uppercase tracking-widest";

export const LiveMessageInfoCard = ({ content }: Props) => {
  return (
    <section className="flex flex-col gap-5 rounded-3xl border border-skorpion-black/10 bg-skorpion-black/[0.02] p-5 md:p-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-skorpion-red">
          <Sparkles className="h-4 w-4" />
          <span className="text-[11px] font-black uppercase tracking-[0.25em]">
            {content.eyebrow}
          </span>
        </div>
        <h2 className="text-xl font-black uppercase tracking-tight text-skorpion-black">
          {content.title}
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className={CELL}>
          <span className={cn(CELL_TITLE, "text-skorpion-black/40")}>
            <ListChecks className="h-3.5 w-3.5" />
            {content.stepsTitle}
          </span>
          <ol className="flex flex-col gap-2">
            {content.steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-skorpion-red/10 text-[11px] font-black text-skorpion-red">
                  {index + 1}
                </span>
                <span className="text-sm font-medium leading-relaxed text-skorpion-black/60">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className={CELL}>
          <span className={cn(CELL_TITLE, "text-skorpion-black/40")}>
            <Clock className="h-3.5 w-3.5" />
            {content.cooldownTitle}
          </span>
          <div className="flex flex-col gap-2">
            {content.cooldowns.map((cooldown) => {
              const tier = TIER_LABEL[cooldown.tier];
              return (
                <div
                  key={cooldown.tier}
                  className="flex items-center gap-3 rounded-xl border border-skorpion-black/[0.06] bg-white px-3 py-1.5"
                >
                  <span
                    className={cn(
                      "relative inline-flex w-[108px] shrink-0 items-center justify-center overflow-hidden rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-wide",
                      tier.className,
                    )}
                  >
                    {tier.shine && <span className="card-shine" />}
                    <span className="relative z-10">{tier.label}</span>
                  </span>
                  <span className="whitespace-nowrap text-[11px] font-bold text-skorpion-black/60">
                    {cooldown.wait}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={cn(CELL, "border-skorpion-red/20 bg-skorpion-red/[0.05]")}>
          <span className={cn(CELL_TITLE, "text-skorpion-red")}>
            <ShieldCheck className="h-3.5 w-3.5" />
            {content.rulesTitle}
          </span>
          <p className="text-sm font-medium leading-relaxed text-skorpion-black/60">
            {content.rules}
          </p>
        </div>
      </div>
    </section>
  );
};
