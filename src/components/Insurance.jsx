import { useState } from "react";
import { useI18n } from "../i18n/LanguageContext.jsx";
import { Icon, Reveal } from "./ui.jsx";
import { INSURERS } from "../data/insurers.js";

const POINT_ICONS = [Icon.shield, Icon.file, Icon.clock];

// Real Cyprus insurers. Renders an official logo if provided (public/img/insurers/),
// otherwise a clean text wordmark; falls back to text if the logo fails to load.
function InsurerChip({ name, logo }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className="mx-2.5 flex h-14 shrink-0 items-center justify-center rounded-2xl border border-slate-100 bg-white/80 px-6 text-slate-400 shadow-soft transition-colors duration-300 hover:text-brand-700">
      {logo && !broken ? (
        <img src={logo} alt={name} loading="lazy" onError={() => setBroken(true)} className="h-7 max-w-[150px] object-contain" />
      ) : (
        <span className="whitespace-nowrap text-[15px] font-bold tracking-tight text-current">{name}</span>
      )}
    </div>
  );
}

export default function Insurance() {
  const { t } = useI18n();
  const points = t("insurance.points");

  return (
    <section className="mx-auto max-w-7xl px-5 pb-8 lg:px-8">
      <Reveal
        variant="scale"
        className="relative overflow-hidden rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-50 via-white to-brand-50/50 p-8 shadow-soft lg:p-12"
      >
        <div className="dots pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
                  <Icon.shield className="h-6 w-6" />
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
                  {t("insurance.title")}
                </h2>
              </div>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600">{t("insurance.desc")}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {points.map((p, i) => {
                const I = POINT_ICONS[i];
                return (
                  <div
                    key={i}
                    className="card-hover flex items-center gap-2.5 rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-brand-100"
                  >
                    <I className="h-5 w-5 shrink-0 text-brand-600" />
                    <span className="text-sm font-semibold text-ink-800">{p}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Insurer logo marquee */}
          <div className="mt-10 border-t border-brand-100/70 pt-8">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
              {t("insurance.logosNote")}
            </p>
            <div className="marquee-track mask-fade-x relative flex overflow-hidden">
              <div className="flex anim-marquee">
                {[...INSURERS, ...INSURERS].map((it, i) => (
                  <InsurerChip key={i} name={it.name} logo={it.logo} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
