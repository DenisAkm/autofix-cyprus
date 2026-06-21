import { useI18n } from "../i18n/LanguageContext.jsx";
import { buildWhatsappLink } from "../lib/config.js";
import { Icon, Eyebrow, Reveal, useMagnetic, GoogleG } from "./ui.jsx";
import { useGoogleReviews, reviewWord } from "../lib/reviews.js";
import VideoLoop from "./VideoLoop.jsx";

export default function Hero() {
  const { t, lang } = useI18n();
  const trust = t("hero.trust");
  const wa = buildWhatsappLink({ message: "I'd like to send a photo of my car damage." });
  const magnet = useMagnetic(0.3);
  const rev = useGoogleReviews();
  const ratingLabel = rev?.ok && rev.rating ? Number(rev.rating).toFixed(1) : "4.9";
  const ratingNote =
    rev?.ok && rev.total
      ? `${rev.total} ${reviewWord(rev.total, lang)} ${t("testimonials.onGoogle")}`
      : t("hero.ratingNote");

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950 pt-28 pb-24 lg:pb-28">
      {/* Seamless looping background video (mirrored so the technician sits on the open right side) */}
      <VideoLoop src="/video/hero.mp4?v=2" poster="/img/hero-poster.jpg?v=2" mirror className="absolute inset-0" />

      {/* Legibility scrims */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-ink-950/55" />
      <div className="grain pointer-events-none absolute inset-0 opacity-60" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow dark>{t("hero.badge")}</Eyebrow>
          </Reveal>

          <Reveal
            as="h1"
            variant="blur"
            delay={80}
            className="mt-6 text-[2.6rem] font-extrabold leading-[1.03] tracking-[-0.02em] text-white sm:text-5xl lg:text-[4.4rem]"
          >
            {t("hero.titleLead")}{" "}
            <span className="text-shimmer">{t("hero.titleAccent")}</span>{" "}
            {t("hero.titleTail")}
          </Reveal>

          <Reveal as="p" delay={160} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">
            {t("hero.subtitle")}
          </Reveal>

          <Reveal delay={220} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              ref={magnet}
              href="#contact"
              className="btn-shine inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-brand-600/40 transition-colors hover:bg-brand-500"
            >
              {t("hero.ctaPrimary")}
              <Icon.arrowRight className="h-5 w-5" />
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <Icon.whatsapp className="h-5 w-5 text-emerald-400 transition-transform group-hover:scale-110" />
              {t("hero.ctaSecondary")}
            </a>
          </Reveal>

          {/* Trust strip + rating */}
          <Reveal delay={280} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            {trust.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 text-sm font-medium text-slate-200">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-500/20 text-brand-300 ring-1 ring-brand-400/30">
                  <Icon.check className="h-3 w-3" stroke={3} />
                </span>
                {item}
              </span>
            ))}
          </Reveal>

          <Reveal delay={340} className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur">
            <GoogleG className="h-5 w-5" />
            <span className="flex text-amber-400">
              {[0, 1, 2, 3, 4].map((i) => (
                <Icon.star key={i} className="h-4 w-4" />
              ))}
            </span>
            <span className="text-sm text-slate-200">
              <span className="tabular font-bold text-white">{ratingLabel}</span> · {ratingNote}
            </span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span className="hidden items-center gap-1.5 text-sm font-medium text-slate-200 sm:inline-flex">
              <Icon.shield className="h-4 w-4 text-brand-300" />
              {t("hero.badgeTitle")}
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
