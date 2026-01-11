// JSON-LD Structured Data for SEO - Nissan Jammu Dealership
import React from "react";

// Organization/Dealer Schema
export function DealershipSchema() {
  const baseUrl = "https://nissanjammu.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${baseUrl}/#organization`,
    name: "Nissan Jammu - Authorized Dealer",
    alternateName: ["Nissan Channi Himmat", "Nissan Jammu Kashmir", "Nissan Dealer Jammu", "Nissan J&K"],
    description: "Best Nissan car dealer in Jammu, J&K. Buy Nissan Magnite, Kicks, X-Trail at lowest prices. Free test drive, easy EMI finance, genuine service center at Channi Himmat, Jammu.",
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    image: `${baseUrl}/images/showroom.jpg`,
    telephone: "+91-78895-59631",
    email: "sales@nissanjammu.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "NH-1A, Bye Pass, Opp. Channi Himmat",
      addressLocality: "Jammu",
      addressRegion: "Jammu & Kashmir",
      postalCode: "180015",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.7266,
      longitude: 74.8570
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:30",
        closes: "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "18:00"
      }
    ],
    priceRange: "₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Bank Transfer, Financing",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 32.7266,
        longitude: 74.8570
      },
      geoRadius: "100 km"
    },
    brand: {
      "@type": "Brand",
      name: "Nissan",
      logo: "https://www.nissan.in/content/dam/Nissan/in/header/nissan-logo.png"
    },
    sameAs: [
      "https://facebook.com/nissanjammu",
      "https://instagram.com/nissanjammu",
      "https://twitter.com/nissanjammu"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Nissan Cars",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Car",
            name: "Nissan Magnite",
            brand: "Nissan",
            model: "Magnite"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Car",
            name: "Nissan Kicks",
            brand: "Nissan",
            model: "Kicks"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Car",
            name: "Nissan X-Trail",
            brand: "Nissan",
            model: "X-Trail"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Car Product Schema
export function CarSchema({ 
  name, 
  description, 
  image, 
  price, 
  model,
  url 
}: { 
  name: string; 
  description: string; 
  image: string; 
  price: number;
  model: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Car",
    name,
    description,
    image,
    brand: {
      "@type": "Brand",
      name: "Nissan"
    },
    model,
    vehicleConfiguration: "New",
    fuelType: "Petrol",
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "INR",
      price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "AutoDealer",
        name: "Nissan Authorized Dealer"
      }
    },
    manufacturer: {
      "@type": "Organization",
      name: "Nissan Motor Corporation"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema
export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Local Business Schema for Contact Page
export function LocalBusinessSchema() {
  const baseUrl = "https://nissanjammu.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    name: "Nissan Authorized Dealer - Channi Himmat",
    image: `${baseUrl}/images/showroom.jpg`,
    telephone: "+91-78895-59631",
    email: "sales@nissanjammu.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "NH-1A, Bye Pass, Opp. Channi Himmat",
      addressLocality: "Jammu",
      addressRegion: "Jammu & Kashmir",
      postalCode: "180015",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.7266,
      longitude: 74.8570
    },
    url: baseUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:30",
        closes: "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "18:00"
      }
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "156"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Website Schema
export function WebsiteSchema() {
  const baseUrl = "https://nissanjammu.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Nissan Jammu | Best Nissan Dealer in Jammu & Kashmir",
    description: "Official Nissan car dealer at Channi Himmat, Jammu. Buy Nissan Magnite, Kicks, X-Trail at best prices in Jammu. Free test drive, EMI finance, genuine service.",
    inLanguage: "en-IN",
    publisher: {
      "@id": `${baseUrl}/#organization`
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/cars?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
