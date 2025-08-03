"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentLanguage, setLanguage, type Language } from "./i18n";
import { useSearchParams } from "next/navigation";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [language, setLanguageState] = useState<Language>(getCurrentLanguage());

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    setLanguageState(lang);
  };

  useEffect(() => {
    // Check for language parameter in URL first
    const urlLang = searchParams.get("lang") as Language;
    if (urlLang && ["en", "fr", "nl"].includes(urlLang)) {
      setLanguage(urlLang);
      setLanguageState(urlLang);
      return;
    }

    // Listen for language changes in localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "language") {
        setLanguageState(getCurrentLanguage());
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [searchParams]);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
