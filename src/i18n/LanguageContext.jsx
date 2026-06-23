import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { translations, LOCALES } from "./translations.js";

const LanguageContext = createContext(null);

function detectInitial() {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("afc-lang");
  if (saved && translations[saved]) return saved;
  const nav = (navigator.language || "en").toLowerCase();
  for (const code of ["ru", "el", "de", "it", "es", "fr"]) {
    if (nav.startsWith(code)) return code;
  }
  return "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectInitial);

  useEffect(() => {
    localStorage.setItem("afc-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // t("hero.subtitle") → string, t("stats") → array/object
  const t = useCallback(
    (path) => {
      const parts = path.split(".");
      let node = translations[lang];
      for (const p of parts) {
        node = node?.[p];
        if (node === undefined) return path;
      }
      return node;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, locales: LOCALES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
