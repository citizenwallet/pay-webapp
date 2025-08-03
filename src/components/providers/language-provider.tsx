"use client";

import { useEffect } from "react";
import { getCurrentLanguage } from "@/lib/i18n";
import { LanguageProvider as I18nLanguageProvider } from "@/lib/i18n-context";
import { useSearchParams } from "next/navigation";

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Update the HTML lang attribute based on the current language
    const updateLanguage = () => {
      // Check for language parameter in URL first
      const urlLang = searchParams.get("lang");
      if (urlLang && ["en", "fr", "nl"].includes(urlLang)) {
        document.documentElement.lang = urlLang;
        return;
      }

      const currentLanguage = getCurrentLanguage();
      document.documentElement.lang = currentLanguage;
    };

    // Set initial language
    updateLanguage();

    // Listen for language changes in localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "language") {
        updateLanguage();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [searchParams]);

  return <I18nLanguageProvider>{children}</I18nLanguageProvider>;
}
