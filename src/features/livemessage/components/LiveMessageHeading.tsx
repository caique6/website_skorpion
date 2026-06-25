import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  eyebrow: string;
  lines: string[];
  subtitle: string;
}

export const LiveMessageHeading = ({ icon: Icon, eyebrow, lines, subtitle }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-skorpion-red">
        <Icon className="h-5 w-5" />
        <span className="text-xs font-black uppercase tracking-[0.25em]">{eyebrow}</span>
      </div>
      <h1 className="text-4xl font-black uppercase leading-[1.05] tracking-tight text-[#1A1A1A] lg:text-5xl">
        {lines.map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
      </h1>
      <p className="max-w-lg text-sm font-medium leading-relaxed text-[#1A1A1A]/55 lg:text-base">
        {subtitle}
      </p>
    </div>
  );
};
