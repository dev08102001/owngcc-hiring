"use client";

import type { ReactNode } from "react";
import { FlowProvider } from "@/components/FlowProvider";
import { ProgressShell } from "@/components/ProgressShell";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <FlowProvider>
      <div className="flex h-full min-h-screen w-full flex-col">
        <ProgressShell>{children}</ProgressShell>
      </div>
    </FlowProvider>
  );
}

