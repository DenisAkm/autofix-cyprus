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

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const I = ICONS[i];
          return (
            <Reveal
              key={i}
              variant="scale"
              delay={i * 90}
              className="card-hover lit group rounded-3xl ring-premium p-7 shadow-soft"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 ring-1 ring-brand-100 transition-colors group-hover:from-brand-600 group-hover:to-brand-700 group-hover:text-white">
                <I className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink-900">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{item.desc}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
