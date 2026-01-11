import { Metadata } from "next";
import { ServicesPage } from "@/components/pages/ServicesPage";

// Static generation with ISR
// Services info is fairly static - cache for 12 hours
export const revalidate = 43200;
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Services | Maintenance, Parts & Insurance",
  description: "Explore our comprehensive range of services including periodic maintenance, genuine Nissan parts, insurance, and extended warranty options.",
};

export default function Services() {
  return <ServicesPage />;
}
