'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';

export function WurzelCalculator() {
  const [value, setValue] = useState<string>('');
  const [degree, setDegree] = useState<string>('2');
  const [results, setResults] = useState<{ result: number } | null>(null);

  const handleCalculate = () => {
    const numValue = parseGermanNumber(value);
    const degValue = parseGermanNumber(degree);

    if (isNaN(numValue)) {
      toast.error('Bitte gültige Zahl eingeben');
      return;
    }
    if (isNaN(degValue) || degValue < 2) {
      toast.error('Wurzelexponent muss ≥ 2 sein');
      return;
    }
    if (numValue < 0 && degValue % 2 === 0) {
      toast.error('Gerade Wurzeln aus negativen Zahlen sind nicht reell');
      return;
    }

    const result = Math.pow(numValue, 1 / degValue);
    setResults({ result });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie Quadratwurzeln, Kubikwurzeln und n-te Wurzeln.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Zahl</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 16"
              />
            </div>
            <div className="space-y-2">
              <Label>Wurzelexponent (n)</Label>
              <Select value={degree} onValueChange={setDegree}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 (Quadratwurzel √)</SelectItem>
                  <SelectItem value="3">3 (Kubikwurzel ∛)</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">
                {degree}. Wurzel
              </div>
              <div className="text-3xl font-bold text-primary">
                {formatNumberGerman(results.result, 8)}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
