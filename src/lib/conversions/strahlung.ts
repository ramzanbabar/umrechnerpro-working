/**
 * Strahlung-Umrechner (Radiation Conversion)
 * Umrechnung von Strahlungseinheiten für UmrechnerPro.de
 */

// === RADIOAKTIVITÄT (Radioactivity) ===

export type RadioactivityUnit = 'Bq' | 'kBq' | 'MBq' | 'GBq' | 'Ci' | 'mCi' | 'µCi' | 'nCi';

export const radioactivityToBecquerel: Record<RadioactivityUnit, number> = {
  Bq: 1,
  kBq: 1000,
  MBq: 1e6,
  GBq: 1e9,
  Ci: 3.7e10,         // Curie
  mCi: 3.7e7,         // Millicurie
  µCi: 3.7e4,         // Mikrocurie
  nCi: 3.7e1          // Nanocurie
};

export const radioactivityUnitNames: Record<RadioactivityUnit, string> = {
  Bq: 'Becquerel',
  kBq: 'Kilobecquerel',
  MBq: 'Megabecquerel',
  GBq: 'Gigabecquerel',
  Ci: 'Curie',
  mCi: 'Millicurie',
  µCi: 'Mikrocurie',
  nCi: 'Nanocurie'
};

export function convertRadioactivity(value: number, from: RadioactivityUnit, to: RadioactivityUnit): number {
  const inBq = value * radioactivityToBecquerel[from];
  return inBq / radioactivityToBecquerel[to];
}

// === STRAHLENDOSE (Radiation Dose) ===

export type RadiationDoseUnit = 'Sv' | 'mSv' | 'µSv' | 'rem' | 'mrem' | 'Gy' | 'mGy' | 'rad';

export const radiationDoseToSievert: Record<RadiationDoseUnit, number> = {
  Sv: 1,
  mSv: 0.001,
  µSv: 1e-6,
  rem: 0.01,          // Rem
  mrem: 1e-5,         // Millirem
  Gy: 1,              // Gray (für absorbierte Dosis)
  mGy: 0.001,
  rad: 0.01           // Rad
};

export const radiationDoseUnitNames: Record<RadiationDoseUnit, string> = {
  Sv: 'Sievert',
  mSv: 'Millisievert',
  µSv: 'Mikrosievert',
  rem: 'Rem',
  mrem: 'Millirem',
  Gy: 'Gray',
  mGy: 'Milligray',
  rad: 'Rad'
};

export function convertRadiationDose(value: number, from: RadiationDoseUnit, to: RadiationDoseUnit): number {
  const inSv = value * radiationDoseToSievert[from];
  return inSv / radiationDoseToSievert[to];
}
