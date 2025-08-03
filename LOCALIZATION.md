# Localization System

This project now includes a comprehensive localization system that supports English (EN), French (FR), and Dutch (NL) languages.

## Features

- **Automatic Language Detection**: Uses the user's browser language preference
- **Fallback System**: Falls back to English if the user's language is not supported
- **Language Persistence**: Remembers the user's language choice in localStorage
- **Language Selector**: UI component to switch between languages
- **Parameter Support**: Supports dynamic text with parameters (e.g., "Order #{id}")

## Supported Languages

- **EN** (English) - Default fallback language
- **FR** (French) - Français
- **NL** (Dutch) - Nederlands

## Implementation

### Core Files

1. **`src/lib/i18n.ts`** - Main localization library
   - Translation data for all supported languages
   - Language detection and management functions
   - Translation function with parameter support
   - React hook for components

2. **`src/components/ui/language-selector.tsx`** - Language switcher component
   - Dropdown with flag icons and language names
   - Responsive design (shows flags on mobile, full names on desktop)

### Key Functions

```typescript
// Get current language (with fallback)
getCurrentLanguage(): Language

// Set language preference
setLanguage(lang: Language): void

// Translate text with optional parameters
t(key: string, params?: Record<string, string | number>): string

// React hook for components
useTranslation(): { t, language, setLanguage, getBrowserLanguage }
```

### Usage in Components

```typescript
import { useTranslation } from "@/lib/i18n";

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome_to_brussels_pay')}</h1>
      <p>{t('order_number', { id: 123 })}</p>
    </div>
  );
}
```

## Translation Keys

The system includes translations for:

### Common
- `anonymous` - "Anonymous" / "Anonyme" / "Anoniem"
- `anonymous_username` - "@anonymous" / "@anonyme" / "@anoniem"

### Navigation & Actions
- `setup_card` - "Setup Card" / "Configurer la carte" / "Kaart instellen"
- `try_again` - "Try again:" / "Réessayer :" / "Opnieuw proberen:"
- `download_for_ios` - "Download for iOS" / "Télécharger pour iOS" / "Downloaden voor iOS"
- `download_for_android` - "Download for Android" / "Télécharger pour Android" / "Downloaden voor Android"

### Landing Page
- `welcome_to_brussels_pay` - "Welcome to Brussels Pay" / "Bienvenue sur Brussels Pay" / "Welkom bij Brussels Pay"
- `brussels_pay_subtitle` - "Your NFC card system for Brussels Pay" / "Votre système de carte NFC pour Brussels Pay" / "Je NFC kaart systeem voor Brussels Pay"
- `scan_nfc_card` - "Scan Your NFC Card" / "Scannez votre carte NFC" / "Scan je NFC kaart"
- `scan_nfc_description` - "Hold your phone near your card to access your account information" / "Approchez votre téléphone de votre carte pour accéder aux informations de votre compte" / "Houd je telefoon dicht bij je kaart om toegang te krijgen tot je account informatie"
- `enable_nfc` - "Enable NFC" / "Activer NFC" / "NFC inschakelen"
- `enable_nfc_description` - "Make sure NFC is enabled on your phone" / "Assurez-vous que NFC est activé sur votre téléphone" / "Zorg ervoor dat NFC is ingeschakeld op je telefoon"
- `tap_your_card` - "Tap Your Card" / "Tapez votre carte" / "Tik je kaart"
- `tap_card_description` - "Hold your phone close to your Brussels Pay card" / "Approchez votre téléphone de votre carte Brussels Pay" / "Houd je telefoon dicht bij je Brussels Pay kaart"

### Transactions
- `no_transactions_yet` - "No transactions yet" / "Aucune transaction pour le moment" / "Nog geen transacties"
- `order_number` - "Order #{id}" / "Commande #{id}" / "Bestelling #{id}"
- `items` - "Items:" / "Articles :" / "Artikelen:"
- `description` - "Description:" / "Description :" / "Beschrijving:"

### Setup
- `use_anonymously` - "Use Anonymously" / "Utiliser anonymement" / "Anoniem gebruiken"
- `continue_anonymously` - "Continue Anonymously" / "Continuer anonymement" / "Anoniem doorgaan"
- `brussels_pay_app_not_found` - "Brussels Pay app not found. Download it to configure your card:" / "Application Brussels Pay introuvable. Téléchargez-la pour configurer votre carte :" / "Brussels Pay app niet gevonden. Download het om je kaart te configureren:"
- `setup_description` - "Pay app, even if you start using it anonymously." / "Pay app, même si vous commencez à l'utiliser anonymement." / "Pay app, zelfs als je anoniem begint te gebruiken."

### Status
- `item` - "Item" / "Article" / "Artikel"
- `more_items` - "more items" / "articles supplémentaires" / "meer artikelen"

## Browser Language Detection

The system automatically detects the user's browser language:

1. **Primary Language**: Checks if the browser language starts with 'fr' or 'nl'
2. **Fallback**: Defaults to English for all other languages
3. **Persistence**: Once a user selects a language, it's stored in localStorage

## Language Selector

The language selector component provides:

- **Visual Indicators**: Flag emojis for each language
- **Responsive Design**: Shows flags on mobile, full names on desktop
- **Current Selection**: Highlights the currently selected language
- **Easy Switching**: One-click language switching

## Adding New Translations

To add new translations:

1. **Add the key to all language objects** in `src/lib/i18n.ts`:

```typescript
en: {
  // ... existing translations
  new_key: "English text",
},
fr: {
  // ... existing translations
  new_key: "French text",
},
nl: {
  // ... existing translations
  new_key: "Dutch text",
}
```

2. **Use the translation in components**:

```typescript
const { t } = useTranslation();
return <div>{t('new_key')}</div>;
```

## Parameter Support

For dynamic text with parameters:

```typescript
// Translation with parameter
t('order_number', { id: 123 }) // "Order #123" / "Commande #123" / "Bestelling #123"

// Multiple parameters
t('welcome_user', { name: 'John', count: 5 }) // "Welcome John, you have 5 items"
```

## Integration Points

The localization system is integrated into:

- **Main Layout** (`src/app/layout.tsx`): Sets HTML lang attribute
- **Landing Page** (`src/app/page.tsx`): All user-facing text
- **Transaction Cards** (`src/components/tx-card.tsx`): Transaction-related text
- **Setup Components** (`src/components/wallet/setup-card-button.tsx`): Setup flow text
- **Anonymous Button** (`src/app/card/[serialNumber]/setup/anonymous-button.tsx`): Anonymous usage text

## Testing

To test the localization:

1. **Browser Language**: Change your browser language to French or Dutch
2. **Language Selector**: Use the globe icon in the header to switch languages
3. **Persistence**: Refresh the page to verify language preference is saved

## Future Enhancements

Potential improvements:

- **RTL Support**: For languages that read right-to-left
- **Pluralization**: Support for different plural forms
- **Date/Number Formatting**: Locale-specific formatting
- **Currency Formatting**: Local currency display
- **More Languages**: Additional language support as needed 