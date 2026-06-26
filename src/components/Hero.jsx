import { useI18n } from "../i18n/LanguageContext.jsx";
import { buildWhatsappLink } from "../lib/config.js";
import { Icon, Reveal, Swatch, useMagnetic, GoogleG } from "./ui.jsx";
import { useGoogleReviews, reviewWord } from "../lib/reviews.js";
import BeforeAfter from "./BeforeAfter.jsx";

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
    <section id="top" className="on-dark relative overflow-hidden bg-ink-950 pt-28 pb-20 lg:pt-32 lg:pb-28">
      <div className="grain pointer-events-none absolute inset-0 opacity-70" />
      {/* faint petrol wash */}
      <div
        className="pointer-events-none absolute -right-48 -top-48 h-[40rem] w-[40rem] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(18,112,121,.30), transparent)" }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-[1.05fr_.95fr] lg:gap-12 lg:px-8">
        {/* LEFT — the pitch */}
        <div className="max-w-xl">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5">
              <Swatch className="h-3 w-3 shrink-0" />
              <span className="spec shrink-0 whitespace-nowrap text-[0.7rem] text-marigold-300">AFX·CY-04</span>
              <span className="h-3 w-px shrink-0 bg-white/15" />
              <span className="text-xs font-medium text-slate-300">{t("hero.badge")}</span>
            </span>
          </Reveal>

          <Reveal
            as="h1"
            variant="blur"
            delay={80}
            className="nameplate nameplate-tight mt-6 text-[2.4rem] text-white sm:text-5xl lg:text-[3.7rem]"
          >
            {t("hero.titleLead")} <span className="text-marigold-400">{t("hero.titleAccent")}</span>{" "}
            {t("hero.titleTail")}
          </Reveal>

          <Reveal as="p" delay={160} className="mt-6 max-w-lg text-lg leading-relaxed text-slate-300">
            {t("hero.subtitle")}
          </Reveal>

          <Reveal delay={220} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              ref={magnet}
              href="#contact"
              className="btn-shine inline-flex items-center gap-2 rounded-full bg-marigold-400 px-6 py-3.5 text-base font-semibold text-ink-950 shadow-xl shadow-marigold-400/25 transition-colors hover:bg-marigold-300"
            >
              {t("hero.ctaPrimary")}
              <Icon.arrowRight className="h-5 w-5" />
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              <Icon.whatsapp className="h-5 w-5 text-emerald-400 transition-transform group-hover:scale-110" />
              {t("hero.ctaSecondary")}
            </a>
          </Reveal>

          {/* trust strip */}
          <Reveal delay={280} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            {trust.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 text-sm font-medium text-slate-300">
                <Icon.check className="h-4 w-4 text-marigold-400" stroke={3} />
                {item}
              </span>
            ))}
          </Reveal>

          {/* rating row */}
          <Reveal delay={340} className="mt-7 inline-flex flex-wrap items-center gap-x-3 gap-y-2">
            <GoogleG className="h-5 w-5" />
            <span className="flex text-marigold-400">
              {[0, 1, 2, 3, 4].map((i) => (
                <Icon.star key={i} className="h-4 w-4" />
              ))}
            </span>
            <span className="spec text-[0.72rem] text-slate-300">
              <span className="tabular text-white">{ratingLabel}</span> · {ratingNote}
            </span>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span className="spec hidden items-center gap-1.5 text-[0.72rem] text-slate-300 sm:inline-flex">
              <Icon.shield className="h-4 w-4 text-brand-300" />
              {t("hero.badgeTitle")}
            </span>
          </Reveal>
        </div>

        {/* RIGHT — the restoration, shown not told */}
        <Reveal variant="scale" delay={160} className="relative">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/12">
            <BeforeAfter
              before="/img/ba-side-before.jpg"
              after="/img/ba-side-after.jpg"
              alt="AutoFix Cyprus — accident repair, colour-matched"
              beforeLabel={t("work.before")}
              afterLabel={t("work.after")}
            />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2">
              <Swatch className="h-3.5 w-3.5" />
              <span className="spec text-[0.66rem] text-slate-400">AFX·CY-04 · colour-matched</span>
            </span>
            <span className="spec hidden text-[0.66rem] text-slate-400 sm:inline">{t("work.dragHint")}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
