"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Heart,
  UserCircle2,
  Video,
  Info,
  Users,
  FolderKanban,
  Filter,
  MapPin,
  Clock,
} from "lucide-react";
import { useFlow } from "@/components/FlowProvider";
import {
  getCandidatesForRole,
  type DummyCandidate,
} from "@/lib/dummyData";

const AVAILABILITY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "Immediate", label: "Immediate" },
  { value: "15 days", label: "15 days" },
  { value: "30 days", label: "30 days" },
];

export default function DashboardPage() {
  const { state } = useFlow();
  const selectedRole = state.role ?? "";

  const [shortlisted, setShortlisted] = useState<number[]>([]);
  const [interviewRequested, setInterviewRequested] = useState<number[]>([]);
  const [filterReadyToShift, setFilterReadyToShift] = useState<boolean | null>(
    null,
  );
  const [filterAvailability, setFilterAvailability] = useState<string>("all");

  const candidatesForRole = useMemo(
    () => getCandidatesForRole(selectedRole),
    [selectedRole],
  );

  const filteredCandidates = useMemo(() => {
    let list = candidatesForRole;
    if (filterReadyToShift === true) {
      list = list.filter((c) => c.readyToRelocate);
    }
    if (filterReadyToShift === false) {
      list = list.filter((c) => !c.readyToRelocate);
    }
    if (filterAvailability !== "all") {
      list = list.filter((c) => c.availability === filterAvailability);
    }
    return list;
  }, [candidatesForRole, filterReadyToShift, filterAvailability]);

  function toggleShortlist(id: number) {
    setShortlisted((current) =>
      current.includes(id) ? current.filter((c) => c !== id) : [...current, id],
    );
  }

  function toggleInterviewRequest(id: number) {
    setInterviewRequested((current) =>
      current.includes(id) ? current.filter((c) => c !== id) : [...current, id],
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-stone-50">
      {/* Header strip — clear title and role */}
      <div className="shrink-0 border-b border-stone-200 bg-white px-4 py-5 shadow-sm sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[90rem]">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
              <Users className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
                Talent Dashboard
              </h1>
              <p className="mt-1 text-base text-stone-600">
                Matched profiles for
                {selectedRole ? (
                  <span className="font-semibold text-orange-600"> {selectedRole}</span>
                ) : (
                  " your selected role"
                )}
                — shortlist and request interviews at your pace.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info banner */}
      <div className="shrink-0 border-b border-stone-200 bg-orange-50/70 px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[90rem] items-start gap-3">
          <Info className="h-5 w-5 shrink-0 text-orange-600" />
          <p className="text-sm font-medium text-stone-800">
            <strong>Demo data.</strong> Candidates shown match the role you selected
            {selectedRole ? ` (${selectedRole})` : ""}. In production you would see real profiles.
          </p>
        </div>
      </div>

      {/* Filters — sticky for clarity */}
      <div className="sticky top-0 z-10 shrink-0 border-b border-stone-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[90rem]">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2 text-sm font-semibold text-stone-800">
              <Filter className="h-4 w-4 text-orange-600" />
              Quick filters
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-stone-600">Ready to shift:</span>
              {([null, true, false] as const).map((value) => (
                <button
                  key={String(value)}
                  type="button"
                  onClick={() => setFilterReadyToShift(value)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border-2 px-4 py-2.5 text-sm font-medium transition-all ${
                    filterReadyToShift === value
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-stone-200 bg-white text-stone-700 hover:border-orange-200"
                  }`}
                >
                  <MapPin className="h-4 w-4" />
                  {value === null ? "All" : value ? "Yes" : "No"}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-stone-600">Availability:</span>
              {AVAILABILITY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFilterAvailability(opt.value)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border-2 px-4 py-2.5 text-sm font-medium transition-all ${
                    filterAvailability === opt.value
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-stone-200 bg-white text-stone-700 hover:border-orange-200"
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Candidate grid — full width, clear cards */}
      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[90rem] flex-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredCandidates.length === 0 ? (
          <div className="col-span-full rounded-2xl border-2 border-dashed border-stone-300 bg-white py-20 text-center shadow-inner">
            <p className="text-lg font-semibold text-stone-700">
              No candidates match the selected role and filters.
            </p>
            <p className="mt-3 text-base text-stone-600">
              Try changing filters or select a different role when starting a new hiring request.
            </p>
          </div>
        ) : (
          filteredCandidates.map((candidate) => {
            const isShortlisted = shortlisted.includes(candidate.id);
            const interviewRequestedFor = interviewRequested.includes(
              candidate.id,
            );
            return (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                isShortlisted={isShortlisted}
                interviewRequestedFor={interviewRequestedFor}
                onToggleShortlist={() => toggleShortlist(candidate.id)}
                onToggleInterview={() => toggleInterviewRequest(candidate.id)}
              />
            );
          })
        )}
        </div>

        <div className="mt-8 flex justify-between border-t border-stone-200 pt-6">
          <Link
            href="/"
            className="rounded-xl border-2 border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 shadow-sm transition-all hover:border-orange-200 hover:bg-orange-50 hover:text-stone-900"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function CandidateCard({
  candidate,
  isShortlisted,
  interviewRequestedFor,
  onToggleShortlist,
  onToggleInterview,
}: {
  candidate: DummyCandidate;
  isShortlisted: boolean;
  interviewRequestedFor: boolean;
  onToggleShortlist: () => void;
  onToggleInterview: () => void;
}) {
  return (
    <article className="flex flex-col rounded-2xl border-2 border-stone-200 bg-white p-6 shadow-lg transition-all duration-200 hover:border-orange-300 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 ring-2 ring-orange-200/80">
            <UserCircle2 className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <h2 className="break-words text-xl font-bold text-stone-900">
              {candidate.name}
            </h2>
            <p className="break-words text-base font-semibold text-orange-600">
              {candidate.role}
            </p>
            <p className="text-base text-stone-600">
              {candidate.experience} years experience
            </p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-stone-500">
              <span>{candidate.availability}</span>
              {candidate.readyToRelocate && (
                <span className="inline-flex items-center gap-0.5 rounded-full bg-orange-100 px-2 py-0.5 font-medium text-orange-700">
                  <MapPin className="h-3.5 w-3.5" />
                  Ready to shift
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="shrink-0 rounded-xl bg-stone-100 px-4 py-2.5 text-right">
          <p className="text-lg font-bold text-stone-900">
            ₹{(candidate.monthlyCost / 1000).toFixed(0)}k
          </p>
          <p className="text-xs text-stone-600">/ month</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {candidate.skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex max-w-full break-words rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5 text-sm font-medium text-stone-800"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-xl border-2 border-stone-200 bg-stone-50/80 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-stone-600">
          <FolderKanban className="h-4 w-4 shrink-0 text-orange-500" />
          Project
        </div>
        <p className="break-words text-base leading-relaxed text-stone-800">
          {candidate.project}
        </p>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleShortlist}
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-base font-semibold transition-all ${
            isShortlisted
              ? "border-orange-500 bg-orange-50 text-orange-700 shadow-sm"
              : "border-stone-200 bg-stone-50 text-stone-700 hover:border-orange-200 hover:bg-orange-50"
          }`}
        >
          <Heart
            className={`h-5 w-5 ${
              isShortlisted ? "fill-orange-600 text-orange-600" : ""
            }`}
          />
          {isShortlisted ? "Shortlisted" : "Shortlist"}
        </button>
        <button
          type="button"
          onClick={onToggleInterview}
          className={`inline-flex items-center gap-2 rounded-xl border-2 px-5 py-3 text-base font-semibold transition-all ${
            interviewRequestedFor
              ? "border-orange-500 bg-orange-500 text-white shadow-md"
              : "border-stone-200 bg-white text-stone-700 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-700"
          }`}
        >
          <Video className="h-5 w-5" />
          {interviewRequestedFor ? "Requested" : "Request Interview"}
        </button>
      </div>
    </article>
  );
}
