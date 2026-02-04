"use client";

import Link from "next/link";
import {
  ArrowRight,
  LayoutDashboard,
  Shield,
  Zap,
  Users,
  Target,
} from "lucide-react";
import { useFlow } from "@/components/FlowProvider";

const WHY_OWN_GCC = [
  {
    icon: Users,
    title: "You own your team",
    desc: "Talent works for you, not a vendor.",
  },
  {
    icon: Shield,
    title: "Transparent & vetted",
    desc: "Clear process, curated profiles.",
  },
  {
    icon: Zap,
    title: "Fast, guided hiring",
    desc: "Short steps, no long forms.",
  },
  {
    icon: Target,
    title: "Role-matched talent",
    desc: "Only candidates that fit your brief.",
  },
];

export default function Home() {
  const { state } = useFlow();
  const hasAccessCode = Boolean(state.generatedAccessCode);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <section
        className="relative flex min-h-screen w-full flex-col overflow-auto bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700"
        style={{ minHeight: "100vh" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.2),transparent)]" />

        <div className="relative flex min-h-screen flex-col px-4 py-6 sm:px-6 md:px-10 lg:px-16">
          {/* Top row: badge + CTA buttons always visible */}
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-4">
            <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              OwnGCC Talent Center
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/start"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-orange-600 shadow-lg transition-all hover:bg-orange-50 hover:shadow-xl"
              >
                Start Hiring
                <ArrowRight className="h-5 w-5" />
              </Link>
              {hasAccessCode && (
                <Link
                  href="/access"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/60 bg-white/15 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/25"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Access Talent Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Main content: headline + details */}
          <div className="flex flex-1 flex-col justify-center py-8">
            <h1 className="max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
              What is OwnGCC?
            </h1>

            <div className="mt-6 max-w-2xl space-y-3 text-lg text-white/95">
              <p>
                OwnGCC helps you hire offshore talent through a simple, guided
                process.
              </p>
              <p>
                We connect you with vetted professionals so you can build and
                scale your teams with confidence.
              </p>
              <p>
                One brief, curated profiles, and interviews when you’re ready—you
                stay in control.
              </p>
            </div>

            {/* Why choose OwnGCC */}
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {WHY_OWN_GCC.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/15"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-white/90">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
