import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

const ALLOWED_HOSTNAME = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).hostname

const urlCache = new Map<string, string | null>()

async function resolveAvatarUrl(memberId: string): Promise<string | null> {
  const cached = urlCache.get(memberId)
  if (cached !== undefined) return cached

  const { data } = await supabaseServer
    .from('members')
    .select('avatar_url')
    .eq('id', memberId)
    .maybeSingle()

  const url = data?.avatar_url ?? null
  urlCache.set(memberId, url)
  return url
}

function isSafeAvatarUrl(raw: string): boolean {
  try {
    const { hostname, protocol } = new URL(raw)
    return protocol === 'https:' && hostname === ALLOWED_HOSTNAME
  } catch {
    return false
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const avatarUrl = await resolveAvatarUrl(params.id)

  if (!avatarUrl) return new NextResponse(null, { status: 404 })

  if (!isSafeAvatarUrl(avatarUrl)) return new NextResponse(null, { status: 403 })

  const upstream = await fetch(avatarUrl)
  if (!upstream.ok) return new NextResponse(null, { status: 502 })

  const contentType = upstream.headers.get('content-type') ?? ''
  if (!contentType.startsWith('image/')) return new NextResponse(null, { status: 415 })

  const buffer = await upstream.arrayBuffer()

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=604800, immutable',
    },
  })
}
