const fs = require('fs');

let html = fs.readFileSync('scratch/act_temp.html', 'utf8');

const oldRev1 = `Our Everest Base Camp trek with Igloo Himalaya Treks went beyond every expectation we had. What first pulled us towards them was their strict safety protocol and personal care. From the landing at Lukla to reaching Everest Base Camp (5,364m) and Kala Patthar, Sagar and the team made sure we were comfortable, safe, and hydrated every single day!`;

const newRev1 = `Our Annapurna Circuit trek with Igloo Himalaya Treks went beyond every expectation we had! What first pulled us towards them was their strict safety protocol and personal care. From the 4WD drive through Marsyangdi canyon to crossing Thorong La Pass (5,416m) at sunrise and visiting sacred Muktinath, Sagar and the team made sure we were comfortable, safe, well-acclimatized, and hydrated every single day!`;

const oldRev2 = `Booking Everest Base Camp through Igloo Himalaya Treks was seamless. Exceptional Sherpa guides and flawless logistics! From airport pickup to high altitude tea houses, every detail was handled professionally.`;

const newRev2 = `Booking the Annapurna Circuit through Igloo Himalaya Treks was seamless. Exceptional local guides and flawless logistics! From the private transfers and cozy teahouses in Manang to the geothermal hot springs in Tatopani and relaxing in Pokhara, every detail was handled professionally.`;

html = html.replaceAll(oldRev1, newRev1);
html = html.replaceAll(oldRev2, newRev2);

fs.writeFileSync('scratch/act_temp.html', html, 'utf8');
console.log('Reviews updated to authentic Annapurna Circuit testimonials.');
