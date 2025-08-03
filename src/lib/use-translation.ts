import { t, tServer, type Language } from "./i18n";
import { useLanguage } from "./i18n-context";

// Hook for React components
export function useTranslation() {
  const { language, setLanguage } = useLanguage();

  return {
    t,
    language,
    setLanguage,
  };
}

// Server-side translation hook
export function useServerTranslation(language: Language) {
  return {
    t: (key: string, params?: Record<string, string | number>) =>
      tServer(key, language, params),
    language,
  };
}
