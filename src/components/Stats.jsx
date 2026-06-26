import { useI18n } from "../i18n/LanguageContext.jsx";
import { Reveal, useCountUp } from "./ui.jsx";
import { useGoogleReviews } from "../lib/reviews.js";

// "500+" → {prefix:"", num:500, suffix:"+", decimals:0}; "24/7" counts to 24 with "/7" suffix
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
    <div className={`relative px-6 py-7 text-center ${divider}`}>
      <div ref={ref} className="tabular text-3xl font-bold tracking-tight text-ink-950 lg:text-[2.6rem]">
        {num === null ? value : `${prefix}${n}`}
        <span className="text-marigold-500">{suffix}</span>
      </div>
      <div className="spec mt-2 text-[0.62rem] text-slate-500">{label}</div>
    </div>
  );
}

export default function Stats() {
  const { t } = useI18n();
  const stats = t("stats");
  const rev = useGoogleReviews();
  // The "★" stat is the customer rating — show the live Google value when available.
  const liveRating = rev?.ok && rev.rating ? Number(rev.rating).toFixed(1) + "★" : null;

  return (
    <div className="relative z-10 mx-auto -mt-14 max-w-6xl px-5 lg:px-8">
      <Reveal variant="scale" className="paper relative overflow-hidden rounded-2xl shadow-[var(--shadow-lift)]">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Stat
              key={i}
              value={liveRating && s.value.includes("★") ? liveRating : s.value}
              label={s.label}
              divider={`${i < 2 ? "border-b border-slate-200 lg:border-b-0" : ""} ${
                i % 2 === 0 ? "border-r border-slate-200 lg:border-r-0" : ""
              } ${i > 0 ? "lg:border-l lg:border-slate-200" : ""}`}
            />
          ))}
        </div>
      </Reveal>
    </div>
  );
}
