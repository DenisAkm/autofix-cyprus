import { useI18n } from "../i18n/LanguageContext.jsx";
import { CONTACT } from "../lib/config.js";
import { Icon, Reveal } from "./ui.jsx";
import SectionHeader from "./SectionHeader.jsx";

function SwapBadge() {
  return (
    <span className="absolute left-1/2 top-1/2 z-10 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand-700 shadow-lg ring-4 ring-white/30">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 4l3 3-3 3M20 7H10M7 20l-3-3 3-3M4 17h10" />
      </svg>
    </span>
  );
}

export default function Work() {
  const { t } = useI18n();
  const items = t("work.items");

  return (
    <section id="work" className="grain relative overflow-hidden bg-ink-950 py-20 text-white lg:py-28">
      <div className="mesh-dark pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader eyebrow={t("nav.work")} title={t("work.title")} subtitle={t("work.subtitle")} dark />

        <div className="mx-auto mt-14 max-w-5xl space-y-7">
          {items.map((item, i) => (
            <Reveal
              key={i}
              variant={i % 2 === 0 ? "left" : "right"}
              className="group relative overflow-hidden rounded-[1.75rem] ring-1 ring-white/10 shadow-2xl shadow-ink-950/60"
            >
              <img
                src={item.img}
                alt={`${item.title} — ${t("work.before")} / ${t("work.after")}`}
                loading="lazy"
                className="aspect-[965/440] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />

              {/* before / after split affordance */}
              <span className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px -translate-x-1/2 bg-white/70" />
              <SwapBadge />
              <span className="absolute left-4 top-4 rounded-full bg-ink-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200 ring-1 ring-white/15 backdrop-blur">
                {t("work.before")}
              </span>
              <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-emerald-500/30">
                {t("work.after")}
              </span>

              {/* caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent p-5 pt-12">
                <span className="inline-flex rounded-full bg-brand-600/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {item.tag}
                </span>
                <h3 className="mt-2 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-300">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            <Icon.instagram className="h-5 w-5" />
            @autofixcyprus
            <Icon.arrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
