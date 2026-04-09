import { RankedMember } from '../types/community.types';
import { Avatar } from '@mui/material';
import { cn } from '@/utils/cn';

interface RankingItemProps {
  member: RankedMember;
  position: number;
}

export function RankingItem({ member, position }: RankingItemProps) {
  const isTop3 = position <= 3;
  
  return (
    <div className="flex flex-row items-center gap-[16px] p-[16px] rounded-[12px] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200">
      <div 
        className={cn(
          "font-display font-bold text-[1.25rem] w-[28px] text-center",
          isTop3 ? "text-[#F2D43D]" : "text-white/55"
        )}
      >
        {position}º
      </div>
      
      <Avatar 
        src={member.avatarUrl} 
        alt={member.name} 
        sx={{ 
          width: 48, 
          height: 48, 
          border: isTop3 ? '2px solid #F2D43D' : '2px solid transparent' 
        }} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <span className="font-display font-semibold text-[#FFFFFF] text-[1rem] truncate">
          {member.name}
        </span>
        <span className="font-body text-[0.875rem] text-[#F2D43D] truncate">
          {member.membershipLevel}
        </span>
      </div>
      
      <div className="flex flex-col items-end shrink-0">
        <span className="font-display font-bold text-[#FFFFFF]">
          {member.points.toLocaleString('pt-BR')} pts
        </span>
        <span className="font-body text-[0.75rem] text-white/55">
          {member.monthsActive} meses
        </span>
      </div>
    </div>
  );
}