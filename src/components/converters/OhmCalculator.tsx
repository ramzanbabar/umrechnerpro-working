'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { calculateOhmsLaw } from '@/lib/conversions/developer';

export function OhmCalculator() {
  const [voltage, setVoltage] = useState<string>('');
  const [current, setCurrent] = useState<string>('');
  const [resistance, setResistance] = useState<string>('');
  const [power, setPower] = useState<string>('');

  const handleCalculate = () => {
    const params = {
      voltage: voltage ? parseGermanNumber(voltage) : undefined,
      current: current ? parseGermanNumber(current) : undefined,
      resistance: resistance ? parseGermanNumber(resistance) : undefined,
      power: power ? parseGermanNumber(power) : undefined,
    };

    // Need at least 2 values to calculate
    const providedValues = Object.values(params).filter(v => v !== undefined).length;
    if (providedValues < 2) {
      toast.error('Bitte mindestens 2 Werte eingeben');
      return;
    }

    const result = calculateOhmsLaw(params);
    
    if (result.voltage !== null && !voltage) setVoltage(formatNumberGerman(result.voltage));
    if (result.current !== null && !current) setCurrent(formatNumberGerman(result.current));
    if (result.resistance !== null && !resistance) setResistance(formatNumberGerman(result.resistance));
    if (result.power !== null && !power) setPower(formatNumberGerman(result.power));
  };

  const handleReset = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setPower('');
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Geben Sie mindestens 2 Werte ein. Die fehlenden Werte werden automatisch berechnet.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Spannung (V)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 230"
              />
            </div>
            <div className="space-y-2">
              <Label>Stromstärke (A)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 10"
              />
            </div>
            <div className="space-y-2">
              <Label>Widerstand (Ω)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={resistance}
                onChange={(e) => setResistance(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 23"
              />
            </div>
            <div className="space-y-2">
              <Label>Leistung (W)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 2300"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCalculate} className="flex-1">
              Berechnen
            </Button>
            <Button onClick={handleReset} variant="outline">
              Zurücksetzen
            </Button>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-semibold mb-2">Ohmsches Gesetz:</h3>
            <p className="text-sm text-muted-foreground">
              U = R × I | P = U × I | R = U / I
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
