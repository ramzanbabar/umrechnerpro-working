/**
 * Utility Functions
 * Gemeinsame Hilfsfunktionen für UmrechnerPro.de
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Kombiniert CSS-Klassen mit Tailwind-Merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Debounce-Funktion
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Throttle-Funktion
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Generiert einen URL-sicheren Slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äöüß]/g, (char) => {
      const map: Record<string, string> = { ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' };
      return map[char] || char;
    })
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Kopiert Text in die Zwischenablage
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback für ältere Browser
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    }
  } catch {
    return false;
  }
}

/**
 * Prüft ob die Eingabe eine gültige Zahl ist
 */
export function isValidNumber(value: string): boolean {
  // Akzeptiert sowohl Punkt als auch Komma als Dezimaltrennzeichen
  const normalized = value.replace(',', '.');
  return !isNaN(parseFloat(normalized)) && isFinite(parseFloat(normalized));
}

/**
 * Normalisiert eine Zahleneingabe zu JavaScript-Number
 */
export function normalizeNumber(value: string): number {
  // Entferne Tausendertrennzeichen und ersetze Komma durch Punkt
  let normalized = value.trim();
  
  if (normalized.includes(',') && !normalized.includes('.')) {
    // Deutsches Format: Komma als Dezimaltrennzeichen
    normalized = normalized.replace(',', '.');
  } else if (normalized.includes('.') && normalized.includes(',')) {
    // Gemischtes Format: Entferne Tausendertrennzeichen
    if (normalized.lastIndexOf(',') > normalized.lastIndexOf('.')) {
      // Komma ist Dezimaltrennzeichen
      normalized = normalized.replace(/\./g, '').replace(',', '.');
    } else {
      // Punkt ist Dezimaltrennzeichen
      normalized = normalized.replace(/,/g, '');
    }
  }
  
  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Lokaler Storage-Wrapper mit Fallback
 */
export const storage = {
  get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  
  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or unavailable
    }
  },
  
  remove(key: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(key);
    } catch {
      // Storage unavailable
    }
  }
};

/**
 * Favoriten verwalten
 */
export const favorites = {
  KEY: 'umrechnerpro_favorites',
  MAX: 10,
  
  getAll(): string[] {
    return storage.get<string[]>(this.KEY, []);
  },
  
  add(toolSlug: string): string[] {
    const current = this.getAll();
    const filtered = current.filter(s => s !== toolSlug);
    const updated = [toolSlug, ...filtered].slice(0, this.MAX);
    storage.set(this.KEY, updated);
    return updated;
  },
  
  remove(toolSlug: string): string[] {
    const current = this.getAll();
    const updated = current.filter(s => s !== toolSlug);
    storage.set(this.KEY, updated);
    return updated;
  },
  
  toggle(toolSlug: string): { isFavorite: boolean; favorites: string[] } {
    const current = this.getAll();
    const isFavorite = current.includes(toolSlug);
    
    if (isFavorite) {
      return { isFavorite: false, favorites: this.remove(toolSlug) };
    } else {
      return { isFavorite: true, favorites: this.add(toolSlug) };
    }
  },
  
  isFavorite(toolSlug: string): boolean {
    return this.getAll().includes(toolSlug);
  }
};

/**
 * Umrechnungsverlauf verwalten
 */
export const history = {
  KEY: 'umrechnerpro_history',
  MAX: 5,
  
  getAll(): Array<{ toolSlug: string; from: string; to: string; value: number; result: number; timestamp: number }> {
    return storage.get(this.KEY, []);
  },
  
  add(entry: { toolSlug: string; from: string; to: string; value: number; result: number }): void {
    const current = this.getAll();
    const updated = [
      { ...entry, timestamp: Date.now() },
      ...current.filter(h => h.toolSlug !== entry.toolSlug || h.from !== entry.from || h.to !== entry.to)
    ].slice(0, this.MAX);
    storage.set(this.KEY, updated);
  },
  
  clear(): void {
    storage.remove(this.KEY);
  }
};

/**
 * Formatiert ein Datum auf Deutsch
 */
export function formatDate(date: Date, format: 'short' | 'long' | 'full' = 'long'): string {
  const optionsMap: Record<'short' | 'long' | 'full', Intl.DateTimeFormatOptions> = {
    short: { day: '2-digit', month: '2-digit', year: 'numeric' },
    long: { day: 'numeric', month: 'long', year: 'numeric' },
    full: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  };
  const options = optionsMap[format];
  
  return date.toLocaleDateString('de-DE', options);
}

/**
 * Berechnet die Lesezeit
 */
export function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  const wordsPerMinute = 200; // Durchschnitt für Deutsch
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Scrollt sanft zu einem Element
 */
export function scrollToElement(elementId: string, offset: number = 80): void {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/**
 * Prüft ob ein Element im Viewport ist
 */
export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
