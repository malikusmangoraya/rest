import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 8 H16.5 V4.5 H14 A4 4 0 0 0 10 8.5 V11 H7.5 V14.5 H10 V21 H13.5 V14.5 H16 L16.5 11 H13.5 V8.5 A1 1 0 0 1 14 8 Z" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M17.6 3h3.1l-6.8 7.8L21.8 21h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L1.9 3h6.4l4.4 5.9L17.6 3Zm-1.1 16.1h1.7L7.1 4.8H5.3l11.2 14.3Z" />
  </svg>
);
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21.5 8.2a2.8 2.8 0 0 0-2-2C17.6 5.7 12 5.7 12 5.7s-5.6 0-7.5.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12c0 1.3.17 2.6.5 3.8a2.8 2.8 0 0 0 2 2c1.9.5 7.5.5 7.5.5s5.6 0 7.5-.5a2.8 2.8 0 0 0 2-2c.33-1.2.5-2.5.5-3.8 0-1.3-.17-2.6-.5-3.8Z" />
    <path d="M10 9.5 15 12l-5 2.5Z" fill="currentColor" stroke="none" />
  </svg>
);

const COLUMNS = [
  {
    title: 'Collection',
    links: ['Hypercars', 'Electric Flagships', 'Sedans & Saloons', 'SUVs & GTs', 'Certified Pre-Owned'],
  },
  {
    title: 'Services',
    links: ['Bespoke Tailoring', 'Insurance & Registration', 'Concierge Delivery', 'Trade-In & Buy-Back', 'Aftercare & Detailing'],
  },
  {
    title: 'Company',
    links: ['Our Story', 'Showrooms', 'Press & Media', 'Careers', 'Contact Us'],
  },
];

const SOCIAL = [
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: FacebookIcon, label: 'Facebook' },
  { icon: XIcon, label: 'X (Twitter)' },
  { icon: YouTubeIcon, label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300" aria-label="Site footer">
      <div className="mx-auto max-w-6xl px-5 pt-14 pb-8">
        <div className="grid gap-10 md:grid-cols-6">
          {/* Brand + newsletter */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-white">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-amber-700 text-slate-950 shadow-lg shadow-amber-500/20">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                  <path d="M3 17 L7 14 L12 16 L17 12 L21 14 V20 H3 Z" fill="currentColor" />
                  <circle cx="17" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M4 8 L10 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
                </svg>
              </span>
              <span className="text-lg font-bold tracking-wide">Velon<br className="hidden" />Drive</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Dubai's luxury automotive concierge — hypercars, electric flagships and
              white-glove servicing across the Gulf since 2012.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              99.99% Operational
            </div>
            <form
              className="mt-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSubscribed(true);
              }}
              aria-label="Newsletter signup"
            >
              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-slate-400" htmlFor="newsletter-email">
                New arrivals, first
              </label>
              <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/5 focus-within:border-amber-300/50">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />
                <button type="submit" className="bg-primary px-4 text-white transition-colors hover:bg-amber-600" aria-label="Subscribe">
                  {subscribed ? '✓' : <ArrowRight size={16} />}
                </button>
              </div>
              {subscribed && <p className="mt-2 text-xs text-emerald-300">Welcome aboard — you're on the list.</p>}
            </form>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">{col.title}</div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="inline-block text-slate-400 transition-colors hover:text-amber-300">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <nav aria-label="Contact and showrooms">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Showroom</div>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-amber-300" />
                Sheikh Zayed Road, Dubai, UAE
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-amber-300" />
                +971 4 000 0000
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-amber-300" />
                concierge@velondrive.ae
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={15} className="shrink-0 text-amber-300" />
                Daily · 09:00 – 23:00
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all duration-200 hover:border-amber-300/50 hover:text-amber-300"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} VelonDrive Automotive. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l) => (
              <a key={l} href="#" className="transition-colors hover:text-amber-300">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}