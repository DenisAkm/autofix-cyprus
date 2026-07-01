import { useI18n } from "../i18n/LanguageContext.jsx";
import { CONTACT } from "../lib/config.js";
import { Icon, Reveal } from "./ui.jsx";

export default function CTA() {
  const { t } = useI18n();

  return (
    <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <Reveal variant="scale" className="frame-luxe grain relative overflow-hidden rounded-sm bg-ink-900 px-6 py-14 text-center lg:py-20">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(201,168,106,.16), transparent)" }}
        />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5">
            <Icon.sparkle className="h-4 w-4 text-brand-400" />
            <span className="caps text-[0.62rem] text-slate-300">{t("cta.badge")}</span>
          </span>
          <h2 className="mt-6 font-serif text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-300">{t("cta.subtitle")}</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              className="btn-shine inline-flex items-center gap-2 rounded-sm bg-brand-400 px-7 py-4 text-base font-semibold text-ink-950 transition hover:bg-brand-300"
            >
              {t("cta.primary")}
              <Icon.arrowRight className="h-5 w-5" />
            </a>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/[0.04] px-7 py-4 text-base font-medium text-white backdrop-blur transition hover:bg-white/10"
            >
              <Icon.whatsapp className="h-5 w-5 text-emerald-400" />
              {t("cta.secondary")}
            </a>
          </div>
          <p className="caps mt-6 text-[0.62rem] text-slate-500">{t("cta.micro")}</p>
        </div>
      </Reveal>
    </section>
  );
}
