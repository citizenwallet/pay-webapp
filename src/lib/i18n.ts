export type Language = "en" | "fr" | "nl";

export interface Translations {
  [key: string]: string;
}

export interface LocaleData {
  [key: string]: Translations;
}

// Translation data
const translations: LocaleData = {
  en: {
    // Common
    anonymous: "Anonymous",
    anonymous_username: "@anonymous",

    // Navigation & Actions
    setup_card: "Setup Card",
    try_again: "Try again:",
    download_for_ios: "Download for iOS",
    download_for_android: "Download for Android",

    // Landing Page
    welcome_to_brussels_pay: "Welcome to Brussels Pay",
    brussels_pay_subtitle: "Your NFC card system for Brussels Pay",
    scan_nfc_card: "Scan Your NFC Card",
    scan_nfc_description:
      "Hold your phone near your card to access your account information",
    enable_nfc: "Enable NFC",
    enable_nfc_description: "Make sure NFC is enabled on your phone",
    tap_your_card: "Tap Your Card",
    tap_card_description: "Hold your phone close to your Brussels Pay card",

    // Transactions
    no_transactions_yet: "No transactions yet",
    order_number: "Order #{id}",
    items: "Items:",
    description: "Description:",

    // Setup
    use_anonymously: "Use Anonymously",
    continue_anonymously: "Continue Anonymously",
    brussels_pay_app_not_found:
      "Brussels Pay app not found. Download it to configure your card:",
    setup_description: "Pay app, even if you start using it anonymously.",

    // Setup Page
    brussels_pay: "Brussels Pay",
    welcome: "Welcome",
    you_have_scanned_a_new_card: "You have scanned a new card",
    choose_how_you_would_like_to_use_your_card:
      "Choose how you would like to use your card",
    setup_your_card: "Setup Your Card",
    open_brussels_pay_to_configure_your_card_settings:
      "Open Brussels Pay to configure your card settings",
    customize_card_settings: "Customize card settings",
    set_up_security_features: "Set up security features",
    personalize_your_card: "Personalize your card",
    or: "or",
    start_using_your_card_right_away_without_registration:
      "Start using your card right away without registration",
    no_registration_required: "No registration required",
    start_using_immediately: "Start using immediately",
    basic_card_functionality: "Basic card functionality",
    good_to_know: "Good to know",
    you_can_always_claim_your_card_later_through_the_brussels_pay_app_even_if_you_start_using_it_anonymously:
      "You can always claim your card later through the Brussels Pay app, even if you start using it anonymously",
    supporting_our_community_through_local_payments:
      "Supporting our community through local payments",

    // Card Information
    card: "Card",
    card_information: "Card Information",
    project: "Project",
    card_type: "Card Type",
    brussels_pay_nfc: "Brussels Pay NFC",
    serial_number: "Serial Number",
    is_this_your_card: "Is this your card?",
    using_your_secured_card: "Using your secured card",
    using_your_secured_card_description:
      "Your card is secured with a PIN. You can import it to your Brussels Pay app to manage your settings and view your transactions.",
    security: "Security",
    owner: "Owner",

    // Status
    item: "Item",
    more_items: "more items",
  },
  fr: {
    // Common
    anonymous: "Anonyme",
    anonymous_username: "@anonyme",

    // Navigation & Actions
    setup_card: "Configurer la carte",
    try_again: "Réessayer :",
    download_for_ios: "Télécharger pour iOS",
    download_for_android: "Télécharger pour Android",

    // Landing Page
    welcome_to_brussels_pay: "Bienvenue sur Brussels Pay",
    brussels_pay_subtitle: "Votre système de carte NFC pour Brussels Pay",
    scan_nfc_card: "Scannez votre carte NFC",
    scan_nfc_description:
      "Approchez votre téléphone de votre carte pour accéder aux informations de votre compte",
    enable_nfc: "Activer NFC",
    enable_nfc_description:
      "Assurez-vous que NFC est activé sur votre téléphone",
    tap_your_card: "Tapez votre carte",
    tap_card_description:
      "Approchez votre téléphone de votre carte Brussels Pay",

    // Transactions
    no_transactions_yet: "Aucune transaction pour le moment",
    order_number: "Commande #{id}",
    items: "Articles :",
    description: "Description :",

    // Setup
    use_anonymously: "Utiliser anonymement",
    continue_anonymously: "Continuer anonymement",
    brussels_pay_app_not_found:
      "Application Brussels Pay introuvable. Téléchargez-la pour configurer votre carte :",
    setup_description:
      "Pay app, même si vous commencez à l'utiliser anonymement.",

    // Setup Page
    brussels_pay: "Brussels Pay",
    welcome: "Bienvenue",
    you_have_scanned_a_new_card: "Vous avez scanné une nouvelle carte",
    choose_how_you_would_like_to_use_your_card:
      "Choisissez comment vous souhaitez utiliser votre carte",
    setup_your_card: "Configurer votre carte",
    open_brussels_pay_to_configure_your_card_settings:
      "Ouvrez Brussels Pay pour configurer les paramètres de votre carte",
    customize_card_settings: "Personnaliser les paramètres de la carte",
    set_up_security_features: "Configurer les fonctionnalités de sécurité",
    personalize_your_card: "Personnaliser votre carte",
    or: "ou",
    start_using_your_card_right_away_without_registration:
      "Commencez à utiliser votre carte immédiatement sans inscription",
    no_registration_required: "Aucune inscription requise",
    start_using_immediately: "Commencez à utiliser immédiatement",
    basic_card_functionality: "Fonctionnalités de base de la carte",
    good_to_know: "Bon à savoir",
    you_can_always_claim_your_card_later_through_the_brussels_pay_app_even_if_you_start_using_it_anonymously:
      "Vous pouvez toujours réclamer votre carte plus tard via l'application Brussels Pay, même si vous commencez à l'utiliser anonymement",
    supporting_our_community_through_local_payments:
      "Soutenir notre communauté grâce aux paiements locaux",

    // Card Information
    card: "Carte",
    card_information: "Informations de la carte",
    project: "Projet",
    card_type: "Type de carte",
    brussels_pay_nfc: "Brussels Pay NFC",
    serial_number: "Numéro de série",
    is_this_your_card: "Est-ce votre carte ?",
    using_your_secured_card: "Utilisation de votre carte sécurisée",
    using_your_secured_card_description:
      "Votre carte est sécurisée avec un code PIN. Vous pouvez l'importer dans votre application Brussels Pay pour gérer vos paramètres et consulter vos transactions.",
    security: "Sécurité",
    owner: "Propriétaire",

    // Status
    item: "Article",
    more_items: "articles supplémentaires",
  },
  nl: {
    // Common
    anonymous: "Anoniem",
    anonymous_username: "@anoniem",

    // Navigation & Actions
    setup_card: "Kaart instellen",
    try_again: "Opnieuw proberen:",
    download_for_ios: "Downloaden voor iOS",
    download_for_android: "Downloaden voor Android",

    // Landing Page
    welcome_to_brussels_pay: "Welkom bij Brussels Pay",
    brussels_pay_subtitle: "Je NFC kaart systeem voor Brussels Pay",
    scan_nfc_card: "Scan je NFC kaart",
    scan_nfc_description:
      "Houd je telefoon dicht bij je kaart om toegang te krijgen tot je account informatie",
    enable_nfc: "NFC inschakelen",
    enable_nfc_description:
      "Zorg ervoor dat NFC is ingeschakeld op je telefoon",
    tap_your_card: "Tik je kaart",
    tap_card_description: "Houd je telefoon dicht bij je Brussels Pay kaart",

    // Transactions
    no_transactions_yet: "Nog geen transacties",
    order_number: "Bestelling #{id}",
    items: "Artikelen:",
    description: "Beschrijving:",

    // Setup
    use_anonymously: "Anoniem gebruiken",
    continue_anonymously: "Anoniem doorgaan",
    brussels_pay_app_not_found:
      "Brussels Pay app niet gevonden. Download het om je kaart te configureren:",
    setup_description: "Pay app, zelfs als je anoniem begint te gebruiken.",

    // Setup Page
    brussels_pay: "Brussels Pay",
    welcome: "Welkom",
    you_have_scanned_a_new_card: "Je hebt een nieuwe kaart gescand",
    choose_how_you_would_like_to_use_your_card:
      "Kies hoe je je kaart wilt gebruiken",
    setup_your_card: "Je kaart instellen",
    open_brussels_pay_to_configure_your_card_settings:
      "Open Brussels Pay om je kaartinstellingen te configureren",
    customize_card_settings: "Kaartinstellingen aanpassen",
    set_up_security_features: "Beveiligingsfuncties instellen",
    personalize_your_card: "Je kaart personaliseren",
    or: "of",
    start_using_your_card_right_away_without_registration:
      "Begin direct met het gebruik van je kaart zonder registratie",
    no_registration_required: "Geen registratie vereist",
    start_using_immediately: "Direct beginnen met gebruiken",
    basic_card_functionality: "Basis kaartfunctionaliteit",
    good_to_know: "Goed om te weten",
    you_can_always_claim_your_card_later_through_the_brussels_pay_app_even_if_you_start_using_it_anonymously:
      "Je kunt je kaart altijd later opeisen via de Brussels Pay app, zelfs als je anoniem begint met gebruiken",
    supporting_our_community_through_local_payments:
      "Onze gemeenschap ondersteunen door lokale betalingen",

    // Card Information
    card: "Kaart",
    card_information: "Kaartinformatie",
    project: "Project",
    card_type: "Kaarttype",
    brussels_pay_nfc: "Brussels Pay NFC",
    serial_number: "Serienummer",
    is_this_your_card: "Is dit jouw kaart?",
    using_your_secured_card: "Je beveiligde kaart gebruiken",
    using_your_secured_card_description:
      "Je kaart is beveiligd met een PIN. Je kunt hem importeren in je Brussels Pay app om je instellingen te beheren en je transacties te bekijken.",
    security: "Beveiliging",
    owner: "Eigenaar",

    // Status
    item: "Artikel",
    more_items: "meer artikelen",
  },
};

// Language detection
export function getBrowserLanguage(): Language {
  if (typeof window === "undefined") return "en";

  const browserLang = navigator.language.toLowerCase();

  if (browserLang.startsWith("fr")) return "fr";
  if (browserLang.startsWith("nl")) return "nl";

  return "en";
}

// Get current language with fallback
export function getCurrentLanguage(): Language {
  if (typeof window === "undefined") return "en";

  const stored = localStorage.getItem("language") as Language;
  if (stored && ["en", "fr", "nl"].includes(stored)) {
    return stored;
  }

  return getBrowserLanguage();
}

// Set language
export function setLanguage(lang: Language): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("language", lang);
}

// Translation function
export function t(
  key: string,
  params?: Record<string, string | number>
): string {
  const lang = getCurrentLanguage();
  const translation =
    translations[lang]?.[key] || translations["en"]?.[key] || key;

  if (!params) return translation;

  return translation.replace(/\{(\w+)\}/g, (match, param) => {
    return String(params[param] || match);
  });
}
