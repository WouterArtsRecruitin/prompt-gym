import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Prompt Gym | Gratis AI Training voor Recruiters",
    template: "%s | The Prompt Gym",
  },
  description:
    "Leer in 15 minuten effectieve AI prompts schrijven voor CV screening, vacatureteksten en sourcing. Gratis interactieve training met kant-en-klare templates.",
  keywords: [
    "AI recruitment",
    "prompt engineering",
    "ChatGPT recruiters",
    "AI training HR",
    "CV screening AI",
    "vacatureteksten schrijven",
    "recruitment automation",
    "AI sourcing",
  ],
  authors: [{ name: "Recruitin" }],
  creator: "Recruitin",
  publisher: "Recruitin B.V.",
  metadataBase: new URL("https://promptgym.recruitin.nl"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://promptgym.recruitin.nl",
    siteName: "The Prompt Gym",
    title: "The Prompt Gym | Word een AI-Powered Recruiter",
    description:
      "Gratis interactieve AI training voor recruiters. Leer prompt engineering in 15 minuten en krijg kant-en-klare templates.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Prompt Gym - AI Training voor Recruiters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Prompt Gym | Gratis AI Training voor Recruiters",
    description:
      "Leer in 15 minuten effectieve AI prompts schrijven. Gratis training met templates.",
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
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f0f12" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
