"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { verifySession } from "@/lib/action/verifySession";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const grantCredits = useMutation(api.user.grantCredits);
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    async function run() {
      if (!sessionId) {
        setStatus("error");
        return;
      }
      try {
        const { email, credits } = await verifySession(sessionId);
        await grantCredits({ email, credits, sessionId });
        setStatus("done");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }

    run();
  }, [sessionId, grantCredits]);

  return (
    <div className="p-6 text-white text-center">
      {status === "loading" && (
        <>
          <p className="text-3xl mb-4">⏳ Finalizing your purchase...</p>
          <Link href="/dashboard" className="inline-flex items-center hover:underline">
            <ArrowLeft className="mr-1" /> Go Back to Home
          </Link>
        </>
      )}
      {status === "done" && (
        <>
          <p className="text-3xl mb-4">✅ Credits added successfully!</p>
          <Link href="/dashboard" className="inline-flex items-center hover:underline">
            <ArrowLeft className="mr-1" /> Go Back to Home
          </Link>
        </>
      )}
      {status === "error" && (
        <>
          <p className="text-3xl mb-4">❌ Something went wrong. Please contact support.</p>
          <Link href="/dashboard" className="inline-flex items-center hover:underline">
            <ArrowLeft className="mr-1" /> Go Back to Home
          </Link>
        </>
      )}
    </div>
  );
}
