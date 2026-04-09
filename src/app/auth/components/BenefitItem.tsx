import { Benefit } from '../types/auth.types';
import { IconContainer } from '@/components/ui/IconContainer';
import * as MuiIcons from '@mui/icons-material';

interface BenefitItemProps {
  benefit: Benefit;
}

export function BenefitItem({ benefit }: BenefitItemProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-[16px] items-start">
      <IconContainer 
        iconName={benefit.iconName as keyof typeof MuiIcons} 
        variant="dark" 
      />
      <div className="flex flex-col gap-[8px]">
        <h3 className="font-display font-semibold text-[#FFFFFF] text-[1.125rem] leading-[1.3]">
          {benefit.title}
        </h3>
        <p className="font-body font-normal text-white/55 text-[1rem] leading-[1.65]">
          {benefit.description}
        </p>
        <span className="inline-flex items-center text-[0.75rem] font-medium tracking-[0.08em] uppercase text-[#F2D43D]">
          Nível Mínimo: {benefit.minimumLevel}
        </span>
      </div>
    </div>
  );
}