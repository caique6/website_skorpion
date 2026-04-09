import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'dark' | 'light';
}

export function Card({ variant = 'dark', className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[16px] p-[28px] md:p-[32px] transition-all duration-200 ease-in-out",
        variant === 'dark'
          ? "bg-[#2A0020] border border-[#F2D43D]/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-[#F2D43D]/30 hover:-translate-y-[2px]"
          : "bg-[#FBF7F0] border border-[#EDE5D0] shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}