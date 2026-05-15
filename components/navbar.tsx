"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IMG } from "@/lib/images";

const links = [
  { href: "/", label: "Início" },
  { href: "/#cidades", label: "Cidades" },
  { href: "/#manifesto", label: "Movimento" },
  { href: "/#contato", label: "Contato" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src={IMG.logoDark}
            alt="Reciclômetro da Cidade"
            width={1301}
            height={419}
            priority
            className="h-9 w-auto group-hover:scale-[1.03] transition-transform"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-[var(--muted)] text-[var(--primary)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                )}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/jacarezinho"
            className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition"
          >
            Ver dashboard
          </Link>
        </nav>

        <button
          aria-label="Menu"
          className="md:hidden p-2 rounded-lg hover:bg-[var(--muted)]"
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-[var(--border)]"
          >
            <div className="flex flex-col p-3 gap-1">
              {links.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--muted)]"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
