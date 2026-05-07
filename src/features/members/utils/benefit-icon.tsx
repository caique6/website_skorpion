import {
  Layers, Vote, MessageCircle, MapPin, Gamepad2, Mic,
  Phone, Globe, AtSign, MessageSquare, BarChart2, Users,
  Film, BadgeCheck, Smile, Clock, Radio, PlayCircle, Tv,
  Star,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  layers: Layers,
  vote: Vote,
  "message-circle": MessageCircle,
  "map-pin": MapPin,
  "gamepad-2": Gamepad2,
  mic: Mic,
  phone: Phone,
  globe: Globe,
  "at-sign": AtSign,
  "message-square": MessageSquare,
  "bar-chart-2": BarChart2,
  users: Users,
  film: Film,
  "badge-check": BadgeCheck,
  smile: Smile,
  clock: Clock,
  radio: Radio,
  "play-circle": PlayCircle,
  tv: Tv,
};

interface Props {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export const BenefitIcon = ({ name, className, style }: Props) => {
  const Icon = ICON_MAP[name] ?? Star;
  return <Icon className={className} style={style} strokeWidth={2} />;
};