import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/LanguageContext.jsx";
import { CONTACT } from "../lib/config.js";
import { Icon } from "./ui.jsx";

export function Logo({ light = false }) {
  return (
    <a href="#top" className="group flex items-center" aria-label="AutoFix Cyprus — home">
      <img
        src={light ? "/img/logo-light.png" : "/img/logo-dark.png"}
        alt="AutoFix Cyprus"
        width="729"
        height="168"
        className="h-9 w-auto transition-transform group-hover:scale-[1.03] sm:h-10"
      />
    </a>
  );
}

function LanguageSwitcher({ light = false }) {
  const { lang, setLang, locales } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
          light
            ? "border-white/25 bg-white/10 text-white backdrop-blur hover:border-white/40"
            : "border-slate-200 bg-white/70 text-slate-700 hover:border-brand-300 hover:text-brand-700"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{locales[lang].flag}</span>
        <span>{locales[lang].short}</span>
        <Icon.chevron className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul
          className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-slate-100 bg-white p-1 shadow-xl shadow-slate-900/10"
          role="listbox"
        >
          {Object.entries(locales).map(([code, l]) => (
            <li key={code}>
              <button
                onClick={() => {
                  setLang(code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  lang === code ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50"
                }`}
                role="option"
                aria-selected={lang === code}
              >
                <span className="text-base">{l.flag}</span>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav link for the section in view
  useEffect(() => {
    const ids = ["services", "work", "how", "faq", "contact"];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  const links = [
    { href: "#services", id: "services", label: t("nav.services") },
    { href: "#work", id: "work", label: t("nav.work") },
    { href: "#how", id: "how", label: t("nav.how") },
    { href: "#faq", id: "faq", label: t("nav.faq") },
    { href: "#contact", id: "contact", label: t("nav.contact") },
  ];

  // Light theme at the top (over the dark video hero); dark theme once scrolled (over white page)
  const light = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-slate-200/70 bg-white/80 backdrop-blur-xl shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo light={light} />

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                light
                  ? `text-white/85 hover:bg-white/10 hover:text-white ${active === l.id ? "text-white" : ""}`
                  : `hover:bg-slate-100/70 hover:text-brand-700 ${active === l.id ? "text-brand-700" : "text-slate-600"}`
              }`}
            >
              {l.label}
              <span
                className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full transition-all duration-300 ${
                  light ? "bg-white" : "bg-brand-600"
                } ${active === l.id ? "opacity-100" : "opacity-0"}`}
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher light={light} />
          <a
            href={CONTACT.phoneHref}
            className={`hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition sm:flex ${
              light ? "text-white/90 hover:text-white" : "text-slate-700 hover:text-brand-700"
            }`}
          >
            <Icon.phone className="h-4 w-4" />
            <span className="hidden xl:inline">{CONTACT.phoneDisplay}</span>
          </a>
          <a
            href="#contact"
            className="btn-shine hidden items-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 sm:inline-flex"
          >
            {t("nav.request")}
            <Icon.arrowRight className="h-4 w-4" />
          </a>
          <button
            onClick={() => setMenu(true)}
            className={`grid h-10 w-10 place-items-center rounded-xl border transition lg:hidden ${
              light ? "border-white/25 bg-white/10 text-white backdrop-blur" : "border-slate-200 bg-white/70 text-slate-700"
            }`}
            aria-label="Open menu"
          >
            <Icon.menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Scroll-reading progress */}
      <div
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-brand-500 via-brand-600 to-brand-400 transition-[width] duration-150"
        style={{ width: `${progress}%`, opacity: scrolled ? 1 : 0 }}
      />

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 overflow-hidden lg:hidden ${menu ? "" : "pointer-events-none"}`}
        aria-hidden={!menu}
      >
        <div
          className={`absolute inset-0 bg-ink-950/40 backdrop-blur-sm transition-opacity ${menu ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenu(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[82%] max-w-sm bg-white p-6 shadow-2xl transition-transform duration-300 ${
            menu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              onClick={() => setMenu(false)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700"
              aria-label="Close menu"
            >
              <Icon.close className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-8 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenu(false)}
                className="rounded-xl px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="mt-8 space-y-3">
            <a
              href="#contact"
              onClick={() => setMenu(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25"
            >
              {t("nav.request")}
              <Icon.arrowRight className="h-4 w-4" />
            </a>
            <a
              href={CONTACT.phoneHref}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3.5 text-base font-semibold text-slate-700"
            >
              <Icon.phone className="h-4 w-4" />
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
