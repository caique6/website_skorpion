import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase'

const STORAGE_BASE      = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars`
const MAX_CACHE_ENTRIES = 500

const imageCache    = new Map<string, { buffer: ArrayBuffer; contentType: string }>()
const fallbackCache = new Map<string, string | null>()

function evictIfFull(cache: Map<string, unknown>): void {
  if (cache.size >= MAX_CACHE_ENTRIES) {
    cache.delete(cache.keys().next().value!)
  }
}

async function fetchImage(url: string): Promise<{ buffer: ArrayBuffer; contentType: string } | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const contentType = res.headers.get('content-type') ?? ''
    if (!contentType.startsWith('image/')) return null
    return { buffer: await res.arrayBuffer(), contentType }
  } catch {
    return null
  }
}

async function resolveFallbackUrl(memberId: string): Promise<string | null> {
  const cached = fallbackCache.get(memberId)
  if (cached !== undefined) return cached

  const { data } = await supabaseServer
    .from('members')
    .select('avatar_url')
    .eq('id', memberId)
    .maybeSingle()

  const raw = data?.avatar_url ?? null

  // Se já está no novo formato — não há fallback real
  const url = raw && raw !== `${memberId}.jpg`
    ? (raw.startsWith('http') ? raw : `${STORAGE_BASE}/${raw}`)
    : null

  evictIfFull(fallbackCache)
  fallbackCache.set(memberId, url)
  return url
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cached = imageCache.get(params.id)
  if (cached) {
    return new NextResponse(cached.buffer, {
      headers: { 'Content-Type': cached.contentType, 'Cache-Control': 'public, max-age=604800, immutable' },
    })
  }

  // Caminho rápido: arquivo já migrado para UUID
  let result = await fetchImage(`${STORAGE_BASE}/${params.id}.jpg`)

  // Fallback: membro ainda não migrado — usa avatar_url original do banco
  if (!result) {
    const fallbackUrl = await resolveFallbackUrl(params.id)
    if (fallbackUrl) result = await fetchImage(fallbackUrl)
  }

  if (!result) return new NextResponse(null, { status: 404 })

  evictIfFull(imageCache)
  imageCache.set(params.id, result)

  return new NextResponse(result.buffer, {
    headers: { 'Content-Type': result.contentType, 'Cache-Control': 'public, max-age=604800, immutable' },
  })
}
