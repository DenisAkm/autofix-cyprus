import { useI18n } from "../i18n/LanguageContext.jsx";
import { Icon, Eyebrow, Reveal } from "./ui.jsx";

export default function WhyChoose() {
  const { t } = useI18n();
  const items = t("why.items");

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <Reveal variant="left" className="relative order-last lg:order-first">
          <div className="frame-luxe overflow-hidden rounded-sm shadow-[var(--shadow-lift)]">
            <img
              src="/img/accent-tools.jpg"
              alt="Quality car repair work delivered by AutoFix Cyprus"
              loading="lazy"
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
          <div className="card-dark anim-float absolute -bottom-6 right-6 rounded-sm px-5 py-4 text-center shadow-[var(--shadow-lift)]">
            <div className="font-serif text-3xl font-semibold text-white">
              500<span className="text-brand-400">+</span>
            </div>
            <div className="caps mt-1 text-[0.54rem] text-slate-400">{t("stats")[0].label}</div>
          </div>
          <div className="card-dark anim-float-slow absolute -top-5 -left-3 hidden items-center gap-2.5 rounded-sm px-4 py-3 shadow-[var(--shadow-lift)] sm:flex">
            <span className="grid h-9 w-9 place-items-center rounded-sm bg-brand-400 text-ink-950">
              <Icon.badge className="h-5 w-5" />
            </span>
            <div className="pr-1 leading-tight">
              <div className="text-sm font-semibold text-white">3 {t("why.warrantyUnit")}</div>
              <span className="caps block text-[0.52rem] text-slate-400">{t("trust.items")[3].title}</span>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <Eyebrow>{t("why.eyebrow")}</Eyebrow>
          </Reveal>
          <Reveal as="h2" variant="right" delay={60} className="mt-5 font-serif text-[2rem] font-semibold leading-[1.08] tracking-[-0.01em] text-white sm:text-[2.7rem]">
            {t("why.title")}
          </Reveal>
          <div className="mt-8 space-y-5">
            {items.map((item, i) => (
              <Reveal key={i} delay={i * 90} className="flex gap-4">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-sm border border-white/10 bg-white/[0.03] text-brand-400">
                  <Icon.check className="h-5 w-5" stroke={2.4} />
                </span>
                <div>
                  <h3 className="text-base font-medium text-white">{item.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-slate-300">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
