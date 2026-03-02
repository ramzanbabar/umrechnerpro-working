/**
 * Zahlensystem-Umrechner (Number System Conversion)
 * Umrechnung zwischen verschiedenen Zahlensystemen für UmrechnerPro.de
 */

export type NumberSystem = 'binary' | 'octal' | 'decimal' | 'hexadecimal';

/**
 * Konvertiert eine Zahl von einem Zahlensystem in ein anderes
 */
export function convertNumberSystem(
  value: string,
  from: NumberSystem,
  to: NumberSystem
): string {
  // Zuerst zu Dezimal konvertieren
  let decimal: number;
  
  try {
    switch (from) {
      case 'binary':
        decimal = parseInt(value, 2);
        break;
      case 'octal':
        decimal = parseInt(value, 8);
        break;
      case 'decimal':
        decimal = parseInt(value, 10);
        break;
      case 'hexadecimal':
        decimal = parseInt(value, 16);
        break;
      default:
        return 'Ungültiges Zahlensystem';
    }
    
    if (isNaN(decimal)) {
      return 'Ungültige Eingabe';
    }
  } catch {
    return 'Fehler bei der Konvertierung';
  }
  
  // Dann zum Zielsystem konvertieren
  switch (to) {
    case 'binary':
      return decimal.toString(2);
    case 'octal':
      return decimal.toString(8);
    case 'decimal':
      return decimal.toString(10);
    case 'hexadecimal':
      return decimal.toString(16).toUpperCase();
    default:
      return decimal.toString(10);
  }
}

/**
 * Konvertiert zu allen Zahlensystemen gleichzeitig
 */
export function convertToAllSystems(value: string, from: NumberSystem): {
  binary: string;
  octal: string;
  decimal: string;
  hexadecimal: string;
} {
  let decimal: number;
  
  try {
    switch (from) {
      case 'binary':
        decimal = parseInt(value, 2);
        break;
      case 'octal':
        decimal = parseInt(value, 8);
        break;
      case 'decimal':
        decimal = parseInt(value, 10);
        break;
      case 'hexadecimal':
        decimal = parseInt(value, 16);
        break;
      default:
        decimal = 0;
    }
    
    if (isNaN(decimal)) decimal = 0;
  } catch {
    decimal = 0;
  }
  
  return {
    binary: decimal.toString(2),
    octal: decimal.toString(8),
    decimal: decimal.toString(10),
    hexadecimal: decimal.toString(16).toUpperCase()
  };
}

/**
 * Validiert eine Zahl für ein bestimmtes Zahlensystem
 */
export function validateNumberForSystem(value: string, system: NumberSystem): boolean {
  const patterns: Record<NumberSystem, RegExp> = {
    binary: /^[01]+$/,
    octal: /^[0-7]+$/,
    decimal: /^[0-9]+$/,
    hexadecimal: /^[0-9A-Fa-f]+$/
  };
  
  return patterns[system].test(value);
}

/**
 * Deutsche Namen der Zahlensysteme
 */
export const numberSystemNames: Record<NumberSystem, string> = {
  binary: 'Binär (Basis 2)',
  octal: 'Oktal (Basis 8)',
  decimal: 'Dezimal (Basis 10)',
  hexadecimal: 'Hexadezimal (Basis 16)'
};

/**
 * Konvertiert eine Zahl zu einer beliebigen Basis (2-36)
 */
export function convertToBase(value: string, fromBase: number, toBase: number): string {
  const decimal = parseInt(value, fromBase);
  if (isNaN(decimal)) return 'Ungültige Eingabe';
  return decimal.toString(toBase).toUpperCase();
}
