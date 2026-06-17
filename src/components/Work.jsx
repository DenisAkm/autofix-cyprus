import { useI18n } from "../i18n/LanguageContext.jsx";
import { CONTACT } from "../lib/config.js";
import { Icon, Reveal } from "./ui.jsx";
import SectionHeader from "./SectionHeader.jsx";

export default function Work() {
  const { t } = useI18n();
  const items = t("work.items");

  return (
    <section id="work" className="grain relative overflow-hidden bg-ink-950 py-20 text-white lg:py-28">
      <div className="mesh-dark pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader eyebrow={t("nav.work")} title={t("work.title")} subtitle={t("work.subtitle")} dark />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={i}
              delay={(i % 3) * 90}
              className={`group relative overflow-hidden rounded-3xl ring-1 ring-white/10 ${
                i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <img
                src={item.img}
                alt={`${item.title} — ${item.tag}`}
                loading="lazy"
                className={`w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110 ${
                  i === 0 ? "h-full min-h-[260px] lg:min-h-[520px]" : "aspect-[4/3]"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/15 to-transparent transition-opacity duration-500 group-hover:from-ink-950/95" />
              <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-500 group-hover:-translate-y-1">
                <span className="inline-flex rounded-full bg-brand-600/90 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-brand-900/30 backdrop-blur">
                  {item.tag}
                </span>
                <h3 className={`mt-2 font-bold text-white ${i === 0 ? "text-2xl" : "text-lg"}`}>{item.title}</h3>
                <span className="mt-2 block h-0.5 w-0 rounded-full bg-brand-400 transition-all duration-500 group-hover:w-12" />
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
