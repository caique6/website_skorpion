// Re-exportações centralizadas para compatibilidade.
//
// ATENÇÃO: não importe este arquivo em Client Components ("use client").
// Em Client Components, importe diretamente de "@/lib/supabase-client".
// Em Server Components / Services / API Routes, importe de "@/lib/supabase-server".

export { supabaseServer, getAvatarPublicUrl } from "./supabase-server";
export { supabaseClient } from "./supabase-client";
