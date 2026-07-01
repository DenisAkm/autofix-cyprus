import { useI18n } from "../i18n/LanguageContext.jsx";
import { CONTACT } from "../lib/config.js";
import { Icon, Reveal } from "./ui.jsx";
import BeforeAfter from "./BeforeAfter.jsx";
import SectionHeader from "./SectionHeader.jsx";

export default function Work() {
  const { t } = useI18n();
  const items = t("work.items");

  return (
    <section id="work" className="on-dark relative overflow-hidden bg-ink-950 py-20 text-white lg:py-28">
      <div className="grain pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader eyebrow={t("nav.work")} title={t("work.title")} subtitle={t("work.subtitle")} />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const before = item.img.replace(/\.jpg$/, "-before.jpg");
            const after = item.img.replace(/\.jpg$/, "-after.jpg");
            return (
              <Reveal key={i} variant="scale" delay={(i % 3) * 90} className="frame-luxe overflow-hidden rounded-sm shadow-[var(--shadow-lift)]">
                <BeforeAfter
                  before={before}
                  after={after}
                  alt={item.title}
                  beforeLabel={t("work.before")}
                  afterLabel={t("work.after")}
                />
                <div className="border-t border-brand-400/25 bg-ink-900 p-5">
                  <span className="caps text-[0.56rem] text-brand-400">{item.tag}</span>
                  <h3 className="mt-2 font-serif text-lg font-medium text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-300">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
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
