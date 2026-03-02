'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';

export function LaufzeitCalculator() {
  const [mode, setMode] = useState<string>('distance');
  const [distance, setDistance] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [pace, setPace] = useState<string>('');
  const [results, setResults] = useState<{ pace: string; speed: number; result: string } | null>(null);

  const parseTime = (timeStr: string): number => {
    // Format: MM:SS or HH:MM:SS
    const parts = timeStr.split(':').map(Number);
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1]; // Minuten + Sekunden
    } else if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return parseGermanNumber(timeStr) * 60; // Angabe in Minuten
  };

  const formatPace = (secondsPerKm: number): string => {
    const min = Math.floor(secondsPerKm / 60);
    const sec = Math.round(secondsPerKm % 60);
    return `${min}:${sec.toString().padStart(2, '0')} min/km`;
  };

  const handleCalculate = () => {
    if (mode === 'distance') {
      const distValue = parseGermanNumber(distance);
      const timeSeconds = parseTime(time);

      if (isNaN(distValue) || distValue <= 0) {
        toast.error('Bitte gültige Distanz eingeben');
        return;
      }
      if (isNaN(timeSeconds) || timeSeconds <= 0) {
        toast.error('Bitte gültige Zeit eingeben');
        return;
      }

      const secondsPerKm = timeSeconds / distValue;
      const speed = (distValue / 1000) / (timeSeconds / 3600);

      setResults({
        pace: formatPace(secondsPerKm),
        speed: speed,
        result: `Pace: ${formatPace(secondsPerKm)}`
      });
    } else if (mode === 'pace') {
      const distValue = parseGermanNumber(distance);
      const paceParts = pace.split(':').map(Number);
      const paceSeconds = paceParts.length === 2 ? paceParts[0] * 60 + paceParts[1] : parseGermanNumber(pace) * 60;

      if (isNaN(distValue) || distValue <= 0) {
        toast.error('Bitte gültige Distanz eingeben');
        return;
      }
      if (isNaN(paceSeconds) || paceSeconds <= 0) {
        toast.error('Bitte gültigen Pace eingeben');
        return;
      }

      const totalTime = paceSeconds * distValue;
      const hours = Math.floor(totalTime / 3600);
      const minutes = Math.floor((totalTime % 3600) / 60);
      const seconds = Math.round(totalTime % 60);

      const timeStr = hours > 0 
        ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        : `${minutes}:${seconds.toString().padStart(2, '0')}`;

      const speed = 3600 / paceSeconds;

      setResults({
        pace: pace,
        speed: speed,
        result: `Zeit: ${timeStr}`
      });
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie Pace, Zeit oder Distanz für Ihr Training.
          </p>

          <div className="space-y-2">
            <Label>Berechnungsmodus</Label>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Pace berechnen (aus Distanz & Zeit)</SelectItem>
                <SelectItem value="pace">Zeit berechnen (aus Distanz & Pace)</SelectItem>
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
                placeholder="z.B. 10"
              />
            </div>
            {mode === 'distance' ? (
              <div className="space-y-2">
                <Label>Zeit (MM:SS oder Min)</Label>
                <Input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="text-lg h-12"
                  placeholder="z.B. 45:30"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Pace (MM:SS pro km)</Label>
                <Input
                  type="text"
                  value={pace}
                  onChange={(e) => setPace(e.target.value)}
                  className="text-lg h-12"
                  placeholder="z.B. 5:30"
                />
              </div>
            )}
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="border-b pb-2">
                <div className="text-sm text-muted-foreground">Ergebnis</div>
                <div className="text-3xl font-bold text-primary">
                  {results.result}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Geschwindigkeit: </span>
                <strong>{formatNumberGerman(results.speed, 1)} km/h</strong>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
