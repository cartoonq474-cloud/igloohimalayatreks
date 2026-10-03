const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const filesToUpdate = [
  path.join(ROOT, 'nepal-trekking-packages', 'index.html'),
  path.join(ROOT, 'nepal-trekking-packages.html')
];

const newCard = `
          <!-- Trek Card: Manaslu Circuit Trek 12 Days -->
          <div class="card trek-item" data-region="manaslu" data-duration="medium" data-difficulty="challenging">
            <div style="position: relative; height: 220px; overflow: hidden;">
              <img src="../images/manaslu-circuit-trek-12-days.webp" alt="Manaslu Circuit Trek 12 Days" style="width:100%; height:100%; object-fit:cover;">
              <span class="badge badge-alpine" style="position: absolute; top: 12px; left: 12px; background: #D97706;">Fast Track Circuit</span>
            </div>
            <div style="padding: 24px;">
              <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Manaslu Circuit Trek 12 Days</h3>
              <p style="font-size: 0.9rem; color: var(--color-neutral-600); margin-bottom: 16px;">Fast-track 12-day circumambulation of Mount Manaslu via Machha Khola and Larkya La 5,106m.</p>
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; font-size: 0.85rem; color: var(--color-neutral-700);">
                <span>⏱️ 12 Days</span>
                <span>🏔️ 5,106 m</span>
                <span>⚡ Challenging</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-neutral-100); padding-top: 16px;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-neutral-500); display: block;">Starting from</span>
                  <span style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary-navy);">$990</span>
                </div>
                <a href="../trek/manaslu-circuit-trek-12-days/" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">View Itinerary</a>
              </div>
            </div>
          </div>
`;

filesToUpdate.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Update count from 52 to 53
  content = content.replace(/Showing All Available Treks \(52\)/g, 'Showing All Available Treks (53)');

  // Insert new card right after Manaslu Circuit Trek or first card in container
  if (!content.includes('href="../trek/manaslu-circuit-trek-12-days/"')) {
    content = content.replace(
      /(<div class="grid grid-3" id="treks-container">)/,
      `$1${newCard}`
    );
  }

  // Update mega menu Tab 4
  const oldMega = `<div class="mega-col-title">Circuit & Passes</div>
                        <a href="../trek/manaslu-circuit-trek/" class="mega-trek-link"><span>Manaslu Circuit Trek</span> <span class="days-badge">13 DAYS</span></a>
                        <a href="../trek/manaslu-tsum-valley-trek/" class="mega-trek-link"><span>Manaslu & Tsum Valley Combo</span> <span class="days-badge">18 DAYS</span></a>`;
  const newMega = `<div class="mega-col-title">Circuit & Passes</div>
                        <a href="../trek/manaslu-circuit-trek/" class="mega-trek-link"><span>Manaslu Circuit Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="../trek/manaslu-circuit-trek-12-days/" class="mega-trek-link"><span>Manaslu Circuit Express</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="../trek/manaslu-tsum-valley-trek/" class="mega-trek-link"><span>Manaslu & Tsum Valley Combo</span> <span class="days-badge">18 DAYS</span></a>`;
  content = content.replace(oldMega, newMega);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated: ${path.relative(ROOT, filePath)}`);
});

// Update index.html mega menu
const indexFile = path.join(ROOT, 'index.html');
if (fs.existsSync(indexFile)) {
  let indexContent = fs.readFileSync(indexFile, 'utf8');
  const oldMegaRoot = `<div class="mega-col-title">Circuit & Passes</div>
                        <a href="trek/manaslu-circuit-trek/" class="mega-trek-link"><span>Manaslu Circuit Trek</span> <span class="days-badge">13 DAYS</span></a>
                        <a href="trek/manaslu-tsum-valley-trek/" class="mega-trek-link"><span>Manaslu & Tsum Valley Combo</span> <span class="days-badge">18 DAYS</span></a>`;
  const newMegaRoot = `<div class="mega-col-title">Circuit & Passes</div>
                        <a href="trek/manaslu-circuit-trek/" class="mega-trek-link"><span>Manaslu Circuit Trek</span> <span class="days-badge">14 DAYS</span></a>
                        <a href="trek/manaslu-circuit-trek-12-days/" class="mega-trek-link"><span>Manaslu Circuit Express</span> <span class="days-badge">12 DAYS</span></a>
                        <a href="trek/manaslu-tsum-valley-trek/" class="mega-trek-link"><span>Manaslu & Tsum Valley Combo</span> <span class="days-badge">18 DAYS</span></a>`;
  if (indexContent.includes(oldMegaRoot)) {
    indexContent = indexContent.replace(oldMegaRoot, newMegaRoot);
    fs.writeFileSync(indexFile, indexContent, 'utf8');
    console.log('Updated index.html mega menu');
  }
}
