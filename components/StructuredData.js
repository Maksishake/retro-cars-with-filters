import Head from 'next/head';

export default function StructuredData({ data }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "RetroCars",
    "description": "Специализированный дилер советских ретро автомобилей в Западной Европе",
    "url": "https://retrocars.eu",
    "logo": "https://retrocars.eu/logo.png",
    "image": "https://retrocars.eu/og-image.jpg",
    "telephone": "+49 30 12345678",
    "email": "info@retrocars.eu",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Friedrichstraße 123",
      "addressLocality": "Berlin",
      "addressCountry": "DE",
      "postalCode": "10117"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "52.5200",
      "longitude": "13.4050"
    },
    "openingHours": "Mo-Fr 09:00-18:00, Sa 10:00-16:00",
    "priceRange": "€2,800 - €12,000",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "currenciesAccepted": "EUR",
    "areaServed": [
      {
        "@type": "Country",
        "name": "Germany"
      },
      {
        "@type": "Country", 
        "name": "Netherlands"
      },
      {
        "@type": "Country",
        "name": "France"
      },
      {
        "@type": "Country",
        "name": "Spain"
      },
      {
        "@type": "Country",
        "name": "Belgium"
      },
      {
        "@type": "Country",
        "name": "Switzerland"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Soviet Retro Cars",
      "itemListElement": data?.cars?.map((car, index) => ({
        "@type": "Car",
        "position": index + 1,
        "name": car.name,
        "brand": {
          "@type": "Brand",
          "name": car.brand
        },
        "vehicleModelDate": car.year,
        "mileageFromOdometer": {
          "@type": "QuantitativeValue",
          "value": car.mileage,
          "unitCode": "KMT"
        },
        "color": car.color,
        "fuelType": car.fuelType,
        "vehicleTransmission": car.transmission,
        "vehicleConfiguration": car.category,
        "offers": {
          "@type": "Offer",
          "price": car.price,
          "priceCurrency": car.currency,
          "availability": "https://schema.org/InStock",
          "condition": "https://schema.org/UsedCondition",
          "seller": {
            "@type": "AutoDealer",
            "name": "RetroCars"
          }
        },
        "image": `https://retrocars.eu${car.image}`,
        "description": car.description
      })) || []
    },
    "sameAs": [
      "https://www.facebook.com/retrocars",
      "https://www.instagram.com/retrocars",
      "https://www.youtube.com/retrocars"
    ]
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2)
        }}
      />
    </Head>
  );
}
