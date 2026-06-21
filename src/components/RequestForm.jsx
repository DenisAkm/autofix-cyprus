import { useState } from "react";
import { useI18n } from "../i18n/LanguageContext.jsx";
import { CONTACT, CITIES, HOURS, buildWhatsappLink } from "../lib/config.js";
import { Icon, Eyebrow, Reveal } from "./ui.jsx";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink-800">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] text-ink-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100";

export default function RequestForm() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", phone: "", city: "", service: "", message: "" });
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onFiles = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 6);
    setPhotos(files.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = t("form.errName");
    if (!form.phone.trim()) errs.phone = t("form.errPhone");
    setErrors(errs);
    if (Object.keys(errs).length) return;
    window.open(buildWhatsappLink(form), "_blank", "noopener");
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
                  <span>
                    <span className="block text-xs text-slate-400">{t("nav.callNow")}</span>
                    <span className="block font-semibold">{CONTACT.phoneDisplay}</span>
                  </span>
                </a>
                <a href={CONTACT.emailHref} className="group flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15 transition group-hover:bg-brand-600">
                    <Icon.mail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-400">Email</span>
                    <span className="block font-semibold">{CONTACT.email}</span>
                  </span>
                </a>
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    <Icon.clock className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold">{t("footer.hours")}</span>
                    <span className="block text-xs text-emerald-300">{t("footer.emergency")}</span>
                  </span>
                </div>
                <a href={CONTACT.mapLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15 transition group-hover:bg-brand-600">
                    <Icon.pin className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold">{CONTACT.address}</span>
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
                    setPhotos([]);
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
                  <Field label={t("form.name")}>
                    <input
                      className={`${inputCls} ${errors.name ? "border-red-300 ring-4 ring-red-50" : ""}`}
                      placeholder={t("form.namePh")}
                      value={form.name}
                      onChange={set("name")}
                    />
                    {errors.name && <span className="mt-1 block text-xs font-medium text-red-500">{errors.name}</span>}
                  </Field>
                  <Field label={t("form.phone")}>
                    <input
                      type="tel"
                      className={`${inputCls} ${errors.phone ? "border-red-300 ring-4 ring-red-50" : ""}`}
                      placeholder={t("form.phonePh")}
                      value={form.phone}
                      onChange={set("phone")}
                    />
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

                {/* Photo upload */}
                <div>
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-4 py-6 text-center transition hover:border-brand-300 hover:bg-brand-50/40">
                    <Icon.upload className="h-6 w-6 text-brand-500" />
                    <span className="text-sm font-medium text-slate-500">{t("form.photoNote")}</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={onFiles} />
                  </label>
                  {photos.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {photos.map((p, i) => (
                        <img key={i} src={p.url} alt={p.name} className="h-16 w-16 rounded-lg object-cover ring-1 ring-slate-200" />
                      ))}
                    </div>
                  )}
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
