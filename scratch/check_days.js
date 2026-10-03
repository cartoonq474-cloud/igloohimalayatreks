const fs = require('fs');
const code = fs.readFileSync('scratch/generate_act_itinerary.js', 'utf8');
const regex = /dayNum:\s*(\d+),\s*title:\s*"([^"]+)",\s*subtitle:\s*"([^"]+)",\s*altM:\s*(\d+)/g;
let m;
while ((m = regex.exec(code)) !== null) {
  console.log(`Day ${m[1]}: ${m[2]} | Subtitle: ${m[3]} | Alt: ${m[4]}m`);
}
