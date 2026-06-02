export type ReclaimStep = 1 | 2 | 3 | 4 | 5 | 6;

export type ReclaimError =
  | "member_not_found"
  | "member_inactive"
  | "tier_not_eligible"
  | "already_redeemed"
  | "update_failed"
  | "invalid_channel_id"
  | "invalid_body"
  | "too_many_requests"
  | "unknown";

export interface ReclaimState {
  step: ReclaimStep;
  isMember: boolean | null;
  code: string;
  tier: string;
  error: ReclaimError | null;
  isLoading: boolean;
}
