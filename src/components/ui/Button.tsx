"use client";

import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { cn } from '@/utils/cn';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <MuiButton
      className={cn(
        "font-display rounded-[8px] transition-all duration-200 ease-in-out px-[28px] py-[12px] capitalize",
        variant === 'primary' 
          ? "bg-[#F2D43D] text-[#1A0010] font-semibold text-[0.9rem] hover:bg-[#F2D43D] hover:brightness-110 hover:shadow-[0_0_20px_rgba(242,212,61,0.4)]"
          : "bg-transparent text-[#FFFFFF] border border-white/20 font-medium text-[0.9rem] hover:border-white/40 hover:bg-white/5",
        className
      )}
      disableElevation
      disableRipple={variant === 'secondary'}
      {...props}
    >
      {children}
    </MuiButton>
  );
}