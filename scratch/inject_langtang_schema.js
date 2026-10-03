const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'langtang-region-treks', 'index.html');
let content = fs.readFileSync(file, 'utf8');

const target = '<link rel="stylesheet" href="../index.css">';
const schema = `<link rel="stylesheet" href="../index.css">

  <!-- JSON-LD Structured Data Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://igloohimalayatreks.com/langtang-region-treks/#webpage",
        "url": "https://igloohimalayatreks.com/langtang-region-treks/",
        "name": "Langtang Region Treks & Expeditions",
        "description": "Comprehensive guide and package list for trekking in the Langtang and Helambu region of Nepal.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://igloohimalayatreks.com/#website",
          "name": "Igloo Himalaya Treks",
          "url": "https://igloohimalayatreks.com"
        }
      },
      {
        "@type": "ItemList",
        "name": "Langtang Region Trekking Packages",
        "numberOfItems": 6,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Langtang Valley Trek", "url": "https://igloohimalayatreks.com/trek/langtang-valley-trek/" },
          { "@type": "ListItem", "position": 2, "name": "Gosaikunda Lake Trek", "url": "https://igloohimalayatreks.com/trek/gosaikunda-lake-trek/" },
          { "@type": "ListItem", "position": 3, "name": "Tamang Heritage Trail Trek", "url": "https://igloohimalayatreks.com/trek/tamang-heritage-trail-trek/" },
          { "@type": "ListItem", "position": 4, "name": "Langtang Gosaikunda Trek", "url": "https://igloohimalayatreks.com/trek/langtang-gosaikunda-trek/" },
          { "@type": "ListItem", "position": 5, "name": "Tamang Heritage & Langtang Valley Trek", "url": "https://igloohimalayatreks.com/trek/tamang-heritage-trail-with-langtang-valley-trek/" },
          { "@type": "ListItem", "position": 6, "name": "Yala Peak Climbing", "url": "https://igloohimalayatreks.com/trek/yala-peak-climbing/" }
        ]
      }
    ]
  }
  </script>`;

if (!content.includes('CollectionPage')) {
  content = content.replace(target, schema);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully injected JSON-LD into langtang-region-treks/index.html');
} else {
  console.log('JSON-LD already present in langtang-region-treks/index.html');
}
