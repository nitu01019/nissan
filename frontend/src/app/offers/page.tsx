import { Metadata } from "next";
import { OffersPage } from "@/components/pages/OffersPage";

// Offers change frequently - revalidate every 30 minutes for fresh deals
export const revalidate = 1800;
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Special Offers | Exclusive Deals on Nissan Cars",
  description: "Check out our latest offers and deals on Nissan vehicles. Limited time discounts, exchange bonuses, and special financing options.",
};

export default function Offers() {
  return <OffersPage />;
}
