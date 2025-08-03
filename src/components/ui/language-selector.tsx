"use client";

import { useLanguage } from "@/lib/i18n-context";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Language } from "@/lib/i18n";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as Language);

    // Update URL with language parameter
    const params = new URLSearchParams(searchParams);
    params.set("lang", newLanguage);
    router.push(`?${params.toString()}`);
  };

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
        <SelectItem value="nl">Nederlands</SelectItem>
      </SelectContent>
    </Select>
  );
}
