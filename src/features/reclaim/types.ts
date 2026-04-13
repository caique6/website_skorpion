export type ReclaimStep = 1 | 2 | 3 | 4;

export type ReclaimError = "member_not_found" | "update_failed" | "unauthorized" | "unknown";

export interface ReclaimState {
  step: ReclaimStep;
  isMember: boolean | null;
  code: string;
  tier: string;
  error: ReclaimError | null;
  isLoading: boolean;
}