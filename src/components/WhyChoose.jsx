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
          <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-ink-900/20 ring-1 ring-slate-100">
            <img
              src="/img/accent-tools.jpg"
              alt="A fully-equipped certified workshop used by AutoFix Cyprus"
              loading="lazy"
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
          {/* floating stat */}
          <div className="glass lit anim-float absolute -bottom-6 right-6 rounded-2xl px-5 py-4 text-center">
            <div className="text-3xl font-extrabold text-gradient">500+</div>
            <div className="text-xs font-medium text-slate-500">{t("stats")[0].label}</div>
          </div>
          <div className="glass lit anim-float-slow absolute -top-5 -left-3 hidden items-center gap-2.5 rounded-2xl px-4 py-3 sm:flex">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">
              <Icon.badge className="h-5 w-5" />
            </span>
            <div className="pr-1 leading-tight">
              <div className="text-sm font-bold text-ink-900">3 {t("why.warrantyUnit")}</div>
              <span className="block text-xs font-medium text-slate-500">{t("trust.items")[3].title}</span>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <Eyebrow>{t("nav.contact")}</Eyebrow>
          </Reveal>
          <Reveal as="h2" variant="right" delay={60} className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {t("why.title")}
          </Reveal>
          <div className="mt-8 space-y-5">
            {items.map((item, i) => (
              <Reveal key={i} delay={i * 90} className="flex gap-4">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <Icon.check className="h-5 w-5" stroke={2.5} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-ink-900">{item.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
