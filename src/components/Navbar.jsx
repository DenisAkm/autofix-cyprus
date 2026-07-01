import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/LanguageContext.jsx";
import { CONTACT } from "../lib/config.js";
import { Icon } from "./ui.jsx";

export function Logo() {
  return (
    <a
      href="#top"
      aria-label="AutoFix Cyprus — home"
      className="group inline-flex flex-col leading-none transition-transform hover:scale-[1.02]"
    >
      <span className="font-serif text-[1.4rem] font-semibold text-white sm:text-[1.5rem]">
        Auto<span className="italic text-brand-400">Fix</span>
      </span>
      <span className="caps mt-1 text-[0.5rem] text-slate-400" style={{ letterSpacing: "0.34em" }}>
        Cyprus
      </span>
    </a>
  );
}

function LanguageSwitcher() {
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
        className="flex items-center gap-1.5 rounded-sm border border-white/20 bg-white/[0.06] px-3 py-1.5 text-sm font-medium text-white backdrop-blur transition hover:border-white/40"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{locales[lang].flag}</span>
        <span>{locales[lang].short}</span>
        <Icon.chevron className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul
          className="absolute right-0 mt-2 w-44 overflow-hidden rounded-sm border border-white/10 bg-ink-900 p-1 shadow-2xl shadow-black/60"
          role="listbox"
        >
          {Object.entries(locales).map(([code, l]) => (
            <li key={code}>
              <button
                onClick={() => {
                  setLang(code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 rounded-sm px-3 py-2 text-sm font-medium transition ${
                  lang === code ? "bg-white/[0.06] text-brand-300" : "text-slate-300 hover:bg-white/5 hover:text-white"
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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b border-white/10 bg-ink-950/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Logo />

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative whitespace-nowrap rounded-sm px-3.5 py-2 text-sm font-medium transition hover:text-white ${
                  active === l.id ? "text-white" : "text-slate-300"
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-0.5 h-px bg-brand-400 transition-all duration-300 ${
                    active === l.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <a
              href={CONTACT.phoneHref}
              className="hidden items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-white sm:flex"
            >
              <Icon.phone className="h-4 w-4" />
              <span className="hidden xl:inline">{CONTACT.phoneDisplay}</span>
            </a>
            <a
              href="#contact"
              className="btn-shine hidden items-center gap-2 rounded-sm bg-brand-400 px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-brand-300 sm:inline-flex"
            >
              {t("nav.request")}
              <Icon.arrowRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => setMenu(true)}
              className="grid h-10 w-10 place-items-center rounded-sm border border-white/20 bg-white/[0.06] text-white backdrop-blur transition lg:hidden"
              aria-label="Open menu"
            >
              <Icon.menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        <div
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-brand-400 transition-[width] duration-150"
          style={{ width: `${progress}%`, opacity: scrolled ? 1 : 0 }}
        />
      </header>

      {/* Mobile menu — rendered OUTSIDE <header>: when scrolled the header gets
          backdrop-filter, which would make it the containing block for this
          position:fixed overlay and clip it to the navbar's height. */}
      <div
        className={`fixed inset-0 z-50 overflow-hidden lg:hidden ${menu ? "" : "pointer-events-none"}`}
        aria-hidden={!menu}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${menu ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenu(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[82%] max-w-sm border-l border-white/10 bg-ink-950 p-6 shadow-2xl transition-transform duration-300 ${
            menu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              onClick={() => setMenu(false)}
              className="grid h-10 w-10 place-items-center rounded-sm border border-white/15 text-white"
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
                className="rounded-sm px-4 py-3 text-base font-medium text-slate-200 transition hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="mt-8 space-y-3">
            <a
              href="#contact"
              onClick={() => setMenu(false)}
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-brand-400 px-5 py-3.5 text-base font-semibold text-ink-950"
            >
              {t("nav.request")}
              <Icon.arrowRight className="h-4 w-4" />
            </a>
            <a
              href={CONTACT.phoneHref}
              className="flex w-full items-center justify-center gap-2 rounded-sm border border-white/15 px-5 py-3.5 text-base font-semibold text-white"
            >
              <Icon.phone className="h-4 w-4" />
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
