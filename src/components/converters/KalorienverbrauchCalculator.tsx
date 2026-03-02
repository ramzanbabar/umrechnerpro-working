'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { calculateTDEE, calculateCalorieGoal, activityLevelDescriptions, Gender } from '@/lib/conversions/gesundheit';

const activityCalories: Record<string, number> = {
  walking: 4,
  jogging: 10,
  running: 12,
  cycling: 8,
  swimming: 10,
  gym: 6,
};

export function KalorienverbrauchCalculator() {
  const [weight, setWeight] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [activity, setActivity] = useState<string>('walking');
  const [calories, setCalories] = useState<number | null>(null);

  const handleCalculate = () => {
    const weightValue = parseGermanNumber(weight);
    const durationValue = parseGermanNumber(duration);

    if (isNaN(weightValue) || weightValue <= 0) {
      toast.error('Bitte gültiges Gewicht eingeben');
      return;
    }
    if (isNaN(durationValue) || durationValue <= 0) {
      toast.error('Bitte gültige Dauer eingeben');
      return;
    }

    const met = activityCalories[activity] || 4;
    const burned = met * weightValue * (durationValue / 60);
    setCalories(burned);
  };

  const activities = [
    { value: 'walking', label: 'Gehen (4 km/h)' },
    { value: 'jogging', label: 'Joggen (8 km/h)' },
    { value: 'running', label: 'Laufen (12 km/h)' },
    { value: 'cycling', label: 'Radfahren (20 km/h)' },
    { value: 'swimming', label: 'Schwimmen' },
    { value: 'gym', label: 'Krafttraining' },
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie den Kalorienverbrauch für verschiedene Aktivitäten.
          </p>

          <div className="grid grid-cols-3 gap-4">
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
              <Label>Dauer (Min)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 30"
              />
            </div>
            <div className="space-y-2">
              <Label>Aktivität</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {activities.map((a) => (
                    <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {calories !== null && (
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Verbrannte Kalorien</div>
              <div className="text-3xl font-bold text-primary">
                {formatNumberGerman(calories, 0)} kcal
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
