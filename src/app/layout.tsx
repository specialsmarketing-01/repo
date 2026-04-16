import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/CookieBanner";
import MobileCallBar from "@/components/MobileCallBar";
import { SERVICE_EMAIL, SERVICE_PHONE } from "@/lib/contact";

const GOOGLE_ADS_ID = "AW-17863468955";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.haushaltsgeraete-kundendienst.at";
const siteName = "GeräteProfi";
const siteDescription =
  "Schneller Haushaltsgeräte-Kundendienst in Hamburg – Waschmaschine, Geschirrspüler, Kühlschrank, Backofen, Trockner.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Reparatur Hamburg | ${siteName}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `Reparatur Hamburg | ${siteName}`,
    description: siteDescription,
    siteName,
    locale: "de_AT",
  },
  alternates: {
    canonical: "/",
    languages: {
      "de-AT": "/",
      "en-AT": "/en",
    },
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}#localbusiness`,
  name: siteName,
  description: siteDescription,
  url: siteUrl,
  telephone: SERVICE_PHONE,
  email: SERVICE_EMAIL,
  geo: {
    "@type": "GeoCoordinates",
    latitude: 53.5511,
    longitude: 9.9937,
  },
  areaServed: [
    "Hamburg",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900`}
      >
        {/* Load Google Tag (Ads + GA4) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />

        {/* Global gtag setup + Consent Mode */}
        <Script
          id="gtag-global"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;

              gtag('js', new Date());

              // Default consent (GDPR compliant)
              gtag('consent','default',{
                ad_storage:'denied',
                
              });

              // Configure Google Ads
              gtag('config','${GOOGLE_ADS_ID}');

             

              // Consent update function (used by CookieBanner)
              window.updateConsent = function(granted){
                if(!window.gtag) return;
                window.gtag('consent','update',{
                  ad_storage: granted ? 'granted' : 'denied',
                });
              };

              
            `,
          }}
        />

        <div className="flex min-h-screen flex-col">
          <Navbar />

          <main className="flex-1 pb-24 md:pb-0">
            {children}

            {/* LocalBusiness JSON-LD */}
            <script
              type="application/ld+json"
              suppressHydrationWarning
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(localBusinessJsonLd),
              }}
            />
          </main>

          <Footer />
        </div>

        <MobileCallBar />
        <CookieBanner />
      </body>
    </html>
  );
}
