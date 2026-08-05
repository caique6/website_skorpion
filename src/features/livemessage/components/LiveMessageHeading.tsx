import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  eyebrow: string;
  lines: string[];
  subtitle: string;
}

export const LiveMessageHeading = ({ icon: Icon, eyebrow, lines, subtitle }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-skorpion-red">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-black uppercase tracking-[0.25em]">{eyebrow}</span>
      </div>
      <h1 className="text-3xl font-black uppercase leading-[1.05] tracking-tight text-[#1A1A1A]">
        {lines.map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
      </h1>
      <p className="max-w-lg text-sm font-medium leading-relaxed text-[#1A1A1A]/55">
        {subtitle}
      </p>
    </div>
  );
};
