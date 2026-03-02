/**
 * Licht & Optik-Umrechner (Light & Optics Conversion)
 * Umrechnung von Licht- und Optikeinheiten für UmrechnerPro.de
 */

// === LEUCHTDICHTE (Luminance) ===

export type LuminanceUnit = 'cd/m²' | 'cd/cm²' | 'cd/ft²' | 'fL' | 'L' | 'asb' | 'sb';

export const luminanceToCandelaPerM2: Record<LuminanceUnit, number> = {
  'cd/m²': 1,
  'cd/cm²': 10000,
  'cd/ft²': 10.763910416709722,
  'fL': 3.4262590996353934,     // Footlambert
  'L': 3183.098861837907,        // Lambert
  'asb': 0.3183098861837907,     // Apostilb
  'sb': 10000                     // Stilb
};

export const luminanceUnitNames: Record<LuminanceUnit, string> = {
  'cd/m²': 'Candela pro Quadratmeter (Nit)',
  'cd/cm²': 'Candela pro Quadratzentimeter',
  'cd/ft²': 'Candela pro Quadratfuß',
  'fL': 'Footlambert',
  'L': 'Lambert',
  'asb': 'Apostilb',
  'sb': 'Stilb'
};

export function convertLuminance(value: number, from: LuminanceUnit, to: LuminanceUnit): number {
  const inCdPerM2 = value * luminanceToCandelaPerM2[from];
  return inCdPerM2 / luminanceToCandelaPerM2[to];
}

// === BELEUCHTUNGSSTÄRKE (Illuminance) ===

export type IlluminanceUnit = 'lx' | 'klx' | 'fc' | 'phot' | 'nox';

export const illuminanceToLux: Record<IlluminanceUnit, number> = {
  lx: 1,
  klx: 1000,
  fc: 10.763910416709722,        // Footcandle
  phot: 10000,                    // Phot
  nox: 0.001                      // Nox
};

export const illuminanceUnitNames: Record<IlluminanceUnit, string> = {
  lx: 'Lux',
  klx: 'Kilolux',
  fc: 'Footcandle',
  phot: 'Phot',
  nox: 'Nox'
};

export function convertIlluminance(value: number, from: IlluminanceUnit, to: IlluminanceUnit): number {
  const inLux = value * illuminanceToLux[from];
  return inLux / illuminanceToLux[to];
}
