import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { generateCode } from "@/features/reclaim/utils/generateCode";
import { checkRateLimit, HOUR_MS, DAY_MS } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const CHANNEL_ID_PATTERN = /^UC[a-zA-Z0-9_-]{22}$/;
const MAX_ATTEMPTS = 5;
const MAX_CODE_VIEWS = 3;

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!(await checkRateLimit(`redeem:ip:${ip}`, MAX_ATTEMPTS, HOUR_MS))) {
    return NextResponse.json(
      { error: "too_many_requests", message: "Muitas tentativas. Tente novamente em 1 hora." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);

  if (!body || typeof body.channelId !== "string") {
    return NextResponse.json({ error: "invalid_body", message: "Requisição inválida." }, { status: 400 });
  }

  const channelId = body.channelId.trim();

  if (!CHANNEL_ID_PATTERN.test(channelId)) {
    return NextResponse.json(
      { error: "invalid_channel_id", message: "Channel ID inválido. Deve começar com UC seguido de 22 caracteres." },
      { status: 400 }
    );
  }

  if (!(await checkRateLimit(`redeem:channel:${channelId}`, MAX_ATTEMPTS, HOUR_MS))) {
    return NextResponse.json(
      { error: "too_many_requests", message: "Muitas tentativas para este canal. Tente novamente em 1 hora." },
      { status: 429 }
    );
  }

  const { data: member, error: fetchError } = await supabaseServer
    .from("members")
    .select("id, tier, phone, redemption_code, is_active")
    .eq("channel_id", channelId)
    .single();

  if (fetchError || !member) {
    return NextResponse.json(
      { error: "member_not_found", message: "Canal não encontrado. Verifique se você é membro do canal e se o Channel ID está correto." },
      { status: 404 }
    );
  }

  if (!member.is_active) {
    return NextResponse.json(
      { error: "member_inactive", message: "Sua assinatura não está ativa. Renove seu membership no YouTube para resgatar os benefícios." },
      { status: 403 }
    );
  }

  if (member.tier === "skorpionzinho") {
    return NextResponse.json(
      { error: "tier_not_eligible", message: "O plano Skorpionzinho não inclui acesso a grupos de WhatsApp. Faça upgrade para Skorpião ou Skorpionário para ter esse benefício." },
      { status: 403 }
    );
  }

  if (member.phone) {
    return NextResponse.json(
      { error: "already_redeemed", message: "Seu acesso ao WhatsApp já foi resgatado anteriormente." },
      { status: 409 }
    );
  }

  if (!(await checkRateLimit(`code_view:${channelId}`, MAX_CODE_VIEWS, DAY_MS))) {
    return NextResponse.json(
      { error: "too_many_requests", message: "Limite de visualizações atingido. Entre em contato com o suporte." },
      { status: 429 }
    );
  }

  if (member.redemption_code) {
    return NextResponse.json({ code: member.redemption_code, tier: member.tier });
  }

  const code = generateCode();

  const { error: updateError } = await supabaseServer
    .from("members")
    .update({ redemption_code: code })
    .eq("id", member.id);

  if (updateError) {
    return NextResponse.json(
      { error: "update_failed", message: "Erro ao gerar seu código. Tente novamente." },
      { status: 500 }
    );
  }

  return NextResponse.json({ code, tier: member.tier });
}
