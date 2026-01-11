import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarDetailPage } from "@/components/cars/CarDetailPage";
import { cars, getCarBySlug } from "@/data/cars";

// Car details rarely change - revalidate every 6 hours
export const revalidate = 21600;
export const dynamic = 'force-static';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = getCarBySlug(params.slug);
  if (!car) return { title: "Car Not Found" };

  return {
    title: `${car.name} for Rent | ₹${car.pricePerDay}/day - Srinagar Kashmir`,
    description: `Rent ${car.name} in Srinagar, Kashmir. ${car.tagline}. ${car.description.slice(0, 120)}... Starting ₹${car.pricePerDay}/day.`,
    keywords: [
      `${car.name} rental Srinagar`,
      `rent ${car.name} Kashmir`,
      `${car.category} car rental`,
      "car hire Srinagar",
      "Kashmir car rental"
    ],
    openGraph: {
      title: `Rent ${car.name} | Nissan Dealer`,
      description: `${car.tagline} - ₹${car.pricePerDay}/day`,
      images: [{ url: car.images[0], width: 1200, height: 630 }],
    },
  };
}

export default function CarPage({ params }: Props) {
  const car = getCarBySlug(params.slug);
  if (!car) notFound();

  return <CarDetailPage car={car} />;
}
