import { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";

// Static generation with ISR
export const revalidate = 3600;
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Contact Us | Book Test Drive & Get Quotes",
  description: "Contact Nissan for test drives, price quotes, and inquiries. Visit our showroom in Srinagar or call us today.",
};

export default function Contact() {
  return <ContactPage />;
}
