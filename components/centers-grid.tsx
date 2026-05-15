"use client";

import { motion } from "framer-motion";
import { Factory, MapPin } from "lucide-react";
import type { CityCenter } from "@/lib/types";

export function CentersGrid({ data }: { data: CityCenter[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {data.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          whileHover={{ y: -3 }}
          className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/8 to-transparent pointer-events-none" />
          <div className="relative flex items-start gap-3">
            <span className="grid place-items-center w-10 h-10 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)]">
              <Factory size={20} />
            </span>
            <div className="flex-1">
              <h4 className="font-semibold leading-tight">{c.name}</h4>
              <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1 mt-0.5">
                <MapPin size={12} /> {c.neighborhood}
              </p>
              <div className="mt-3">
                <div className="text-xs text-[var(--muted-foreground)] mb-1">Capacidade mensal</div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-[var(--primary)]">{c.capacityT}</span>
                  <span className="text-xs text-[var(--muted-foreground)]">t</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
