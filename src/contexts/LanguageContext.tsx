"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Dictionary } from "../locales/types";
import { pt } from "../locales/pt";
import { en } from "../locales/en";
import { es } from "../locales/es";

type Language = "pt" | "en" | "es";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // Load preference from local storage
    const storedLang = localStorage.getItem("verifylive_lang") as Language;
    if (storedLang && ["pt", "en", "es"].includes(storedLang)) {
      setLanguageState(storedLang);
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "en" || browserLang === "es") {
        setLanguageState(browserLang as Language);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("verifylive_lang", lang);
  };

  const dictionaries: Record<Language, Dictionary> = { pt, en, es };
  const t = dictionaries[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
