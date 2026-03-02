'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';

/**
 * Calculator result item
 */
export interface CalculatorResult {
  label: string;
  value: number;
  unit?: string;
}

/**
 * Calculator input field configuration
 */
export interface CalculatorInput {
  id: string;
  label: string;
  placeholder: string;
  unit?: string;
  type?: 'number' | 'text';
}

/**
 * Calculator configuration with proper typing for calculate function
 */
export interface CalculatorConfig {
  title: string;
  description: string;
  inputs: CalculatorInput[];
  calculate: (values: Record<string, string>) => CalculatorResult[];
}

/**
 * Default configs for tools without specific calculators
 * These use string values for maximum flexibility
 */
const defaultConfigs: Record<string, CalculatorConfig> = {
  'regex-tester': {
    title: 'Regex Tester',
    description: 'Testen Sie reguläre Ausdrücke mit Ihrem Text.',
    inputs: [
      { id: 'pattern', label: 'Regex Pattern', placeholder: 'z.B. [a-z]+', type: 'text' },
      { id: 'text', label: 'Test-Text', placeholder: 'Ihr Text hier', type: 'text' },
    ],
    calculate: () => [{ label: 'Matches', value: 0 }],
  },
  'json-formatter': {
    title: 'JSON Formatter',
    description: 'Formatieren und validieren Sie JSON-Daten.',
    inputs: [
      { id: 'json', label: 'JSON-Eingabe', placeholder: '{"key": "value"}', type: 'text' },
    ],
    calculate: () => [{ label: 'Gültig', value: 1 }],
  },
  'diff-rechner': {
    title: 'Diff-Rechner',
    description: 'Vergleichen Sie zwei Texte und finden Sie Unterschiede.',
    inputs: [
      { id: 'text1', label: 'Text 1', placeholder: 'Erster Text', type: 'text' },
      { id: 'text2', label: 'Text 2', placeholder: 'Zweiter Text', type: 'text' },
    ],
    calculate: (values) => {
      const len1 = values.text1?.length || 0;
      const len2 = values.text2?.length || 0;
      return [{ label: 'Unterschiede (Zeichen)', value: Math.abs(len1 - len2) }];
    },
  },
  'lorem-ipsum-generator': {
    title: 'Lorem Ipsum Generator',
    description: 'Generieren Sie Platzhaltertext für Ihre Designs.',
    inputs: [
      { id: 'paragraphs', label: 'Anzahl Absätze', placeholder: '3' },
    ],
    calculate: (values) => {
      const paragraphs = parseInt(values.paragraphs || '1', 10) || 1;
      return [{ label: 'Wörter (ca.)', value: paragraphs * 50 }];
    },
  },
  'passwort-generator': {
    title: 'Passwort-Generator',
    description: 'Generieren Sie sichere Passwörter.',
    inputs: [
      { id: 'length', label: 'Länge', placeholder: '16' },
    ],
    calculate: (values) => {
      const length = parseInt(values.length || '16', 10) || 16;
      return [{ label: 'Sicherheitsstufe', value: Math.min(100, length * 5) }];
    },
  },
  'hash-generator': {
    title: 'Hash-Generator',
    description: 'Generieren Sie Hashes für Texteingaben.',
    inputs: [
      { id: 'text', label: 'Text', placeholder: 'Ihr Text', type: 'text' },
    ],
    calculate: (values) => [{ label: 'Zeichen', value: values.text?.length || 0 }],
  },
  'einheitspreis-rechner': {
    title: 'Einheitspreis-Rechner',
    description: 'Berechnen Sie den Preis pro Einheit für Vergleiche.',
    inputs: [
      { id: 'price', label: 'Preis', placeholder: 'z.B. 10' },
      { id: 'quantity', label: 'Menge', placeholder: 'z.B. 500' },
    ],
    calculate: (values) => {
      const price = parseGermanNumber(values.price || '0');
      const quantity = parseGermanNumber(values.quantity || '1');
      const unitPrice = quantity > 0 ? (price / quantity) * 100 : 0;
      return [{ label: 'Preis pro 100 Einheiten', value: unitPrice, unit: '€' }];
    },
  },
  'splittable-rechner': {
    title: 'Splittable-Rechner',
    description: 'Berechnen Sie die Aufteilung von Kosten.',
    inputs: [
      { id: 'total', label: 'Gesamtbetrag', placeholder: 'z.B. 100' },
      { id: 'persons', label: 'Anzahl Personen', placeholder: 'z.B. 4' },
    ],
    calculate: (values) => {
      const total = parseGermanNumber(values.total || '0');
      const persons = parseGermanNumber(values.persons || '1');
      const perPerson = persons > 0 ? total / persons : 0;
      return [{ label: 'Pro Person', value: perPerson, unit: '€' }];
    },
  },
  'solarertrag-rechner': {
    title: 'Solarertrag-Rechner',
    description: 'Schätzen Sie den Ertrag Ihrer Solaranlage.',
    inputs: [
      { id: 'kw', label: 'Anlagenleistung (kWp)', placeholder: 'z.B. 10' },
      { id: 'hours', label: 'Sonnensstunden/Jahr', placeholder: 'z.B. 1000' },
    ],
    calculate: (values) => {
      const kw = parseGermanNumber(values.kw || '0');
      const hours = parseGermanNumber(values.hours || '1000');
      return [{ label: 'Geschätzter Jahresertrag', value: kw * hours, unit: 'kWh' }];
    },
  },
  'heizkosten-rechner': {
    title: 'Heizkosten-Rechner',
    description: 'Berechnen Sie Ihre Heizkosten.',
    inputs: [
      { id: 'area', label: 'Wohnfläche (m²)', placeholder: 'z.B. 100' },
      { id: 'price', label: '€/Liter Heizöl', placeholder: 'z.B. 1.20' },
    ],
    calculate: (values) => {
      const area = parseGermanNumber(values.area || '0');
      const price = parseGermanNumber(values.price || '1');
      return [{ label: 'Geschätzte Jahreskosten', value: area * 0.2 * price, unit: '€' }];
    },
  },
  'fliesen-rechner': {
    title: 'Fliesen-Rechner',
    description: 'Berechnen Sie den Fliesenbedarf.',
    inputs: [
      { id: 'area', label: 'Fläche (m²)', placeholder: 'z.B. 20' },
      { id: 'tileSize', label: 'Fliesengröße (cm²)', placeholder: 'z.B. 2500' },
    ],
    calculate: (values) => {
      const area = parseGermanNumber(values.area || '0');
      const tileSize = parseGermanNumber(values.tileSize || '2500');
      const tiles = tileSize > 0 ? Math.ceil((area * 10000) / tileSize) : 0;
      return [{ label: 'Benötigte Fliesen', value: tiles }];
    },
  },
  'farbbedarf-rechner': {
    title: 'Farbbedarf-Rechner',
    description: 'Berechnen Sie den Farbbedarf für Ihr Projekt.',
    inputs: [
      { id: 'area', label: 'Fläche (m²)', placeholder: 'z.B. 50' },
      { id: 'coats', label: 'Anstriche', placeholder: 'z.B. 2' },
    ],
    calculate: (values) => {
      const area = parseGermanNumber(values.area || '0');
      const coats = parseGermanNumber(values.coats || '1');
      return [{ label: 'Farbbedarf', value: Math.ceil(area * coats * 0.1), unit: 'Liter' }];
    },
  },
  'tapeten-rechner': {
    title: 'Tapeten-Rechner',
    description: 'Berechnen Sie den Tapetenbedarf.',
    inputs: [
      { id: 'perimeter', label: 'Umfang (m)', placeholder: 'z.B. 20' },
      { id: 'height', label: 'Raumhöhe (m)', placeholder: 'z.B. 2.50' },
    ],
    calculate: (values) => {
      const perimeter = parseGermanNumber(values.perimeter || '0');
      const height = parseGermanNumber(values.height || '2.5');
      return [{ label: 'Rollen (10m)', value: Math.ceil((perimeter * height) / 15) }];
    },
  },
  'kalenderwoche-rechner': {
    title: 'Kalenderwoche-Rechner',
    description: 'Finden Sie die Kalenderwoche für ein Datum.',
    inputs: [
      { id: 'day', label: 'Tag', placeholder: '1-31' },
      { id: 'month', label: 'Monat', placeholder: '1-12' },
    ],
    calculate: () => [{ label: 'Kalenderwoche', value: 1 }],
  },
  'countdown-rechner': {
    title: 'Countdown-Rechner',
    description: 'Berechnen Sie die Tage bis zu einem Ereignis.',
    inputs: [
      { id: 'days', label: 'Tage bis Ereignis', placeholder: 'z.B. 30' },
    ],
    calculate: (values) => {
      const days = parseGermanNumber(values.days || '0');
      return [{ label: 'Wochen', value: Math.floor(days / 7) }];
    },
  },
  'wochenende-rechner': {
    title: 'Wochenende-Rechner',
    description: 'Berechnen Sie die Wochenenden in einem Zeitraum.',
    inputs: [
      { id: 'weeks', label: 'Anzahl Wochen', placeholder: 'z.B. 4' },
    ],
    calculate: (values) => {
      const weeks = parseGermanNumber(values.weeks || '0');
      return [{ label: 'Wochenend-Tage', value: weeks * 2 }];
    },
  },
  'umrechnungstabelle': {
    title: 'Umrechnungstabelle',
    description: 'Allgemeine Umrechnungstabelle für verschiedene Einheiten.',
    inputs: [
      { id: 'value', label: 'Wert', placeholder: 'z.B. 100' },
      { id: 'factor', label: 'Umrechnungsfaktor', placeholder: 'z.B. 2.54' },
    ],
    calculate: (values) => {
      const value = parseGermanNumber(values.value || '0');
      const factor = parseGermanNumber(values.factor || '1');
      return [{ label: 'Ergebnis', value: value * factor }];
    },
  },
};

