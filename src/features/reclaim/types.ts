export type ReclaimStep = 1 | 2 | 3 | 4;

export interface ReclaimState {
  step: ReclaimStep;
  isMember: boolean | null;
  code: string;
}