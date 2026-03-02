'use client';

import { useState, useCallback, useMemo } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { formatNumberSmart, parseGermanNumber } from '@/lib/formatters';
import { copyToClipboard, favorites } from '@/lib/utils';
import type { Tool } from '@/lib/tools';

// Import all conversion functions
import { convertLength } from '@/lib/conversions/laenge';
import { convertWeight } from '@/lib/conversions/gewicht';
import { convertTemperature } from '@/lib/conversions/temperatur';
import { convertArea } from '@/lib/conversions/flaeche';
import { convertVolume } from '@/lib/conversions/volumen';
import { convertTime } from '@/lib/conversions/zeit';
import { convertSpeed, convertFuelConsumption } from '@/lib/conversions/geschwindigkeit';
import { convertPressure } from '@/lib/conversions/druck';
import { convertEnergy } from '@/lib/conversions/energie';
import { convertPower } from '@/lib/conversions/leistung';
import { convertForce } from '@/lib/conversions/kraft';
import { convertAngle } from '@/lib/conversions/winkel';
import { convertData } from '@/lib/conversions/datenspeicher';
import { convertFrequency } from '@/lib/conversions/frequenz';
import { convertDensity } from '@/lib/conversions/dichte';
import { convertAcceleration } from '@/lib/conversions/beschleunigung';
import { convertTorque } from '@/lib/conversions/drehmoment';
import { convertDynamicViscosity } from '@/lib/conversions/viskositaet';
import { convertFlowRate } from '@/lib/conversions/volumenstrom';
import { convertCurrent } from '@/lib/conversions/strom';
import { convertMagneticFluxDensity } from '@/lib/conversions/magnetismus';
import { convertIlluminance } from '@/lib/conversions/licht';
import { convertRadioactivity } from '@/lib/conversions/strahlung';
import { convertDataTransfer } from '@/lib/conversions/datentransfer';
import { convertShoeSize } from '@/lib/conversions/schuhgroessen';
import { convertCooking } from '@/lib/conversions/kocheinheiten';
import { pxToPt, ptToPx, pxToEm, emToPx } from '@/lib/conversions/typografie';

// Get conversion function by slug
function getConversionFunction(slug: string): (value: number, from: string, to: string) => number {
  const functions: Record<string, (value: number, from: any, to: any) => number> = {
    'laengen-umrechner': convertLength,
    'gewicht-umrechner': convertWeight,
    'temperatur-umrechner': convertTemperature,
    'flaechen-umrechner': convertArea,
    'volumen-umrechner': convertVolume,
    'zeit-umrechner': convertTime,
    'geschwindigkeit-umrechner': convertSpeed,
    'druck-umrechner': convertPressure,
    'energie-umrechner': convertEnergy,
    'leistung-umrechner': convertPower,
    'kraft-umrechner': convertForce,
    'winkel-umrechner': convertAngle,
    'datenspeicher-umrechner': convertData,
    'datentransfer-umrechner': convertDataTransfer,
    'frequenz-umrechner': convertFrequency,
    'dichte-umrechner': convertDensity,
    'beschleunigung-umrechner': convertAcceleration,
    'drehmoment-umrechner': convertTorque,
    'viskositaet-umrechner': convertDynamicViscosity,
    'volumenstrom-umrechner': convertFlowRate,
    'strom-umrechner': convertCurrent,
    'magnetismus-umrechner': convertMagneticFluxDensity,
    'licht-umrechner': convertIlluminance,
    'strahlung-umrechner': convertRadioactivity,
    'schuhgroesse-umrechner': convertShoeSize,
    'kocheinheiten-umrechner': convertCooking,
    'kraftstoffverbrauch-umrechner': convertFuelConsumption,
    'typografie-umrechner': (value, from, to) => {
      if (from === 'px' && to === 'pt') return pxToPt(value);
      if (from === 'pt' && to === 'px') return ptToPx(value);
      if (from === 'px' && to === 'em') return pxToEm(value);
      if (from === 'em' && to === 'px') return emToPx(value);
      return value;
    },
    // Kalorien/Energie - use energy conversion
    'kalorienrechner': convertEnergy,
    // Kleidgrößen
    'kleidergroesse-umrechner': (value) => value,
    // Reifengröße - pass through (has own display logic)
    'reifengroesse-umrechner': (value) => value,
    // Farben - basic conversion
    'farb-umrechner': (value, from, to) => {
      // For colors, we need special handling - this is a placeholder
      return value;
    },
  };
  
  return functions[slug] || ((value) => value);
}

