import { NextRequest, NextResponse } from "next/server";
import { supabaseServer, getAvatarPublicUrl } from "@/lib/supabase";

export const dynamic = "force-dynamic";

interface ClaimedRow {
  id: string;
  memberName: string;
  avatarUrl: string | null;
  tier: string;
  message: string;
}

export async function POST(req: NextRequest) {
  const expected = process.env.LIVE_OVERLAY_TOKEN;
  if (expected && req.nextUrl.searchParams.get("token") !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const action = typeof body.action === "string" ? body.action : null;

  if (action === "reset") {
    await supabaseServer.rpc("overlay_reset_processing");
    return NextResponse.json({ ok: true });
  }

  if (action === "claim") {
    const { data, error } = await supabaseServer.rpc("overlay_claim_next");
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    if (!data) return NextResponse.json(null);

    const row = data as ClaimedRow;
    return NextResponse.json({
      ...row,
      avatarUrl: row.avatarUrl ? getAvatarPublicUrl(row.avatarUrl) : null,
    });
  }

  if (action === "sent") {
    const id = typeof body.id === "string" ? body.id : null;
    if (!id) return NextResponse.json({ error: "invalid" }, { status: 400 });
    await supabaseServer.rpc("overlay_mark_sent", { p_id: id });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "invalid action" }, { status: 400 });
}
