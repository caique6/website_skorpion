"use client";

import { cn } from '@/utils/cn';
import * as MuiIcons from '@mui/icons-material';

interface IconContainerProps {
  iconName: keyof typeof MuiIcons | string;
  variant?: 'dark' | 'light';
  className?: string;
}

export function IconContainer({ iconName, variant = 'dark', className }: IconContainerProps) {
  const Icon = (MuiIcons as any)[iconName];

  return (
    <div
      className={cn(
        "flex items-center justify-center w-[44px] h-[44px] rounded-[12px] shrink-0",
        variant === 'dark'
          ? "bg-[#F2D43D]/10 border border-[#F2D43D]/20 text-[#F2D43D]"
          : "bg-[#FEF9E7] border border-[#F5E070] text-[#73022C]",
        className
      )}
    >
      {Icon ? <Icon fontSize="small" color="inherit" /> : null}
    </div>
  );
}