/**
 * Kleidergrößen-Umrechner (Clothing Size Conversion)
 * Umrechnung von Kleidergrößen für UmrechnerPro.de
 */

export type ClothingCategory = 'damen' | 'herren' | 'kinder';

export type ClothingSizeSystem = 'EU' | 'US' | 'UK' | 'IT' | 'FR' | 'JP' | 'AU';

// === DAMENGRÖSSEN ===

export const damenGroessen: Record<string, Record<ClothingSizeSystem, string | number>> = {
  'XS': { EU: 32, US: 0, UK: 4, IT: 36, FR: 34, JP: 5, AU: 4 },
  'S': { EU: 34, US: 2, UK: 6, IT: 38, FR: 36, JP: 7, AU: 6 },
  'S/M': { EU: 36, US: 4, UK: 8, IT: 40, FR: 38, JP: 9, AU: 8 },
  'M': { EU: 38, US: 6, UK: 10, IT: 42, FR: 40, JP: 11, AU: 10 },
  'M/L': { EU: 40, US: 8, UK: 12, IT: 44, FR: 42, JP: 13, AU: 12 },
  'L': { EU: 42, US: 10, UK: 14, IT: 46, FR: 44, JP: 15, AU: 14 },
  'XL': { EU: 44, US: 12, UK: 16, IT: 48, FR: 46, JP: 17, AU: 16 },
  'XXL': { EU: 46, US: 14, UK: 18, IT: 50, FR: 48, JP: 19, AU: 18 },
  '3XL': { EU: 48, US: 16, UK: 20, IT: 52, FR: 50, JP: 21, AU: 20 },
};

// === HERRENGRÖSSEN ===

export const herrenGroessen: Record<string, Record<ClothingSizeSystem, string | number>> = {
  'XS': { EU: 44, US: 34, UK: 34, IT: 44, FR: 44, JP: 'S', AU: 34 },
  'S': { EU: 46, US: 36, UK: 36, IT: 46, FR: 46, JP: 'S', AU: 36 },
  'M': { EU: 48, US: 38, UK: 38, IT: 48, FR: 48, JP: 'M', AU: 38 },
  'L': { EU: 50, US: 40, UK: 40, IT: 50, FR: 50, JP: 'L', AU: 40 },
  'XL': { EU: 52, US: 42, UK: 42, IT: 52, FR: 52, JP: 'LL', AU: 42 },
  'XXL': { EU: 54, US: 44, UK: 44, IT: 54, FR: 54, JP: '3L', AU: 44 },
  '3XL': { EU: 56, US: 46, UK: 46, IT: 56, FR: 56, JP: '4L', AU: 46 },
};

/**
 * Konvertiert Damengrößen
 */
export function convertDamenSize(euSize: number, toSystem: ClothingSizeSystem): string | number | null {
  for (const size of Object.values(damenGroessen)) {
    if (size.EU === euSize) {
      return size[toSystem];
    }
  }
  return null;
}

/**
 * Konvertiert Herregrößen
 */
export function convertHerrenSize(euSize: number, toSystem: ClothingSizeSystem): string | number | null {
  for (const size of Object.values(herrenGroessen)) {
    if (size.EU === euSize) {
      return size[toSystem];
    }
  }
  return null;
}

/**
 * Findet EU-Größe aus anderem System
 */
export function findEuSize(
  size: number | string,
  fromSystem: ClothingSizeSystem,
  category: ClothingCategory
): number | null {
  const groessen = category === 'damen' ? damenGroessen : herrenGroessen;
  
  for (const sizeObj of Object.values(groessen)) {
    if (sizeObj[fromSystem] === size) {
      return sizeObj.EU as number;
    }
  }
  return null;
}

// === KINDERGRÖSSEN ===

export const kinderGroessen = [
  { alter: '0-1 Monate', groesse: '50-56', eu: 50 },
  { alter: '1-3 Monate', groesse: '56-62', eu: 56 },
  { alter: '3-6 Monate', groesse: '62-68', eu: 62 },
  { alter: '6-9 Monate', groesse: '68-74', eu: 68 },
  { alter: '9-12 Monate', groesse: '74-80', eu: 74 },
  { alter: '12-18 Monate', groesse: '80-86', eu: 80 },
  { alter: '18-24 Monate', groesse: '86-92', eu: 86 },
  { alter: '2-3 Jahre', groesse: '92-98', eu: 92 },
  { alter: '3-4 Jahre', groesse: '98-104', eu: 98 },
  { alter: '4-5 Jahre', groesse: '104-110', eu: 104 },
  { alter: '5-6 Jahre', groesse: '110-116', eu: 110 },
  { alter: '6-7 Jahre', groesse: '116-122', eu: 116 },
  { alter: '7-8 Jahre', groesse: '122-128', eu: 122 },
  { alter: '8-9 Jahre', groesse: '128-134', eu: 128 },
  { alter: '9-10 Jahre', groesse: '134-140', eu: 134 },
  { alter: '10-11 Jahre', groesse: '140-146', eu: 140 },
  { alter: '11-12 Jahre', groesse: '146-152', eu: 146 },
  { alter: '12-13 Jahre', groesse: '152-158', eu: 152 },
  { alter: '13-14 Jahre', groesse: '158-164', eu: 158 },
];

// System-Namen
export const clothingSizeSystemNames: Record<ClothingSizeSystem, string> = {
  EU: 'Europa (EU)',
  US: 'USA (US)',
  UK: 'Großbritannien (UK)',
  IT: 'Italien (IT)',
  FR: 'Frankreich (FR)',
  JP: 'Japan (JP)',
  AU: 'Australien (AU)'
};
