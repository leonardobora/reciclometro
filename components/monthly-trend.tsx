"use client";

import {
  ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import type { CityMonthly } from "@/lib/types";
import { ClientOnly } from "./client-only";

export function MonthlyTrend({ data }: { data: CityMonthly[] }) {
  return (
    <ClientOnly fallback={<div className="h-[300px] w-full animate-pulse bg-[var(--muted)] rounded-lg" />}>
    <div className="h-[300px] w-full">
      <ResponsiveContainer minWidth={0} minHeight={0}>
        <ComposedChart data={data} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
          <YAxis yAxisId="left" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} unit="%" />
          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              color: "var(--foreground)",
            }}
            formatter={(v, name) => {
              if (name === "Taxa de desvio") return [`${v}%`, name];
              return [`${v} t`, name];
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar yAxisId="left" dataKey="recovered" name="Recuperado (t)" fill="#65a30d" radius={[6, 6, 0, 0]} />
          <Bar yAxisId="left" dataKey="landfill" name="Aterro (t)" fill="#94a3b8" radius={[6, 6, 0, 0]} />
          <Line yAxisId="right" type="monotone" dataKey="rate" name="Taxa de desvio" stroke="#15803d" strokeWidth={3} dot={{ r: 5, fill: "#15803d" }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
    </ClientOnly>
  );
}
