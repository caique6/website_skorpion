import { cn } from '@/utils/cn';

interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SectionLabel({ className, children, ...props }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center bg-[#F2D43D]/10 border border-[#F2D43D]/25 text-[#F2D43D] text-[0.75rem] font-medium tracking-[0.08em] uppercase px-[14px] py-[6px] rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}