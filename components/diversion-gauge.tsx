"use client";

import { motion } from "framer-motion";

type Props = {
  value: number;
  goal: number;
  size?: number;
};

export function DiversionGauge({ value, goal, size = 220 }: Props) {
  const p = Math.max(0, Math.min(100, value));
  const angle = -90 + p * 1.8;
  const goalAngle = -90 + goal * 1.8;
  return (
    <div className="relative inline-block" style={{ width: size, height: size * 0.7 }}>
      <svg viewBox="0 0 220 140" width="100%" height="100%">
        <g transform="translate(110 120)" strokeWidth="18" fill="none" strokeLinecap="butt">
          {[
            { from: 180, to: 144, color: "#4CAF50" },
            { from: 144, to: 108, color: "#CDDC39" },
            { from: 108, to: 72, color: "#FFC107" },
            { from: 72, to: 36, color: "#FF8C42" },
            { from: 36, to: 0, color: "#E53935" },
          ].map((seg, i) => {
            const r = 80;
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
          {[0, 25, 50, 75, 100].map(t => {
            const ang = (Math.PI / 180) * (180 - t * 1.8);
            const r = 102;
            const x = Math.cos(ang) * r;
            const y = -Math.sin(ang) * r;
            return (
              <text key={t} x={x} y={y + 3} fontSize="9" fontWeight="700" fill="var(--muted-foreground)" textAnchor="middle">
                {t}%
              </text>
            );
          })}
        </g>

        {/* goal marker */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: goalAngle }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          style={{ originX: "110px", originY: "120px" } as React.CSSProperties}
        >
          <line x1="110" y1="120" x2="110" y2="48" stroke="#0a2e1f" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" />
          <circle cx="110" cy="44" r="6" fill="#fff" stroke="#0a2e1f" strokeWidth="2" />
          <text x="110" y="38" fontSize="8" fontWeight="700" fill="var(--foreground)" textAnchor="middle">META {goal}%</text>
        </motion.g>

        {/* needle */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: angle }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{ originX: "110px", originY: "120px" } as React.CSSProperties}
        >
          <line x1="110" y1="120" x2="110" y2="56" stroke="var(--foreground)" strokeWidth="3.5" strokeLinecap="round" />
          <polygon points="106 60 114 60 110 46" fill="var(--foreground)" />
        </motion.g>
        <circle cx="110" cy="120" r="7" fill="var(--foreground)" />
        <circle cx="110" cy="120" r="3" fill="#fff" />
      </svg>
    </div>
  );
}
