"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFlow } from "@/components/FlowProvider";
import { CheckCircle2, Copy, LayoutDashboard } from "lucide-react";

export default function CompletePage() {
  const router = useRouter();
  const { state } = useFlow();
  const code = state.generatedAccessCode;
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleAccessDashboard() {
    router.push("/access");
  }

  if (!code) {
    router.replace("/budget");
    return null;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center space-y-10 text-center py-8">
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-xl shadow-orange-500/30">
          <CheckCircle2 className="h-10 w-10" />
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl md:text-4xl">
          Your hiring request has been recorded.
        </h1>
        <p className="mt-3 text-base text-stone-600">
          Use the code below to access your talent dashboard anytime.
        </p>
      </div>

      <div className="rounded-2xl border-2 border-orange-200 bg-gradient-to-b from-orange-50 to-white p-8 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Your access code
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <span className="rounded-xl bg-stone-900 px-6 py-4 font-mono text-2xl font-bold tracking-wider text-white shadow-lg sm:text-3xl">
            {code}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 shadow-sm transition-all hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy code"}
          </button>
        </div>
        <p className="mt-5 text-sm text-stone-500">
          This code has been sent to your email. (Demo confirmation)
        </p>
      </div>

      <button
        type="button"
        onClick={handleAccessDashboard}
        className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-xl transition-all hover:bg-orange-600 hover:shadow-2xl"
      >
        <LayoutDashboard className="h-5 w-5" />
        Access Talent Dashboard
      </button>
    </div>
  );
}
