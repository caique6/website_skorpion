import { NextResponse } from "next/server";
import { supabaseServer, getAvatarPublicUrl } from "@/lib/supabase";

export interface ValidateSuccess {
  ok: true;
  tier: string;
  memberAvatarUrl: string | null;
}

export interface SendSuccess {
  ok: true;
}

export interface CooldownResult {
  ok: false;
  reason: "cooldown";
  remainingMs: number;
}

export interface ErrorResult {
  ok: false;
  reason: "error";
  error: string;
}

export type ValidateResult = ValidateSuccess | CooldownResult | ErrorResult;
export type SendResult = SendSuccess | CooldownResult | ErrorResult;

const resolveAvatar = (raw: string | null): string | null =>
  raw ? getAvatarPublicUrl(raw) : null;

export async function validateLiveMessage(code: string): Promise<ValidateResult> {
  const { data, error } = await supabaseServer.rpc("live_message_validate", {
    p_code: code,
  });

  if (error || !data) return { ok: false, reason: "error", error: "unknown" };

  const result = data as ValidateResult;
  if (result.ok) {
    return {
      ok: true,
      tier: result.tier,
      memberAvatarUrl: resolveAvatar(result.memberAvatarUrl),
    };
  }
  return result;
}

export async function sendLiveMessage(
  code: string,
  name: string,
  message: string,
): Promise<SendResult> {
  const { data, error } = await supabaseServer.rpc("live_message_send", {
    p_code: code,
    p_name: name,
    p_message: message,
  });

  if (error || !data) return { ok: false, reason: "error", error: "unknown" };
  return data as SendResult;
}

export function liveMessageFailure(result: CooldownResult | ErrorResult): NextResponse {
  if (result.reason === "cooldown") {
    return NextResponse.json({ remainingMs: result.remainingMs }, { status: 429 });
  }
  return NextResponse.json({ error: result.error }, { status: 422 });
}
