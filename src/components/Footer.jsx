import { useI18n } from "../i18n/LanguageContext.jsx";
import { CONTACT } from "../lib/config.js";
import { Logo } from "./Navbar.jsx";
import { Icon } from "./ui.jsx";

export default function Footer() {
  const { t } = useI18n();

  const quick = [
    { href: "#services", label: t("nav.services") },
    { href: "#work", label: t("nav.work") },
    { href: "#how", label: t("nav.how") },
    { href: "#faq", label: t("nav.faq") },
    { href: "#contact", label: t("nav.contact") },
  ];
  const services = t("services.items").slice(0, 5).map((s) => s.title);

  return (
    <footer className="grain relative overflow-hidden bg-ink-950 text-slate-300">
      <div className="mesh-dark pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">{t("footer.about")}</p>
            <div className="mt-6 flex gap-3">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition hover:bg-brand-600"
              >
                <Icon.instagram className="h-5 w-5" />
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition hover:bg-brand-600"
              >
                <Icon.facebook className="h-5 w-5" />
              </a>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition hover:bg-emerald-500"
              >
                <Icon.whatsapp className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">{t("footer.quickLinks")}</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quick.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-slate-400 transition hover:text-brand-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">{t("footer.servicesTitle")}</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-slate-400 transition hover:text-brand-300">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">{t("footer.contactTitle")}</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={CONTACT.phoneHref} className="flex items-center gap-2.5 text-slate-400 transition hover:text-brand-300">
                  <Icon.phone className="h-4 w-4 text-brand-400" />
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="flex items-center gap-2.5 text-slate-400 transition hover:text-brand-300">
                  <Icon.mail className="h-4 w-4 text-brand-400" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <Icon.clock className="h-4 w-4 text-brand-400" />
                {t("footer.hours")}
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <Icon.pin className="h-4 w-4 text-brand-400" />
                {t("footer.area")}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-sm text-slate-500">© 2026 AutoFix Cyprus. {t("footer.rights")}</p>
          <div className="flex gap-5 text-sm text-slate-500">
            {t("footer.legal").map((l) => (
              <a key={l} href="#top" className="transition hover:text-brand-300">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
