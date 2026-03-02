/**
 * Analytics Module (DSGVO-konform)
 * Analytics mit Cookie-Consent-Integration für UmrechnerPro.de
 */

// === COOKIE CONSENT ===

export type ConsentCategory = 'necessary' | 'statistics' | 'marketing';

export interface ConsentState {
  necessary: boolean;
  statistics: boolean;
  marketing: boolean;
  timestamp: number;
}

const CONSENT_KEY = 'umrechnerpro_consent';

/**
 * Consent-Status abrufen
 */
export function getConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

/**
 * Consent setzen
 */
export function setConsent(consent: Omit<ConsentState, 'timestamp'>): void {
  const state: ConsentState = {
    ...consent,
    timestamp: Date.now()
  };
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
    
    // Scripts basierend auf Consent laden
    if (consent.statistics) {
      loadAnalytics();
    }
    if (consent.marketing) {
      loadMarketing();
    }
  }
}

/**
 * Prüft ob Consent erteilt wurde
 */
export function hasConsent(): boolean {
  return getConsent() !== null;
}

/**
 * Prüft Consent für eine bestimmte Kategorie
 */
export function hasConsentFor(category: ConsentCategory): boolean {
  const consent = getConsent();
  if (!consent) return false;
  return consent[category] === true;
}

// === GOOGLE ANALYTICS (DSGVO-konform) ===

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

/**
 * Lädt Google Analytics nur nach Consent
 */
function loadAnalytics(): void {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;
  
  // Google Tag Script einfügen
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);
  
  // gtag initialisieren
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    anonymize_ip: true, // DSGVO-Anforderung
    cookie_flags: 'SameSite=None;Secure'
  });
}

// === ADSENSE (nach Marketing-Consent) ===

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || '';

/**
 * Lädt AdSense nur nach Marketing-Consent
 */
function loadMarketing(): void {
  if (!ADSENSE_CLIENT_ID || typeof window === 'undefined') return;
  
  const script = document.createElement('script');
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
  script.async = true;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}

// === EVENT TRACKING ===

/**
 * Trackt eine Conversion
 */
export function trackConversion(toolSlug: string, fromUnit: string, toUnit: string): void {
  if (!hasConsentFor('statistics') || !window.gtag) return;
  
  window.gtag('event', 'conversion', {
    event_category: 'Converter',
    event_label: `${toolSlug}: ${fromUnit} → ${toUnit}`,
    tool_slug: toolSlug,
    from_unit: fromUnit,
    to_unit: toUnit
  });
}

/**
 * Trackt eine Suche
 */
export function trackSearch(query: string): void {
  if (!hasConsentFor('statistics') || !window.gtag) return;
  
  window.gtag('event', 'search', {
    search_term: query
  });
}

/**
 * Trackt einen Copy-Vorgang
 */
export function trackCopy(toolSlug: string): void {
  if (!hasConsentFor('statistics') || !window.gtag) return;
  
  window.gtag('event', 'copy_result', {
    event_category: 'Engagement',
    event_label: toolSlug
  });
}

/**
 * Trackt einen Affiliate-Klick
 */
export function trackAffiliateClick(affiliateId: string, toolSlug: string): void {
  if (!hasConsentFor('statistics') || !window.gtag) return;
  
  window.gtag('event', 'affiliate_click', {
    event_category: 'Affiliate',
    event_label: affiliateId,
    tool_slug: toolSlug
  });
}

/**
 * Trackt Favorite-Toggle
 */
export function trackFavorite(toolSlug: string, added: boolean): void {
  if (!hasConsentFor('statistics') || !window.gtag) return;
  
  window.gtag('event', added ? 'add_favorite' : 'remove_favorite', {
    event_category: 'Engagement',
    event_label: toolSlug
  });
}

/**
 * Trackt Seitenaufruf
 */
export function trackPageView(path: string): void {
  if (!hasConsentFor('statistics') || !window.gtag) return;
  
  window.gtag('event', 'page_view', {
    page_path: path
  });
}
