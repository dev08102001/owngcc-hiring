"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFlow } from "@/components/FlowProvider";
import { ArrowRight, Clock, Globe2, Video } from "lucide-react";
import { Card } from "@/components/ui/Card";

const WORKING_HOURS = [
  { value: "India", label: "India", desc: "IST time zone" },
  { value: "US", label: "US", desc: "EST / PST" },
  { value: "UK", label: "UK", desc: "GMT / BST" },
];

const INTERVIEW_MODES = [
  { value: "Video", label: "Video", desc: "Video call" },
  { value: "Audio", label: "Audio", desc: "Phone / audio" },
];

const JOINING_OPTIONS = [
  { value: "Immediate", label: "Immediate" },
  { value: "15 days", label: "15 days" },
  { value: "30 days", label: "30 days" },
  { value: "Other", label: "Other" },
];

function OptionTile({
  icon: Icon,
  label,
  desc,
  isActive,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  desc?: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all sm:p-5 ${
        isActive
          ? "border-orange-500 bg-orange-50 shadow-md ring-2 ring-orange-500/20"
          : "border-stone-200 bg-white hover:border-orange-200 hover:bg-orange-50/30"
      }`}
    >
      <div
        className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${
          isActive ? "bg-orange-100 text-orange-600" : "bg-stone-100 text-stone-600"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span className="font-semibold text-stone-900">{label}</span>
      {desc && (
        <span className="mt-0.5 text-xs text-stone-500">{desc}</span>
      )}
    </button>
  );
}

export default function PreferencesPage() {
  const router = useRouter();
  const { state, updateState } = useFlow();

  const [workingHours, setWorkingHours] = useState(
    state.workingHours ?? "India",
  );
  const [interviewMode, setInterviewMode] = useState(
    state.interviewMode ?? "Video",
  );
  const [joiningTimeline, setJoiningTimeline] = useState(
    state.joiningTimeline ?? "Immediate",
  );
  const [joiningCustom, setJoiningCustom] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const effectiveTimeline =
      joiningTimeline === "Other" && joiningCustom.trim()
        ? joiningCustom.trim()
        : joiningTimeline;
    updateState({
      workingHours: workingHours || undefined,
      interviewMode: interviewMode || undefined,
      joiningTimeline: effectiveTimeline || undefined,
    });
    router.push("/budget");
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
          Working preferences
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          A few quick choices so we can match you with talent that fits your
          rhythm.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <label className="mb-4 flex items-center gap-2 text-sm font-semibold text-stone-700">
            <Globe2 className="h-5 w-5 text-orange-600" />
            Preferred working hours
          </label>
          <div className="grid gap-3 sm:grid-cols-3">
            {WORKING_HOURS.map((opt) => (
              <OptionTile
                key={opt.value}
                icon={Globe2}
                label={opt.label}
                desc={opt.desc}
                isActive={workingHours === opt.value}
                onClick={() => setWorkingHours(opt.value)}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-stone-500">
            We&apos;ll look for candidates who can align with this time zone.
          </p>
        </Card>

        <Card>
          <label className="mb-4 flex items-center gap-2 text-sm font-semibold text-stone-700">
            <Video className="h-5 w-5 text-orange-600" />
            Interview mode
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            {INTERVIEW_MODES.map((opt) => (
              <OptionTile
                key={opt.value}
                icon={Video}
                label={opt.label}
                desc={opt.desc}
                isActive={interviewMode === opt.value}
                onClick={() => setInterviewMode(opt.value)}
              />
            ))}
          </div>
        </Card>

        <Card>
          <label className="mb-4 flex items-center gap-2 text-sm font-semibold text-stone-700">
            <Clock className="h-5 w-5 text-orange-600" />
            Joining timeline
          </label>
          <div className="flex flex-wrap gap-2">
            {JOINING_OPTIONS.map((opt) => {
              const isActive = joiningTimeline === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setJoiningTimeline(opt.value)}
                  className={`rounded-xl border-2 px-4 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "border-orange-500 bg-orange-500 text-white shadow-md"
                      : "border-stone-200 bg-white text-stone-700 hover:border-orange-200 hover:bg-orange-50"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          {joiningTimeline === "Other" && (
            <input
              className="mt-4 w-full rounded-xl border-2 border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/15"
              placeholder="E.g. 45 days, Q2"
              value={joiningCustom}
              onChange={(e) => setJoiningCustom(e.target.value)}
            />
          )}
          <p className="mt-3 text-xs text-stone-500">
            Helps us propose realistic options.
          </p>
        </Card>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl"
          >
            Next
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
