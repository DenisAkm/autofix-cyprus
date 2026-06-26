import { useState } from "react";
import { useI18n } from "../i18n/LanguageContext.jsx";
import { TESTIMONIALS } from "../data/testimonials.js";
import { Icon, Reveal, GoogleG } from "./ui.jsx";
import { useGoogleReviews, reviewWord } from "../lib/reviews.js";
import SectionHeader from "./SectionHeader.jsx";

const AVATAR_GRADIENTS = [
  "from-brand-500 to-brand-700",
  "from-brand-700 to-ink-900",
  "from-slate-500 to-slate-700",
  "from-brand-600 to-brand-800",
  "from-slate-600 to-ink-800",
  "from-brand-500 to-slate-700",
];

function Stars({ n = 5, className = "h-3.5 w-3.5" }) {
  return (
    <span className="flex">
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon.star key={i} className={`${className} ${i < n ? "text-marigold-400" : "text-slate-300"}`} />
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
    <figure className="paper mx-2.5 flex w-[320px] shrink-0 flex-col rounded-xl p-6 transition-shadow hover:shadow-[var(--shadow-lift)] sm:w-[380px]">
      <div className="flex items-center gap-3">
        <Avatar name={item.name} photo={item.photo} idx={idx} />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold text-ink-950">{item.name}</span>
            <GoogleG className="h-3.5 w-3.5 shrink-0" />
          </div>
          <div className="flex items-center gap-2">
            <Stars n={item.rating} />
            {item.sub && <span className="truncate text-xs text-slate-500">{item.sub}</span>}
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
  const { t, lang } = useI18n();
  const data = useGoogleReviews();
  const live = data?.ok && data.reviews?.length ? data : null;

  // Unify live Google reviews and the static fallback into one card shape.
  const items = live
    ? live.reviews.map((r) => ({ name: r.author, photo: r.photo, rating: r.rating, text: r.text, sub: r.relative }))
    : TESTIMONIALS.map((r) => ({ name: r.name, photo: null, rating: 5, text: r.text, sub: r.city }));

  const ratingLabel = live?.rating ? Number(live.rating).toFixed(1) : "4.9";
  const twoRows = items.length >= 6;
  const row1 = twoRows ? items.slice(0, Math.ceil(items.length / 2)) : items;
  const row2 = twoRows ? items.slice(Math.ceil(items.length / 2)) : [];

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
      <div className="seam-x absolute inset-x-0 top-0" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader eyebrow={t("testimonials.subtitle")} title={t("testimonials.title")} />

        {/* Google rating summary */}
        <Reveal className="mt-6 flex justify-center">
          <div className="paper inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full px-5 py-2.5">
            <GoogleG className="h-5 w-5" />
            <span className="tabular text-sm font-bold text-ink-950">{ratingLabel}</span>
            <Stars n={Math.round(Number(ratingLabel))} className="h-4 w-4" />
            <span className="text-sm text-slate-500">
              {live?.total
                ? `${live.total} ${reviewWord(live.total, lang)} ${t("testimonials.onGoogle")}`
                : t("testimonials.googleNote")}
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
    </section>
  );
}
