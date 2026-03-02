'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { setConsent, getConsent, hasConsent } from '@/lib/analytics';
import Link from 'next/link';

// Initialize state outside component
const getInitialPreferences = () => {
  const consent = getConsent();
  return {
    necessary: true,
    statistics: consent?.statistics ?? false,
    marketing: consent?.marketing ?? false,
  };
};

export function GdprBanner() {
  const [open, setOpen] = useState(!hasConsent());
  const [preferences, setPreferences] = useState(getInitialPreferences);

  useEffect(() => {
    // Kleine Verzögerung für bessere UX
    if (!hasConsent()) {
      const timer = setTimeout(() => setOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    setConsent({
      necessary: true,
      statistics: true,
      marketing: true,
    });
    setOpen(false);
  };

  const handleAcceptNecessary = () => {
    setConsent({
      necessary: true,
      statistics: false,
      marketing: false,
    });
    setOpen(false);
  };

  const handleSavePreferences = () => {
    setConsent(preferences);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>🍪 Cookie-Einstellungen</DialogTitle>
          <DialogDescription className="text-left pt-2">
            Wir nutzen Cookies, um UmrechnerPro.de zu verbessern. Einige sind technisch notwendig, 
            andere helfen uns, die Seite zu analysieren und Werbung anzuzeigen.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Notwendig */}
          <div className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
            <Checkbox
              id="necessary"
              checked={true}
              disabled
              className="mt-0.5"
            />
            <div className="flex-1">
              <Label htmlFor="necessary" className="font-medium">
                Notwendig (immer aktiv)
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Diese Cookies sind für die Funktionalität der Seite erforderlich und können nicht deaktiviert werden.
              </p>
            </div>
          </div>

          {/* Statistiken */}
          <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox
              id="statistics"
              checked={preferences.statistics}
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({ ...prev, statistics: checked as boolean }))
              }
              className="mt-0.5"
            />
            <div className="flex-1">
              <Label htmlFor="statistics" className="font-medium cursor-pointer">
                Statistiken
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Helfen uns zu verstehen, wie die Seite genutzt wird (Google Analytics mit IP-Anonymisierung).
              </p>
            </div>
          </div>

          {/* Marketing */}
          <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox
              id="marketing"
              checked={preferences.marketing}
              onCheckedChange={(checked) =>
                setPreferences((prev) => ({ ...prev, marketing: checked as boolean }))
              }
              className="mt-0.5"
            />
            <div className="flex-1">
              <Label htmlFor="marketing" className="font-medium cursor-pointer">
                Marketing
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Ermöglichen personalisierte Werbung (Google AdSense).
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleAcceptNecessary} className="w-full sm:w-auto">
            Nur Notwendige
          </Button>
          <Button variant="outline" onClick={handleSavePreferences} className="w-full sm:w-auto">
            Auswahl speichern
          </Button>
          <Button onClick={handleAcceptAll} className="w-full sm:w-auto">
            Alle akzeptieren
          </Button>
        </DialogFooter>

        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          Mehr Informationen in unserer{' '}
          <Link href="/datenschutz" className="underline hover:text-primary">
            Datenschutzerklärung
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
