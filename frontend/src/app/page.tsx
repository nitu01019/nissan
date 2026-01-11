import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LocationSection } from "@/components/home/LocationSection";
import { InquirySection } from "@/components/home/InquirySection";
import { OurStorySection } from "@/components/home/OurStorySection";
import { CTASection } from "@/components/home/CTASection";

// Static generation with ISR - revalidate every hour for fresh content
// This allows serving millions of users from CDN cache
export const revalidate = 3600; // 1 hour

// Force static rendering for maximum performance
export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCars />
      <WhyChooseUs />
      <ServicesSection />
      <TestimonialsSection />
      <LocationSection />
      <InquirySection />
      <OurStorySection />
      <CTASection />
    </>
  );
}
