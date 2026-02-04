"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFlow } from "@/components/FlowProvider";
import { KeyRound, LayoutDashboard } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function AccessPage() {
  const router = useRouter();
  const { state } = useFlow();
  const storedCode = state.generatedAccessCode;

  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase().replace(/\s/g, "");
    if (!trimmed) return;

    const isValid =
      storedCode && trimmed === storedCode.toUpperCase();

    if (isValid) {
      setStatus("success");
      setMessage("Access confirmed. Taking you to your dashboard...");
      setTimeout(() => router.push("/dashboard"), 600);
    } else if (storedCode) {
      setStatus("error");
      setMessage(
        "That code doesn't match. Please check and try again, or use the code from your completion screen.",
      );
    } else {
      setStatus("error");
      setMessage(
        "Please complete the hiring request flow first to receive your access code. Start from the homepage.",
      );
    }
  }

  return (
    <div className="mx-auto flex min-h-full flex-1 flex-col justify-center py-8">
      <div className="mx-auto w-full max-w-md space-y-10">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 shadow-md">
          <KeyRound className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-stone-900 sm:text-3xl">
          Enter your access code
        </h1>
        <p className="mt-2 text-sm text-stone-600">
          Paste the code you received after completing your hiring request.
          This keeps your talent dashboard secure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <label className="mb-2 block text-sm font-semibold text-stone-700">
            Access code
          </label>
          <input
            autoComplete="one-time-code"
            inputMode="text"
            className="w-full rounded-xl border-2 border-stone-200 bg-stone-50/50 px-5 py-4 font-mono text-lg tracking-[0.25em] placeholder:tracking-normal focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/15"
            placeholder="GCC-9X28A"
            value={code}
            onChange={(e) =>
              setCode(e.target.value.toUpperCase().replace(/\s/g, ""))
            }
            onPaste={(e) => {
              const pasted = e.clipboardData
                .getData("text")
                .toUpperCase()
                .replace(/\s/g, "");
              setCode(pasted);
            }}
          />
          <p className="mt-2 text-xs text-stone-500">
            Paste your code—we&apos;ll format it for you.
          </p>
        </Card>

        {message && (
          <p
            className={`rounded-xl px-4 py-3 text-sm font-medium ${
              status === "error"
                ? "bg-red-50 text-red-700"
                : "bg-orange-50 text-orange-800"
            }`}
            aria-live="polite"
          >
            {message}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!code.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl disabled:opacity-50"
          >
            <LayoutDashboard className="h-5 w-5" />
            Continue to dashboard
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