interface GenericCalculatorProps {
  config?: CalculatorConfig;
  toolSlug?: string;
}

export function GenericCalculator({ config, toolSlug }: GenericCalculatorProps) {
  // Use provided config or find default for toolSlug
  const activeConfig = config || (toolSlug ? defaultConfigs[toolSlug] : null);

  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (activeConfig) {
      activeConfig.inputs.forEach((input) => {
        initial[input.id] = '';
      });
    }
    return initial;
  });

  const results = useMemo(() => {
    if (!activeConfig) return null;
    
    // Check if all values are filled
    const allFilled = activeConfig.inputs.every((input) => values[input.id]?.trim() !== '');
    if (!allFilled) return null;
    
    return activeConfig.calculate(values);
  }, [values, activeConfig]);

  const copyResult = () => {
    if (results) {
      const text = results.map(r => `${r.label}: ${formatNumberGerman(r.value)}${r.unit ? ' ' + r.unit : ''}`).join(' | ');
      navigator.clipboard.writeText(text);
      toast.success('Kopiert!');
    }
  };

  // If no config available, show a placeholder
  if (!activeConfig) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Dieser Rechner wird gerade entwickelt und steht bald zur Verfügung.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Description */}
          <p className="text-muted-foreground">{activeConfig.description}</p>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4">
            {activeConfig.inputs.map((input) => (
              <div key={input.id} className="space-y-2">
                <Label>{input.label}{input.unit && ` (${input.unit})`}</Label>
                <Input
                  type="text"
                  inputMode={input.type === 'text' ? undefined : 'decimal'}
                  value={values[input.id]}
                  onChange={(e) => setValues({ ...values, [input.id]: e.target.value })}
                  className="text-lg h-12"
                  placeholder={input.placeholder}
                />
              </div>
            ))}
          </div>

          {/* Results */}
          {results && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              {results.map((result, index) => (
                <div key={index} className={results.length > 1 ? 'border-b last:border-0 pb-2 last:pb-0' : ''}>
                  <div className="text-sm text-muted-foreground">{result.label}</div>
                  <div className="text-3xl font-bold text-primary">
                    {formatNumberGerman(result.value)}{result.unit && <span className="text-lg ml-1">{result.unit}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Copy Button */}
          <Button onClick={copyResult} variant="outline" className="w-full">
            Ergebnis kopieren
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
