import { Metadata } from "next";
import { DirectionsPage } from "@/components/pages/DirectionsPage";

// Static generation - directions rarely change
// Location info is very static - cache for 1 week
export const revalidate = 604800; // Revalidate weekly
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Directions & Location | Find Nissan Showroom",
  description: "Get directions to Nissan showroom at Channi Himmat, Jammu. Located on NH-1A Bypass. Easy navigation with Google Maps. Open Mon-Sat 9:30AM-7PM.",
  keywords: ["Nissan directions", "Nissan showroom Jammu", "Channi Himmat car dealer", "NH-1A Bypass Jammu", "Nissan Dealer"],
  openGraph: {
    title: "Find Us | Nissan - Channi Himmat, Jammu",
    description: "Visit Nissan Dealer Pvt. Ltd - Your authorized Nissan dealer at Channi Himmat, Jammu",
  },
};

export default function Directions() {
  return <DirectionsPage />;
}
