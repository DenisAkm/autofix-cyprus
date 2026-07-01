import { useState } from "react";
import { useI18n } from "../i18n/LanguageContext.jsx";
import { CONTACT } from "../lib/config.js";
import { Icon, Reveal } from "./ui.jsx";
import SectionHeader from "./SectionHeader.jsx";

function Item({ q, a, open, onToggle }) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm border transition-all duration-300 ${
        open ? "border-brand-400/40 bg-white/[0.03]" : "border-white/10 bg-white/[0.02] hover:border-white/20"
      }`}
    >
      <span
        className={`absolute left-0 top-1/2 w-0.5 -translate-y-1/2 bg-brand-400 transition-all duration-300 ${
          open ? "h-2/3" : "h-0"
        }`}
      />
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left" aria-expanded={open}>
        <span className={`text-[15px] font-medium transition-colors sm:text-base ${open ? "text-white" : "text-slate-200"}`}>
          {q}
        </span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
            open ? "rotate-180 bg-brand-400 text-ink-950" : "bg-white/[0.06] text-slate-400"
          }`}
        >
          <Icon.chevron className="h-4 w-4" />
        </span>
      </button>
      <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <p
            className={`px-5 pb-5 text-[15px] leading-relaxed text-slate-300 transition-all duration-300 ${
              open ? "translate-y-0 opacity-100 delay-100" : "-translate-y-1 opacity-0"
            }`}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useI18n();
  const items = t("faq.items");
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader eyebrow={t("nav.faq")} title={t("faq.title")} subtitle={t("faq.subtitle")} center={false} />

          <Reveal className="card-dark relative mt-8 overflow-hidden rounded-sm p-6">
            <h3 className="font-serif text-lg font-medium text-white">{t("faq.stillTitle")}</h3>
            <p className="mt-1 text-sm text-slate-300">{t("faq.stillDesc")}</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-brand-400 px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-brand-300"
              >
                <Icon.whatsapp className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 rounded-sm border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/5"
              >
                <Icon.phone className="h-4 w-4" />
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 40}>
              <Item q={item.q} a={item.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
