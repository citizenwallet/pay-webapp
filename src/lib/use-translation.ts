import { t } from "./i18n";
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
