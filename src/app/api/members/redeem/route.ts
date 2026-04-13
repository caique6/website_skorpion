import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabase";
import { generateCode } from "@/features/reclaim/utils/generateCode";

async function uploadAvatar(imageUrl: string, memberId: string): Promise<string | null> {
  const response = await fetch(imageUrl);
  if (!response.ok) return null;

  const buffer = await response.arrayBuffer();
  const contentType = response.headers.get("content-type") ?? "image/jpeg";
  const extension = contentType.split("/")[1] ?? "jpg";
  const fileName = `${memberId}.${extension}`;

  const { error } = await supabaseServer.storage
    .from("avatars")
    .upload(fileName, buffer, { contentType, upsert: true });

  if (error) return null;

  const { data } = supabaseServer.storage
    .from("avatars")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function POST(_request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.channelId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { channelId, name, email, image } = session.user;

  const { data: member, error: fetchError } = await supabaseServer
    .from("members")
    .select("id, tier, redemption_code")
    .eq("channel_id", channelId)
    .single();

  if (fetchError || !member) {
    return NextResponse.json({ error: "member_not_found" }, { status: 404 });
  }

  if (member.redemption_code) {
    return NextResponse.json({ code: member.redemption_code, tier: member.tier });
  }

  const avatarUrl = image ? await uploadAvatar(image, member.id) : null;
  const code = generateCode();

  const { error: updateError } = await supabaseServer
    .from("members")
    .update({
      name: name ?? undefined,
      avatar_url: avatarUrl ?? undefined,
      redemption_code: code,
      email: email ?? undefined,
    })
    .eq("id", member.id);

  if (updateError) {
    return NextResponse.json({ error: "update_failed" }, { status: 500 });
  }

  return NextResponse.json({ code, tier: member.tier });
}