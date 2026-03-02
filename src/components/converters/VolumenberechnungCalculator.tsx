'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { formatNumberGerman, parseGermanNumber } from '@/lib/formatters';
import { 
  calculateSphereVolume, calculateCubeVolume,
  calculateCylinderVolume, calculateConeVolume,
  calculateBoxVolume
} from '@/lib/conversions/geometrie';

export function VolumenberechnungCalculator() {
  const [shape, setShape] = useState<string>('cube');
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [results, setResults] = useState<number | null>(null);

  const handleCalculate = () => {
    const values: Record<string, number> = {};
    
    for (const [key, val] of Object.entries(inputs)) {
      const num = parseGermanNumber(val);
      if (isNaN(num) || num <= 0) {
        toast.error(`Bitte gültigen Wert eingeben`);
        return;
      }
      values[key] = num;
    }

    let volume = 0;

    switch (shape) {
      case 'cube':
        if (!values.side) { toast.error('Seitenlänge fehlt'); return; }
        volume = calculateCubeVolume(values.side);
        break;
      case 'box':
        if (!values.length || !values.width || !values.height) { toast.error('Alle Werte fehlen'); return; }
        volume = calculateBoxVolume(values.length, values.width, values.height);
        break;
      case 'cylinder':
        if (!values.radius || !values.height) { toast.error('Radius und Höhe fehlen'); return; }
        volume = calculateCylinderVolume(values.radius, values.height);
        break;
      case 'cone':
        if (!values.radius || !values.height) { toast.error('Radius und Höhe fehlen'); return; }
        volume = calculateConeVolume(values.radius, values.height);
        break;
      case 'sphere':
        if (!values.radius) { toast.error('Radius fehlt'); return; }
        volume = calculateSphereVolume(values.radius);
        break;
    }

    setResults(volume);
  };

  const renderInputs = () => {
    switch (shape) {
      case 'cube':
        return (
          <div className="space-y-2 col-span-2">
            <Label>Seitenlänge (m)</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={inputs.side || ''}
              onChange={(e) => setInputs({ ...inputs, side: e.target.value })}
              className="text-lg h-12"
              placeholder="z.B. 2"
            />
          </div>
        );
      case 'box':
        return (
          <>
            <div className="space-y-2">
              <Label>Länge (m)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={inputs.length || ''}
                onChange={(e) => setInputs({ ...inputs, length: e.target.value })}
                className="text-lg h-12"
                placeholder="z.B. 3"
              />
            </div>
            <div className="space-y-2">
              <Label>Breite (m)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={inputs.width || ''}
                onChange={(e) => setInputs({ ...inputs, width: e.target.value })}
                className="text-lg h-12"
                placeholder="z.B. 2"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Höhe (m)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={inputs.height || ''}
                onChange={(e) => setInputs({ ...inputs, height: e.target.value })}
                className="text-lg h-12"
                placeholder="z.B. 1,5"
              />
            </div>
          </>
        );
      case 'cylinder':
      case 'cone':
        return (
          <>
            <div className="space-y-2">
              <Label>Radius (m)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={inputs.radius || ''}
                onChange={(e) => setInputs({ ...inputs, radius: e.target.value })}
                className="text-lg h-12"
                placeholder="z.B. 1"
              />
            </div>
            <div className="space-y-2">
              <Label>Höhe (m)</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={inputs.height || ''}
                onChange={(e) => setInputs({ ...inputs, height: e.target.value })}
                className="text-lg h-12"
                placeholder="z.B. 3"
              />
            </div>
          </>
        );
      case 'sphere':
        return (
          <div className="space-y-2 col-span-2">
            <Label>Radius (m)</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={inputs.radius || ''}
              onChange={(e) => setInputs({ ...inputs, radius: e.target.value })}
              className="text-lg h-12"
              placeholder="z.B. 2"
            />
          </div>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie das Volumen verschiedener geometrischer Körper.
          </p>

          <div className="space-y-2">
            <Label>Körper auswählen</Label>
            <Select value={shape} onValueChange={(v) => { setShape(v); setInputs({}); setResults(null); }}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cube">Würfel</SelectItem>
                <SelectItem value="box">Quader</SelectItem>
                <SelectItem value="cylinder">Zylinder</SelectItem>
                <SelectItem value="cone">Kegel</SelectItem>
                <SelectItem value="sphere">Kugel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {renderInputs()}
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results !== null && (
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Volumen</div>
              <div className="text-3xl font-bold text-primary">
                {formatNumberGerman(results, 2)} m³
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                = {formatNumberGerman(results * 1000, 0)} Liter
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
