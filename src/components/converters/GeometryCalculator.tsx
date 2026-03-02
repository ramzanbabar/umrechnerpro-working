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
  calculateTriangleArea, calculateHypotenuse
} from '@/lib/conversions/geometrie';

export function GeometryCalculator() {
  const [shape, setShape] = useState<string>('circle');
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [results, setResults] = useState<{ label: string; value: number; unit: string }[]>([]);

  const shapeInputs: Record<string, { id: string; label: string; placeholder: string }[]> = {
    circle: [
      { id: 'radius', label: 'Radius', placeholder: 'z.B. 5' },
    ],
    rectangle: [
      { id: 'length', label: 'Länge', placeholder: 'z.B. 10' },
      { id: 'width', label: 'Breite', placeholder: 'z.B. 5' },
    ],
    triangle: [
      { id: 'base', label: 'Grundseite', placeholder: 'z.B. 10' },
      { id: 'height', label: 'Höhe', placeholder: 'z.B. 8' },
    ],
    pythagoras: [
      { id: 'a', label: 'Kathete a', placeholder: 'z.B. 3' },
      { id: 'b', label: 'Kathete b', placeholder: 'z.B. 4' },
    ],
  };

  const handleCalculate = () => {
    const shapeConfig = shapeInputs[shape];
    const values: Record<string, number> = {};
    
    for (const input of shapeConfig) {
      const val = parseGermanNumber(inputs[input.id] || '');
      if (isNaN(val) || val <= 0) {
        toast.error(`Bitte gültigen Wert für ${input.label} eingeben`);
        return;
      }
      values[input.id] = val;
    }

    let newResults: { label: string; value: number; unit: string }[] = [];

    switch (shape) {
      case 'circle':
        const r = values.radius;
        newResults = [
          { label: 'Fläche', value: calculateCircleArea(r), unit: 'm²' },
          { label: 'Umfang', value: calculateCircumference(r), unit: 'm' },
          { label: 'Durchmesser', value: 2 * r, unit: 'm' },
        ];
        break;
      case 'rectangle':
        const l = values.length;
        const w = values.width;
        newResults = [
          { label: 'Fläche', value: calculateRectangleArea(l, w), unit: 'm²' },
          { label: 'Umfang', value: calculateRectanglePerimeter(l, w), unit: 'm' },
          { label: 'Diagonale', value: Math.sqrt(l * l + w * w), unit: 'm' },
        ];
        break;
      case 'triangle':
        newResults = [
          { label: 'Fläche', value: calculateTriangleArea(values.base, values.height), unit: 'm²' },
        ];
        break;
      case 'pythagoras':
        newResults = [
          { label: 'Hypotenuse', value: calculateHypotenuse(values.a, values.b), unit: '' },
        ];
        break;
    }

    setResults(newResults);
  };

  const handleReset = () => {
    setInputs({});
    setResults([]);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Form auswählen</Label>
            <Select value={shape} onValueChange={(v) => { setShape(v); setInputs({}); setResults([]); }}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="circle">Kreis</SelectItem>
                <SelectItem value="rectangle">Rechteck</SelectItem>
                <SelectItem value="triangle">Dreieck</SelectItem>
                <SelectItem value="pythagoras">Pythagoras</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {shapeInputs[shape]?.map((input) => (
              <div key={input.id} className="space-y-2">
                <Label>{input.label}</Label>
                <Input
                  type="text"
                  inputMode="decimal"
                  value={inputs[input.id] || ''}
                  onChange={(e) => setInputs({ ...inputs, [input.id]: e.target.value })}
                  className="text-lg h-12"
                  placeholder={input.placeholder}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCalculate} className="flex-1">
              Berechnen
            </Button>
            <Button onClick={handleReset} variant="outline">
              Zurücksetzen
            </Button>
          </div>

          {results.length > 0 && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              {results.map((result, index) => (
                <div key={index} className="border-b last:border-0 pb-2 last:pb-0">
                  <div className="text-sm text-muted-foreground">{result.label}</div>
                  <div className="text-3xl font-bold text-primary">
                    {formatNumberGerman(result.value)} {result.unit}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
