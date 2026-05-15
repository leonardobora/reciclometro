"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { CityComposition } from "@/lib/types";
import { ClientOnly } from "./client-only";

export function CompositionDonut({ data }: { data: CityComposition[] }) {
  return (
    <ClientOnly fallback={<div className="h-[280px] w-full animate-pulse bg-[var(--muted)] rounded-lg" />}>
    <div className="h-[280px] w-full">
      <ResponsiveContainer minWidth={0} minHeight={0}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            stroke="var(--card)"
            strokeWidth={3}
          >
            {data.map(c => (
              <Cell key={c.name} fill={c.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10 }}
            formatter={(v) => [`${v}%`, "Participação"]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
    </ClientOnly>
  );
}

export function CompositionLegend({ data }: { data: CityComposition[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {data.map(c => (
        <li key={c.name} className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-[var(--muted)]">
          <span className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded" style={{ background: c.color }} />
            {c.name}
          </span>
          <span className="font-semibold tabular-nums">{c.value}%</span>
        </li>
      ))}
    </ul>
  );
}
