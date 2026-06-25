import { NextRequest } from "next/server";
import { supabaseServer, getAvatarPublicUrl } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const QUEUE_DELAY_MS = 15_000;
const POLL_INTERVAL_MS = 1_000;
const PING_INTERVAL_MS = 25_000;

type Sender = (event: string, data: unknown) => boolean;

interface ClaimedAlert {
  id: string;
  memberName: string;
  avatarUrl: string | null;
  tier: string;
  message: string;
}

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function claimNext(): Promise<ClaimedAlert | null> {
  const { data } = await supabaseServer.rpc("overlay_claim_next");
  if (!data) return null;
  const alert = data as ClaimedAlert;
  return {
    ...alert,
    avatarUrl: alert.avatarUrl ? getAvatarPublicUrl(alert.avatarUrl) : null,
  };
}

async function runQueue(send: Sender, isClosed: () => boolean): Promise<void> {
  await supabaseServer.rpc("overlay_reset_processing");

  while (!isClosed()) {
    const alert = await claimNext();

    if (!alert) {
      await sleep(POLL_INTERVAL_MS);
      continue;
    }

    send("alert", alert);
    await sleep(QUEUE_DELAY_MS);

    if (isClosed()) break;
    await supabaseServer.rpc("overlay_mark_sent", { p_id: alert.id });
  }
}

export function GET(req: NextRequest) {
  const expectedToken = process.env.LIVE_OVERLAY_TOKEN;
  if (expectedToken && req.nextUrl.searchParams.get("token") !== expectedToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const encoder = new TextEncoder();
  let closed = false;
  let pingInterval: ReturnType<typeof setInterval> | null = null;

  req.signal.addEventListener("abort", () => {
    closed = true;
    if (pingInterval) clearInterval(pingInterval);
  });

  const stream = new ReadableStream({
    start(controller) {
      const send: Sender = (event, data) => {
        if (closed) return false;
        try {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`),
          );
          return true;
        } catch {
          closed = true;
          return false;
        }
      };

      send("ping", { ts: Date.now() });
      pingInterval = setInterval(() => {
        if (!send("ping", { ts: Date.now() })) clearInterval(pingInterval!);
      }, PING_INTERVAL_MS);

      void runQueue(send, () => closed);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
