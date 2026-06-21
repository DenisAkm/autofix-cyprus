import { useEffect, useState } from "react";
import { useI18n } from "../i18n/LanguageContext.jsx";
import { TESTIMONIALS } from "../data/testimonials.js";
import { Icon, Reveal } from "./ui.jsx";
import SectionHeader from "./SectionHeader.jsx";

const AVATAR_GRADIENTS = [
  "from-brand-500 to-brand-700",
  "from-sky-500 to-blue-700",
  "from-indigo-500 to-brand-700",
  "from-cyan-500 to-brand-600",
  "from-blue-500 to-indigo-700",
  "from-brand-600 to-sky-700",
];

function GoogleG({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.7-2 5-4.4 6.6v5.5h7.1c4.1-3.8 6.6-9.4 6.6-16.1z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.4l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.500001-3.8-12.2-9H4.5v5.7C8.1 41.1 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.8 28.2c-.4-1.3-.7-2.7-.7-4.2s.3-2.9.7-4.2v-5.7H4.5C3 17.2 2.1 20.5 2.1 24s.9 6.8 2.4 9.9l7.3-5.7z" />
      <path fill="#EA4335" d="M24 10.8c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.1 29.9 2 24 2 15.4 2 8.1 6.9 4.5 14.1l7.3 5.7c1.7-5.2 6.5-9 12.2-9z" />
    </svg>
  );
}

function Stars({ n = 5, className = "h-3.5 w-3.5" }) {
  return (
    <span className="flex">
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon.star key={i} className={`${className} ${i < n ? "text-amber-400" : "text-slate-200"}`} />
      ))}
    </span>
  );
}

function initials(name) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("");
}

function Avatar({ name, photo, idx }) {
  const [broken, setBroken] = useState(false);
  if (photo && !broken) {
    return (
      <img
        src={photo}
        alt={name}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setBroken(true)}
        className="h-11 w-11 rounded-full object-cover ring-1 ring-slate-200"
      />
    );
  }
  return (
    <span className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[idx % 6]} text-sm font-bold text-white`}>
      {initials(name)}
    </span>
  );
}

function Card({ item, idx }) {
  return (
    <figure className="mx-2.5 flex w-[320px] shrink-0 flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-soft transition-shadow hover:shadow-[var(--shadow-lift)] sm:w-[380px]">
      <div className="flex items-center gap-3">
        <Avatar name={item.name} photo={item.photo} idx={idx} />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-bold text-ink-900">{item.name}</span>
            <GoogleG className="h-3.5 w-3.5 shrink-0" />
          </div>
          <div className="flex items-center gap-2">
            <Stars n={item.rating} />
            {item.sub && <span className="truncate text-xs text-slate-400">{item.sub}</span>}
          </div>
        </div>
      </div>
      <blockquote className="mt-4 line-clamp-5 text-[15px] leading-relaxed text-slate-700">{item.text}</blockquote>
    </figure>
  );
}

function Row({ items, reverse, offset = 0 }) {
  return (
    <div className="marquee-track mask-fade-x flex overflow-hidden py-2">
      <div className={`flex ${reverse ? "anim-marquee-rev" : "anim-marquee"}`}>
        {[...items, ...items].map((item, i) => (
          <Card key={i} item={item} idx={i + offset} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { t } = useI18n();
  const [live, setLive] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/reviews")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d && d.ok && Array.isArray(d.reviews) && d.reviews.length) setLive(d);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // Unify live Google reviews and the static fallback into one card shape.
  const items = live
    ? live.reviews.map((r) => ({ name: r.author, photo: r.photo, rating: r.rating, text: r.text, sub: r.relative }))
    : TESTIMONIALS.map((r) => ({ name: r.name, photo: null, rating: 5, text: r.text, sub: r.city }));

  const ratingLabel = live?.rating ? Number(live.rating).toFixed(1) : "4.9";
  const twoRows = items.length >= 6;
  const row1 = twoRows ? items.slice(0, Math.ceil(items.length / 2)) : items;
  const row2 = twoRows ? items.slice(Math.ceil(items.length / 2)) : [];

  return (
    <section className="relative overflow-hidden bg-slate-50/70 py-20 lg:py-28">
      <div className="relative">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow={t("testimonials.subtitle")} title={t("testimonials.title")} />

          {/* Google rating summary */}
          <Reveal className="mt-6 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full bg-white px-5 py-2.5 shadow-soft ring-1 ring-slate-100">
              <GoogleG className="h-5 w-5" />
              <span className="tabular text-sm font-bold text-ink-900">{ratingLabel}</span>
              <Stars n={Math.round(Number(ratingLabel))} className="h-4 w-4" />
              <span className="text-sm text-slate-500">
                {live?.total ? `${live.total} ${t("testimonials.onGoogle")}` : t("testimonials.googleNote")}
              </span>
              {live?.url && (
                <a
                  href={live.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 border-l border-slate-200 pl-3 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  {t("testimonials.seeAll")}
                  <Icon.arrowRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-12 space-y-4">
          <Row items={row1} offset={0} />
          {twoRows && <Row items={row2} reverse offset={row1.length} />}
        </Reveal>
      </div>
    </section>
  );
}
