import { MembersData } from "../types";
import { MEMBERS_MOCK } from "../data/mock";

export const getMembersData = async (): Promise<MembersData> => {
  return Promise.resolve(MEMBERS_MOCK);
};