"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type FlowState = {
  // Company (Page 2)
  companyName?: string;
  contactPerson?: string;
  email?: string;
  location?: string;
  // Role (Page 3)
  role?: string;
  headcount?: string;
  experienceRange?: string;
  skills?: string[];
  // Preferences (Page 4)
  workingHours?: string;
  interviewMode?: string;
  joiningTimeline?: string;
  // Budget (Page 5)
  budgetRangeOption?: string;
  budgetRange?: string;
  engagementType?: string;
  notes?: string;
  // Access
  generatedAccessCode?: string;
};

type FlowContextValue = {
  state: FlowState;
  updateState: (updates: Partial<FlowState>) => void;
  reset: () => void;
};

const STORAGE_KEY = "owngcc-hiring-flow";

const FlowContext = createContext<FlowContextValue | undefined>(undefined);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FlowState>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as FlowState;
        setState(parsed);
      }
    } catch {
      // best-effort only
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const value = useMemo<FlowContextValue>(
    () => ({
      state,
      updateState: (updates) =>
        setState((s) => ({ ...s, ...updates })),
      reset: () => setState({}),
    }),
    [state],
  );

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlow() {
  const ctx = useContext(FlowContext);
  if (!ctx) {
    throw new Error("useFlow must be used within FlowProvider");
  }
  return ctx;
}
