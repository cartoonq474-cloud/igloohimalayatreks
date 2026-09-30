/**
 * Semantic Entity JSON-LD Schema.org Generator
 * Generates structured data graphs for Google Knowledge Graph and AI Search LLMs.
 */

export function injectStructuredData() {
  // Skip injection if static JSON-LD already exists in <head> (centerpiece annotation optimization)
  if (document.querySelector('script[type="application/ld+json"]')) return;

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://igloohimalayatreks.com/#agency",
        "name": "Igloo Himalaya Treks",
        "url": "https://igloohimalayatreks.com",
        "logo": "https://igloohimalayatreks.com/images/logo.png",
        "description": "Licensed local trekking company in Nepal specializing in Everest, Annapurna, Langtang, and Manaslu expeditions.",
        "telephone": "+977-1-4700000",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Thamel",
          "addressLocality": "Kathmandu",
          "addressCountry": "NP"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 27.7172,
          "longitude": 85.3240
        },
        "sameAs": [
          "https://www.facebook.com/igloohimalayatreks",
          "https://www.instagram.com/igloohimalayatreks",
          "https://www.tripadvisor.com/igloohimalayatreks"
        ]
      },
      {
        "@type": "TouristTrip",
        "@id": "https://igloohimalayatreks.com/trek/everest-base-camp-trek/#trip",
        "name": "Everest Base Camp Trek",
        "description": "14-day iconic teahouse trek through Sagarmatha National Park to Everest Base Camp (5,364m) and Kala Patthar (5,545m).",
        "touristType": ["Hikers", "Trekking Enthusiasts"],
        "itinerary": {
          "@type": "ItemList",
          "numberOfItems": 14,
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Kathmandu to Lukla Flight & Trek to Phakding (2,610m)" },
            { "@type": "ListItem", "position": 2, "name": "Trek to Namche Bazaar (3,440m)" },
            { "@type": "ListItem", "position": 3, "name": "Acclimatization Day in Namche Bazaar" }
          ]
        },
        "offers": {
          "@type": "Offer",
          "price": "1399",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://igloohimalayatreks.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "When is the best season for trekking in Nepal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The prime trekking seasons in Nepal are Spring (March to May) for blooming rhododendrons and crystal clear skies, and Autumn (September to November) for ideal temperatures and mountain visibility."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need prior high-altitude experience for Everest Base Camp?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While technical climbing skills are not required, good cardiovascular fitness and physical stamina are essential. Our itineraries include built-in acclimatization days in Namche Bazaar and Dingboche."
            }
          }
        ]
      }
    ]
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schemaGraph);
  document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', () => {
  injectStructuredData();
});
