import { useI18n } from "../i18n/LanguageContext.jsx";
import { Icon, Reveal, useTilt } from "./ui.jsx";
import SectionHeader from "./SectionHeader.jsx";

const ICONS = [Icon.car, Icon.paint, Icon.file, Icon.truck, Icon.shield, Icon.wrench];

function ServiceCard({ item, I, delay, requestLabel }) {
  const tilt = useTilt({ max: 6, scale: 1.01 });
  return (
    <Reveal variant="scale" delay={delay}>
      <div
        ref={tilt}
        className="group relative h-full overflow-hidden rounded-3xl border border-slate-100 bg-white p-7 shadow-soft transition-[box-shadow,border-color] duration-300 hover:border-brand-200 hover:shadow-[var(--shadow-lift)]"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/0 blur-2xl transition-all duration-500 group-hover:bg-brand-500/20" />
        <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-600/25 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
          <I className="h-7 w-7" />
        </div>
        <h3 className="relative mt-5 text-lg font-bold text-ink-900">{item.title}</h3>
        <p className="relative mt-2 text-[15px] leading-relaxed text-slate-600">{item.desc}</p>
        <a
          href="#contact"
          className="relative mt-5 inline-flex translate-y-1 items-center gap-1.5 text-sm font-semibold text-brand-600 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          {requestLabel}
          <Icon.arrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </Reveal>
  );
}

export default function Services() {
  const { t } = useI18n();
  const items = t("services.items");

  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <SectionHeader eyebrow={t("nav.services")} title={t("services.title")} subtitle={t("services.subtitle")} />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <ServiceCard key={i} item={item} I={ICONS[i]} delay={(i % 3) * 90} requestLabel={t("nav.request")} />
        ))}
      </div>
    </section>
  );
}
