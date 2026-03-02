'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { calculateBMR, calculateTDEE, getBMICategory, type Gender, type ActivityLevel } from '@/lib/conversions/gesundheit';

export function BMRCalculator() {
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('175');
  const [age, setAge] = useState<string>('30');
  const [gender, setGender] = useState<Gender>('male');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('sedentary');

  const result = useMemo(() => {
    const w = parseGermanNumber(weight);
    const h = parseGermanNumber(height);
    const a = parseGermanNumber(age);
    
    if (isNaN(w) || isNaN(h) || isNaN(a) || h <= 0 || w <= 0 || a <= 0) return null;
    
    const bmr = calculateBMR(w, h, a, gender);
    const tdee = calculateTDEE(bmr, activityLevel);
    
    return { bmr, tdee };
  }, [weight, height, age, gender, activityLevel]);

  const activityLevels: { value: ActivityLevel; label: string; description: string }[] = [
    { value: 'sedentary', label: 'Sitzend', description: 'Büroarbeit, kaum Sport' },
    { value: 'light', label: 'Leicht aktiv', description: '1-3 Tage/Woche Sport' },
    { value: 'moderate', label: 'Moderat aktiv', description: '3-5 Tage/Woche Sport' },
    { value: 'active', label: 'Aktiv', description: '6-7 Tage/Woche Sport' },
    { value: 'veryActive', label: 'Sehr aktiv', description: 'Athlet, harte Arbeit' },
  ];

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(`Grundumsatz (BMR): ${formatNumberGerman(result.bmr)} kcal\nGesamtumsatz (TDEE): ${formatNumberGerman(result.tdee)} kcal`);
      toast.success('Kopiert!');
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Basic Inputs */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Gewicht (kg)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label>Größe (cm)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label>Alter</Label>
              <Input
                type="text"
                inputMode="numeric"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="h-12"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label>Geschlecht</Label>
            <div className="flex gap-2">
              <Button
                variant={gender === 'male' ? 'default' : 'outline'}
                onClick={() => setGender('male')}
                className="flex-1"
              >
                Männlich
              </Button>
              <Button
                variant={gender === 'female' ? 'default' : 'outline'}
                onClick={() => setGender('female')}
                className="flex-1"
              >
                Weiblich
              </Button>
            </div>
          </div>

          {/* Activity Level */}
          <div className="space-y-2">
            <Label>Aktivitätslevel</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activityLevels.map((level) => (
                <Button
                  key={level.value}
                  variant={activityLevel === level.value ? 'default' : 'outline'}
                  onClick={() => setActivityLevel(level.value)}
                  className="h-auto py-3 justify-start"
                >
                  <div className="text-left">
                    <div className="font-medium">{level.label}</div>
                    <div className="text-xs opacity-70">{level.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-muted rounded-lg p-4 space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Grundumsatz (BMR)</div>
                <div className="text-3xl font-bold text-primary">{formatNumberGerman(result.bmr)} kcal</div>
                <div className="text-xs text-muted-foreground">Kalorienbedarf in Ruhe</div>
              </div>
              <div className="border-t pt-4">
                <div className="text-sm text-muted-foreground mb-1">Gesamtumsatz (TDEE)</div>
                <div className="text-3xl font-bold">{formatNumberGerman(result.tdee)} kcal</div>
                <div className="text-xs text-muted-foreground">Täglicher Kalorienbedarf</div>
              </div>
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
