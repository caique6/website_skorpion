import { PlansSectionContent } from "../types";
import { PLANS_SECTION } from "../data/plans-section";

export const getPlansContent = async (): Promise<PlansSectionContent> =>
  PLANS_SECTION;
