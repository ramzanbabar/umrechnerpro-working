/**
 * Typografie-Umrechner (Typography Conversion)
 * Umrechnung von Typografie-Einheiten für UmrechnerPro.de
 * 
 * Standard-Basis: 16px (Browser-Standard)
 */

// Standard-Basis-Schriftgröße in Pixeln
const DEFAULT_BASE_SIZE = 16;

export type TypographyUnit = 'px' | 'pt' | 'em' | 'rem' | 'pc' | 'cm' | 'mm' | 'in';

/**
 * Pixel zu Punkt
 * 1 pt = 1/72 Zoll, 1 Zoll = 96px (CSS)
 */
export function pxToPt(px: number): number {
  return px * 0.75; // 72/96
}

export function ptToPx(pt: number): number {
  return pt / 0.75;
}

/**
 * Pixel zu EM (relativ zur Basis)
 */
export function pxToEm(px: number, baseSize: number = DEFAULT_BASE_SIZE): number {
  return px / baseSize;
}

export function emToPx(em: number, baseSize: number = DEFAULT_BASE_SIZE): number {
  return em * baseSize;
}

/**
 * Pixel zu REM
 */
export function pxToRem(px: number, baseSize: number = DEFAULT_BASE_SIZE): number {
  return px / baseSize;
}

export function remToPx(rem: number, baseSize: number = DEFAULT_BASE_SIZE): number {
  return rem * baseSize;
}

/**
 * Pixel zu Pica
 * 1 pc = 12 pt = 16 px
 */
export function pxToPc(px: number): number {
  return px / 16;
}

export function pcToPx(pc: number): number {
  return pc * 16;
}

/**
 * Pixel zu Zentimeter
 * 1 cm = 96/2.54 px
 */
export function pxToCm(px: number): number {
  return px * 2.54 / 96;
}

export function cmToPx(cm: number): number {
  return cm * 96 / 2.54;
}

/**
 * Pixel zu Millimeter
 */
export function pxToMm(px: number): number {
  return pxToCm(px) * 10;
}

export function mmToPx(mm: number): number {
  return cmToPx(mm / 10);
}

/**
 * Pixel zu Zoll
 * 1 in = 96px
 */
export function pxToIn(px: number): number {
  return px / 96;
}

export function inToPx(inch: number): number {
  return inch * 96;
}

/**
 * Allgemeine Typografie-Umrechnung
 */
export function convertTypography(
  value: number,
  from: TypographyUnit,
  to: TypographyUnit,
  baseSize: number = DEFAULT_BASE_SIZE
): number {
  // Erst zu Pixel konvertieren
  let px: number;
  
  switch (from) {
    case 'px': px = value; break;
    case 'pt': px = ptToPx(value); break;
    case 'em': px = emToPx(value, baseSize); break;
    case 'rem': px = remToPx(value, baseSize); break;
    case 'pc': px = pcToPx(value); break;
    case 'cm': px = cmToPx(value); break;
    case 'mm': px = mmToPx(value); break;
    case 'in': px = inToPx(value); break;
    default: px = value;
  }
  
  // Dann von Pixel zur Zieleinheit
  switch (to) {
    case 'px': return px;
    case 'pt': return pxToPt(px);
    case 'em': return pxToEm(px, baseSize);
    case 'rem': return pxToRem(px, baseSize);
    case 'pc': return pxToPc(px);
    case 'cm': return pxToCm(px);
    case 'mm': return pxToMm(px);
    case 'in': return pxToIn(px);
    default: return px;
  }
}

/**
 * Deutsche Namen der Einheiten
 */
export const typographyUnitNames: Record<TypographyUnit, string> = {
  px: 'Pixel',
  pt: 'Punkt',
  em: 'EM (relativ)',
  rem: 'REM (Wurzel-relativ)',
  pc: 'Pica',
  cm: 'Zentimeter',
  mm: 'Millimeter',
  in: 'Zoll'
};
