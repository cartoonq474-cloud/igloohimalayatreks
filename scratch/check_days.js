const days = require('./parsed_days.json');
days.slice(0, 7).forEach(d => {
  console.log(`Day ${d.day}: ${d.title}`);
  console.log('Facts:', d.facts);
  console.log('Narrative:', d.narrative);
  console.log('---');
});
