'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { calculateCarCO2, calculateFlightCO2, co2EmissionFactors } from '@/lib/conversions/energie_rechner';

export function CO2Calculator() {
  const [type, setType] = useState<string>('car');
  const [distance, setDistance] = useState<string>('');
  const [consumption, setConsumption] = useState<string>('');
  const [fuelType, setFuelType] = useState<string>('benzin');
  const [flightClass, setFlightClass] = useState<string>('economy');
  const [results, setResults] = useState<{ co2: number } | null>(null);

  const handleCalculate = () => {
    const distanceValue = parseGermanNumber(distance);

    if (isNaN(distanceValue) || distanceValue <= 0) {
      toast.error('Bitte gültige Distanz eingeben');
      return;
    }

    let co2 = 0;

    if (type === 'car') {
      const consumptionValue = parseGermanNumber(consumption);
      if (isNaN(consumptionValue) || consumptionValue <= 0) {
        toast.error('Bitte gültigen Verbrauch eingeben');
        return;
      }
      co2 = calculateCarCO2(distanceValue, consumptionValue, fuelType as 'benzin' | 'diesel' | 'autogas');
    } else {
      co2 = calculateFlightCO2(distanceValue, flightClass as 'economy' | 'business' | 'first');
    }

    setResults({ co2 });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie den CO₂-Ausstoß für Auto oder Flug.
          </p>

          <div className="space-y-2">
            <Label>Verkehrsmittel</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="car">Auto</SelectItem>
                <SelectItem value="flight">Flugzeug</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Distanz (km)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="text-lg h-12"
                placeholder="z.B. 500"
              />
            </div>
            
            {type === 'car' && (
              <>
                <div className="space-y-2">
                  <Label>Verbrauch (L/100km)</Label>
                  <Input
                    type="text"
                    inputMode="decimal"
                    value={consumption}
                    onChange={(e) => setConsumption(e.target.value)}
                    className="text-lg h-12"
                    placeholder="z.B. 7,5"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Kraftstoff</Label>
                  <Select value={fuelType} onValueChange={setFuelType}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="benzin">Benzin ({co2EmissionFactors.benzin} kg CO₂/L)</SelectItem>
                      <SelectItem value="diesel">Diesel ({co2EmissionFactors.diesel} kg CO₂/L)</SelectItem>
                      <SelectItem value="autogas">Autogas ({co2EmissionFactors.autogas} kg CO₂/L)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            {type === 'flight' && (
              <div className="space-y-2">
                <Label>Flugklasse</Label>
                <Select value={flightClass} onValueChange={setFlightClass}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="first">First Class</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">CO₂-Ausstoß</div>
              <div className="text-3xl font-bold text-primary">
                {formatNumberGerman(results.co2)} kg CO₂
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                ≈ {formatNumberGerman(results.co2 / 1000)} Tonnen CO₂
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
