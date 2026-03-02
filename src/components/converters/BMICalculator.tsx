'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { calculateBMI, getBMICategory } from '@/lib/conversions/gesundheit';

export function BMICalculator() {
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('175');

  const result = useMemo(() => {
    const w = parseGermanNumber(weight);
    const h = parseGermanNumber(height) / 100; // cm to m
    
    if (isNaN(w) || isNaN(h) || h <= 0 || w <= 0) return null;
    
    const bmi = calculateBMI(w, h);
    const category = getBMICategory(bmi);
    
    return { bmi, category };
  }, [weight, height]);

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`BMI: ${formatNumberGerman(result.bmi)} (${result.category.category})`);
      toast.success('Kopiert!');
    }
  };

  const bmiCategories = [
    { range: '< 18,5', label: 'Untergewicht', color: 'bg-blue-500' },
    { range: '18,5 - 24,9', label: 'Normalgewicht', color: 'bg-green-500' },
    { range: '25 - 29,9', label: 'Übergewicht', color: 'bg-yellow-500' },
    { range: '30 - 34,9', label: 'Adipositas I', color: 'bg-orange-500' },
    { range: '35 - 39,9', label: 'Adipositas II', color: 'bg-red-500' },
    { range: '≥ 40', label: 'Adipositas III', color: 'bg-red-700' },
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Gewicht (kg)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 70"
              />
            </div>
            <div className="space-y-2">
              <Label>Größe (cm)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 175"
              />
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">Ihr BMI</div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold" style={{ color: result.category.color }}>
                  {formatNumberGerman(result.bmi)}
                </span>
                <span className="text-lg font-medium" style={{ color: result.category.color }}>
                  {result.category.category}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{result.category.description}</p>
            </div>
          )}

          {/* BMI Categories */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">BMI-Klassifikation (WHO)</Label>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {bmiCategories.map((cat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                  <span>{cat.range}</span>
                  <span className="text-muted-foreground">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Copy Button */}
          <Button onClick={copyResult} variant="outline" className="w-full">
            Ergebnis kopieren
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
