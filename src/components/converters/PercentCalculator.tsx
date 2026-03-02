'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { calculatePercentOf, calculateWhatPercent, calculatePercentIncrease, calculatePercentDecrease, increaseByPercent, decreaseByPercent, calculatePriceAfterDiscount } from '@/lib/conversions/prozent';

interface PercentCalculatorProps {
  toolSlug: string;
}

type CalculationMode = 'percentOf' | 'whatPercent' | 'increase' | 'decrease' | 'increaseBy' | 'decreaseBy' | 'discount';

export function PercentCalculator({ toolSlug }: PercentCalculatorProps) {
  const [mode, setMode] = useState<CalculationMode>('percentOf');
  const [value1, setValue1] = useState<string>('20');
  const [value2, setValue2] = useState<string>('200');

  const calculate = useMemo(() => {
    const num1 = parseGermanNumber(value1);
    const num2 = parseGermanNumber(value2);
    
    if (isNaN(num1) || isNaN(num2)) return null;
    
    switch (mode) {
      case 'percentOf':
        return calculatePercentOf(num1, num2); // X% von Y
      case 'whatPercent':
        return calculateWhatPercent(num1, num2); // X ist wie viel % von Y
      case 'increase':
        return calculatePercentIncrease(num1, num2); // Steigerung von X auf Y
      case 'decrease':
        return calculatePercentDecrease(num1, num2); // Reduzierung von X auf Y
      case 'increaseBy':
        return increaseByPercent(num1, num2); // X erhöht um Y%
      case 'decreaseBy':
        return decreaseByPercent(num1, num2); // X reduziert um Y%
      case 'discount':
        return calculatePriceAfterDiscount(num1, num2); // X mit Y% Rabatt
      default:
        return null;
    }
  }, [mode, value1, value2]);

  const modeLabels: Record<CalculationMode, { label: string; input1: string; input2: string; result: string }> = {
    percentOf: { label: 'X% von Y berechnen', input1: 'Prozent (%)', input2: 'Grundwert', result: 'Prozentwert' },
    whatPercent: { label: 'Wie viel % ist X von Y', input1: 'Teilwert', input2: 'Gesamtwert', result: 'Prozentsatz (%)' },
    increase: { label: 'Prozentuale Steigerung', input1: 'Alter Wert', input2: 'Neuer Wert', result: 'Steigerung (%)' },
    decrease: { label: 'Prozentuale Reduzierung', input1: 'Alter Wert', input2: 'Neuer Wert', result: 'Reduzierung (%)' },
    increaseBy: { label: 'Wert um X% erhöhen', input1: 'Grundwert', input2: 'Erhöhung (%)', result: 'Neuer Wert' },
    decreaseBy: { label: 'Wert um X% reduzieren', input1: 'Grundwert', input2: 'Reduzierung (%)', result: 'Neuer Wert' },
    discount: { label: 'Rabatt berechnen', input1: 'Originalpreis', input2: 'Rabatt (%)', result: 'Neuer Preis' },
  };

  const copyResult = () => {
    if (calculate !== null) {
      navigator.clipboard.writeText(formatNumberGerman(calculate));
      toast.success('Kopiert!');
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="space-y-2">
            <Label>Berechnungsart</Label>
            <Select value={mode} onValueChange={(v) => setMode(v as CalculationMode)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(modeLabels).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{modeLabels[mode].input1}</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="text-lg h-12"
              />
            </div>
            <div className="space-y-2">
              <Label>{modeLabels[mode].input2}</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="text-lg h-12"
              />
            </div>
          </div>

          {/* Result */}
          <div className="bg-muted rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-1">{modeLabels[mode].result}</div>
            <div className="text-3xl font-bold text-primary">
              {calculate !== null ? formatNumberGerman(calculate) : '—'}
              {mode === 'percentOf' && calculate !== null && ''}
              {(mode === 'whatPercent' || mode === 'increase' || mode === 'decrease') && calculate !== null && ' %'}
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
