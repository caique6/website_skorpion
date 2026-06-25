import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, HOUR_MS } from "@/lib/rate-limit";
import {
  liveMessageFailure,
  validateLiveMessage,
} from "@/features/livemessage/services/live-message.service";

export const dynamic = "force-dynamic";

const CODE_PATTERN = /^SKORP-[A-Z0-9]{4}-[A-Z0-9]{4}$/i;
const MAX_ATTEMPTS = 8;

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!(await checkRateLimit(`live_validate:ip:${ip}`, MAX_ATTEMPTS, HOUR_MS))) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";

  if (!CODE_PATTERN.test(code)) {
    return NextResponse.json({ error: "invalid_code" }, { status: 422 });
  }

  const result = await validateLiveMessage(code);

  if (result.ok) {
    return NextResponse.json(
      { tier: result.tier, memberAvatarUrl: result.memberAvatarUrl },
      { status: 200 },
    );
  }
  return liveMessageFailure(result);
}
