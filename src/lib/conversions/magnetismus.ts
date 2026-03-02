/**
 * Magnetismus-Umrechner (Magnetism Conversion)
 * Umrechnung von magnetischen Einheiten für UmrechnerPro.de
 */

// === MAGNETISCHER FLUSS (Magnetic Flux) ===

export type MagneticFluxUnit = 'Wb' | 'mWb' | 'µWb' | 'Mx' | 'V·s';

export const magneticFluxToWeber: Record<MagneticFluxUnit, number> = {
  Wb: 1,
  mWb: 0.001,
  µWb: 1e-6,
  Mx: 1e-8,      // Maxwell
  'V·s': 1       // Voltsekunde (= Weber)
};

export const magneticFluxUnitNames: Record<MagneticFluxUnit, string> = {
  Wb: 'Weber',
  mWb: 'Milliweber',
  µWb: 'Mikroweber',
  Mx: 'Maxwell',
  'V·s': 'Voltsekunde'
};

export function convertMagneticFlux(value: number, from: MagneticFluxUnit, to: MagneticFluxUnit): number {
  const inWeber = value * magneticFluxToWeber[from];
  return inWeber / magneticFluxToWeber[to];
}

// === MAGNETISCHE FLUSSDICHTE (Magnetic Flux Density) ===

export type MagneticFluxDensityUnit = 'T' | 'mT' | 'µT' | 'nT' | 'G' | 'mG';

export const magneticFluxDensityToTesla: Record<MagneticFluxDensityUnit, number> = {
  T: 1,
  mT: 0.001,
  µT: 1e-6,
  nT: 1e-9,
  G: 1e-4,       // Gauss
  mG: 1e-7       // Milligauß
};

export const magneticFluxDensityUnitNames: Record<MagneticFluxDensityUnit, string> = {
  T: 'Tesla',
  mT: 'Millitesla',
  µT: 'Mikrotesla',
  nT: 'Nanotesla',
  G: 'Gauss',
  mG: 'Milligauß'
};

export function convertMagneticFluxDensity(value: number, from: MagneticFluxDensityUnit, to: MagneticFluxDensityUnit): number {
  const inTesla = value * magneticFluxDensityToTesla[from];
  return inTesla / magneticFluxDensityToTesla[to];
}

/**
 * Tesla zu Gauss (häufige Umrechnung)
 */
export function teslaToGauss(tesla: number): number {
  return tesla * 10000;
}

export function gaussToTesla(gauss: number): number {
  return gauss / 10000;
}
