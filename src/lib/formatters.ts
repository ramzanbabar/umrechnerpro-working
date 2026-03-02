/**
 * German Number Formatters
 * Deutsche Zahlenformatierung für UmrechnerPro.de
 */

/**
 * Options for number formatting
 */
export interface NumberFormatOptions {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
}

/**
 * Normalizes formatting options to a consistent structure
 */
function normalizeFormatOptions(
  optionsOrDecimals?: number | NumberFormatOptions
): NumberFormatOptions {
  if (typeof optionsOrDecimals === 'number') {
    return { maximumFractionDigits: optionsOrDecimals };
  }
  return {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
    useGrouping: true,
    ...optionsOrDecimals,
  };
}

/**
 * Formatiert eine Zahl mit deutscher Lokalisierung
 * Verwendet Komma als Dezimaltrennzeichen und Punkt als Tausendertrennzeichen
 * 
 * Supports two calling conventions:
 * - formatNumberGerman(value, 2) - specify max decimal places as number
 * - formatNumberGerman(value, { maximumFractionDigits: 2 }) - options object
 */
export function formatNumberGerman(
  value: number,
  options?: NumberFormatOptions
): string;
export function formatNumberGerman(
  value: number,
  decimals: number
): string;
export function formatNumberGerman(
  value: number,
  optionsOrDecimals?: number | NumberFormatOptions
): string {
  const options = normalizeFormatOptions(optionsOrDecimals);
  
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 6,
    useGrouping = true
  } = options;
  
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping
  }).format(value);
}

/**
 * Formatiert eine Zahl mit intelligenter Genauigkeit
 * Zeigt nur so viele Nachkommastellen wie nötig
 */
export function formatNumberSmart(value: number): string {
  if (Number.isInteger(value)) {
    return formatNumberGerman(value, { maximumFractionDigits: 0 });
  }
  
  // Für sehr kleine Zahlen mehr Nachkommastellen
  if (Math.abs(value) < 0.001 && value !== 0) {
    return formatNumberGerman(value, { maximumFractionDigits: 10 });
  }
  
  // Für sehr große Zahlen weniger Nachkommastellen
  if (Math.abs(value) >= 1000000) {
    return formatNumberGerman(value, 2);
  }
  
  // Standardmäßig bis zu 6 Nachkommastellen, aber trailing zeros entfernen
  const formatted = formatNumberGerman(value, { maximumFractionDigits: 6 });
  
  // Entferne trailing zeros nach dem Komma (aber behalte mindestens 1 Nachkommastelle wenn nicht ganzzahlig)
  const parts = formatted.split(',');
  if (parts.length === 2) {
    let decimals = parts[1].replace(/0+$/, '');
    if (decimals.length === 0) {
      return parts[0];
    }
    return `${parts[0]},${decimals}`;
  }
  
  return formatted;
}

/**
 * Formatiert eine Prozentzahl
 */
export function formatPercentGerman(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value / 100);
}

/**
 * Formatiert eine Währung (Euro)
 */
export function formatCurrencyGerman(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(value);
}

/**
 * Formatiert sehr große Zahlen mit Einheit
 */
export function formatLargeNumber(value: number): string {
  const units = [
    { threshold: 1e12, unit: 'Bio.', divisor: 1e12 },
    { threshold: 1e9, unit: 'Mrd.', divisor: 1e9 },
    { threshold: 1e6, unit: 'Mio.', divisor: 1e6 },
    { threshold: 1e3, unit: 'Tsd.', divisor: 1e3 }
  ];
  
  const absValue = Math.abs(value);
  
  for (const { threshold, unit, divisor } of units) {
    if (absValue >= threshold) {
      const scaled = value / divisor;
      return `${formatNumberGerman(scaled, 2)} ${unit}`;
    }
  }
  
  return formatNumberGerman(value);
}

/**
 * Formatiert wissenschaftliche Notation deutsch
 */
export function formatScientificGerman(value: number, decimals: number = 4): string {
  if (value === 0) return '0';
  
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / Math.pow(10, exponent);
  
  const formattedMantissa = formatNumberGerman(mantissa, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  
  // Exponent hochstellen
  const superscripts: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
    '-': '⁻'
  };
  
  const exponentStr = exponent.toString().split('').map(c => superscripts[c] || c).join('');
  
  return `${formattedMantissa} × 10${exponentStr}`;
}

/**
 * Parst eine deutsche Zahl-Eingabe
 * Akzeptiert sowohl Punkt als auch Komma als Dezimaltrennzeichen
 */
export function parseGermanNumber(input: string): number {
  // Entferne Tausendertrennzeichen (Punkte im Deutschen)
  // und ersetze Komma durch Punkt für JavaScript
  
  let normalized = input.trim();
  
  // Wenn Eingabe ein Komma enthält, behandle es als Dezimaltrennzeichen
  if (normalized.includes(',')) {
    // Entferne Tausendertrennzeichen (Punkte)
    normalized = normalized.replace(/\./g, '');
    // Ersetze Komma durch Punkt
    normalized = normalized.replace(',', '.');
  } else if (normalized.includes('.') && normalized.includes(' ')) {
    // Französisches Format mit Leerzeichen als Tausendertrennzeichen
    normalized = normalized.replace(/\s/g, '');
  }
  
  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Validiert eine Zahleneingabe
 */
export function validateNumberInput(input: string): {
  isValid: boolean;
  value: number;
  error?: string;
} {
  if (!input || input.trim() === '') {
    return { isValid: false, value: 0, error: 'Keine Eingabe' };
  }
  
  const value = parseGermanNumber(input);
  
  if (isNaN(value)) {
    return { isValid: false, value: 0, error: 'Ungültige Zahl' };
  }
  
  if (!isFinite(value)) {
    return { isValid: false, value: 0, error: 'Zahl zu groß oder klein' };
  }
  
  return { isValid: true, value };
}

/**
 * Formatiert eine Fläche mit Einheit
 */
export function formatArea(value: number, unit: string = 'm²'): string {
  return `${formatNumberSmart(value)} ${unit}`;
}

/**
 * Formatiert ein Volumen mit Einheit
 */
export function formatVolume(value: number, unit: string = 'L'): string {
  return `${formatNumberSmart(value)} ${unit}`;
}

/**
 * Formatiert ein Gewicht mit Einheit
 */
export function formatWeight(value: number, unit: string = 'kg'): string {
  return `${formatNumberSmart(value)} ${unit}`;
}
