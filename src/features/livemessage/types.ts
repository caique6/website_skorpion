import { PlanTier } from "@/features/ranking/types";

export type LiveMessageStatus =
  | "idle"
  | "validating"
  | "previewing"
  | "submitting"
  | "success"
  | "blocked"
  | "error";

export type LiveMessageError =
  | "code_required"
  | "name_required"
  | "message_required"
  | "invalid_code"
  | "code_not_found"
  | "member_inactive"
  | "membership_expired"
  | "invalid_tier"
  | "too_many_requests"
  | "network"
  | "unknown";

export interface LiveMessageFormData {
  code: string;
  name: string;
  message: string;
}

export interface LiveMessagePreview {
  memberName: string;
  memberAvatarUrl: string | null;
  tier: PlanTier;
  message: string;
}

export interface LiveMessageState {
  status: LiveMessageStatus;
  error: LiveMessageError | null;
  preview: LiveMessagePreview | null;
  cooldownMs: number | null;
}

export interface PreviewContent {
  eyebrow: string;
  headlineLines: string[];
  subtitle: string;
  alertSuffix: string;
  listenLabel: string;
  listeningLabel: string;
  confirmLabel: string;
  confirmLoadingLabel: string;
  backLabel: string;
}

export interface SuccessContent {
  headlineLines: string[];
  subtitle: string;
  resetLabel: string;
}

export interface CooldownContent {
  eyebrow: string;
  headlineLines: string[];
  subtitle: string;
  resetLabel: string;
}

export interface InfoCooldown {
  tier: PlanTier;
  wait: string;
}

export interface InfoContent {
  eyebrow: string;
  title: string;
  steps: string[];
  cooldownTitle: string;
  cooldowns: InfoCooldown[];
  rulesTitle: string;
  rules: string;
}

export interface LiveMessageContent {
  eyebrow: string;
  headlineLines: string[];
  subtitle: string;
  codeLabel: string;
  codePlaceholder: string;
  nameLabel: string;
  namePlaceholder: string;
  nameMaxLength: number;
  messageLabel: string;
  messagePlaceholder: string;
  messageMaxLength: number;
  submitLabel: string;
  submitLoadingLabel: string;
  info: InfoContent;
  preview: PreviewContent;
  success: SuccessContent;
  cooldown: CooldownContent;
  errors: Record<LiveMessageError, string>;
}

export interface OverlayPayload {
  id: string;
  memberName: string;
  avatarUrl: string | null;
  tier: PlanTier;
  message: string;
}

export type OverlayAlertState = "entering" | "visible" | "exiting";

export interface OverlayAlert extends OverlayPayload {
  state: OverlayAlertState;
}

export type OverlaySource = "idle" | "live" | "demo";
