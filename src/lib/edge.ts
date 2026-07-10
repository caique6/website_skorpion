const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export const edgeFunctionUrl = (name: string): string =>
  `${baseUrl}/functions/v1/${name}`;

export const edgeFunctionHeaders = (): Record<string, string> => ({
  "Content-Type": "application/json",
});
