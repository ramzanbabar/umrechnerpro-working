/**
 * Prozent-Rechner (Percentage Calculator)
 * Berechnungen mit Prozenten für UmrechnerPro.de
 */

/**
 * Berechnet X Prozent von Y
 */
export function calculatePercentOf(percent: number, value: number): number {
  return (percent / 100) * value;
}

/**
 * Berechnet wie viel Prozent X von Y ist
 */
export function calculateWhatPercent(part: number, total: number): number {
  if (total === 0) return 0;
  return (part / total) * 100;
}

/**
 * Berechnet Prozentsteigerung von X auf Y
 */
export function calculatePercentIncrease(from: number, to: number): number {
  if (from === 0) return to > 0 ? 100 : 0;
  return ((to - from) / from) * 100;
}

/**
 * Berechnet Prozentabnahme von X auf Y
 */
export function calculatePercentDecrease(from: number, to: number): number {
  if (from === 0) return 0;
  return ((from - to) / from) * 100;
}

/**
 * Erhöht einen Wert um X Prozent
 */
export function increaseByPercent(value: number, percent: number): number {
  return value * (1 + percent / 100);
}

/**
 * Verringert einen Wert um X Prozent
 */
export function decreaseByPercent(value: number, percent: number): number {
  return value * (1 - percent / 100);
}

/**
 * Berechnet den Originalwert aus einem prozentualen Anteil
 * Wenn X% des Originalwerts = Y, was ist der Originalwert?
 */
export function calculateOriginalFromPercent(percent: number, result: number): number {
  if (percent === 0) return 0;
  return (result / percent) * 100;
}

/**
 * Berechnet den Rabatt
 */
export function calculateDiscount(originalPrice: number, discountPercent: number): number {
  return originalPrice * (discountPercent / 100);
}

/**
 * Berechnet den Endpreis nach Rabatt
 */
export function calculatePriceAfterDiscount(originalPrice: number, discountPercent: number): number {
  return originalPrice * (1 - discountPercent / 100);
}

/**
 * Berechnet den Mehrwertsteuerbetrag
 */
export function calculateVat(netPrice: number, vatRate: number = 19): number {
  return netPrice * (vatRate / 100);
}

/**
 * Berechnet den Bruttobetrag aus Netto
 */
export function calculateGrossFromNet(netPrice: number, vatRate: number = 19): number {
  return netPrice * (1 + vatRate / 100);
}

/**
 * Berechnet den Nettobetrag aus Brutto
 */
export function calculateNetFromGross(grossPrice: number, vatRate: number = 19): number {
  return grossPrice / (1 + vatRate / 100);
}

/**
 * Berechnet die Mehrwertsteuer aus Brutto
 */
export function calculateVatFromGross(grossPrice: number, vatRate: number = 19): number {
  return grossPrice - calculateNetFromGross(grossPrice, vatRate);
}

/**
 * Deutsche Mehrwertsteuersätze
 */
export const germanVatRates = {
  standard: 19,     // Standard (seit 2021, war 16% Jul-Dez 2020)
  reduced: 7,       // Ermäßigt (Lebensmittel, Bücher, etc.)
};

/**
 * Formatiert eine Prozentzahl deutsch
 */
export function formatPercent(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value) + ' %';
}

/**
 * Dreisatz (Rule of Three)
 * Direkter Dreisatz: Wenn A zu B gehört, wie viel gehört zu C?
 * Beispiel: 3 Äpfel kosten 1,50 € – was kosten 5 Äpfel?
 */
export function calculateDreisatz(value1: number, value2: number, searchValue: number): number {
  // Direkter Dreisatz: value2 / value1 * searchValue
  if (value1 === 0) return 0;
  return (value2 / value1) * searchValue;
}

/**
 * Indirekter Dreisatz (umgekehrt proportional)
 * Beispiel: 3 Arbeiter brauchen 12 Tage – wie viele Tage brauchen 4 Arbeiter?
 */
export function calculateInverseDreisatz(value1: number, value2: number, searchValue: number): number {
  // Indirekter Dreisatz: value1 * value2 / searchValue
  if (searchValue === 0) return 0;
  return (value1 * value2) / searchValue;
}
