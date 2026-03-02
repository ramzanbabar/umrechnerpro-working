/**
 * Schuhgrößen-Umrechner (Shoe Size Conversion)
 * Umrechnung von Schuhgrößen für UmrechnerPro.de
 */

export type ShoeSizeSystem = 'EU' | 'UK' | 'US_Men' | 'US_Women' | 'CM' | 'JP';

/**
 * EU zu Fußlänge (cm)
 */
export function euToCm(eu: number): number {
  // EU-Formel: (EU + 2) × 0.667 ≈ Fußlänge in cm
  return (eu + 2) * 0.667;
}

/**
 * Fußlänge (cm) zu EU
 */
export function cmToEu(cm: number): number {
  return (cm / 0.667) - 2;
}

/**
 * EU zu UK
 */
export function euToUk(eu: number): number {
  // UK = (EU - 2) × 0.75 - 25
  return (eu - 2) * 0.75 - 25;
}

/**
 * UK zu EU
 */
export function ukToEu(uk: number): number {
  return (uk + 25) / 0.75 + 2;
}

/**
 * UK zu US (Herren)
 */
export function ukToUsMen(uk: number): number {
  return uk + 1;
}

/**
 * US (Herren) zu UK
 */
export function usMenToUk(us: number): number {
  return us - 1;
}

/**
 * UK zu US (Damen)
 */
export function ukToUsWomen(uk: number): number {
  return uk + 2.5;
}

/**
 * US (Damen) zu UK
 */
export function usWomenToUk(us: number): number {
  return us - 2.5;
}

/**
 * Allgemeine Schuhgrößen-Umrechnung
 */
export function convertShoeSize(value: number, from: ShoeSizeSystem, to: ShoeSizeSystem): number {
  // Erst zu cm konvertieren
  let cm: number;
  
  switch (from) {
    case 'CM': cm = value; break;
    case 'JP': cm = value; break; // Japan = cm
    case 'EU': cm = euToCm(value); break;
    case 'UK': cm = euToCm(ukToEu(value)); break;
    case 'US_Men': cm = euToCm(ukToEu(usMenToUk(value))); break;
    case 'US_Women': cm = euToCm(ukToEu(usWomenToUk(value))); break;
    default: cm = value;
  }
  
  // Dann von cm zur Zieleinheit
  switch (to) {
    case 'CM': return cm;
    case 'JP': return Math.round(cm); // Japan gerundet
    case 'EU': return cmToEu(cm);
    case 'UK': return euToUk(cmToEu(cm));
    case 'US_Men': return ukToUsMen(euToUk(cmToEu(cm)));
    case 'US_Women': return ukToUsWomen(euToUk(cmToEu(cm)));
    default: return cm;
  }
}

/**
 * Namen der Schuhgrößensysteme
 */
export const shoeSizeSystemNames: Record<ShoeSizeSystem, string> = {
  EU: 'EU (Europa)',
  UK: 'UK (Großbritannien)',
  US_Men: 'US (Herren)',
  US_Women: 'US (Damen)',
  CM: 'CM (Zentimeter)',
  JP: 'JP (Japan)'
};

/**
 * Schuhgrößen-Tabelle für häufige Größen
 */
export const shoeSizeTable = [
  { eu: 35, uk: 2, usMen: 3, usWomen: 4.5, cm: 22 },
  { eu: 36, uk: 3, usMen: 4, usWomen: 5.5, cm: 23 },
  { eu: 37, uk: 4, usMen: 5, usWomen: 6.5, cm: 24 },
  { eu: 38, uk: 5, usMen: 6, usWomen: 7.5, cm: 24.5 },
  { eu: 39, uk: 6, usMen: 7, usWomen: 8.5, cm: 25 },
  { eu: 40, uk: 6.5, usMen: 7.5, usWomen: 9, cm: 25.5 },
  { eu: 41, uk: 7, usMen: 8, usWomen: 9.5, cm: 26 },
  { eu: 42, uk: 8, usMen: 9, usWomen: 10.5, cm: 27 },
  { eu: 43, uk: 9, usMen: 10, usWomen: 11.5, cm: 27.5 },
  { eu: 44, uk: 9.5, usMen: 10.5, usWomen: 12, cm: 28 },
  { eu: 45, uk: 10.5, usMen: 11.5, usWomen: 13, cm: 29 },
  { eu: 46, uk: 11, usMen: 12, usWomen: 13.5, cm: 29.5 },
  { eu: 47, uk: 12, usMen: 13, usWomen: 14.5, cm: 30 },
  { eu: 48, uk: 13, usMen: 14, usWomen: 15.5, cm: 31 },
];
