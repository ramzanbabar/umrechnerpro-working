'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { calculateSubnet } from '@/lib/conversions/developer';

export function IPSubnetzCalculator() {
  const [ip, setIp] = useState<string>('');
  const [cidr, setCidr] = useState<string>('24');
  const [results, setResults] = useState<ReturnType<typeof calculateSubnet> | null>(null);

  const handleCalculate = () => {
    const cidrNum = parseInt(cidr);

    if (!ip.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
      toast.error('Bitte gültige IP-Adresse eingeben (z.B. 192.168.1.1)');
      return;
    }

    if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) {
      toast.error('CIDR muss zwischen 0 und 32 liegen');
      return;
    }

    const result = calculateSubnet(ip, cidrNum);
    if (!result) {
      toast.error('Ungültige IP-Adresse');
      return;
    }

    setResults(result);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Berechnen Sie Subnetz-Informationen für IPv4-Netzwerke.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>IP-Adresse</Label>
              <Input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className="text-lg h-12 font-mono"
                placeholder="192.168.1.1"
              />
            </div>
            <div className="space-y-2">
              <Label>CIDR (Präfix)</Label>
              <div className="flex items-center gap-2">
                <span className="text-lg">/</span>
                <Input
                  type="number"
                  min={0}
                  max={32}
                  value={cidr}
                  onChange={(e) => setCidr(e.target.value)}
                  className="text-lg h-12"
                />
              </div>
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Berechnen
          </Button>

          {results && (
            <div className="bg-muted rounded-lg p-4 space-y-2 text-sm font-mono">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-muted-foreground">Netzwerk:</span>
                <span className="font-bold">{results.networkAddress}</span>
                <span className="text-muted-foreground">Broadcast:</span>
                <span className="font-bold">{results.broadcastAddress}</span>
                <span className="text-muted-foreground">Subnetzmaske:</span>
                <span className="font-bold">{results.subnetMask}</span>
                <span className="text-muted-foreground">Wildcard:</span>
                <span className="font-bold">{results.wildcardMask}</span>
                <span className="text-muted-foreground">Erster Host:</span>
                <span className="font-bold">{results.firstHost}</span>
                <span className="text-muted-foreground">Letzter Host:</span>
                <span className="font-bold">{results.lastHost}</span>
                <span className="text-muted-foreground">Hosts gesamt:</span>
                <span className="font-bold">{results.totalHosts}</span>
                <span className="text-muted-foreground">Nutzbare Hosts:</span>
                <span className="font-bold text-primary">{results.usableHosts}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
