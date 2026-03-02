'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { calculateElectricityConsumption, calculateElectricityCost, germanElectricityPrices, typicalApplianceWattage } from '@/lib/conversions/energie_rechner';
import { formatCurrency } from '@/lib/conversions/finanzen';

export function StromverbrauchCalculator() {
  const [watt, setWatt] = useState<string>('');
  const [hours, setHours] = useState<string>('24');
  const [days, setDays] = useState<string>('365');
  const [pricePerKwh, setPricePerKwh] = useState<string>('0.35');
  const [results, setResults] = useState<{ kwh: number; cost: number } | null>(null);

  const handleCalculate = () => {
    const wattValue = parseGermanNumber(watt);
    const hoursValue = parseGermanNumber(hours);
    const daysValue = parseGermanNumber(days);
    const priceValue = parseGermanNumber(pricePerKwh);

    if (isNaN(wattValue) || wattValue <= 0) {
      toast.error('Bitte gültige Leistung eingeben');
      return;
    }

    const kwh = calculateElectricityConsumption(wattValue, hoursValue, daysValue);
    const cost = calculateElectricityCost(kwh, priceValue);
    setResults({ kwh, cost });
  };

  const presets = [
    { name: 'Kühlschrank', watt: typicalApplianceWattage.kuehlschrank },
    { name: 'Fernseher', watt: typicalApplianceWattage.fernseher },
    { name: 'PC', watt: typicalApplianceWattage.computer },
    { name: 'Waschmaschine', watt: typicalApplianceWattage.waschmaschine },
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie den Stromverbrauch und die Kosten eines Geräts.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Leistung (Watt)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={watt}
                onChange={(e) => setWatt(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 100"
              />
            </div>
            <div className="space-y-2">
              <Label>Stunden pro Tag</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="text-lg h-12"
                placeholder="24"
              />
            </div>
            <div className="space-y-2">
              <Label>Tage pro Jahr</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="text-lg h-12"
                placeholder="365"
              />
            </div>
            <div className="space-y-2">
              <Label>Preis pro kWh (€)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={pricePerKwh}
                onChange={(e) => setPricePerKwh(e.target.value)}
                className="text-lg h-12"
                placeholder="0.35"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => setWatt(preset.watt.toString())}
              >
                {preset.name} ({preset.watt}W)
              </Button>
            ))}
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="border-b pb-2">
                <div className="text-sm text-muted-foreground">Jährlicher Verbrauch</div>
                <div className="text-3xl font-bold text-primary">
                  {formatNumberGerman(results.kwh)} kWh
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Jährliche Kosten</div>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(results.cost)}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
