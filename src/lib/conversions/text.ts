/**
 * Text-Werkzeuge (Text Utilities)
 * Textverarbeitung für UmrechnerPro.de
 */

// === WÖRTER & ZEICHEN ZÄHLEN ===

export interface TextStatistics {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  averageWordLength: number;
  averageSentenceLength: number;
  readingTime: number; // in Minuten
  speakingTime: number; // in Minuten
}

/**
 * Berechnet Textstatistiken
 */
export function calculateTextStatistics(text: string): TextStatistics {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  
  // Wörter (unter Berücksichtigung von Umlauten und ß)
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  
  // Sätze
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  
  // Absätze
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
  
  // Zeilen
  const lines = text.split('\n').length;
  
  // Durchschnittliche Wortlänge
  const wordList = text.trim().split(/\s+/).filter(w => w.length > 0);
  const averageWordLength = words > 0 
    ? wordList.reduce((sum, w) => sum + w.length, 0) / words 
    : 0;
  
  // Durchschnittliche Satzlänge
  const averageSentenceLength = sentences > 0 ? words / sentences : 0;
  
  // Lesezeit (Ø 200 Wörter/Minute für Deutsch)
  const readingTime = words / 200;
  
  // Sprechzeit (Ø 150 Wörter/Minute)
  const speakingTime = words / 150;
  
  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs: Math.max(1, paragraphs),
    lines,
    averageWordLength: Math.round(averageWordLength * 10) / 10,
    averageSentenceLength: Math.round(averageSentenceLength * 10) / 10,
    readingTime: Math.ceil(readingTime),
    speakingTime: Math.ceil(speakingTime)
  };
}

// === TEXT-TRANSFORMATION ===

/**
 * Kehrt Text um
 */
export function reverseText(text: string): string {
  return text.split('').reverse().join('');
}

/**
 * Wandelt in Großbuchstaben um
 */
export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

/**
 * Wandelt in Kleinbuchstaben um
 */
export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

/**
 * Wortweise Groß-/Kleinschreibung
 */
export function toTitleCase(text: string): string {
  return text.toLowerCase().replace(/(?:^|\s)\S/g, char => char.toUpperCase());
}

/**
 * Alternierende Groß-/Kleinschreibung
 */
export function toAlternatingCase(text: string): string {
  return text.split('').map((char, i) => 
    i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
  ).join('');
}

/**
 * Leet Speak Konvertierung
 */
export function toLeetSpeak(text: string): string {
  const leetMap: Record<string, string> = {
    'a': '4', 'A': '4',
    'b': '8', 'B': '8',
    'e': '3', 'E': '3',
    'g': '6', 'G': '6',
    'h': '#', 'H': '#',
    'i': '1', 'I': '1',
    'l': '1', 'L': '1',
    'o': '0', 'O': '0',
    's': '5', 'S': '5',
    't': '7', 'T': '7',
    'z': '2', 'Z': '2'
  };
  
  return text.split('').map(char => leetMap[char] || char).join('');
}

/**
 * Sortiert Buchstaben alphabetisch
 */
export function sortLetters(text: string, descending: boolean = false): string {
  const letters = text.split('');
  letters.sort((a, b) => {
    const comparison = a.toLowerCase().localeCompare(b.toLowerCase());
    return descending ? -comparison : comparison;
  });
  return letters.join('');
}

/**
 * Entfernt Duplikate
 */
export function removeDuplicates(text: string): string {
  return [...new Set(text)].join('');
}

/**
 * Zählt Häufigkeit von Wörtern
 */
export function countWordFrequency(text: string, topN: number = 10): Array<{ word: string; count: number }> {
  const words = text.toLowerCase()
    .replace(/[^\w\säöüß]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2);
  
  const frequency: Record<string, number> = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  return Object.entries(frequency)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);
}

// === LIMITS ===

/**
 * Zeichenlimits für verschiedene Plattformen
 */
export const characterLimits = {
  twitter: 280,
  instagram: 2200,
  facebook: 63206,
  linkedin: 3000,
  sms: 160,
  smsGsm7: 160,
  smsUcs2: 70,
  metaDescription: 155,
  metaTitle: 60
};

/**
 * Prüft Zeichenlimit
 */
export function checkCharacterLimit(text: string, limit: number): {
  characters: number;
  limit: number;
  remaining: number;
  exceeded: boolean;
} {
  const characters = text.length;
  return {
    characters,
    limit,
    remaining: limit - characters,
    exceeded: characters > limit
  };
}
