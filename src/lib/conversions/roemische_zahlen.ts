/**
 * Römische Zahlen Umrechner (Roman Numerals Conversion)
 * Umrechnung zwischen arabischen und römischen Zahlen für UmrechnerPro.de
 */

// Römische Ziffern
const romanNumerals: [string, number][] = [
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1]
];

// Erweiterte römische Ziffern für große Zahlen
const romanNumeralsExtended: [string, number][] = [
  ['ↈ', 100000],
  ['ↇ', 50000],
  ['ↂ', 10000],
  ['ↁ', 5000],
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1]
];

/**
 * Konvertiert eine arabische Zahl zu römischen Ziffern
 * @param num - Arabische Zahl (1 - 3,999,999)
 * @returns Römische Zahl als String
 */
export function arabicToRoman(num: number): string {
  if (num < 1 || num > 3999999) {
    return 'Außerhalb des gültigen Bereichs (1 - 3.999.999)';
  }
  
  let result = '';
  
  // Für große Zahlen das erweiterte System verwenden
  const numerals = num > 3999 ? romanNumeralsExtended : romanNumerals;
  let remaining = num;
  
  for (const [roman, value] of numerals) {
    while (remaining >= value) {
      result += roman;
      remaining -= value;
    }
  }
  
  return result;
}

/**
 * Konvertiert römische Ziffern zu einer arabischen Zahl
 * @param roman - Römische Zahl als String
 * @returns Arabische Zahl
 */
export function romanToArabic(roman: string): number {
  if (!roman || roman.length === 0) {
    return 0;
  }
  
  const romanUpper = roman.toUpperCase();
  let result = 0;
  let i = 0;
  
  const numeralMap: Record<string, number> = {
    'I': 1, 'IV': 4, 'V': 5, 'IX': 9,
    'X': 10, 'XL': 40, 'L': 50, 'XC': 90,
    'C': 100, 'CD': 400, 'D': 500, 'CM': 900,
    'M': 1000, 'ↁ': 5000, 'ↂ': 10000,
    'ↇ': 50000, 'ↈ': 100000
  };
  
  while (i < romanUpper.length) {
    // Prüfe erst auf zwei-Zeichen-Kombinationen
    if (i + 1 < romanUpper.length) {
      const twoChars = romanUpper.substring(i, i + 2);
      if (numeralMap[twoChars]) {
        result += numeralMap[twoChars];
        i += 2;
        continue;
      }
    }
    
    // Einzelnes Zeichen
    const oneChar = romanUpper[i];
    if (numeralMap[oneChar]) {
      result += numeralMap[oneChar];
      i += 1;
    } else {
      // Ungültiges Zeichen
      return 0;
    }
  }
  
  return result;
}

/**
 * Validiert eine römische Zahl
 */
export function isValidRoman(roman: string): boolean {
  const validRoman = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
  return validRoman.test(roman);
}

/**
 * Wichtige römische Zahlen
 */
export const importantRomanNumerals = [
  { arabic: 1, roman: 'I' },
  { arabic: 5, roman: 'V' },
  { arabic: 10, roman: 'X' },
  { arabic: 50, roman: 'L' },
  { arabic: 100, roman: 'C' },
  { arabic: 500, roman: 'D' },
  { arabic: 1000, roman: 'M' },
  { arabic: 2024, roman: 'MMXXIV' },
  { arabic: 2025, roman: 'MMXXV' },
  { arabic: 2026, roman: 'MMXXVI' }
];
