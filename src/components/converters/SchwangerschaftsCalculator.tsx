'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { addDays } from '@/lib/conversions/datum';

export function SchwangerschaftsCalculator() {
  const [lastPeriod, setLastPeriod] = useState<string>('');
  const [results, setResults] = useState<{ 
    geburtstermin: Date; 
    ssw: number; 
    tageBleiben: number;
    trimester: number;
  } | null>(null);

  const handleCalculate = () => {
    if (!lastPeriod) {
      toast.error('Bitte das Datum der letzten Periode eingeben');
      return;
    }

    const lastPeriodDate = new Date(lastPeriod);
    if (isNaN(lastPeriodDate.getTime())) {
      toast.error('Bitte gültiges Datum eingeben');
      return;
    }

    // Naegele-Regel: + 7 Tage, - 3 Monate, + 1 Jahr
    const geburtstermin = addDays(lastPeriodDate, 280); // 40 Wochen = 280 Tage

    // Aktuelle SSW berechnen
    const today = new Date();
    const daysSinceLastPeriod = Math.floor((today.getTime() - lastPeriodDate.getTime()) / (1000 * 60 * 60 * 24));
    const ssw = Math.floor(daysSinceLastPeriod / 7);
    const tageBleiben = Math.floor((geburtstermin.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Trimester
    let trimester = 1;
    if (ssw >= 13) trimester = 2;
    if (ssw >= 27) trimester = 3;

    setResults({ geburtstermin, ssw, tageBleiben, trimester });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie den Geburtstermin und die aktuelle Schwangerschaftswoche.
          </p>

          <div className="space-y-2">
            <Label>Datum der letzten Periode</Label>
            <Input
              type="date"
              value={lastPeriod}
              onChange={(e) => setLastPeriod(e.target.value)}
              className="text-lg h-12"
            />
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="border-b pb-2">
                <div className="text-sm text-muted-foreground">Geburtstermin</div>
                <div className="text-3xl font-bold text-primary">
                  {results.geburtstermin.toLocaleDateString('de-DE', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-muted-foreground text-sm">SSW</div>
                  <div className="text-xl font-bold">{results.ssw}. Woche</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Noch</div>
                  <div className="text-xl font-bold">{results.tageBleiben} Tage</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Trimester</div>
                  <div className="text-xl font-bold">{results.trimester}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
