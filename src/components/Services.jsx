import { useI18n } from "../i18n/LanguageContext.jsx";
import { Icon, Reveal } from "./ui.jsx";
import SectionHeader from "./SectionHeader.jsx";

const ICONS = [Icon.car, Icon.paint, Icon.file, Icon.truck, Icon.shield, Icon.wrench];

export default function Services() {
  const { t } = useI18n();
  const items = t("services.items");

  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <SectionHeader eyebrow={t("nav.services")} title={t("services.title")} subtitle={t("services.subtitle")} />

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const I = ICONS[i];
          return (
            <Reveal key={i} variant="scale" delay={(i % 3) * 90}>
              <a href="#contact" className="card-dark card-hover group flex h-full flex-col rounded-sm p-7">
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-sm border border-white/10 bg-white/[0.03] text-brand-400 transition-colors group-hover:border-brand-400/50">
                    <I className="h-6 w-6" />
                  </div>
                  <span className="caps text-[0.6rem] text-slate-500">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-lg font-medium text-white">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{item.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {t("nav.request")}
                  <Icon.arrowRight className="h-4 w-4" />
                </span>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
