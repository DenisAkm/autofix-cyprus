import { useI18n } from "../i18n/LanguageContext.jsx";
import { CONTACT } from "../lib/config.js";
import { Icon, Reveal } from "./ui.jsx";

export default function CTA() {
  const { t } = useI18n();

  return (
    <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <Reveal variant="scale" className="on-dark grain relative overflow-hidden rounded-2xl bg-ink-950 px-6 py-14 text-center lg:py-20">
        <div className="hazard absolute inset-x-0 top-0 h-1" />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(18,112,121,.35), transparent)" }}
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(240,161,46,.14), transparent)" }}
        />

        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-1.5 ring-1 ring-white/15">
            <Icon.sparkle className="h-4 w-4 text-marigold-400" />
            <span className="spec text-[0.66rem] text-slate-300">{t("cta.badge")}</span>
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-300">{t("cta.subtitle")}</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              className="btn-shine inline-flex items-center gap-2 rounded-full bg-marigold-400 px-7 py-4 text-base font-semibold text-ink-950 shadow-xl shadow-marigold-400/25 transition hover:bg-marigold-300"
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
          <p className="spec mt-6 text-[0.64rem] text-slate-400">{t("cta.micro")}</p>
        </div>
      </Reveal>
    </section>
  );
}
