export const generateCode = (): string => {
  const prefix = "SKORP";
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const segments = Array.from({ length: 2 }, () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  );
  return `${prefix}-${segments.join("-")}`;
};