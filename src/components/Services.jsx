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

      {/* Job sheet — numbered work order rows on a single paper panel */}
      <Reveal variant="scale" className="paper mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl">
        <div className="divide-y divide-slate-200">
          {items.map((item, i) => {
            const I = ICONS[i];
            return (
              <a
                key={i}
                href="#contact"
                className="group grid grid-cols-[2rem_1fr_auto] items-center gap-4 px-5 py-5 transition-colors hover:bg-slate-50 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-6 sm:px-8 sm:py-6"
              >
                <span className="spec text-sm text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <h3 className="flex items-center gap-2.5 text-[1.05rem] font-semibold text-ink-950">
                    <I className="h-5 w-5 shrink-0 text-brand-600" />
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-slate-600">{item.desc}</p>
                </div>
                <Icon.arrowRight className="h-5 w-5 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-brand-600" />
              </a>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
