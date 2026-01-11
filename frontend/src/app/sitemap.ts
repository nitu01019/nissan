import { MetadataRoute } from "next";
import { cars } from "@/data/cars";
import { accessoryCategories } from "@/data/accessories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nissanjammu.com";
  const currentDate = new Date();

  // Static pages with SEO priority
  const staticPages = [
    { url: baseUrl, lastModified: currentDate, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${baseUrl}/cars`, lastModified: currentDate, changeFrequency: "daily" as const, priority: 0.95 },
    { url: `${baseUrl}/compare`, lastModified: currentDate, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/accessories`, lastModified: currentDate, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/services`, lastModified: currentDate, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/offers`, lastModified: currentDate, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/directions`, lastModified: currentDate, changeFrequency: "monthly" as const, priority: 0.75 },
  ];

  // Dynamic car pages - highest priority for SEO
  const carPages = cars.map((car) => ({
    url: `${baseUrl}/cars/${car.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Accessory category pages
  const accessoryCategoryPages = accessoryCategories.map((cat) => ({
    url: `${baseUrl}/accessories?category=${cat.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...carPages, ...accessoryCategoryPages];
}
