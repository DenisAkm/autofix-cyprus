import { useI18n } from "../i18n/LanguageContext.jsx";
import { Reveal, useCountUp } from "./ui.jsx";
import { useGoogleReviews } from "../lib/reviews.js";

function parse(v) {
  const m = String(v).match(/^([^\d]*)([\d.]+)(.*)$/);
  if (!m) return { prefix: "", num: null, suffix: v, decimals: 0 };
  const [, prefix, numStr, suffix] = m;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix, num: parseFloat(numStr), suffix, decimals };
}

function Stat({ value, label, divider }) {
  const { prefix, num, suffix, decimals } = parse(value);
  const [ref, n] = useCountUp(num ?? 0, { decimals });
  return (
    <div className={`relative px-6 py-8 text-center ${divider}`}>
      <div ref={ref} className="tabular font-serif text-4xl font-semibold text-white lg:text-[2.6rem]">
        {num === null ? value : `${prefix}${n}`}
        <span className="text-brand-400">{suffix}</span>
      </div>
      <div className="caps mt-2 text-[0.58rem] text-slate-400">{label}</div>
    </div>
  );
}

export default function Stats() {
  const { t } = useI18n();
  const stats = t("stats");
  const rev = useGoogleReviews();
  const liveRating = rev?.ok && rev.rating ? Number(rev.rating).toFixed(1) + "★" : null;

  return (
    <div className="relative z-10 mx-auto -mt-16 max-w-6xl px-5 lg:px-8">
      <Reveal variant="scale" className="card-dark grain relative overflow-hidden rounded-sm shadow-[var(--shadow-lift)]">
        <div className="relative grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Stat
              key={i}
              value={liveRating && s.value.includes("★") ? liveRating : s.value}
              label={s.label}
              divider={`${i < 2 ? "border-b border-white/10 lg:border-b-0" : ""} ${
                i % 2 === 0 ? "border-r border-white/10 lg:border-r-0" : ""
              } ${i > 0 ? "lg:border-l lg:border-white/10" : ""}`}
            />
          ))}
        </div>
      </Reveal>
    </div>
  );
}
