"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "./animated-counter";
import type { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: number;
  decimals?: number;
  unit?: string;
  prefix?: string;
  tone?: "primary" | "accent" | "warning" | "neutral";
  description?: string;
  index?: number;
};

const toneMap = {
  primary: { bg: "from-[var(--primary)]/15 to-[var(--primary)]/0", icon: "bg-[var(--primary)] text-[var(--primary-foreground)]", text: "text-[var(--primary)]" },
  accent: { bg: "from-[var(--accent)]/15 to-[var(--accent)]/0", icon: "bg-[var(--accent)] text-[#0a2e1f]", text: "text-[var(--accent)]" },
  warning: { bg: "from-[var(--warning)]/15 to-[var(--warning)]/0", icon: "bg-[var(--warning)] text-white", text: "text-[var(--warning)]" },
  neutral: { bg: "from-[var(--muted)] to-transparent", icon: "bg-[var(--muted)] text-[var(--foreground)]", text: "text-[var(--foreground)]" },
};

export function StatCard({ icon, label, value, decimals = 0, unit, prefix, tone = "primary", description, index = 0 }: StatCardProps) {
  const t = toneMap[tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm",
        "bg-gradient-to-br"
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-100 pointer-events-none", t.bg)} />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className={cn("grid place-items-center w-10 h-10 rounded-xl", t.icon)}>
            {icon}
          </div>
          <span className="text-[11px] uppercase tracking-wider text-[var(--muted-foreground)] text-right max-w-[60%]">
            {label}
          </span>
        </div>
        <div className="mt-4 flex items-baseline gap-1.5">
          <span className={cn("text-3xl sm:text-4xl font-bold tracking-tight", t.text)}>
            <AnimatedCounter value={value} decimals={decimals} prefix={prefix} />
          </span>
          {unit && <span className="text-sm font-medium text-[var(--muted-foreground)]">{unit}</span>}
        </div>
        {description && <p className="mt-2 text-xs text-[var(--muted-foreground)]">{description}</p>}
      </div>
    </motion.div>
  );
}
