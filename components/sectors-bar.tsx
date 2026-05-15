"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { CitySector } from "@/lib/types";
import { ClientOnly } from "./client-only";

export function SectorsBar({ data }: { data: CitySector[] }) {
  return (
    <ClientOnly fallback={<div className="h-[280px] w-full animate-pulse bg-[var(--muted)] rounded-lg" />}>
    <div className="h-[280px] w-full">
      <ResponsiveContainer minWidth={0} minHeight={0}>
        <BarChart data={data} layout="vertical" margin={{ left: 30, right: 12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis type="number" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} unit="%" />
          <YAxis dataKey="sector" type="category" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} width={130} />
          <Tooltip
            contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10 }}
            formatter={(v) => [`${v}%`, "Coleta"]}
          />
          <Bar dataKey="pct" fill="#15803d" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </ClientOnly>
  );
}
