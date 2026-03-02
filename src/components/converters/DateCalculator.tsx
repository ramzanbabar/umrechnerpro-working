'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { calculateDateDifference, addDays, addWeeks, addMonths, addYears } from '@/lib/conversions/datum';

type DateMode = 'difference' | 'add';

export function DateCalculator() {
  const [mode, setMode] = useState<DateMode>('difference');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [daysToAdd, setDaysToAdd] = useState<string>('30');

  const differenceResult = useMemo(() => {
    if (!startDate || !endDate) return null;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;
    
    return calculateDateDifference(start, end);
  }, [startDate, endDate]);

  const addResult = useMemo(() => {
    if (!startDate) return null;
    
    const start = new Date(startDate);
    if (isNaN(start.getTime())) return null;
    
    const days = parseGermanNumber(daysToAdd);
    if (isNaN(days)) return null;
    
    return addDays(start, days);
  }, [startDate, daysToAdd]);

  const copyResult = () => {
    if (mode === 'difference' && differenceResult) {
      const text = `${differenceResult.days} Tage zwischen ${startDate} und ${endDate}`;
      navigator.clipboard.writeText(text);
    } else if (mode === 'add' && addResult) {
      const text = `${daysToAdd} Tage nach ${startDate}: ${addResult.toLocaleDateString('de-DE')}`;
      navigator.clipboard.writeText(text);
    }
    toast.success('Kopiert!');
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="space-y-2">
            <Label>Berechnungsart</Label>
            <RadioGroup value={mode} onValueChange={(v) => setMode(v as DateMode)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="difference" id="difference" />
                <Label htmlFor="difference" className="cursor-pointer">Tage zwischen zwei Daten</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add" id="add" />
                <Label htmlFor="add" className="cursor-pointer">Tage zu einem Datum addieren</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Date Inputs */}
          {mode === 'difference' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Startdatum</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label>Enddatum</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Startdatum</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label>Tage hinzufügen</Label>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={daysToAdd}
                  onChange={(e) => setDaysToAdd(e.target.value)}
                  className="h-12"
                  placeholder="Anzahl Tage"
                />
              </div>
            </div>
          )}

          {/* Results */}
          {mode === 'difference' && differenceResult && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Unterschied</div>
                <div className="text-3xl font-bold text-primary">
                  {differenceResult.days.toLocaleString('de-DE')} Tage
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-background rounded p-2 text-center">
                  <div className="text-muted-foreground">Wochen</div>
                  <div className="font-semibold">{differenceResult.weeks.toLocaleString('de-DE', { maximumFractionDigits: 1 })}</div>
                </div>
                <div className="bg-background rounded p-2 text-center">
                  <div className="text-muted-foreground">Monate</div>
                  <div className="font-semibold">{differenceResult.months.toLocaleString('de-DE', { maximumFractionDigits: 1 })}</div>
                </div>
                <div className="bg-background rounded p-2 text-center">
                  <div className="text-muted-foreground">Jahre</div>
                  <div className="font-semibold">{differenceResult.years.toLocaleString('de-DE', { maximumFractionDigits: 1 })}</div>
                </div>
              </div>
            </div>
          )}

          {mode === 'add' && addResult && (
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">
                {parseGermanNumber(daysToAdd) >= 0 ? 'Neues Datum' : 'Neues Datum (zurück)'}
              </div>
              <div className="text-3xl font-bold text-primary">
                {addResult.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
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
