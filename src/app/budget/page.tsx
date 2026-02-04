"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFlow } from "@/components/FlowProvider";
import { ArrowRight, Coins, FileText, UserPlus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { generateDummyAccessCode } from "@/lib/dummyData";

const ANNUAL_BUDGET_OPTIONS = [
  { value: "under-10", label: "Under ₹10L", desc: "Annual budget" },
  { value: "10-25", label: "₹10L – ₹25L", desc: "Annual budget" },
  { value: "25-50", label: "₹25L – ₹50L", desc: "Annual budget" },
  { value: "50-100", label: "₹50L – ₹1Cr", desc: "Annual budget" },
  { value: "100-plus", label: "₹1Cr+", desc: "Annual budget" },
];

const ENGAGEMENT_OPTIONS = [
  { value: "Full-time", label: "Full-time", desc: "Dedicated hire" },
  { value: "Contract", label: "Contract", desc: "Project-based" },
];

export default function BudgetPage() {
  const router = useRouter();
  const { state, updateState } = useFlow();

  const [budgetRangeOption, setBudgetRangeOption] = useState(
    state.budgetRangeOption ?? "",
  );
  const [budgetRange, setBudgetRange] = useState(state.budgetRange ?? "");
  const [engagementType, setEngagementType] = useState(
    state.engagementType ?? "Full-time",
  );
  const [notes, setNotes] = useState(state.notes ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = generateDummyAccessCode();
    updateState({
      budgetRangeOption: budgetRangeOption || undefined,
      budgetRange: budgetRange.trim() || undefined,
      engagementType: engagementType || undefined,
      notes: notes.trim() || undefined,
      generatedAccessCode: code,
    });
    router.push("/complete");
  }

  return (
    <div className="space-y-10">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
          <Coins className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            Budget & engagement
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Optional—share only if you&apos;re comfortable. We use this to
            improve relevance.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <label className="mb-4 flex items-center gap-2 text-sm font-semibold text-stone-700">
            <Coins className="h-5 w-5 text-orange-600" />
            Annual budget range (optional)
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {ANNUAL_BUDGET_OPTIONS.map((opt) => {
              const isActive = budgetRangeOption === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setBudgetRangeOption(opt.value)}
                  className={`flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all sm:p-5 ${
                    isActive
                      ? "border-orange-500 bg-orange-50 shadow-md ring-2 ring-orange-500/20"
                      : "border-stone-200 bg-white hover:border-orange-200 hover:bg-orange-50/30"
                  }`}
                >
                  <span className="font-semibold text-stone-900">
                    {opt.label}
                  </span>
                  <span className="mt-0.5 text-xs text-stone-500">
                    {opt.desc}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-stone-500">
            Or specify in your own words below (optional).
          </p>
          <input
            className="mt-3 w-full rounded-xl border-2 border-stone-200 bg-stone-50/50 px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/15"
            placeholder="E.g. ₹2L–₹2.5L per month (optional)"
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
          />
        </Card>

        <Card>
          <label className="mb-4 flex items-center gap-2 text-sm font-semibold text-stone-700">
            <UserPlus className="h-5 w-5 text-orange-600" />
            Preferred engagement type?
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {ENGAGEMENT_OPTIONS.map((opt) => {
              const isActive = engagementType === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setEngagementType(opt.value)}
                  className={`flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all sm:p-5 ${
                    isActive
                      ? "border-orange-500 bg-orange-50 shadow-md ring-2 ring-orange-500/20"
                      : "border-stone-200 bg-white hover:border-orange-200 hover:bg-orange-50/30"
                  }`}
                >
                  <span className="font-semibold text-stone-900">
                    {opt.label}
                  </span>
                  <span className="mt-0.5 text-xs text-stone-500">
                    {opt.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        <Card>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-700">
            <FileText className="h-5 w-5 text-orange-600" />
            Any additional expectations you&apos;d like us to know?
          </label>
          <textarea
            className="mt-2 min-h-[120px] w-full rounded-xl border-2 border-stone-200 bg-stone-50/50 px-4 py-3.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/15"
            placeholder="Optional—constraints, stakeholders, or notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Card>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl"
          >
            Submit & get access code
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
