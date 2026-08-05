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

export type OverlayKind = "message" | "donation";

export interface OverlayPayload {
  id: string;
  kind?: OverlayKind;
  memberName: string;
  avatarUrl: string | null;
  tier: PlanTier | null;
  message: string;
  amountCents?: number | null;
  voiceId?: string | null;
}

export type OverlayAlertState = "entering" | "visible" | "exiting";

export interface OverlayAlert extends OverlayPayload {
  state: OverlayAlertState;
}

export type OverlaySource = "idle" | "live" | "demo";

export type LiveMode = "message" | "donation";

export interface VoiceOption {
  voiceId: string;
  label: string;
  requiresApproval: boolean;
}

export type DonationError =
  | "name_required"
  | "message_required"
  | "amount_below_min"
  | "too_many_requests"
  | "network"
  | "unknown";

export type DonationStatus =
  | "idle"
  | "creating"
  | "awaiting_payment"
  | "published"
  | "approved"
  | "rejected"
  | "error";

export interface DonationFormData {
  name: string;
  message: string;
  amountCents: number;
}

export interface DonationPixData {
  donationId: string;
  qrCode: string;
  qrCodeBase64: string;
  expiresAt: string;
}

export interface DonationState {
  status: DonationStatus;
  error: DonationError | null;
  pix: DonationPixData | null;
  minCents: number | null;
}

export interface DonationSuccessContent {
  publishedLines: string[];
  publishedSubtitle: string;
  approvalLines: string[];
  approvalSubtitle: string;
  rejectedLines: string[];
  rejectedSubtitle: string;
  resetLabel: string;
}

export interface DonationContent {
  eyebrow: string;
  headlineLines: string[];
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  nameMaxLength: number;
  messageLabel: string;
  messagePlaceholder: string;
  messageMaxLength: number;
  voiceLabel: string;
  voiceHint: string;
  termsPrefix: string;
  termsLinkLabel: string;
  amountLabel: string;
  amountPlaceholder: string;
  presetsCents: number[];
  submitLabel: string;
  submitLoadingLabel: string;
  pixTitle: string;
  pixSubtitle: string;
  copyLabel: string;
  copiedLabel: string;
  waitingLabel: string;
  expiresLabel: string;
  expiredTitle: string;
  expiredSubtitle: string;
  newQrLabel: string;
  success: DonationSuccessContent;
  errors: Record<DonationError, string>;
}
