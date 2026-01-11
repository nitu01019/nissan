import { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";

// Static generation - about page rarely changes, cache for 1 week
export const revalidate = 604800; // Revalidate weekly
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "About Us | Nissan Dealership",
  description: "Learn about Nissan - Your trusted authorized Nissan dealership in Kashmir with over 15 years of excellence in automotive sales and service.",
};

export default function About() {
  return <AboutPage />;
}
