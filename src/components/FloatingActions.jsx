import { useEffect, useState } from "react";
import { useI18n } from "../i18n/LanguageContext.jsx";
import { CONTACT } from "../lib/config.js";
import { Icon } from "./ui.jsx";

export default function FloatingActions() {
  const { t } = useI18n();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop / tablet: floating WhatsApp + back-to-top */}
      <div className="fixed bottom-5 right-5 z-40 hidden flex-col items-end gap-3 sm:flex">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t("floating.top")}
          className={`grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-ink-800 text-slate-300 shadow-lg transition-all hover:text-brand-400 ${
            showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
          }`}
        >
          <Icon.arrowUp className="h-5 w-5" />
        </button>
        <a
          href={CONTACT.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("floating.whatsapp")}
          style={{ animationDelay: "0.9s", animationFillMode: "both" }}
          className="pulse-ring anim-pop group flex items-center gap-0 overflow-hidden rounded-full bg-emerald-500 p-4 text-white shadow-xl shadow-emerald-500/30 transition-all hover:scale-105 hover:bg-emerald-600"
        >
          <Icon.whatsapp className="h-6 w-6 shrink-0" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:ml-2 group-hover:max-w-[160px]">
            {t("floating.whatsapp")}
          </span>
        </a>
      </div>

      {/* Mobile: sticky bottom action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-white/10 bg-ink-950/95 backdrop-blur-lg sm:hidden">
        <a
          href={CONTACT.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-brand-400"
        >
          <Icon.phone className="h-5 w-5" />
          {t("floating.call")}
        </a>
        <span className="my-2 w-px bg-white/10" />
        <a
          href={CONTACT.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-emerald-400"
        >
          <Icon.whatsapp className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </>
  );
}
