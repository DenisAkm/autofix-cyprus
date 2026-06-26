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
            <Reveal
              key={i}
              variant="scale"
              delay={i * 90}
              className="paper card-hover group relative overflow-hidden rounded-xl p-7"
            >
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <I className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-ink-950">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{item.desc}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
