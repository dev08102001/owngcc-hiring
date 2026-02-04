"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const FORM_STEPS = [
  { path: "/start", step: 1, label: "Company" },
  { path: "/role", step: 2, label: "Role" },
  { path: "/preferences", step: 3, label: "Preferences" },
  { path: "/budget", step: 4, label: "Budget" },
] as const;

const TOTAL_STEPS = 5;

function getFormStep(pathname: string): (typeof FORM_STEPS)[number] | null {
  const match = FORM_STEPS.find((s) => pathname.startsWith(s.path));
  return match ? match : null;
}

function isMinimalHeader(pathname: string) {
  return pathname === "/" || pathname === "/access" || pathname === "/dashboard";
}

export function ProgressShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const formStep = getFormStep(pathname);
  const minimal = isMinimalHeader(pathname);
  const isDashboard = pathname === "/dashboard";
  const isHome = pathname === "/";
  const fullWidth = isDashboard || isHome;

  return (
    <div className="flex min-h-screen flex-1 flex-col w-full bg-gradient-to-b from-orange-50/50 via-stone-50 to-orange-50/30 text-stone-900">
      <div
        className={`flex min-h-0 flex-1 flex-col px-4 py-4 sm:px-6 lg:px-10 ${
          fullWidth ? "w-full max-w-full" : "mx-auto w-[80%] max-w-[90rem]"
        }`}
      >
        <header className="flex shrink-0 items-center justify-between rounded-xl border border-orange-200/60 bg-white/90 px-4 py-2.5 shadow-sm backdrop-blur-sm">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg transition-opacity hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md">
              <span className="text-sm font-bold">O</span>
            </div>
            <div>
              <span className="text-sm font-semibold tracking-tight text-stone-900">
                OwnGCC Talent Center
              </span>
              <p className="text-[10px] text-stone-500">Guided hiring</p>
            </div>
          </Link>
        </header>

        {formStep !== null && (
          <div className="mt-3 shrink-0 rounded-xl border border-orange-200/60 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Step {formStep.step} of {TOTAL_STEPS}
              </p>
              <span className="text-xs font-medium text-orange-600">
                {formStep.label}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => {
                const isDone = i + 1 < formStep.step;
                const isCurrent = i + 1 === formStep.step;
                return (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      isDone
                        ? "bg-orange-500"
                        : isCurrent
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 shadow-sm"
                          : "bg-stone-200"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}

        <main className="flex min-h-0 flex-1 flex-col pt-4">
          <div
            className={`flex flex-col overflow-auto ${
              isHome || isDashboard
                ? "min-h-[calc(100vh-8rem)] flex-1 rounded-none border-0 bg-transparent p-0 shadow-none"
                : "min-h-0 flex-1 rounded-2xl border border-orange-200/50 bg-white p-6 shadow-md sm:p-8 lg:p-10"
            }`}
          >
            {children}
          </div>
        </main>

        {!minimal && (
          <footer className="mt-4 shrink-0 rounded-xl border border-orange-200/50 bg-white/70 px-4 py-2.5 text-center text-xs text-stone-500 backdrop-blur-sm">
            OwnGCC Talent Center — Guided hiring for offshore talent
          </footer>
        )}
      </div>
    </div>
  );
}
