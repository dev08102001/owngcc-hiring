import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  accent?: boolean;
};

export function Card({ children, className = "", accent = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:border-orange-200/80 hover:shadow-md sm:p-6 ${
        accent ? "border-l-4 border-l-orange-500" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
