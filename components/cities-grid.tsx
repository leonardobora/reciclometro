"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { NETWORK } from "@/lib/data";

function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function CitiesGrid({ availableSlugs }: { availableSlugs: string[] }) {
  const available = new Set(availableSlugs);
  return (
    <div className="space-y-8">
      <CityState state="Paraná" cities={NETWORK.cities.PR} accent="#15803d" available={available} />
      <CityState state="São Paulo" cities={NETWORK.cities.SP} accent="#0369a1" available={available} />
    </div>
  );
}

function CityState({
  state, cities, accent, available,
}: { state: string; cities: string[]; accent: string; available: Set<string> }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-xl font-bold">{state}</h3>
        <span className="text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
          {cities.length} municípios
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
        {cities.map((city, i) => {
          const slug = slugify(city);
          const isAvailable = available.has(slug);
          const href = isAvailable ? `/${slug}` : null;
          const Inner = (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              whileHover={isAvailable ? { y: -2, scale: 1.02 } : undefined}
              className="group relative flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm shadow-sm hover:border-[var(--primary)] transition"
              style={isAvailable ? { borderColor: accent } : undefined}
            >
              <MapPin size={14} style={{ color: accent }} />
              <span className="font-medium">{city}</span>
              {isAvailable && (
                <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
                  Ver →
                </span>
              )}
            </motion.div>
          );
          return href ? <Link key={city} href={href}>{Inner}</Link> : <div key={city}>{Inner}</div>;
        })}
      </div>
    </div>
  );
}
