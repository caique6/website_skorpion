import { ReclaimFlow } from "@/features/reclaim/components/ReclaimFlow";
import { SessionProvider } from "@/components/SessionProvider";

export default function ReclaimPage() {
  return (
    <SessionProvider>
      <ReclaimFlow />
    </SessionProvider>
  );
}