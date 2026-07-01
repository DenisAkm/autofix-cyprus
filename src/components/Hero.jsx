import { useI18n } from "../i18n/LanguageContext.jsx";
import { buildWhatsappLink } from "../lib/config.js";
import { Icon, Reveal, Eyebrow, useMagnetic, GoogleG } from "./ui.jsx";
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
    <section id="top" className="on-dark relative flex min-h-[92svh] items-center overflow-hidden bg-ink-950 pt-28 pb-24">
      {/* cinematic loop — the gleam of a finished car under studio light */}
      <VideoLoop src="/video/hero.mp4?v=2" poster="/img/hero-poster.jpg?v=2" className="absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(14,14,16,.93) 0%, rgba(14,14,16,.62) 44%, rgba(14,14,16,.18) 80%, rgba(14,14,16,.5) 100%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(0deg, #0e0e10 0%, transparent 42%)" }}
      />
      <div className="grain pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>{t("hero.badge")}</Eyebrow>
          </Reveal>

          <Reveal
            as="h1"
            variant="blur"
            delay={80}
            className="mt-7 font-serif text-[2.6rem] font-semibold leading-[1.02] text-white sm:text-6xl lg:text-[4.3rem]"
          >
            {t("hero.titleLead")}{" "}
            <span className="italic text-brand-300">{t("hero.titleAccent")}</span>{" "}
            {t("hero.titleTail")}
          </Reveal>

          <Reveal as="p" delay={160} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            {t("hero.subtitle")}
          </Reveal>

          <Reveal delay={220} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              ref={magnet}
              href="#contact"
              className="btn-shine inline-flex items-center gap-2 rounded-sm bg-brand-400 px-7 py-4 text-[0.95rem] font-semibold text-ink-950 transition-colors hover:bg-brand-300"
            >
              {t("hero.ctaPrimary")}
              <Icon.arrowRight className="h-5 w-5" />
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-sm border border-white/25 bg-white/[0.04] px-7 py-4 text-[0.95rem] font-medium text-white backdrop-blur transition hover:bg-white/10"
            >
              <Icon.whatsapp className="h-5 w-5 text-emerald-400 transition-transform group-hover:scale-110" />
              {t("hero.ctaSecondary")}
            </a>
          </Reveal>

          <Reveal delay={280} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
            {trust.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 text-sm text-slate-300">
                <Icon.check className="h-4 w-4 text-brand-400" stroke={2.4} />
                {item}
              </span>
            ))}
          </Reveal>

          <Reveal delay={340} className="mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-2">
            <GoogleG className="h-5 w-5" />
            <span className="flex text-brand-400">
              {[0, 1, 2, 3, 4].map((i) => (
                <Icon.star key={i} className="h-4 w-4" />
              ))}
            </span>
            <span className="caps text-[0.64rem] text-slate-300">
              <span className="tabular text-white">{ratingLabel}</span> · {ratingNote}
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
