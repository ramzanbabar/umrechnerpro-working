import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GdprBanner } from "@/components/layout/GdprBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://umrechnerpro.de"),
  title: {
    default: "UmrechnerPro – Kostenlose Einheitenumrechner auf Deutsch",
    template: "%s | UmrechnerPro.de",
  },
  description: "100+ kostenlose Umrechner und Rechner: Länge, Gewicht, Temperatur, Prozent, MwSt, BMI und mehr. Präzise, sofort, auf Deutsch. Für Deutschland, Österreich und Schweiz.",
  keywords: ["Umrechner", "Einheitenumrechner", "Rechner", "Prozent rechner", "BMI rechner", "MwSt rechner", "cm in zoll", "kg in pfund"],
  authors: [{ name: "UmrechnerPro Team" }],
  creator: "UmrechnerPro",
  publisher: "UmrechnerPro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://umrechnerpro.de",
    siteName: "UmrechnerPro",
    title: "UmrechnerPro – Kostenlose Einheitenumrechner auf Deutsch",
    description: "100+ kostenlose Umrechner und Rechner für Deutschland, Österreich und Schweiz.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UmrechnerPro - Einheitenumrechner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UmrechnerPro – Kostenlose Einheitenumrechner",
    description: "100+ kostenlose Umrechner und Rechner auf Deutsch.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://umrechnerpro.de",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <GdprBanner />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
