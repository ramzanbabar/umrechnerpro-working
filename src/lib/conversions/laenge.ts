/**
 * Längen-Umrechner (Length Conversion)
 * Umrechnung von Längeneinheiten für UmrechnerPro.de
 * 
 * Basis-Einheit: Meter (m)
 * Alle Werte basieren auf NIST-Standard
 */

// Alle unterstützten Längeneinheiten
export type LengthUnit = 
  | 'nm'    // Nanometer
  | 'µm'    // Mikrometer
  | 'mm'    // Millimeter
  | 'cm'    // Zentimeter
  | 'dm'    // Dezimeter
  | 'm'     // Meter (Basis)
  | 'km'    // Kilometer
  | 'in'    // Zoll (Inch)
  | 'ft'    // Fuß (Foot)
  | 'yd'    // Yard
  | 'mi'    // Meile (Statute Mile)
  | 'nmi'   // Seemeile (Nautical Mile)
  | 'mil'   // Mil (Tausendstel Zoll)
  | 'Å'     // Ångström
  | 'pm'    // Pikometer
  | 'ly'    // Lichtjahr
  | 'AU'    // Astronomische Einheit
  | 'pc';   // Parsec

// Umrechnungsfaktoren zur Basis-Einheit Meter
// Quellen: NIST Special Publication 811, SI-Brochure
export const lengthToMeter: Record<LengthUnit, number> = {
  pm: 1e-12,              // Pikometer
  nm: 1e-9,               // Nanometer
  µm: 1e-6,               // Mikrometer
  mm: 0.001,              // Millimeter
  cm: 0.01,               // Zentimeter
  dm: 0.1,                // Dezimeter
  m: 1,                   // Meter (Basis)
  km: 1000,               // Kilometer
  mil: 0.0000254,         // Mil (1/1000 Zoll)
  in: 0.0254,             // Zoll (exakt definiert)
  ft: 0.3048,             // Fuß (12 Zoll)
  yd: 0.9144,             // Yard (3 Fuß)
  mi: 1609.344,           // Internationale Meile
  nmi: 1852,              // Seemeile (exakt definiert)
  Å: 1e-10,               // Ångström
  ly: 9.4607304725808e15, // Lichtjahr (Julianisches Jahr)
  AU: 1.495978707e11,     // Astronomische Einheit
  pc: 3.08567758149137e16 // Parsec
};

// Deutsche Bezeichnungen für die Einheiten
export const lengthUnitNames: Record<LengthUnit, string> = {
  pm: 'Pikometer',
  nm: 'Nanometer',
  µm: 'Mikrometer',
  mm: 'Millimeter',
  cm: 'Zentimeter',
  dm: 'Dezimeter',
  m: 'Meter',
  km: 'Kilometer',
  mil: 'Mil',
  in: 'Zoll',
  ft: 'Fuß',
  yd: 'Yard',
  mi: 'Meile',
  nmi: 'Seemeile',
  Å: 'Ångström',
  ly: 'Lichtjahr',
  AU: 'Astronomische Einheit',
  pc: 'Parsec'
};

// Abkürzungen für die Einheiten
export const lengthUnitSymbols: Record<LengthUnit, string> = {
  pm: 'pm',
  nm: 'nm',
  µm: 'µm',
  mm: 'mm',
  cm: 'cm',
  dm: 'dm',
  m: 'm',
  km: 'km',
  mil: 'mil',
  in: 'in',
  ft: 'ft',
  yd: 'yd',
  mi: 'mi',
  nmi: 'nmi',
  Å: 'Å',
  ly: 'ly',
  AU: 'AU',
  pc: 'pc'
};

/**
 * Wandelt einen Längenwert von einer Einheit in eine andere um
 * @param value - Der umzurechnende Wert
 * @param from - Quell-Einheit
 * @param to - Ziel-Einheit
 * @returns Der umgerechnete Wert
 */
export function convertLength(value: number, from: LengthUnit, to: LengthUnit): number {
  // Zuerst zur Basis-Einheit (Meter) umrechnen
  const inMeters = value * lengthToMeter[from];
  // Dann von Meter zur Ziel-Einheit
  return inMeters / lengthToMeter[to];
}

/**
 * Gibt alle verfügbaren Längeneinheiten zurück
 */
export function getAllLengthUnits(): LengthUnit[] {
  return Object.keys(lengthToMeter) as LengthUnit[];
}

/**
 * Gibt die gängigsten Längeneinheiten zurück (für Quick-Select)
 */
export function getCommonLengthUnits(): LengthUnit[] {
  return ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd', 'mi'];
}

/**
 * Formel für die Anzeige
 */
export function getLengthFormula(from: LengthUnit, to: LengthUnit): string {
  if (from === to) return '1';
  const factor = lengthToMeter[from] / lengthToMeter[to];
  return `${factor}`;
}

// Beispiele für häufige Umrechnungen
export const lengthExamples = {
  'cm-in-zoll': {
    from: 'cm' as LengthUnit,
    to: 'in' as LengthUnit,
    example: '1 cm = 0,3937 Zoll'
  },
  'zoll-in-cm': {
    from: 'in' as LengthUnit,
    to: 'cm' as LengthUnit,
    example: '1 Zoll = 2,54 cm'
  },
  'meter-in-fuss': {
    from: 'm' as LengthUnit,
    to: 'ft' as LengthUnit,
    example: '1 m = 3,2808 Fuß'
  },
  'km-in-meilen': {
    from: 'km' as LengthUnit,
    to: 'mi' as LengthUnit,
    example: '1 km = 0,6214 Meilen'
  },
  'seemeile-in-km': {
    from: 'nmi' as LengthUnit,
    to: 'km' as LengthUnit,
    example: '1 Seemeile = 1,852 km'
  }
};
