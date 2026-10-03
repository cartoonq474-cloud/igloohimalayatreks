const fs = require('fs');

let html = fs.readFileSync('trek/upper-mustang-trek/index.html', 'utf8');

// Section Titles & Headers
const replacements = [
  ['Booking Dates & Availability for EBC trek', 'Booking Dates & Availability for Upper Mustang Trek'],
  ["Plan your Everest Base Camp Trek: Leave Your Footprint at the World's Tallest Base Camp", "Plan your Upper Mustang Trek: Journey into the Last Forbidden Kingdom"],
  ['Packing List for Everest Base Camp Trek', 'Packing List for Upper Mustang Trek'],
  ['Read before you book, Everest Base Camp Trek', 'Read before you book, Upper Mustang Trek'],
  ['To help you decide if the Everest Base Camp Trek is for you', 'To help you decide if the Upper Mustang Trek is for you'],
  ['Accommodation for the Everest Base Camp Trek', 'Accommodation for the Upper Mustang Trek'],
  ['Available Food in Everest Base Camp Trek', 'Available Food in Upper Mustang Trek'],
  ['Best time to Trek to Everest Base Camp', 'Best Time to Trek Upper Mustang'],
  ['A Typical Day on the Everest Base Camp Trek', 'A Typical Day on the Upper Mustang Trek'],
  ['Permits for Everest Base Camp Trek', 'Permits for Upper Mustang Trek'],
  ['Acclimatization during the EBC Trek', 'Acclimatization during the Upper Mustang Trek'],
  ['Difficulty and Physical Fitness Required for Everest Base Camp Trek', 'Difficulty and Physical Fitness Required for Upper Mustang Trek'],
  ['Route and Alternatives for the Everest Base Camp Trek', 'Route and Alternatives for the Upper Mustang Trek'],
  ['Everest Base Camp Trek for Different Age Groups', 'Upper Mustang Trek for Different Age Groups'],
  ['Extend your trip after Everest Base Camp', 'Extend your trip after Upper Mustang Trek'],
  ['Porter Weight Limit and Information for Trekking to Everest Base Camp', 'Porter Weight Limit and Information for Upper Mustang Trek'],
  ['Upgrade to Helicopters for Everest Base Camp Trek', 'Upgrade Options for Upper Mustang Trek (Jeep / Helicopter)'],
  ['Booking a Trek: Independent vs. Guided Trek for Everest Base Camp', 'Booking a Trek: Independent vs. Guided Trek for Upper Mustang'],
  ['Cost and the Booking Process for EBC Trek', 'Cost and the Booking Process for Upper Mustang Trek'],
  ['Important Notes for EBC Trek', 'Important Notes for Upper Mustang Trek'],
  ['Altitude Profile of Everest Base Camp Trek', 'Altitude Profile of Upper Mustang Trek'],
  ['Weather on the Everest Base Camp Trek', 'Weather on the Upper Mustang Trek'],
  ['Everest Base Camp Trek Map', 'Upper Mustang Trek Map'],
  ['Frequently Asked Questions for Everest Base Camp Trek', 'Frequently Asked Questions for Upper Mustang Trek'],
  ['When is the best time to trek to Everest Base Camp?', 'When is the best time to trek to Upper Mustang?'],
  ['How long does the Everest Base Camp trek take?', 'How long does the Upper Mustang trek take?'],
  ['Is Everest Base Camp trek suitable for beginners?', 'Is Upper Mustang trek suitable for beginners?'],
  ['What is the daily hiking distance and hours during the trek to Everest Base Camp?', 'What is the daily hiking distance and hours during the Upper Mustang trek?'],
  ['What are the highlights of the Everest Base Camp trek (besides Everest)?', 'What are the highlights of the Upper Mustang trek?'],
  ['Is it possible to do the Everest Base Camp trek solo?', 'Is it possible to do the Upper Mustang trek solo?'],
  ['Do I need to book the Everest Base Camp trek in advance?', 'Do I need to book the Upper Mustang trek in advance?'],
  ['What fitness level is required for the Everest Base Camp trek?', 'What fitness level is required for the Upper Mustang trek?'],
  ['What permits are required for Everest Base Camp Trek?', 'What permits are required for Upper Mustang Trek?'],
  ['Is drinking water safe on the Everest Base Camp trek?', 'Is drinking water safe on the Upper Mustang trek?'],
  ['Is travel insurance mandatory for EBC trek?', 'Is travel insurance mandatory for Upper Mustang trek?'],
  ['data-trek-title="Everest Base Camp Trek', 'data-trek-title="Upper Mustang Trek'],
  ['Review for Everest Base Camp Trek', 'Review for Upper Mustang Trek'],
  ['<div class="video-user-trek">Everest Base Camp Trek</div>', '<div class="video-user-trek">Upper Mustang Trek</div>'],
  ['the BEST EBC trek experience ever', 'the BEST Upper Mustang trek experience ever'],
  ['Our Everest Base Camp trek with Igloo Himalaya Treks', 'Our Upper Mustang trek with Igloo Himalaya Treks'],
  ['Booking Everest Base Camp through Igloo Himalaya Treks', 'Booking Upper Mustang through Igloo Himalaya Treks']
];

let replacedCount = 0;
for (const [target, repl] of replacements) {
  if (html.includes(target)) {
    // Replace all occurrences of this target
    html = html.split(target).join(repl);
    replacedCount++;
  } else {
    console.log('Target not found:', target);
  }
}

fs.writeFileSync('trek/upper-mustang-trek/index.html', html, 'utf8');
console.log(`Successfully replaced ${replacedCount} string types in upper-mustang-trek/index.html`);
