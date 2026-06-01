import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { data } = await supabaseServer
    .from('members')
    .select('avatar_url')
    .eq('id', params.id)
    .maybeSingle()

  if (!data?.avatar_url) return new NextResponse(null, { status: 404 })

  const upstream = await fetch(data.avatar_url)
  if (!upstream.ok) return new NextResponse(null, { status: 404 })

  const buffer = await upstream.arrayBuffer()

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': upstream.headers.get('content-type') ?? 'image/jpeg',
      'Cache-Control': 'public, max-age=604800, immutable',
    },
  })
}
