/**
 * SEO Helpers
 * SEO-Unterstützung für UmrechnerPro.de
 */

// === METADATEN ===

export const siteConfig = {
  name: 'UmrechnerPro',
  url: 'https://umrechnerpro.de',
  ogImage: '/og-image.png',
  links: {
    twitter: '',
    github: ''
  },
  creator: 'UmrechnerPro Team'
};

/**
 * Generiert Metadaten für Tool-Seiten
 */
export function generateToolMetadata(tool: {
  name: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
}) {
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: `${siteConfig.url}/tools/${tool.slug}`,
      siteName: siteConfig.name,
      locale: 'de_DE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
    alternates: {
      canonical: `${siteConfig.url}/tools/${tool.slug}`,
    }
  };
}

/**
 * Generiert Metadaten für Kategorie-Seiten
 */
export function generateCategoryMetadata(category: {
  name: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
}) {
  return {
    title: category.metaTitle,
    description: category.metaDescription,
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url: `${siteConfig.url}/kategorie/${category.slug}`,
      siteName: siteConfig.name,
      locale: 'de_DE',
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/kategorie/${category.slug}`,
    }
  };
}

// === JSON-LD STRUKTURIERTE DATEN ===

/**
 * WebApplication Schema für Converter-Tools
 */
export function generateWebApplicationSchema(tool: {
  name: string;
  shortDescription: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.shortDescription,
    url: `${siteConfig.url}/tools/${tool.slug}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR'
    },
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url
    }
  };
}

/**
 * FAQPage Schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Organization Schema (für Startseite)
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    description: 'Kostenlose Einheitenumrechner und Rechner für Deutschland, Österreich und Schweiz.',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'German'
    }
  };
}

/**
 * SiteLinksSearchBox Schema (für Startseite)
 */
export function generateSearchBoxSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/suche?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

// === SEO-HILFEN ===

/**
 * Generiert eine SEO-freundliche Überschrift
 */
export function generateSEOHeading(keyword: string, type: 'h1' | 'h2' | 'h3'): string {
  const templates = {
    h1: `${keyword} 2026 – Kostenlos & Sofort Online`,
    h2: `${keyword} – So funktioniert's`,
    h3: `Häufige Fragen zum ${keyword}`
  };
  
  return templates[type];
}

/**
 * Berechnet Keyword-Dichte
 */
export function calculateKeywordDensity(text: string, keyword: string): number {
  const words = text.toLowerCase().split(/\s+/);
  const keywordCount = words.filter(w => w.includes(keyword.toLowerCase())).length;
  return (keywordCount / words.length) * 100;
}

/**
 * Prüft ob Meta-Beschreibung optimal ist
 */
export function validateMetaDescription(description: string): {
  isValid: boolean;
  length: number;
  message: string;
} {
  const length = description.length;
  
  if (length < 120) {
    return { isValid: false, length, message: 'Zu kurz. Empfohlen: 150-160 Zeichen.' };
  }
  if (length > 160) {
    return { isValid: false, length, message: 'Zu lang. Wird in SERPs abgeschnitten.' };
  }
  return { isValid: true, length, message: 'Optimale Länge.' };
}

/**
 * Prüft ob Title optimal ist
 */
export function validateTitle(title: string): {
  isValid: boolean;
  length: number;
  message: string;
} {
  const length = title.length;
  
  if (length < 40) {
    return { isValid: false, length, message: 'Zu kurz. Empfohlen: 50-60 Zeichen.' };
  }
  if (length > 60) {
    return { isValid: false, length, message: 'Zu lang. Wird in SERPs abgeschnitten.' };
  }
  return { isValid: true, length, message: 'Optimale Länge.' };
}