interface UnitConverterProps {
  tool: Tool;
  initialFrom?: string;
  initialTo?: string;
  initialValue?: string;
}

export function UnitConverter({ 
  tool, 
  initialFrom,
  initialTo,
  initialValue
}: UnitConverterProps) {
  const units = tool.units || [];
  const convertFunction = useMemo(() => getConversionFunction(tool.slug), [tool.slug]);

  // State - initialize with correct values
  const [fromValue, setFromValue] = useState<string>(initialValue || '1');
  const [fromUnit, setFromUnit] = useState<string>(initialFrom || units[0]?.value || '');
  const [toUnit, setToUnit] = useState<string>(initialTo || units[1]?.value || '');
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => favorites.isFavorite(tool.slug));

  // Calculate result using useMemo
  const result = useMemo(() => {
    const numValue = parseGermanNumber(fromValue);
    if (!isNaN(numValue) && fromUnit && toUnit) {
      return convertFunction(numValue, fromUnit, toUnit);
    }
    return 0;
  }, [fromValue, fromUnit, toUnit, convertFunction]);

  // Handlers
  const handleSwapUnits = useCallback(() => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(formatNumberSmart(result));
  }, [toUnit, fromUnit, result]);

  const handleCopy = useCallback(async () => {
    const text = `${fromValue} ${units.find(u => u.value === fromUnit)?.symbol || fromUnit} = ${formatNumberSmart(result)} ${units.find(u => u.value === toUnit)?.symbol || toUnit}`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      toast.success('Kopiert!');
      setTimeout(() => setCopied(false), 2000);
    }
  }, [fromValue, fromUnit, result, toUnit, units]);

  const handleToggleFavorite = useCallback(() => {
    const { isFavorite: newStatus } = favorites.toggle(tool.slug);
    setIsFavorite(newStatus);
    toast.success(newStatus ? 'Zu Favoriten hinzugefügt' : 'Aus Favoriten entfernt');
  }, [tool.slug]);

  // Quick values
  const quickValues = [0.1, 1, 10, 100, 1000];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* From Input */}
          <div className="space-y-2">
            <Label htmlFor="from-value" className="text-sm font-medium">
              Von
            </Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  id="from-value"
                  type="text"
                  inputMode="decimal"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  placeholder="Wert eingeben"
                  className="text-lg h-12"
                />
              </div>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger className="w-32 h-12">
                  <SelectValue placeholder="Einheit" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.symbol} – {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={handleSwapUnits}
              className="rounded-full h-10 w-10"
              title="Einheiten tauschen"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>

          {/* To Input */}
          <div className="space-y-2">
            <Label htmlFor="to-value" className="text-sm font-medium">
              Nach
            </Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  id="to-value"
                  type="text"
                  value={formatNumberSmart(result)}
                  readOnly
                  className="text-lg h-12 bg-muted font-medium"
                />
              </div>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger className="w-32 h-12">
                  <SelectValue placeholder="Einheit" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.symbol} – {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Values */}
          <div className="flex flex-wrap gap-2">
            {quickValues.map((val) => (
              <Button
                key={val}
                variant="outline"
                size="sm"
                onClick={() => setFromValue(val.toString())}
                className="text-xs min-w-[3rem]"
              >
                {val}
              </Button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="flex-1"
            >
              {copied ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              Kopieren
            </Button>
            <Button
              variant={isFavorite ? 'default' : 'outline'}
              size="sm"
              onClick={handleToggleFavorite}
              className="flex-1"
            >
              {isFavorite ? '★ Favorit' : '☆ Favorit'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
