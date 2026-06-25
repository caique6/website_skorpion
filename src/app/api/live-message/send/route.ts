import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, HOUR_MS } from "@/lib/rate-limit";
import {
  liveMessageFailure,
  sendLiveMessage,
} from "@/features/livemessage/services/live-message.service";

export const dynamic = "force-dynamic";

const CODE_PATTERN = /^SKORP-[A-Z0-9]{4}-[A-Z0-9]{4}$/i;
const MAX_ATTEMPTS = 8;

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!(await checkRateLimit(`live_send:ip:${ip}`, MAX_ATTEMPTS, HOUR_MS))) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!CODE_PATTERN.test(code)) {
    return NextResponse.json({ error: "invalid_code" }, { status: 422 });
  }
  if (!name) {
    return NextResponse.json({ error: "name_required" }, { status: 422 });
  }
  if (!message) {
    return NextResponse.json({ error: "message_required" }, { status: 422 });
  }

  const result = await sendLiveMessage(code, name, message);

  if (result.ok) {
    return NextResponse.json({ success: true }, { status: 200 });
  }
  return liveMessageFailure(result);
}
