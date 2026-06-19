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

function initials(name) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("");
}

function Card({ item, idx }) {
  return (
    <figure className="mx-2.5 flex w-[320px] shrink-0 flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-soft transition-shadow hover:shadow-[var(--shadow-lift)] sm:w-[380px]">
      <Icon.quote className="h-8 w-8 text-brand-100" />
      <blockquote className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-700">{item.text}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
        <span className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[idx % 6]} text-sm font-bold text-white`}>
          {initials(item.name)}
        </span>
        <div>
          <div className="text-sm font-bold text-ink-900">{item.name}</div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Icon.pin className="h-3.5 w-3.5 text-brand-400" />
            {item.city}
          </div>
        </div>
        <span className="ml-auto flex text-amber-400">
          {[0, 1, 2, 3, 4].map((s) => (
            <Icon.star key={s} className="h-3.5 w-3.5" />
          ))}
        </span>
      </figcaption>
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
  const items = TESTIMONIALS;
  const row1 = items.slice(0, 3);
  const row2 = items.slice(3);

  return (
    <section className="relative overflow-hidden bg-slate-50/70 py-20 lg:py-28">
      <div className="relative">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow={t("testimonials.subtitle")} title={t("testimonials.title")} />
          <Reveal className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-soft ring-1 ring-slate-100">
              <span className="flex text-amber-400">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Icon.star key={i} className="h-4 w-4" />
                ))}
              </span>
              <span className="text-sm font-semibold text-ink-900">{t("testimonials.googleNote")}</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-12 space-y-4">
          <Row items={row1} offset={0} />
          <Row items={row2} reverse offset={3} />
        </Reveal>
      </div>
    </section>
  );
}
