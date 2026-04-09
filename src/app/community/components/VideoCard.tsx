import { YouTubeVideo } from '../types/community.types';
import { Card } from '@/components/ui/Card';
import { PlayArrow } from '@mui/icons-material';

interface VideoCardProps {
  video: YouTubeVideo;
}

export function VideoCard({ video }: VideoCardProps) {
  const minutes = Math.floor(video.durationInSeconds / 60);
  const seconds = video.durationInSeconds % 60;
  const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <Card variant="dark" className="p-0 overflow-hidden group cursor-pointer">
      <div className="relative aspect-video w-full overflow-hidden bg-[#1A0010]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-[48px] h-[48px] rounded-full bg-[#D6002E] flex items-center justify-center text-white shadow-[0_0_20px_rgba(217,4,61,0.5)]">
            <PlayArrow />
          </div>
        </div>
        <div className="absolute bottom-[8px] right-[8px] bg-black/80 text-white font-body text-[0.75rem] font-medium px-[6px] py-[2px] rounded-[4px]">
          {formattedDuration}
        </div>
      </div>
      <div className="p-[16px] md:p-[24px]">
        <h4 className="font-display font-semibold text-[#FFFFFF] text-[1rem] leading-[1.3] line-clamp-2 group-hover:text-[#F2D43D] transition-colors duration-200">
          {video.title}
        </h4>
      </div>
    </Card>
  );
}