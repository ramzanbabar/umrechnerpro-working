'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { calculateAge } from '@/lib/conversions/datum';

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>('1990-01-01');

  const result = useMemo(() => {
    if (!birthDate) return null;
    
    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) return null;
    
    return calculateAge(birth);
  }, [birthDate]);

  const copyResult = () => {
    if (result) {
      const text = `${result.years} Jahre, ${result.months} Monate, ${result.days} Tage alt`;
      navigator.clipboard.writeText(text);
      toast.success('Kopiert!');
    }
  };

  // Calculate next birthday
  const nextBirthday = useMemo(() => {
    if (!birthDate) return null;
    
    const birth = new Date(birthDate);
    const today = new Date();
    const next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    
    if (next <= today) {
      next.setFullYear(today.getFullYear() + 1);
    }
    
    const diffTime = next.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return { date: next, daysUntil: diffDays };
  }, [birthDate]);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Date Input */}
          <div className="space-y-2">
            <Label>Geburtsdatum</Label>
            <Input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="text-lg h-12"
            />
          </div>

          {/* Result */}
          {result && (
            <div className="bg-muted rounded-lg p-4 space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Ihr Alter</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">{result.years}</span>
                  <span className="text-xl">Jahre</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Monate:</span>
                  <span className="ml-2 font-medium">{result.months}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Tage:</span>
                  <span className="ml-2 font-medium">{result.days}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Wochen:</span>
                  <span className="ml-2 font-medium">{result.totalWeeks.toLocaleString('de-DE')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Tage gesamt:</span>
                  <span className="ml-2 font-medium">{result.totalDays.toLocaleString('de-DE')}</span>
                </div>
              </div>

              {nextBirthday && (
                <div className="border-t pt-4">
                  <div className="text-sm text-muted-foreground mb-1">Nächster Geburtstag</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold">{nextBirthday.daysUntil}</span>
                    <span className="text-muted-foreground">Tage</span>
                  </div>
                </div>
              )}
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
