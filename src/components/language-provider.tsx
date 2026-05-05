"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Check, Languages } from "lucide-react";
import { languages, translate, type Language, type TranslationKey } from "@/lib/translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const storageKey = "quickfix-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const id = window.setTimeout(() => {
      const saved = window.localStorage.getItem(storageKey);
      if (saved === "en" || saved === "es") {
        setLanguageState(saved);
      }
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(storageKey, nextLanguage);
    document.documentElement.lang = nextLanguage;
  }

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t: (key) => translate(language, key),
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}

export function T({ k }: { k: TranslationKey }) {
  const { t } = useLanguage();
  return <>{t(k)}</>;
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="inline-flex max-w-full flex-wrap items-center gap-1 rounded-lg border border-[#cddde4] bg-white p-1 shadow-sm" aria-label={t("nav.language")}>
      {!compact && <Languages className="ml-2 h-4 w-4 shrink-0 text-[#5c6f77]" />}
      {languages.map((item) => {
        const active = item.code === language;
        return (
          <button
            key={item.code}
            type="button"
            aria-pressed={active}
            onClick={() => setLanguage(item.code)}
            className={`inline-flex min-h-9 shrink-0 items-center justify-center gap-1 rounded-md px-2.5 text-xs font-black leading-4 transition ${compact ? "min-w-12" : "px-3"} ${
              active ? "bg-[#0f6bff] text-white shadow-sm" : "text-[#39505a] hover:bg-[#eef6f9] hover:text-[#102027]"
            }`}
          >
            {active && <Check className="h-3.5 w-3.5 shrink-0" />}
            {compact ? item.code.toUpperCase() : item.label}
          </button>
        );
      })}
    </div>
  );
}
