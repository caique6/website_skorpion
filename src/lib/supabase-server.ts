import { createClient } from "@supabase/supabase-js";

// Este arquivo só pode ser usado em código server-side (Server Components, API Routes, Services).
// Nunca importe aqui em Client Components ("use client") — use supabase-client.ts para isso.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// cache: "no-store" garante que o Next.js 14 nunca cache as queries do Supabase,
// mesmo em modo de desenvolvimento onde o fetch cache pode reter respostas antigas.
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  global: {
    fetch: (url, options = {}) =>
      fetch(url, { ...options, cache: "no-store" }),
  },
});

const AVATAR_BUCKET = "avatars";
const AVATAR_FALLBACK = "🦂";

/**
 * Gera a URL pública de um avatar armazenado no bucket "avatars".
 * Trata os três formatos possíveis do campo avatar_url:
 *  - URL completa  → retorna como está
 *  - Path com prefixo do bucket (ex: "avatars/file.jpg") → remove o prefixo
 *  - Apenas o nome/path do arquivo (ex: "abc123.jpg") → usa diretamente
 */
export function getAvatarPublicUrl(avatarPath: string | null | undefined): string {
  if (!avatarPath) return AVATAR_FALLBACK;
  if (avatarPath.startsWith("http")) return avatarPath;
  const cleanPath = avatarPath.replace(new RegExp(`^${AVATAR_BUCKET}/`), "");
  const { data } = supabaseServer.storage.from(AVATAR_BUCKET).getPublicUrl(cleanPath);
  return data.publicUrl;
}
