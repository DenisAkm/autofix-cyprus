import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/LanguageContext.jsx";
import { Reveal } from "./ui.jsx";
import SectionHeader from "./SectionHeader.jsx";

export default function HowItWorks() {
  const { t } = useI18n();
  const steps = t("how.steps");
  const gridRef = useRef(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="how" className="on-dark relative overflow-hidden bg-ink-900 py-20 lg:py-28">
      <div className="grain pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader eyebrow={t("nav.how")} title={t("how.title")} subtitle={t("how.subtitle")} />

        <div ref={gridRef} className="relative mt-16 grid gap-8 md:grid-cols-3">
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-9 hidden h-px overflow-visible md:block">
            <div
              className={`h-full origin-left bg-white/12 transition-transform duration-[1300ms] ease-out ${
                drawn ? "scale-x-100" : "scale-x-0"
              }`}
            />
            {drawn && (
              <span
                className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-brand-400"
                style={{ animation: "travel 3.5s ease-in-out infinite" }}
              />
            )}
          </div>

          {steps.map((s, i) => (
            <Reveal key={i} variant="scale" delay={i * 160} className="relative text-center">
              <div className="relative mx-auto grid h-[70px] w-[70px] place-items-center rounded-sm border border-white/10 bg-ink-800">
                <span className="font-serif text-2xl font-semibold text-brand-400">{s.n}</span>
              </div>
              <h3 className="mt-6 text-xl font-medium text-white">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-slate-300">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
