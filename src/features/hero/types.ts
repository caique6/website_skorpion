export interface IntroMessage {
  id: string;
  text: string;
  subtext?: string;
  durationMs: number;
}

export interface HeadlineSegment {
  id: string;
  text: string;
  emphasis: boolean;
}

export type ChannelTone = "red" | "yellow";

export interface ChannelOption {
  id: string;
  label: string;
  url: string;
  tone: ChannelTone;
}

export interface SubscribedAction {
  label: string;
  channels: ChannelOption[];
}

export interface MembershipAction {
  label: string;
  url: string;
}

export interface HeroActionsData {
  subscribed: SubscribedAction;
  membership: MembershipAction;
}

export interface HeroData {
  intro: IntroMessage[];
  headline: HeadlineSegment[];
  subtitle: string;
  actions: HeroActionsData;
}
