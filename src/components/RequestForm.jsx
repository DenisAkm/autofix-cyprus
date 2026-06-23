import { useState } from "react";
import { useI18n } from "../i18n/LanguageContext.jsx";
import { CONTACT, CITIES, buildWhatsappLink } from "../lib/config.js";
import { Icon, Eyebrow, Reveal } from "./ui.jsx";

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink-800">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100";

export default function RequestForm() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = t("form.errName");
    if (!form.phone.trim()) errs.phone = t("form.errPhone");
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const phone = form.phone.trim() ? `+357 ${form.phone.trim()}` : "";
    window.open(buildWhatsappLink({ ...form, phone }), "_blank", "noopener");
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-20 lg:py-28">
      <div className="mesh pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Info panel */}
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-ink-950 p-8 text-white lg:p-10">
            <div className="mesh-dark pointer-events-none absolute inset-0" />
            <div className="relative">
              <Eyebrow dark>{t("nav.contact")}</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight">{t("form.title")}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{t("form.subtitle")}</p>

              <div className="mt-8 space-y-4">
                <a href={CONTACT.phoneHref} className="group flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15 transition group-hover:bg-brand-600">
                    <Icon.phone className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-slate-400">{t("nav.callNow")}</span>
                    <span className="block break-words font-semibold">{CONTACT.phoneDisplay}</span>
                  </span>
                </a>
                <a href={CONTACT.emailHref} className="group flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15 transition group-hover:bg-brand-600">
                    <Icon.mail className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-slate-400">Email</span>
                    <span className="block break-words font-semibold">{CONTACT.email}</span>
                  </span>
                </a>
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    <Icon.clock className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold">{t("footer.hours")}</span>
                    <span className="block text-xs text-emerald-300">{t("footer.emergency")}</span>
                  </span>
                </div>
                <a href={CONTACT.mapLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15 transition group-hover:bg-brand-600">
                    <Icon.pin className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block break-words font-semibold">{CONTACT.address}</span>
                    <span className="block text-xs text-slate-400">{t("footer.area")}</span>
                  </span>
                </a>
              </div>

              {/* Map */}
              <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-white/15">
                <iframe
                  title="AutoFix Cyprus location on Google Maps"
                  src={CONTACT.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-44 w-full"
                />
              </div>

              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600"
              >
                <Icon.whatsapp className="h-5 w-5" />
                {t("floating.whatsapp")}
              </a>
            </div>
          </Reveal>

          {/* Form / success */}
          <Reveal delay={100} className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-xl shadow-ink-900/5 lg:p-10">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                  <Icon.whatsapp className="h-10 w-10" />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold text-ink-900">{t("form.successTitle")}</h3>
                <p className="mt-2 max-w-sm text-slate-600">{t("form.successDesc")}</p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", phone: "", city: "", service: "", message: "" });
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-brand-300 hover:text-brand-700"
                >
                  <Icon.arrowRight className="h-4 w-4 rotate-180" />
                  {t("form.title")}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t("form.name")} required>
                    <input
                      className={`${inputCls} ${errors.name ? "border-red-300 ring-4 ring-red-50" : ""}`}
                      placeholder={t("form.namePh")}
                      value={form.name}
                      onChange={set("name")}
                    />
                    {errors.name && <span className="mt-1 block text-xs font-medium text-red-500">{errors.name}</span>}
                  </Field>
                  <Field label={t("form.phone")} required>
                    <div
                      className={`flex overflow-hidden rounded-xl border bg-white transition focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-100 ${
                        errors.phone ? "border-red-300 ring-4 ring-red-50" : "border-slate-200"
                      }`}
                    >
                      <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-[15px] font-semibold text-slate-500">
                        +357
                      </span>
                      <input
                        type="tel"
                        inputMode="tel"
                        className="w-full bg-white px-4 py-3 text-[15px] text-ink-900 outline-none placeholder:text-slate-400"
                        placeholder={t("form.phonePh")}
                        value={form.phone}
                        onChange={set("phone")}
                      />
                    </div>
                    {errors.phone && <span className="mt-1 block text-xs font-medium text-red-500">{errors.phone}</span>}
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t("form.city")}>
                    <div className="relative">
                      <select className={`${inputCls} appearance-none pr-10`} value={form.city} onChange={set("city")}>
                        <option value="">{t("form.cityPh")}</option>
                        {CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <Icon.chevron className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </Field>
                  <Field label={t("form.service")}>
                    <div className="relative">
                      <select className={`${inputCls} appearance-none pr-10`} value={form.service} onChange={set("service")}>
                        <option value="">{t("form.servicePh")}</option>
                        {t("form.serviceOptions").map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <Icon.chevron className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </Field>
                </div>

                <Field label={t("form.message")}>
                  <textarea
                    rows={3}
                    className={`${inputCls} resize-none`}
                    placeholder={t("form.messagePh")}
                    value={form.message}
                    onChange={set("message")}
                  />
                </Field>

                {/* Photos — clarified: attached in the WhatsApp chat after sending (no fake upload) */}
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                    <Icon.camera className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-ink-900">{t("form.photoTitle")}</div>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-slate-500">{t("form.photoNote")}</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-shine flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-4 text-base font-semibold text-white shadow-xl shadow-brand-600/30 transition hover:bg-brand-700"
                >
                  <Icon.whatsapp className="h-5 w-5" />
                  {t("form.submit")}
                </button>
                <p className="text-center text-sm text-slate-500">
                  {t("form.orCall")}{" "}
                  <a href={CONTACT.phoneHref} className="font-semibold text-brand-600 hover:underline">
                    {CONTACT.phoneDisplay}
                  </a>
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
