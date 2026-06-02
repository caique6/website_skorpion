import { supabaseServer } from '@/lib/supabase'

const HOUR_MS = 60 * 60 * 1000
const DAY_MS  = 24 * HOUR_MS

export { HOUR_MS, DAY_MS }

export async function checkRateLimit(
  key: string,
  max: number,
  windowMs: number
): Promise<boolean> {
  const now     = new Date()
  const resetAt = new Date(Date.now() + windowMs).toISOString()

  const { data } = await supabaseServer
    .from('rate_limits')
    .select('attempts, reset_at')
    .eq('key', key)
    .maybeSingle()

  if (!data) {
    await supabaseServer.from('rate_limits').insert({ key, attempts: 1, reset_at: resetAt })
    return true
  }

  if (now > new Date(data.reset_at)) {
    await supabaseServer.from('rate_limits').update({ attempts: 1, reset_at: resetAt }).eq('key', key)
    return true
  }

  if (data.attempts >= max) return false

  await supabaseServer.from('rate_limits').update({ attempts: data.attempts + 1 }).eq('key', key)
  return true
}
