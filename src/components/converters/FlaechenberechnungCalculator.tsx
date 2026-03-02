'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { 
  calculateCircleArea, calculateCircumference,
  calculateRectangleArea, calculateRectanglePerimeter,
  calculateTriangleArea
} from '@/lib/conversions/geometrie';

export function FlaechenberechnungCalculator() {
  const [shape, setShape] = useState<string>('rectangle');
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [results, setResults] = useState<{ area: number; perimeter?: number } | null>(null);

  const handleCalculate = () => {
    const shapeInputs: Record<string, string[]> = {
      rectangle: ['length', 'width'],
      square: ['side'],
      circle: ['radius'],
      triangle: ['base', 'height'],
    };

    const values: Record<string, number> = {};
    for (const key of shapeInputs[shape]) {
      const val = parseGermanNumber(inputs[key] || '');
      if (isNaN(val) || val <= 0) {
        toast.error(`Bitte gültigen Wert für ${key} eingeben`);
        return;
      }
      values[key] = val;
    }

    let area = 0;
    let perimeter: number | undefined;

    switch (shape) {
      case 'rectangle':
        area = calculateRectangleArea(values.length, values.width);
        perimeter = calculateRectanglePerimeter(values.length, values.width);
        break;
      case 'square':
        area = values.side * values.side;
        perimeter = 4 * values.side;
        break;
      case 'circle':
        area = calculateCircleArea(values.radius);
        perimeter = calculateCircumference(values.radius);
        break;
      case 'triangle':
        area = calculateTriangleArea(values.base, values.height);
        break;
    }

    setResults({ area, perimeter });
  };

  const renderInputs = () => {
    switch (shape) {
      case 'rectangle':
        return (
          <>
            <div className="space-y-2">
              <Label>Länge (m)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={inputs.length || ''}
                onChange={(e) => setInputs({ ...inputs, length: e.target.value })}
                className="text-lg h-12"
                placeholder="z.B. 10"
              />
            </div>
            <div className="space-y-2">
              <Label>Breite (m)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={inputs.width || ''}
                onChange={(e) => setInputs({ ...inputs, width: e.target.value })}
                className="text-lg h-12"
                placeholder="z.B. 5"
              />
            </div>
          </>
        );
      case 'square':
        return (
          <div className="space-y-2 col-span-2">
            <Label>Seitenlänge (m)</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={inputs.side || ''}
              onChange={(e) => setInputs({ ...inputs, side: e.target.value })}
              className="text-lg h-12"
              placeholder="z.B. 5"
            />
          </div>
        );
      case 'circle':
        return (
          <div className="space-y-2 col-span-2">
            <Label>Radius (m)</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={inputs.radius || ''}
              onChange={(e) => setInputs({ ...inputs, radius: e.target.value })}
              className="text-lg h-12"
              placeholder="z.B. 5"
            />
          </div>
        );
      case 'triangle':
        return (
          <>
            <div className="space-y-2">
              <Label>Grundseite (m)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={inputs.base || ''}
                onChange={(e) => setInputs({ ...inputs, base: e.target.value })}
                className="text-lg h-12"
                placeholder="z.B. 10"
              />
            </div>
            <div className="space-y-2">
              <Label>Höhe (m)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={inputs.height || ''}
                onChange={(e) => setInputs({ ...inputs, height: e.target.value })}
                className="text-lg h-12"
                placeholder="z.B. 8"
              />
            </div>
          </>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie die Fläche verschiedener geometrischer Formen.
          </p>

          <div className="space-y-2">
            <Label>Form auswählen</Label>
            <Select value={shape} onValueChange={(v) => { setShape(v); setInputs({}); setResults(null); }}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rectangle">Rechteck</SelectItem>
                <SelectItem value="square">Quadrat</SelectItem>
                <SelectItem value="circle">Kreis</SelectItem>
                <SelectItem value="triangle">Dreieck</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {renderInputs()}
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="border-b pb-2">
                <div className="text-sm text-muted-foreground">Fläche</div>
                <div className="text-3xl font-bold text-primary">
                  {formatNumberGerman(results.area, 2)} m²
                </div>
              </div>
              {results.perimeter && (
                <div>
                  <span className="text-muted-foreground">Umfang: </span>
                  <strong>{formatNumberGerman(results.perimeter, 2)} m</strong>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
