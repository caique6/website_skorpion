const STORAGE_KEY = "skorpion-intro-date";

const todayKey = (): string => new Date().toISOString().slice(0, 10);

export const hasSeenIntroToday = (): boolean => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === todayKey();
  } catch {
    return false;
  }
};

export const markIntroSeenToday = (): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, todayKey());
  } catch {
    return;
  }
};
