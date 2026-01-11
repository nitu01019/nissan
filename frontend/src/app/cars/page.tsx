import { Metadata } from "next";
import { CarsListing } from "@/components/cars/CarsListing";

// Static generation with ISR
export const revalidate = 3600; // Revalidate every hour
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Our Cars | Explore Nissan Models",
  description: "Explore our complete range of Nissan vehicles. From the compact Magnite SUV to the premium X-Trail, find your perfect car at Nissan.",
  keywords: ["Nissan cars", "Nissan Magnite", "Nissan X-Trail", "Nissan Kicks", "SUV Kashmir"],
};

export default function CarsPage() {
  return <CarsListing />;
}
