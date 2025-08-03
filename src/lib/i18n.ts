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
    add_funds: "Add Funds",
    setup_card: "Setup Card",
    try_again: "Try again:",
    download_for_ios: "Download for iOS",
    download_for_android: "Download for Android",
    back_to_transactions: "Back to Transactions",

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
    view_your_info: "View Your Info",
    access_your_card_details_and_account_information:
      "Access your card details and account information",
    instant_access: "Instant Access",
    quick_and_secure_card_information: "Quick and secure card information",
    community: "Community",
    supporting_local_payments: "Supporting local payments",
    dont_have_a_brussels_pay_card_yet: "Don't have a Brussels Pay card yet?",
    learn_more: "Learn More",

    // Transactions
    no_transactions_yet: "No transactions yet",
    order_number: "Order #{id}",
    transaction_number: "Transaction #{id}",
    items: "Items:",
    description: "Description:",
    amount: "Amount",
    status: "Status",
    order_date: "Order Date",
    qty: "Qty: {count}",
    total: "Total",

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
    import_card: "Import Card",
    pin: "PIN",
    no_pin: "No PIN",

    // Status
    item: "Item",
    more_items: "more items",
  },
  fr: {
    // Common
    anonymous: "Anonyme",
    anonymous_username: "@anonyme",

    // Navigation & Actions
    add_funds: "Ajouter des fonds",
    setup_card: "Configurer la carte",
    try_again: "Réessayer :",
    download_for_ios: "Télécharger pour iOS",
    download_for_android: "Télécharger pour Android",
    back_to_transactions: "Retour aux transactions",

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
    view_your_info: "Voir vos informations",
    access_your_card_details_and_account_information:
      "Accédez aux détails de votre carte et aux informations de votre compte",
    instant_access: "Accès instantané",
    quick_and_secure_card_information:
      "Informations de carte rapides et sécurisées",
    community: "Communauté",
    supporting_local_payments: "Soutenir les paiements locaux",
    dont_have_a_brussels_pay_card_yet:
      "Vous n'avez pas encore de carte Brussels Pay ?",
    learn_more: "En savoir plus",

    // Transactions
    no_transactions_yet: "Aucune transaction pour le moment",
    order_number: "Commande #{id}",
    transaction_number: "Transaction #{id}",
    items: "Articles :",
    description: "Description :",
    amount: "Montant",
    status: "Statut",
    order_date: "Date de commande",
    qty: "Qté : {count}",
    total: "Total",

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
    import_card: "Importer la carte",
    pin: "PIN",
    no_pin: "Aucun PIN",

    // Status
    item: "Article",
    more_items: "articles supplémentaires",
  },
  nl: {
    // Common
    anonymous: "Anoniem",
    anonymous_username: "@anoniem",

    // Navigation & Actions
    add_funds: "Fonds toevoegen",
    setup_card: "Kaart instellen",
    try_again: "Opnieuw proberen:",
    download_for_ios: "Downloaden voor iOS",
    download_for_android: "Downloaden voor Android",
    back_to_transactions: "Terug naar transacties",

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
    view_your_info: "Bekijk je informatie",
    access_your_card_details_and_account_information:
      "Toegang tot je kaartdetails en accountinformatie",
    instant_access: "Directe toegang",
    quick_and_secure_card_information: "Snelle en veilige kaartinformatie",
    community: "Gemeenschap",
    supporting_local_payments: "Lokale betalingen ondersteunen",
    dont_have_a_brussels_pay_card_yet: "Heb je nog geen Brussels Pay kaart?",
    learn_more: "Meer informatie",

    // Transactions
    no_transactions_yet: "Nog geen transacties",
    order_number: "Bestelling #{id}",
    transaction_number: "Transactie #{id}",
    items: "Artikelen:",
    description: "Beschrijving:",
    amount: "Bedrag",
    status: "Status",
    order_date: "Besteldatum",
    qty: "Aantal: {count}",
    total: "Totaal",

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
    import_card: "Kaart importeren",
    pin: "PIN",
    no_pin: "Geen PIN",

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

// Server-side language detection from headers
export function getServerLanguage(headers: Headers): Language {
  const acceptLanguage = headers.get("accept-language");
  if (!acceptLanguage) return "en";

  if (acceptLanguage.startsWith("fr")) return "fr";
  if (acceptLanguage.startsWith("nl")) return "nl";

  return "en";
}

// Set language
export function setLanguage(lang: Language): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("language", lang);
}

// Translation function with optional language parameter for SSR
export function t(
  key: string,
  params?: Record<string, string | number>,
  language?: Language
): string {
  const lang = language || getCurrentLanguage();
  const translation =
    translations[lang]?.[key] || translations["en"]?.[key] || key;

  if (!params) return translation;

  return translation.replace(/\{(\w+)\}/g, (match, param) => {
    return String(params[param] || match);
  });
}

// Server-side translation function
export function tServer(
  key: string,
  language: Language,
  params?: Record<string, string | number>
): string {
  return t(key, params, language);
}

// Utility function to get language from search params
export function getLanguageFromSearchParams(
  searchParams: URLSearchParams
): Language {
  const lang = searchParams.get("lang") as Language;
  if (lang && ["en", "fr", "nl"].includes(lang)) {
    return lang;
  }
  return "en";
}

// Utility function to add language parameter to URL
export function addLanguageToUrl(url: string, language: Language): string {
  const urlObj = new URL(url, "http://localhost");
  urlObj.searchParams.set("lang", language);
  return urlObj.pathname + urlObj.search;
}

// Utility function to get language from headers for server-side rendering
export function getLanguageFromHeaders(headers: Headers): Language {
  return getServerLanguage(headers);
}
