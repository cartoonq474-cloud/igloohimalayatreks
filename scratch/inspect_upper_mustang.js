const fs = require('fs');

const content = fs.readFileSync('trek/upper-mustang-trek/index.html', 'utf8');
const lines = content.split('\n');

console.log('Total lines:', lines.length);

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  if (line.includes('<section') || line.includes('</section>') || line.includes('class="container trek-detail-layout"') || line.includes('</main>') || line.toLowerCase().includes('sidebar') || line.includes('id="section-')) {
    console.log(`${lineNum}: ${line.trim().substring(0, 110)}`);
  }
});
