import { createClient } from "@supabase/supabase-js";

// Este arquivo é seguro para uso em Client Components ("use client").
// Usa a anon key pública — nunca exponha a service role key no cliente.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
