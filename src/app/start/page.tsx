"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFlow } from "@/components/FlowProvider";
import { ArrowRight, MessageCircle } from "lucide-react";

const QUESTIONS = [
  {
    key: "companyName" as const,
    label: "Let's start simple. What's your company name?",
    placeholder: "E.g. Acme Inc",
  },
  {
    key: "location" as const,
    label: "Where is your company located?",
    placeholder: "City, Country",
  },
  {
    key: "contactPerson" as const,
    label: "Who should we contact regarding hiring?",
    placeholder: "Full name",
  },
  {
    key: "email" as const,
    label: "What's the best email to reach you?",
    placeholder: "you@company.com",
    type: "email" as const,
  },
];

export default function StartPage() {
  const router = useRouter();
  const { state, updateState } = useFlow();
  const [step, setStep] = useState(0);
  const [companyName, setCompanyName] = useState(state.companyName ?? "");
  const [location, setLocation] = useState(state.location ?? "");
  const [contactPerson, setContactPerson] = useState(state.contactPerson ?? "");
  const [email, setEmail] = useState(state.email ?? "");

  const values = { companyName, location, contactPerson, email };
  const setValues = {
    companyName: setCompanyName,
    location: setLocation,
    contactPerson: setContactPerson,
    email: setEmail,
  };

  const current = QUESTIONS[step];
  const currentValue = values[current.key];
  const setCurrentValue = setValues[current.key];

  function handleNext() {
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1);
    } else {
      updateState({
        companyName: companyName.trim() || undefined,
        location: location.trim() || undefined,
        contactPerson: contactPerson.trim() || undefined,
        email: email.trim() || undefined,
      });
      router.push("/role");
    }
  }

  const canProceed = String(currentValue).trim().length > 0;

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center py-8">
      <div className="mx-auto w-full max-w-xl space-y-12 text-center">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <MessageCircle className="h-8 w-8" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl md:text-4xl">
            {current.label}
          </h1>
          <p className="mt-3 text-base text-stone-500">
            We use this to personalize your experience and match you with the
            right talent.
          </p>
        </div>

        <div className="space-y-8">
          <input
            type={current.type ?? "text"}
            autoFocus
            className="w-full rounded-xl border-2 border-stone-200 bg-stone-50/50 px-6 py-4 text-lg text-stone-900 placeholder:text-stone-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-500/15"
            placeholder={current.placeholder}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && canProceed && handleNext()}
          />
          <div className="flex items-center justify-between">
            <span className="text-sm text-stone-400">
              Question {step + 1} of {QUESTIONS.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-orange-600 hover:shadow-xl disabled:opacity-50"
            >
              Next
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
