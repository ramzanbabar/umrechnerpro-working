/**
 * Zeit-Umrechner (Time Conversion)
 * Umrechnung von Zeiteinheiten für UmrechnerPro.de
 * 
 * Basis-Einheit: Sekunde (s)
 */

export type TimeUnit = 
  | 'ns'      // Nanosekunde
  | 'µs'      // Mikrosekunde
  | 'ms'      // Millisekunde
  | 's'       // Sekunde (Basis)
  | 'min'     // Minute
  | 'h'       // Stunde
  | 'd'       // Tag
  | 'w'       // Woche
  | 'mo'      // Monat (Durchschnitt)
  | 'yr'      // Jahr
  | 'dec'     // Jahrzehnt
  | 'cent'    // Jahrhundert
  | 'mil';    // Millennium

// Umrechnungsfaktoren zur Basis-Einheit Sekunde
export const timeToSecond: Record<TimeUnit, number> = {
  ns: 1e-9,               // Nanosekunde
  µs: 1e-6,               // Mikrosekunde
  ms: 1e-3,               // Millisekunde
  s: 1,                   // Sekunde (Basis)
  min: 60,                // Minute
  h: 3600,                // Stunde
  d: 86400,               // Tag (24h)
  w: 604800,              // Woche (7 Tage)
  mo: 2629746,            // Monat (Ø 30,44 Tage)
  yr: 31556952,           // Jahr (Julianisches Jahr = 365,25 Tage)
  dec: 315569520,         // Jahrzehnt
  cent: 3155695200,       // Jahrhundert
  mil: 31556952000        // Millennium
};

// Deutsche Bezeichnungen
export const timeUnitNames: Record<TimeUnit, string> = {
  ns: 'Nanosekunde',
  µs: 'Mikrosekunde',
  ms: 'Millisekunde',
  s: 'Sekunde',
  min: 'Minute',
  h: 'Stunde',
  d: 'Tag',
  w: 'Woche',
  mo: 'Monat',
  yr: 'Jahr',
  dec: 'Jahrzehnt',
  cent: 'Jahrhundert',
  mil: 'Millennium'
};

// Symbole
export const timeUnitSymbols: Record<TimeUnit, string> = {
  ns: 'ns',
  µs: 'µs',
  ms: 'ms',
  s: 's',
  min: 'min',
  h: 'h',
  d: 'd',
  w: 'w',
  mo: 'Mo',
  yr: 'J',
  dec: 'Dek',
  cent: 'Jh',
  mil: 'Jt'
};

/**
 * Wandelt einen Zeitwert um
 */
export function convertTime(value: number, from: TimeUnit, to: TimeUnit): number {
  const inSeconds = value * timeToSecond[from];
  return inSeconds / timeToSecond[to];
}

/**
 * Gibt alle verfügbaren Zeiteinheiten zurück
 */
export function getAllTimeUnits(): TimeUnit[] {
  return Object.keys(timeToSecond) as TimeUnit[];
}

/**
 * Gibt die gängigsten Zeiteinheiten zurück
 */
export function getCommonTimeUnits(): TimeUnit[] {
  return ['ms', 's', 'min', 'h', 'd', 'w'];
}
