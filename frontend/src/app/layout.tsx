import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AppWrapper } from "@/components/layout/AppWrapper";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { SmartPrefetch } from "@/components/SmartPrefetch";
import { Toaster } from "react-hot-toast";
import { DealershipSchema, WebsiteSchema } from "@/components/seo/StructuredData";
import { AuthProvider } from "@/context/AuthContext";
import { OfflineIndicator } from "@/components/OfflineIndicator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nissan Jammu | #1 Authorized Nissan Dealer in Channi Himmat, Jammu & Kashmir",
    template: "%s | Nissan Jammu - Authorized Dealer Channi Himmat",
  },
  description:
    "Best Nissan car dealer in Jammu, J&K. Buy Nissan Magnite, Kicks, X-Trail at lowest on-road prices in Jammu. Book free test drive, easy EMI finance, genuine service center at Channi Himmat. Call now!",
  keywords: [
    // High-priority Jammu keywords
    "Nissan Jammu",
    "Nissan dealer Jammu",
    "Nissan showroom Jammu",
    "car dealer Jammu",
    "best car dealer Jammu",
    "Nissan Channi Himmat",
    "authorized Nissan dealer Jammu",
    "Nissan cars Jammu",
    // Jammu & Kashmir specific
    "Nissan J&K",
    "Nissan Jammu Kashmir",
    "car showroom Jammu Kashmir",
    "Nissan dealer J&K",
    "best car dealer Jammu Kashmir",
    // Car models with Jammu
    "Nissan Magnite Jammu",
    "Nissan Magnite price Jammu",
    "Nissan Magnite on road price Jammu",
    "Nissan Magnite 2024 Jammu",
    "Nissan Magnite 2025 Jammu",
    "buy Nissan Magnite Jammu",
    "Nissan Kicks Jammu",
    "Nissan Kicks price Jammu",
    "Nissan X-Trail Jammu",
    "Nissan X-Trail 2024 Jammu",
    "Nissan Sunny Jammu",
    // Services in Jammu
    "Nissan service center Jammu",
    "Nissan spare parts Jammu",
    "Nissan genuine accessories Jammu",
    "car service Jammu",
    "car insurance Jammu",
    // Purchase keywords
    "buy Nissan car Jammu",
    "buy car Jammu",
    "new car Jammu",
    "Nissan test drive Jammu",
    "free test drive Jammu",
    "Nissan finance Jammu",
    "car loan Jammu",
    "car EMI Jammu",
    "Nissan EMI options Jammu",
    "Nissan exchange offer Jammu",
    "car exchange Jammu",
    // Location specific
    "car dealer Channi Himmat",
    "car showroom Channi Himmat",
    "Nissan National Highway Jammu",
    "car dealer near me Jammu",
    // Long tail high-value
    "best SUV under 10 lakhs Jammu",
    "compact SUV Jammu",
    "Nissan Magnite turbo Jammu",
    "automatic car Jammu",
    "petrol car Jammu",
    "family car Jammu",
    "Nissan car booking Jammu",
    "Nissan on road price Jammu",
  ],
  authors: [{ name: "Nissan Channi Himmat" }],
  creator: "Nissan - Channi Himmat",
  publisher: "Nissan Authorized Dealer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nissanjammu.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nissan Jammu | Best Nissan Car Dealer in Jammu & Kashmir",
    description:
      "Best Nissan dealer in Jammu, J&K. Buy Magnite, Kicks, X-Trail at lowest on-road prices. Free test drive, easy EMI, genuine service at Channi Himmat.",
    url: "https://nissanjammu.com",
    siteName: "Nissan Jammu",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nissan Jammu - Authorized Dealer Channi Himmat",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nissan Jammu | Best Car Dealer in Jammu & Kashmir",
    description: "Buy Nissan Magnite, Kicks, X-Trail at best prices in Jammu. Free test drive, easy EMI!",
    images: ["/images/og-image.jpg"],
    site: "@nissanjammu",
    creator: "@nissanjammu",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  verification: {
    google: "your-google-verification-code",
  },
  category: "Automobile Dealer",
};

export const viewport: Viewport = {
  themeColor: "#C3002F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/images/placeholder.jpg" as="image" />
        <link rel="preload" href="https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&q=60&auto=format" as="image" />
        
        {/* SEO - Geo Tags for Jammu Location */}
        <meta name="geo.region" content="IN-JK" />
        <meta name="geo.placename" content="Jammu" />
        <meta name="geo.position" content="32.7266;74.8570" />
        <meta name="ICBM" content="32.7266, 74.8570" />
        
        {/* SEO - Language & Region */}
        <meta httpEquiv="content-language" content="en-IN" />
        <link rel="alternate" hrefLang="en-IN" href="https://nissanjammu.com" />
        <link rel="alternate" hrefLang="en" href="https://nissanjammu.com" />
        
        {/* SEO - Additional Meta */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="7 days" />
        <meta name="coverage" content="Jammu, Jammu and Kashmir, India" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        
        {/* Cross-browser compatibility */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=yes" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Nissan Jammu" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nissan Jammu" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#C3002F" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Safari specific */}
        <meta name="apple-touch-fullscreen" content="yes" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#C3002F" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <DealershipSchema />
        <WebsiteSchema />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1A1A1A",
              color: "#fff",
              borderRadius: "12px",
              padding: "16px",
            },
            success: {
              iconTheme: {
                primary: "#22C55E",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
          }}
        />
        <AuthProvider>
          <AppWrapper>
            <ServiceWorkerRegistration />
            <SmartPrefetch />
            <OfflineIndicator />
            <Header />
            <main className="flex-grow pb-16 lg:pb-0">{children}</main>
            <Footer />
          </AppWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
