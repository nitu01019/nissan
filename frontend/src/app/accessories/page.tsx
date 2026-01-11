import { Metadata } from "next";
import { AccessoriesPage } from "@/components/pages/AccessoriesPage";

// Static generation with ISR for scalability
// Accessories catalog is fairly static - cache for 12 hours
export const revalidate = 43200;
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Nissan Genuine Accessories | Jammu Nissan Dealer - Channi Himmat",
  description: "Shop genuine Nissan accessories for Magnite, Kicks, X-Trail & more at Jammu's authorized dealer. Exterior styling, interior comfort, safety & electronics accessories. Best prices in J&K.",
  keywords: [
    "Nissan accessories Jammu",
    "Magnite accessories",
    "Nissan genuine parts",
    "car accessories Jammu Kashmir",
    "Nissan exterior accessories",
    "Nissan interior accessories",
    "Channi Himmat Nissan",
    "roof rails Nissan",
    "Nissan floor mats",
    "Nissan seat covers",
    "car body kit Jammu",
    "Nissan safety accessories"
  ],
  openGraph: {
    title: "Genuine Nissan Accessories | Jammu Nissan - Channi Himmat",
    description: "Explore genuine Nissan accessories for all models. Enhance your Magnite, Kicks or X-Trail with premium accessories.",
    type: "website",
    locale: "en_IN",
    url: "https://nissanjammu.com/accessories",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nissan Genuine Accessories | Jammu",
    description: "Premium accessories for your Nissan vehicle",
  },
  alternates: {
    canonical: "https://nissanjammu.com/accessories",
  },
};

export default function Accessories() {
  return <AccessoriesPage />;
}
