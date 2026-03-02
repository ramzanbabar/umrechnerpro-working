'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { calculateTDEE, activityLevelDescriptions, Gender, ActivityLevel } from '@/lib/conversions/gesundheit';

export function WasserbedarfCalculator() {
  const [weight, setWeight] = useState<string>('');
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  const [results, setResults] = useState<{ wasser: number; glaeser: number } | null>(null);

  const handleCalculate = () => {
    const weightValue = parseGermanNumber(weight);

    if (isNaN(weightValue) || weightValue <= 0) {
      toast.error('Bitte gültiges Gewicht eingeben');
      return;
    }

    // Basis: 30-35 ml pro kg Körpergewicht
    let mlPerKg = 33;
    
    // Aktivitätsanpassung
    const activityFactors: Record<ActivityLevel, number> = {
      sedentary: 1.0,
      light: 1.1,
      moderate: 1.2,
      active: 1.3,
      veryActive: 1.4,
    };

    const wasser = weightValue * mlPerKg * activityFactors[activity] / 1000; // in Liter
    const glaeser = Math.round(wasser * 5); // 200ml Gläser

    setResults({ wasser, glaeser });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie Ihren täglichen Wasserbedarf.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Körpergewicht (kg)</Label>
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
              <Label>Aktivitätslevel</Label>
              <Select value={activity} onValueChange={(v) => setActivity(v as ActivityLevel)}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sitzend</SelectItem>
                  <SelectItem value="light">Leicht aktiv</SelectItem>
                  <SelectItem value="moderate">Moderat aktiv</SelectItem>
                  <SelectItem value="active">Sehr aktiv</SelectItem>
                  <SelectItem value="veryActive">Extrem aktiv</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="border-b pb-2">
                <div className="text-sm text-muted-foreground">Täglicher Wasserbedarf</div>
                <div className="text-3xl font-bold text-primary">
                  {formatNumberGerman(results.wasser, 1)} Liter
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Entspricht ca. </span>
                <strong>{results.glaeser} Gläsern</strong>
                <span className="text-muted-foreground"> (à 200ml)</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
