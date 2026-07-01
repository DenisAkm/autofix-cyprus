import { useI18n } from "../i18n/LanguageContext.jsx";
import { Icon, Reveal } from "./ui.jsx";
import SectionHeader from "./SectionHeader.jsx";

const ICONS = [Icon.shield, Icon.clock, Icon.gift, Icon.badge];

export default function TrustFeatures() {
  const { t } = useI18n();
  const items = t("trust.items");

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <SectionHeader title={t("trust.title")} subtitle={t("trust.subtitle")} />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const I = ICONS[i];
          return (
            <Reveal key={i} variant="scale" delay={i * 90} className="card-dark card-hover group rounded-sm p-7">
              <div className="grid h-12 w-12 place-items-center rounded-sm border border-white/10 bg-white/[0.03] text-brand-400 transition-colors group-hover:border-brand-400/50">
                <I className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-white">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{item.desc}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
