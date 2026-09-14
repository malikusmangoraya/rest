import React from 'react';
import { Link } from 'react-router-dom';

export default function LumicorePro({ to = '/', size = 34, dark = false }) {
  const gid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const gradId = `lcg-${gid}`;
  const mark = `url(#${gradId})`;
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2.5 select-none transition-opacity hover:opacity-90"
      aria-label="LumicorePro"
    >
      <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--t-primary)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--t-accent)' }} />
          </linearGradient>
        </defs>
        <rect x="6" y="6" width="52" height="52" rx="14" fill={mark} />
        <path
          d="M32 14 L44 22 V38 L32 46 L20 38 V22 Z"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M32 21 L38 25.5 V32 L32 36.5 L26 32 V25.5 Z" fill="white" opacity="0.92" />
        <circle cx="32" cy="27.5" r="2.4" fill="var(--t-primary)" />
      </svg>
      <span className="font-display font-bold tracking-tight leading-none">
        <span className={dark ? 'text-white' : 'text-slate-900'}>Lumi</span>
        <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
          core
        </span>
        <span className={dark ? 'text-white/90' : 'text-slate-500'}>&#xb7;Pro</span>
      </span>
    </Link>
  );
}
