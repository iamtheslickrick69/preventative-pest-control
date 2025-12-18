import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ScrollToTop } from "@/components/scroll-to-top"
import { AIChatWidget } from "@/components/ai-chat"
import { GoogleAnalytics } from "@/components/google-analytics"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Preventive Pest Control | St. George, UT | 25+ Years Serving Southern Utah",
  description:
    "Southern Utah's trusted pest control experts for 25+ years. Ant, scorpion, termite, rodent, and mosquito control. Get your first service for $39.95. Call (435) 256-6391.",
  generator: "v0.app",
  keywords: [
    "pest control St. George",
    "exterminator St. George UT",
    "scorpion control Utah",
    "termite control Southern Utah",
    "rodent control Cedar City",
    "mosquito control Hurricane UT",
    "ant control Mesquite NV",
    "bed bug exterminator",
    "spider control Utah",
    "pest control near me",
  ],
  authors: [{ name: "Preventive Pest Control" }],
  creator: "Preventive Pest Control",
  publisher: "Preventive Pest Control",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://preventivepestcontrol.com",
    siteName: "Preventive Pest Control",
    title: "Preventive Pest Control | St. George's Top Pest Control Professionals",
    description:
      "Southern Utah's trusted pest control experts for 25+ years. 965+ 5-star reviews. Get your first service for $39.95. Serving St. George, Cedar City & Mesquite.",
    images: [
      {
        url: "https://preventivepestcontrol.com/images/officialogoprevent.png",
        width: 1200,
        height: 630,
        alt: "Preventive Pest Control Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preventive Pest Control | St. George, UT",
    description:
      "Southern Utah's trusted pest control experts. 965+ 5-star reviews. $39.95 first service. Call (435) 256-6391.",
    images: ["https://preventivepestcontrol.com/images/officialogoprevent.png"],
    creator: "@preventivepest",
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
    google: "your-google-verification-code", // Add your actual verification code
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://preventivepestcontrol.com",
    "name": "Preventive Pest Control",
    "image": "https://preventivepestcontrol.com/images/officialogoprevent.png",
    "logo": "https://preventivepestcontrol.com/images/officialogoprevent.png",
    "url": "https://preventivepestcontrol.com",
    "telephone": "+14352566391",
    "priceRange": "$39.95 - $149",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "946 W Sunset Blvd Ste P",
      "addressLocality": "St. George",
      "addressRegion": "UT",
      "postalCode": "84770",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.0965,
      "longitude": -113.5944
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "16:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "965",
      "bestRating": "5",
      "worstRating": "1"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "St. George",
        "containedIn": "Utah"
      },
      {
        "@type": "City",
        "name": "Hurricane",
        "containedIn": "Utah"
      },
      {
        "@type": "City",
        "name": "Cedar City",
        "containedIn": "Utah"
      },
      {
        "@type": "City",
        "name": "Mesquite",
        "containedIn": "Nevada"
      }
    ],
    "serviceType": [
      "Ant Control",
      "Cockroach Control",
      "Mosquito Control",
      "Spider Control",
      "Scorpion Control",
      "Termite Control",
      "Rodent Control",
      "Bed Bug Control",
      "Pest Control",
      "Exterminator"
    ],
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
    "currenciesAccepted": "USD",
    "founder": "Preventive Pest Control Team",
    "foundingDate": "2000",
    "slogan": "St. George's Top Pest Control Professionals",
    "description": "Southern Utah's trusted pest control experts for 25+ years. Ant, scorpion, termite, rodent, and mosquito control. 965+ 5-star reviews."
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased">
        <GoogleAnalytics />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ScrollToTop />
          {children}
          <Toaster />
          <AIChatWidget />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
