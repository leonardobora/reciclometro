"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MascotProps = {
  className?: string;
  size?: number;
  /** 0-100, controls needle + digital display */
  percentage?: number;
  expression?: "happy" | "wave" | "cheer";
  floating?: boolean;
  showLabel?: boolean;
};

const NAVY = "#1F2C5C";
const NAVY_DARK = "#162045";
const LIME = "#8BC34A";
const LIME_DARK = "#558B2F";
const SHOE = "#4CAF50";
const CREAM = "#FAFAF7";

export function Mascot({
  className,
  size = 260,
  percentage = 90,
  expression = "happy",
  floating = true,
  showLabel = false,
}: MascotProps) {
  const p = Math.max(0, Math.min(100, percentage));
  // gauge needle: 0% = -90deg (left), 100% = +90deg (right)
  const needleAngle = -90 + p * 1.8;
  const pctText = `${Math.round(p)}%`;

  return (
    <div className={cn("inline-flex flex-col items-center select-none", className)}>
      <motion.div
        className="relative"
        style={{ width: size, height: size * 1.36 }}
        animate={floating ? { y: [0, -6, 0] } : undefined}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 280 380" width="100%" height="100%" aria-label="Reci, mascote do Reciclômetro" role="img">
        <defs>
          <radialGradient id="bodyGrad" cx="40%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#2E3E78" />
            <stop offset="60%" stopColor={NAVY} />
            <stop offset="100%" stopColor={NAVY_DARK} />
          </radialGradient>
          <radialGradient id="leafGrad" cx="30%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#AED581" />
            <stop offset="100%" stopColor={LIME_DARK} />
          </radialGradient>
          <linearGradient id="handGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9CCC65" />
            <stop offset="100%" stopColor={LIME_DARK} />
          </linearGradient>
          <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EAEAEA" />
          </linearGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
            <feOffset dy="6" result="o" />
            <feComponentTransfer><feFuncA type="linear" slope="0.28" /></feComponentTransfer>
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <path id="archTop" d="M 60 140 A 80 80 0 0 1 220 140" fill="none" />
          <path id="archMid" d="M 88 180 A 52 52 0 0 1 192 180" fill="none" />
        </defs>

        {/* ground shadow */}
        <ellipse cx="140" cy="372" rx="80" ry="6" fill="#000" opacity="0.18" />

        {/* LEAVES (top of head) */}
        <motion.g
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "140px", originY: "60px" } as React.CSSProperties}
        >
          <g transform="translate(118 50) rotate(-30)">
            <path d="M0 0 C 20 -22, 48 -14, 50 18 C 28 22, 6 18, 0 0 Z" fill="url(#leafGrad)" />
            <path d="M2 4 C 20 4, 36 10, 46 18" stroke={LIME_DARK} strokeWidth="1.4" fill="none" opacity="0.6" />
          </g>
          <g transform="translate(162 50) rotate(30)">
            <path d="M0 0 C -20 -22, -48 -14, -50 18 C -28 22, -6 18, 0 0 Z" fill="url(#leafGrad)" />
            <path d="M-2 4 C -20 4, -36 10, -46 18" stroke={LIME_DARK} strokeWidth="1.4" fill="none" opacity="0.6" />
          </g>
        </motion.g>

        {/* LEGS */}
        <g>
          <rect x="108" y="248" width="20" height="80" rx="9" fill={NAVY} />
          <rect x="152" y="248" width="20" height="80" rx="9" fill={NAVY} />
        </g>

        {/* SHOES */}
        <g>
          <path d="M92 320 Q 92 358 132 358 L 132 332 Q 122 326 110 326 Q 96 322 92 320 Z" fill={SHOE} />
          <rect x="92" y="354" width="42" height="8" rx="3" fill="#FFFFFF" />
          <circle cx="110" cy="342" r="6" fill="#FFFFFF" />
          <text x="110" y="346" fontSize="10" fontWeight="700" fill={SHOE} textAnchor="middle">♻</text>

          <path d="M188 320 Q 188 358 148 358 L 148 332 Q 158 326 170 326 Q 184 322 188 320 Z" fill={SHOE} />
          <rect x="146" y="354" width="42" height="8" rx="3" fill="#FFFFFF" />
          <circle cx="170" cy="342" r="6" fill="#FFFFFF" />
          <text x="170" y="346" fontSize="10" fontWeight="700" fill={SHOE} textAnchor="middle">♻</text>
        </g>

        {/* BODY (the gauge sphere) */}
        <g filter="url(#soft)">
          <circle cx="140" cy="160" r="100" fill="url(#bodyGrad)" />
          {/* subtle highlight */}
          <ellipse cx="105" cy="120" rx="40" ry="22" fill="#FFFFFF" opacity="0.07" />
        </g>

        {/* Inner panel */}
        <circle cx="140" cy="160" r="76" fill="url(#panelGrad)" stroke={NAVY_DARK} strokeWidth="3" />

        {/* RECICLÔMETRO arched text */}
        <text fontSize="13" fontWeight="800" fill="#FFFFFF" letterSpacing="1.5">
          <textPath href="#archTop" startOffset="50%" textAnchor="middle">RECICLÔMETRO</textPath>
        </text>

        {/* Gauge color arcs (5 segments, 0..180deg) */}
        <g transform="translate(140 160)" strokeWidth="14" fill="none" strokeLinecap="butt">
          {/* arc helper: each 36° slice of a 56-radius arc */}
          {[
            { from: 180, to: 144, color: "#4CAF50" },
            { from: 144, to: 108, color: "#CDDC39" },
            { from: 108, to: 72, color: "#FFC107" },
            { from: 72, to: 36, color: "#FF8C42" },
            { from: 36, to: 0, color: "#E53935" },
          ].map((seg, i) => {
            const r = 56;
            const a1 = (Math.PI / 180) * seg.from;
            const a2 = (Math.PI / 180) * seg.to;
            const x1 = Math.cos(a1) * r;
            const y1 = -Math.sin(a1) * r;
            const x2 = Math.cos(a2) * r;
            const y2 = -Math.sin(a2) * r;
            return (
              <path
                key={i}
                d={`M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`}
                stroke={seg.color}
              />
            );
          })}
          {/* tick labels */}
          {[
            { l: "0%", a: 180 },
            { l: "25%", a: 135 },
            { l: "50%", a: 90 },
            { l: "75%", a: 45 },
            { l: "100%", a: 0 },
          ].map(t => {
            const r = 74;
            const a = (Math.PI / 180) * t.a;
            const x = Math.cos(a) * r;
            const y = -Math.sin(a) * r;
            return (
              <text key={t.l} x={x} y={y + 4} fontSize="7" fontWeight="700" fill={NAVY_DARK} textAnchor="middle">
                {t.l}
              </text>
            );
          })}
        </g>

        {/* FACE (on the panel) */}
        <g>
          {/* eyes */}
          <ellipse cx="120" cy="158" rx="10" ry="11" fill="#FFFFFF" stroke={NAVY_DARK} strokeWidth="1.5" />
          <ellipse cx="160" cy="158" rx="10" ry="11" fill="#FFFFFF" stroke={NAVY_DARK} strokeWidth="1.5" />
          <ellipse cx="121" cy="161" rx="4" ry="5" fill={NAVY_DARK}>
            <animate attributeName="ry" values="5;5;0.4;5" dur="4.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="161" cy="161" rx="4" ry="5" fill={NAVY_DARK}>
            <animate attributeName="ry" values="5;5;0.4;5" dur="4.5s" repeatCount="indefinite" />
          </ellipse>
          <circle cx="118" cy="155" r="1.5" fill="#FFFFFF" />
          <circle cx="158" cy="155" r="1.5" fill="#FFFFFF" />

          {/* cheeks */}
          <ellipse cx="100" cy="178" rx="7" ry="4" fill="#F48FB1" opacity="0.55" />
          <ellipse cx="180" cy="178" rx="7" ry="4" fill="#F48FB1" opacity="0.55" />

          {/* mouth */}
          {expression === "cheer" ? (
            <path d="M124 178 q 16 22 32 0 q -16 6 -32 0 Z" fill={NAVY_DARK} />
          ) : (
            <path d="M122 180 q 18 16 36 0" stroke={NAVY_DARK} strokeWidth="3" fill="none" strokeLinecap="round" />
          )}
        </g>

        {/* NEEDLE */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: needleAngle }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{ originX: "140px", originY: "160px" } as React.CSSProperties}
        >
          <line x1="140" y1="160" x2="140" y2="108" stroke={NAVY_DARK} strokeWidth="3" strokeLinecap="round" />
          <polygon points="136,112 144,112 140,100" fill={NAVY_DARK} />
        </motion.g>
        <circle cx="140" cy="160" r="5" fill={NAVY_DARK} />
        <circle cx="140" cy="160" r="2" fill="#FFFFFF" />

        {/* TAXA DE DESVIO DE ATERRO label */}
        <text fontSize="6.5" fontWeight="700" fill={NAVY_DARK} letterSpacing="0.5">
          <textPath href="#archMid" startOffset="50%" textAnchor="middle">TAXA DE DESVIO DE ATERRO</textPath>
        </text>

        {/* Digital display */}
        <g>
          <rect x="116" y="206" width="48" height="20" rx="4" fill="#0A0A0A" />
          <text
            x="140"
            y="221"
            fontSize="14"
            fontWeight="800"
            fill="#7CFC00"
            textAnchor="middle"
            style={{ fontFamily: "ui-monospace, Menlo, monospace", letterSpacing: "1px" }}
          >
            {pctText}
          </text>
        </g>

        {/* ARMS */}
        {/* Left arm - relaxed */}
        <g>
          <path d="M44 180 q -10 30 -8 60" stroke={NAVY} strokeWidth="22" fill="none" strokeLinecap="round" />
          <circle cx="36" cy="244" r="20" fill="url(#handGrad)" stroke={LIME_DARK} strokeWidth="2" />
          {/* thumb hint */}
          <ellipse cx="22" cy="240" rx="6" ry="9" fill={LIME} stroke={LIME_DARK} strokeWidth="1.4" transform="rotate(-25 22 240)" />
        </g>

        {/* Right arm - waving (always pose, animation conditional) */}
        {expression === "wave" || expression === "cheer" ? (
          <motion.g
            animate={{ rotate: [0, 15, 0, 15, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "236px", originY: "180px" } as React.CSSProperties}
          >
            <path d="M236 180 q 30 -20 30 -70" stroke={NAVY} strokeWidth="22" fill="none" strokeLinecap="round" />
            <circle cx="266" cy="106" r="22" fill="url(#handGrad)" stroke={LIME_DARK} strokeWidth="2" />
            {/* fingers */}
            <ellipse cx="280" cy="98" rx="6" ry="10" fill={LIME} stroke={LIME_DARK} strokeWidth="1.4" transform="rotate(20 280 98)" />
            <ellipse cx="272" cy="88" rx="5" ry="9" fill={LIME} stroke={LIME_DARK} strokeWidth="1.4" />
            <ellipse cx="262" cy="86" rx="5" ry="9" fill={LIME} stroke={LIME_DARK} strokeWidth="1.4" />
          </motion.g>
        ) : (
          <g>
            <path d="M236 180 q 10 30 8 60" stroke={NAVY} strokeWidth="22" fill="none" strokeLinecap="round" />
            <circle cx="244" cy="244" r="20" fill="url(#handGrad)" stroke={LIME_DARK} strokeWidth="2" />
            <ellipse cx="258" cy="240" rx="6" ry="9" fill={LIME} stroke={LIME_DARK} strokeWidth="1.4" transform="rotate(25 258 240)" />
          </g>
        )}
      </svg>
      </motion.div>

      {showLabel && (
        <div className="mt-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-[var(--muted-foreground)]">
          Reci · O Reciclômetro
        </div>
      )}
    </div>
  );
}
