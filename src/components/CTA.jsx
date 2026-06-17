import { useI18n } from "../i18n/LanguageContext.jsx";
import { CONTACT } from "../lib/config.js";
import { Icon, Reveal } from "./ui.jsx";

export default function CTA() {
  const { t } = useI18n();

  return (
    <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <Reveal variant="scale" className="grain lit-dark relative overflow-hidden rounded-[2.5rem] bg-ink-950 px-6 py-14 text-center lg:py-20">
        <div className="mesh-dark pointer-events-none absolute inset-0" />
        <div className="dots pointer-events-none absolute inset-0 opacity-20" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl anim-float-slow" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-brand-700/30 blur-3xl anim-float" />

        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-brand-100 ring-1 ring-white/15">
            <Icon.sparkle className="h-4 w-4" />
            {t("cta.badge")}
          </span>
          <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-300">{t("cta.subtitle")}</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              className="btn-shine inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-brand-600/40 transition hover:bg-brand-500"
            >
              {t("cta.primary")}
              <Icon.arrowRight className="h-5 w-5" />
            </a>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-7 py-4 text-base font-semibold text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/15"
            >
              <Icon.whatsapp className="h-5 w-5 text-emerald-400" />
              {t("cta.secondary")}
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-400">{t("cta.micro")}</p>
        </div>
      </Reveal>
    </section>
  );
}
