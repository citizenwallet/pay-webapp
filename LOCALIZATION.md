# Localization System

This document describes the localization implementation for the Brussels Pay webapp.

## Overview

The localization system supports three languages:
- English (en)
- French (fr) 
- Dutch (nl)

## Architecture

### Client-Side Detection
- Language is detected from browser settings (`navigator.language`)
- User preferences are stored in `localStorage`
- URL parameters (`?lang=fr`) override stored preferences

### Server-Side Rendering
- Language is detected from HTTP headers (`Accept-Language`)
- Server-side pages receive language as a parameter
- Translations are rendered on the server for better SEO

## Usage

### Client-Side Components

```tsx
import { useTranslation } from "@/lib/use-translation";

function MyComponent() {
  const { t, language, setLanguage } = useTranslation();
  
  return (
    <div>
      <h1>{t("welcome")}</h1>
      <button onClick={() => setLanguage("fr")}>
        Switch to French
      </button>
    </div>
  );
}
```

### Server-Side Pages

```tsx
import { tServer, getLanguageFromHeaders } from "@/lib/i18n";
import { headers } from "next/headers";

export default async function Page() {
  const headersList = await headers();
  const language = getLanguageFromHeaders(headersList);
  
  return (
    <div>
      <h1>{tServer("welcome", language)}</h1>
    </div>
  );
}
```

### Language Selector Component

```tsx
import { LanguageSelector } from "@/components/ui/language-selector";

function Header() {
  return (
    <header>
      <LanguageSelector />
    </header>
  );
}
```

## URL Structure

Language can be specified via URL parameters:

- `/card/123?lang=fr` - French
- `/card/123?lang=nl` - Dutch  
- `/card/123?lang=en` - English

## Adding New Translations

1. Add translations to the `translations` object in `src/lib/i18n.ts`:

```ts
const translations: LocaleData = {
  en: {
    new_key: "English translation",
  },
  fr: {
    new_key: "Traduction française",
  },
  nl: {
    new_key: "Nederlandse vertaling",
  },
};
```

2. Use the translation key in your components:

```tsx
// Client-side
const { t } = useTranslation();
t("new_key")

// Server-side
tServer("new_key", language)
```

## Language Detection Priority

1. URL parameter (`?lang=fr`)
2. Stored preference (`localStorage`)
3. Browser language (`navigator.language`)
4. Default to English

## Server-Side Language Detection

The server detects language from the `Accept-Language` header:

```
Accept-Language: fr-FR,fr;q=0.9,en;q=0.8
```

This allows for proper server-side rendering with the correct language.

## Utilities

### `getLanguageFromHeaders(headers)`
Detects language from HTTP headers for server-side rendering.

### `getLanguageFromSearchParams(searchParams)`
Extracts language from URL search parameters.

### `addLanguageToUrl(url, language)`
Adds language parameter to a URL.

### `getNavigationLink(serialNumber, options)`
Generates navigation links with language support.

## Migration Guide

### From Old System

1. Replace `t("key")` with `tServer("key", language)` in server components
2. Use `useTranslation()` hook in client components
3. Add language parameter to page props where needed
4. Update navigation links to include language parameter

### Example Migration

```tsx
// Before
import { t } from "@/lib/i18n";
export default function Page() {
  return <h1>{t("welcome")}</h1>;
}

// After
import { tServer, getLanguageFromHeaders } from "@/lib/i18n";
import { headers } from "next/headers";

export default async function Page() {
  const headersList = await headers();
  const language = getLanguageFromHeaders(headersList);
  
  return <h1>{tServer("welcome", language)}</h1>;
}
``` 