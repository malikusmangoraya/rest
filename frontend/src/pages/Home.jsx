import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Zap, ShieldCheck, Wrench, ArrowRight, Phone, CalendarCheck, Star, MapPin, Fuel, Timer, Palette } from 'lucide-react';
import api from '@/services/api';

/* ------------------------------------------------------------------ */
/*  Local fallback catalogue — used when the backend is unreachable,   */
/*  so the site is always complete even in static preview mode.        */
/* ------------------------------------------------------------------ */
const FALLBACK_VEHICLES = [
  { id: 1, brand: 'Phantom GT', model: 'V12 Apex Coupe', year: 2026, price: 189500, power: 623, zeroSixty: 3.4, fuel: 'Petrol', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80', tag: 'Flagship', color: '#1a1a2e' },
  { id: 2, brand: 'Nebula RS', model: 'Electric Hyper SUV', year: 2026, price: 145000, power: 750, zeroSixty: 2.8, fuel: 'EV', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80', tag: 'Zero Emission', color: '#0e2f44' },
  { id: 3, brand: 'Titan LX', model: 'Executive Sedan', year: 2025, price: 98000, power: 503, zeroSixty: 4.1, fuel: 'Hybrid', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80', tag: 'Best Seller', color: '#3b2b1a' },
  { id: 4, brand: 'Sabre ST', model: 'Track Edition', year: 2025, price: 132000, power: 580, zeroSixty: 3.2, fuel: 'Petrol', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80', tag: 'Limited', color: '#3a1d1d' },
];

const MARQUEE_BRANDS = ['PHANTOM', 'NEBULA', 'TITAN', 'SABRE', 'VOLTAGE', 'AERO', 'SOLARIS', 'GRANDIA'];

/* ------------------------------------------------------------------ */
/*  Animated counters — trigger once when scrolled into view.          */
/* ------------------------------------------------------------------ */
function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        if (reduce) {
          setValue(target);
          return;
        }
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, duration]);
  return [ref, value];
}

/* ------------------------------------------------------------------ */
/*  Animated hero car (SVG, wheels spin + road speed lines).           */
/* ------------------------------------------------------------------ */
function AnimatedCar() {
  return (
    <div className="relative mx-auto mt-10 w-full max-w-3xl select-none" aria-hidden="true">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/90 px-6 py-8 backdrop-blur">
        <div className="hero-orb left-[8%] top-[14%] h-40 w-40 bg-amber-400/30" />
        <div className="hero-orb right-[10%] top-[8%] h-32 w-32 bg-cyan-300/20" />
        <div className="hero-orb bottom-[6%] right-[22%] h-44 w-44 bg-fuchsia-400/15" />
        <svg viewBox="0 0 760 240" className="relative w-full" role="img" aria-label="Animated luxury car driving across the hero">
          <defs>
            <linearGradient id="bodyGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffd76a" />
              <stop offset="45%" stopColor="#d49a1c" />
              <stop offset="100%" stopColor="#7c4d00" />
            </linearGradient>
            <linearGradient id="glassTint" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bfe9ff" />
              <stop offset="100%" stopColor="#245b7a" />
            </linearGradient>
          </defs>
          <rect x="0" y="196" width="760" height="26" rx="13" fill="#0b1220" />
          <line x1="0" y1="209" x2="760" y2="209" stroke="#b8860b" strokeWidth="3" className="road-dash" opacity="0.55" />
          <line x1="-60" y1="60" x2="40" y2="60" className="speed-line" />
          <line x1="-60" y1="120" x2="40" y2="120" className="speed-line" style={{ animationDelay: '0.33s' }} />
          <line x1="-60" y1="168" x2="40" y2="168" className="speed-line" style={{ animationDelay: '0.66s' }} />
          <g className="animate-car-drift" style={{ animation: 'car-drive 9s ease-in-out infinite' }}>
            <path d="M60 168 L104 96 Q110 84 128 86 L280 80 Q300 79 318 94 L360 120 L470 120 L500 96 Q518 80 538 84 L620 96 Q638 100 640 118 L652 150 L678 160 Q700 168 700 184 Q700 208 676 208 L96 208 Q72 208 72 184 Q70 168 60 168 Z" fill="url(#bodyGold)" stroke="#f7d77e" strokeWidth="2" />
            <path d="M128 96 L240 88 L258 118 L150 118 Z" fill="url(#glassTint)" opacity="0.95" />
            <path d="M330 122 L468 122 L500 100 Q512 90 530 92 L580 106 Q596 112 598 132 L600 150 L330 150 Z" fill="url(#glassTint)" opacity="0.85" />
            <circle cx="178" cy="178" r="34" fill="#0b1220" stroke="#f7d77e" strokeWidth="3" />
            <g className="car-wheel">
              <circle cx="178" cy="178" r="16" fill="none" stroke="#ffd873" strokeWidth="4" />
              <line x1="178" y1="162" x2="178" y2="194" stroke="#ffd873" strokeWidth="3" />
              <line x1="162" y1="178" x2="194" y2="178" stroke="#ffd873" strokeWidth="3" />
              <circle cx="178" cy="178" r="4" fill="#fff3d6" />
            </g>
            <circle cx="540" cy="178" r="34" fill="#0b1220" stroke="#f7d77e" strokeWidth="3" />
            <g className="car-wheel">
              <circle cx="540" cy="178" r="16" fill="none" stroke="#ffd873" strokeWidth="4" />
              <line x1="540" y1="162" x2="540" y2="194" stroke="#ffd873" strokeWidth="3" />
              <line x1="524" y1="178" x2="556" y2="178" stroke="#ffd873" strokeWidth="3" />
              <circle cx="540" cy="178" r="4" fill="#fff3d6" />
            </g>
            <path d="M96 120 L150 120 L150 70 Q96 96 96 120 Z" fill="#0b1220" opacity="0.5" />
          </g>
        </svg>
        <div className="mt-2 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.3em] text-amber-200/70">
          <Zap size={12} /> Drift Mode Engaged
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function StatBlock({ value, suffix, label }) {
  const [ref, val] = useCountUp(value, 1400);
  return (
    <div ref={ref} className="text-center sm:text-left">
      <div className="text-3xl font-bold text-heading sm:text-4xl">
        {val.toLocaleString()}
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="mt-1 text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export default function Home() {
  const [vehicles, setVehicles] = useState(FALLBACK_VEHICLES);
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({ name: '', phone: '', model: 'Phantom GT' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    let mounted = true;
    api
      .get('/vehicles')
      .then((res) => {
        const list = res?.data?.data;
        if (mounted && Array.isArray(list) && list.length) setVehicles(list);
      })
      .catch(() => { /* backend offline → curated fallback stays */ });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(
    () => (filter === 'All' ? vehicles : vehicles.filter((v) => v.tag === filter)),
    [vehicles, filter]
  );

  const submitBooking = async (e) => {
    e.preventDefault();
    setSent(true);
    try {
      await api.post('/test-drive', form);
    } catch (err) {
      /* static preview: form still succeeds client-side */
    }
  };

  const carImg = (v) => (v && v.image ? v.image : v.fallbackImage);

  return (
    <main className="overflow-hidden">
      {/* ═══ HERO — full animation ═══ */}
      <section className="relative min-h-[92vh] bg-gradient-to-b from-slate-950 via-slate-925 to-canvas px-5 pb-16 text-white" aria-label="Hero">
        <div className="absolute inset-0 -z-10 hero-aurora" />
        <div className="hero-orb left-[6%] top-[18%] h-52 w-52 bg-amber-400/25" />
        <div className="hero-orb right-[4%] top-[10%] h-64 w-64 bg-cyan-400/15" />
        <div className="hero-orb bottom-[12%] left-[30%] h-60 w-60 bg-fuchsia-500/12" />

        <div className="mx-auto max-w-6xl pt-24 text-center sm:pt-28">
          <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-200">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Dubai Showroom — 2026 Collection
          </div>

          <h1 className="animate-rise mt-6 text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl" style={{ animationDelay: '0.12s' }}>
            Own the Road
            <br />
            <span className="shimmer-text">In Absolute Luxury</span>
          </h1>

          <p className="animate-rise mx-auto mt-5 max-w-2xl text-base text-slate-300 sm:text-lg" style={{ animationDelay: '0.24s' }}>
            Hand-finished hypercars, electric flagships and executive sedans — delivered
            with white-glove service across the UAE and the Gulf.
          </p>

          <div className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: '0.34s' }}>
            <a href="#inventory" className="btn-primary hero-glow-card">
              Explore the Collection <ArrowRight size={16} />
            </a>
            <a href="#test-drive" className="btn-outline !border-amber-300/40 !text-amber-100">
              <CalendarCheck size={16} /> Book a Test Drive
            </a>
          </div>

          <div className="animate-rise mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400" style={{ animationDelay: '0.44s' }}>
            {[
              ['5-Year Warranty', ShieldCheck],
              ['Elite Concierge', Phone],
              ['600h Detailing', Wrench],
            ].map(([label, Icon]) => (
              <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <Icon size={12} className="text-amber-300" /> {label}
              </span>
            ))}
          </div>
        </div>

        <AnimatedCar />

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
          <StatBlock value={4200} suffix="+" label="Vehicles Delivered" />
          <StatBlock value={14} suffix="" label="Years in Dubai" />
          <StatBlock value={97} suffix="%" label="Client Retention" />
          <StatBlock value={6} suffix="★" label="Concierge Rating" />
        </div>
      </section>

      {/* ═══ BRAND MARQUEE ═══ */}
      <section className="border-y border-white/5 bg-slate-950/60 py-5" aria-label="Brands">
        <div className="marquee-track gap-12 text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
          {[...MARQUEE_BRANDS, ...MARQUEE_BRANDS].map((b, i) => (
            <span key={i} className="px-6">{b} · {b}</span>
          ))}
        </div>
      </section>

      {/* ═══ FEATURED INVENTORY ═══ */}
      <section id="inventory" className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">The Floor</div>
              <h2 className="mt-2 text-3xl font-bold text-heading sm:text-4xl">Featured Collection</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', 'Flagship', 'Best Seller', 'Zero Emission', 'Limited'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                    filter === f
                      ? 'bg-primary text-white shadow-md'
                      : 'border border-slate-200 text-slate-600 hover:border-primary hover:text-primary dark:border-white/10 dark:text-slate-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((v) => (
              <article key={v.id} className="tilt-card group overflow-hidden rounded-2xl border border-slate-200 bg-surface shadow-sm dark:border-white/10 dark:bg-surface">
                <div className="relative h-44 overflow-hidden">
                  <img src={carImg(v)} alt={`${v.brand} ${v.model}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <span className="absolute left-3 top-3 rounded-full bg-slate-950/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-amber-200 backdrop-blur">
                    {v.tag}
                  </span>
                </div>
                <div className="p-5">
                  <div className="text-[11px] uppercase tracking-widest text-slate-400">{v.brand}</div>
                  <h3 className="mt-1 text-lg font-bold text-heading">{v.model}</h3>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1"><Timer size={12} /> 0-100 · {v.zeroSixty}s</span>
                    <span className="inline-flex items-center gap-1"><Zap size={12} /> {v.power} hp</span>
                    <span className="inline-flex items-center gap-1"><Fuel size={12} /> {v.fuel}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-white/10">
                    <span className="text-xl font-bold text-primary">${v.price.toLocaleString()}</span>
                    <a href="#test-drive" className="inline-flex items-center gap-1 text-sm font-semibold text-heading transition-colors hover:text-primary">
                      Reserve <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES TRIPLET ═══ */}
      <section id="services" className="bg-canvas px-5 py-20 dark:bg-slate-925">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">White-Glove Ownership</div>
            <h2 className="mt-2 text-3xl font-bold text-heading sm:text-4xl">Everything Under One Roof</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500 dark:text-slate-400">
              From custom import to resale, our concierge handles your journey end to end.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: Zap, title: 'EV & Import Specialists', text: 'Exclusive allocations of electric flagships and rare imports, fully UAE-legally registered.' },
              { icon: Palette, title: 'Bespoke Tailoring', text: 'Individualised paint, interior stitching and infotainment upgrades in our in-house atelier.' },
              { icon: ShieldCheck, title: 'Guaranteed Provenance', text: 'Every vehicle HPI-checked with full service history, warranty and buy-back programme.' },
            ].map((s) => (
              <div key={s.title} className="tilt-card rounded-2xl border border-slate-200 bg-surface p-7 dark:border-white/10 dark:bg-surface">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-heading">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEST DRIVE ═══ */}
      <section id="test-drive" className="relative px-5 py-20">
        <div className="hero-aurora absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">Experience It</div>
            <h2 className="mt-2 text-3xl font-bold text-heading sm:text-4xl">Book Your Test Drive</h2>
            <p className="mt-4 max-w-md text-slate-500 dark:text-slate-400">
              Choose a model, pick a slot and our driver will bring it to your door — anywhere in Dubai,
              Abu Dhabi or Sharjah. No pressure, just the perfect drive.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
                <Phone size={18} />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-widest text-slate-400">Concierge line</div>
                <div className="font-semibold text-heading">+971 4 000 0000</div>
              </div>
            </div>
          </div>

          <form onSubmit={submitBooking} className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 text-white shadow-2xl backdrop-blur" aria-label="Book a test drive">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1 block text-[11px] uppercase tracking-widest text-slate-400">Full name</span>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-amber-300/60" placeholder="Your name" />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-[11px] uppercase tracking-widest text-slate-400">Phone</span>
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-amber-300/60" placeholder="+971 …" />
              </label>
            </div>
            <label className="mt-4 block text-sm">
              <span className="mb-1 block text-[11px] uppercase tracking-widest text-slate-400">Preferred model</span>
              <select value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-amber-300/60">
                {FALLBACK_VEHICLES.map((v) => (
                  <option key={v.id} value={v.brand} className="bg-slate-900">{v.brand} — {v.model}</option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn-primary mt-6 w-full justify-center hero-glow-card">
              {sent ? 'Request Received ✓' : 'Book My Test Drive'}
            </button>
            {sent && (
              <p className="mt-3 text-center text-xs text-emerald-300">
                Our concierge will call you within 15 minutes to confirm your slot.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="bg-canvas px-5 py-20 dark:bg-slate-925">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">Guests First</div>
            <h2 className="mt-2 text-3xl font-bold text-heading sm:text-4xl">Loved by UAE Owners</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { name: 'A. Al-Mansouri', role: 'Phantom GT Owner · Dubai', quote: 'The delivery was cinematic — 35 minute walkthrough, zero paperwork stress. Flawless.' },
              { name: 'Lina K.', role: 'Nebula RS · Abu Dhabi', quote: 'First EV I truly loved. Their team handled registration, charging and insurance in a day.' },
              { name: 'R. Fernandes', role: 'Sabre ST · Sharjah', quote: 'Trade-in value beat every offer in the city. Genuinely white-glove from start to finish.' },
            ].map((t) => (
              <figure key={t.name} className="rounded-2xl border border-slate-200 bg-surface p-7 dark:border-white/10 dark:bg-surface">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">“{t.quote}”</blockquote>
                <figcaption className="mt-5">
                  <div className="font-semibold text-heading">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SHOWROOM CTA ═══ */}
      <section className="px-5 py-16">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-8 py-14 text-center text-white">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950" />
          <div className="hero-orb left-[10%] top-[0%] h-40 w-40 bg-amber-400/25" />
          <div className="hero-orb right-[12%] bottom-[0%] h-40 w-40 bg-cyan-400/15" />
          <h2 className="text-3xl font-bold sm:text-4xl">Visit the Downtown Showroom</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Sheikh Zayed Road, Dubai — open daily 9am to 11pm. Coffee is on us.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <a href="#inventory" className="btn-primary hero-glow-card">View Inventory <ArrowRight size={16} /></a>
            <a href="#" className="btn-outline !border-white/25 !text-white"><MapPin size={16} /> Get Directions</a>
          </div>
        </div>
      </section>
    </main>
  );
}