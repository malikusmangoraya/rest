import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

function BrandEmblem({ size = 34 }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-700 text-slate-950 shadow-lg shadow-amber-500/20"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58} fill="none">
        <path d="M3 17 L7 14 L12 16 L17 12 L21 14 V20 H3 Z" fill="currentColor" />
        <circle cx="17" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </span>
  );
}

const SECTIONS = [
  { href: '#inventory', label: 'Collection' },
  { href: '#services', label: 'Services' },
  { href: '#test-drive', label: 'Test Drive' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  return (
    <nav
      className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 text-white backdrop-blur supports-[backdrop-filter]:bg-slate-950/80"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#top" className="flex items-center gap-2.5" aria-label="VelonDrive home">
          <BrandEmblem />
          <span className="text-lg font-bold tracking-wide">
            Velon<span className="text-amber-300">Drive</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-amber-300"
            >
              {s.label}
            </a>
          ))}
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-300/80">
            Dubai · UAE
          </span>
          <a
            href="#test-drive"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/20"
          >
            <Phone size={14} /> Book a Test Drive
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/10 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 px-5 pb-4 pt-2 md:hidden">
          {SECTIONS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-medium text-slate-300 transition-colors hover:text-amber-300"
            >
              {s.label}
            </a>
          ))}
          <a
            href="#test-drive"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
          >
            <Phone size={14} /> Book a Test Drive
          </a>
        </div>
      )}
    </nav>
  );
}