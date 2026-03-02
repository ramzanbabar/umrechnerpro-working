'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { calculateIdealWeightBroca, Gender } from '@/lib/conversions/gesundheit';

export function IdealgewichtCalculator() {
  const [gender, setGender] = useState<Gender>('male');
  const [height, setHeight] = useState<string>('');
  const [results, setResults] = useState<{ ideal: number; min: number; max: number } | null>(null);

  const handleCalculate = () => {
    const heightValue = parseGermanNumber(height);

    if (isNaN(heightValue) || heightValue < 100 || heightValue > 250) {
      toast.error('Bitte gültige Größe eingeben (100-250 cm)');
      return;
    }

    const result = calculateIdealWeightBroca(heightValue);
    
    // Adjust for gender
    if (gender === 'female') {
      result.ideal *= 0.95;
      result.min *= 0.95;
      result.max *= 0.95;
    }

    setResults(result);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie Ihr Idealgewicht nach der Broca-Formel.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Geschlecht</Label>
              <Select value={gender} onValueChange={(v) => setGender(v as Gender)}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Männlich</SelectItem>
                  <SelectItem value="female">Weiblich</SelectItem>
                </SelectContent>
              </Select>
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

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="border-b pb-2">
                <div className="text-sm text-muted-foreground">Idealgewicht</div>
                <div className="text-3xl font-bold text-primary">
                  {formatNumberGerman(results.ideal, 1)} kg
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-muted-foreground">Min: </span>
                  <strong>{formatNumberGerman(results.min, 1)} kg</strong>
                </div>
                <div>
                  <span className="text-muted-foreground">Max: </span>
                  <strong>{formatNumberGerman(results.max, 1)} kg</strong>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Broca-Index: Normalgewicht = Größe (cm) - 100
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
