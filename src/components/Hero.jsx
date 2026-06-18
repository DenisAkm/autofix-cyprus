import { useI18n } from "../i18n/LanguageContext.jsx";
import { buildWhatsappLink } from "../lib/config.js";
import { Icon, Eyebrow, Reveal, useTilt, useMagnetic } from "./ui.jsx";

export default function Hero() {
  const { t } = useI18n();
  const trust = t("hero.trust");
  const wa = buildWhatsappLink({ message: "I'd like to send a photo of my car damage." });
  const tilt = useTilt({ max: 7, scale: 1.02 });
  const magnet = useMagnetic(0.3);

  return (
    <section id="top" className="mesh grain relative overflow-hidden pt-28 pb-28 lg:pt-36 lg:pb-40">
      <div className="dots pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl anim-float-slow" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-brand-300/20 blur-3xl anim-float" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        {/* Copy */}
        <div>
          <Reveal>
            <Eyebrow>{t("hero.badge")}</Eyebrow>
          </Reveal>
          <Reveal
            as="h1"
            variant="blur"
            delay={80}
            className="mt-6 text-[2.6rem] font-extrabold leading-[1.03] tracking-[-0.02em] text-ink-900 sm:text-5xl lg:text-[4.4rem]"
          >
            {t("hero.titleLead")}{" "}
            <span className="text-shimmer">{t("hero.titleAccent")}</span>{" "}
            {t("hero.titleTail")}
          </Reveal>
          <Reveal as="p" delay={160} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            {t("hero.subtitle")}
          </Reveal>

          <Reveal delay={220} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              ref={magnet}
              href="#contact"
              className="btn-shine inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-brand-600/30 transition-colors hover:bg-brand-700"
            >
              {t("hero.ctaPrimary")}
              <Icon.arrowRight className="h-5 w-5" />
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3.5 text-base font-semibold text-slate-800 backdrop-blur transition hover:border-emerald-300 hover:text-emerald-700"
            >
              <Icon.whatsapp className="h-5 w-5 text-emerald-500 transition-transform group-hover:scale-110" />
              {t("hero.ctaSecondary")}
            </a>
          </Reveal>

          <Reveal delay={280} className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {trust.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-100 text-brand-700">
                  <Icon.check className="h-3 w-3" stroke={3} />
                </span>
                {item}
              </span>
            ))}
          </Reveal>
        </div>

        {/* Visual */}
        <Reveal variant="scale" delay={150} className="relative">
          <div className="relative">
            {/* Tilting image card */}
            <div
              ref={tilt}
              className="tilt-3d overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-2xl shadow-brand-900/25"
            >
              <img
                src="/img/hero-car.jpg"
                alt="AutoFix Cyprus assessing accident damage on a customer's car"
                className="aspect-[4/3] w-full object-cover"
                width="800"
                height="600"
                fetchpriority="high"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand-900/10 via-transparent to-white/10" />
            </div>

            {/* Independently floating chips → depth */}
            <div className="glass lit anim-float absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl p-3 sm:-left-8">
              <img
                src="/img/mechanic.jpg"
                alt="Certified AutoFix Cyprus technician at work"
                className="h-12 w-12 rounded-xl object-cover"
                width="48"
                height="48"
                loading="lazy"
              />
              <div className="pr-2">
                <div className="flex items-center gap-1.5 text-sm font-bold text-ink-900">
                  <Icon.shield className="h-4 w-4 text-brand-600" />
                  {t("hero.badgeTitle")}
                </div>
                <div className="text-xs text-slate-500">{t("hero.badgeSub")}</div>
              </div>
            </div>

            <div className="glass lit anim-float-slow absolute -right-3 top-6 rounded-2xl px-4 py-3 sm:-right-6">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Icon.star key={i} className="h-4 w-4" />
                ))}
              </div>
              <div className="mt-1 text-xs font-medium text-slate-500">
                <span className="tabular font-bold text-ink-900">4.9</span> · {t("hero.ratingNote")}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
