const trekAltitudeProfiles = {
  "ebc": {
    name: "Everest Base Camp Trek",
    points: [
      { day: "Day 1", spot: "Kathmandu", altitudeM: 1300, altitudeFt: 4265 },
      { day: "Day 2", spot: "Phakding", altitudeM: 2651, altitudeFt: 8697 },
      { day: "Day 3", spot: "Namche Bazaar", altitudeM: 3440, altitudeFt: 11286 },
      { day: "Day 4", spot: "Namche Bazaar", altitudeM: 3700, altitudeFt: 12139 },
      { day: "Day 5", spot: "Tengboche", altitudeM: 3956, altitudeFt: 12979 },
      { day: "Day 6", spot: "Dingboche", altitudeM: 4380, altitudeFt: 14370 },
      { day: "Day 7", spot: "Dingboche", altitudeM: 4380, altitudeFt: 14370 },
      { day: "Day 8", spot: "Lobuche", altitudeM: 4938, altitudeFt: 16201 },
      { day: "Day 9", spot: "Gorakshep", altitudeM: 5160, altitudeFt: 16929 },
      { day: "Day 10", spot: "Pheriche", altitudeM: 4371, altitudeFt: 14340 },
      { day: "Day 11", spot: "Namche Bazaar", altitudeM: 3440, altitudeFt: 11286 },
      { day: "Day 12", spot: "Lukla", altitudeM: 2860, altitudeFt: 9383 },
      { day: "Day 13", spot: "Kathmandu", altitudeM: 1300, altitudeFt: 4265 }
    ]
  },
  "abc": {
    name: "Annapurna Base Camp Trek",
    points: [
      { day: "Day 1", spot: "Pokhara", altitudeM: 822 },
      { day: "Day 2", spot: "Ulleri", altitudeM: 2050 },
      { day: "Day 3", spot: "Ghorepani", altitudeM: 2874 },
      { day: "Day 4", spot: "Poon Hill / Tadapani", altitudeM: 3210 },
      { day: "Day 5", spot: "Chhomrong", altitudeM: 2170 },
      { day: "Day 6", spot: "Himalaya", altitudeM: 2920 },
      { day: "Day 7", spot: "MBC (Machhapuchhre)", altitudeM: 3700 },
      { day: "Day 8", spot: "ABC (Annapurna Base Camp)", altitudeM: 4130 },
      { day: "Day 9", spot: "Bamboo", altitudeM: 2310 },
      { day: "Day 10", spot: "Jhinu Danda (Hot Springs)", altitudeM: 1780 },
      { day: "Day 11", spot: "Pokhara", altitudeM: 822 }
    ]
  },
  "abc_heli": {
    name: "Annapurna Base Camp Heli Return Trek",
    points: [
      { day: "Day 1", spot: "Pokhara / Chhomrong", altitudeM: 2170 },
      { day: "Day 2", spot: "Bamboo", altitudeM: 2310 },
      { day: "Day 3", spot: "Deurali", altitudeM: 3230 },
      { day: "Day 4", spot: "MBC (Machhapuchhre)", altitudeM: 3700 },
      { day: "Day 5", spot: "ABC (Annapurna Base Camp)", altitudeM: 4130 },
      { day: "Day 6", spot: "Heli Flight to Pokhara", altitudeM: 822 }
    ]
  },
  "short_abc": {
    name: "Short Annapurna Base Camp Trek",
    points: [
      { day: "Day 1", spot: "Matque / Lower Sinuwa", altitudeM: 2340 },
      { day: "Day 2", spot: "Deurali", altitudeM: 3230 },
      { day: "Day 3", spot: "Annapurna Base Camp", altitudeM: 4130 },
      { day: "Day 4", spot: "Bamboo", altitudeM: 2310 },
      { day: "Day 5", spot: "Jhinu Danda", altitudeM: 1780 },
      { day: "Day 6", spot: "Pokhara", altitudeM: 822 }
    ]
  },
  "poonhill_mardi": {
    name: "Ghorepani Poon Hill & Mardi Himal Trek",
    points: [
      { day: "Day 1", spot: "Pokhara / Tikhedhunga", altitudeM: 1540 },
      { day: "Day 2", spot: "Ghorepani", altitudeM: 2874 },
      { day: "Day 3", spot: "Poon Hill (3,210m) / Tadapani", altitudeM: 2630 },
      { day: "Day 4", spot: "Landruk", altitudeM: 1565 },
      { day: "Day 5", spot: "Forest Camp", altitudeM: 2550 },
      { day: "Day 6", spot: "High Camp", altitudeM: 3580 },
      { day: "Day 7", spot: "Mardi Upper Viewpoint", altitudeM: 4250 },
      { day: "Day 8", spot: "Siding / Pokhara", altitudeM: 822 }
    ]
  },
  "abc_mardi": {
    name: "Annapurna Base Camp & Mardi Himal Combo",
    points: [
      { day: "Day 1", spot: "Pokhara / Chhomrong", altitudeM: 2170 },
      { day: "Day 2", spot: "Dovan / Deurali", altitudeM: 3230 },
      { day: "Day 3", spot: "MBC", altitudeM: 3700 },
      { day: "Day 4", spot: "ABC (Annapurna Base Camp)", altitudeM: 4130 },
      { day: "Day 5", spot: "Bamboo", altitudeM: 2310 },
      { day: "Day 6", spot: "Landruk", altitudeM: 1565 },
      { day: "Day 7", spot: "Forest Camp", altitudeM: 2550 },
      { day: "Day 8", spot: "High Camp", altitudeM: 3580 },
      { day: "Day 9", spot: "Mardi Viewpoint", altitudeM: 4250 },
      { day: "Day 10", spot: "Siding / Pokhara", altitudeM: 822 }
    ]
  },
  "annapurna_luxury": {
    name: "Annapurna Luxury Lodge Trek",
    points: [
      { day: "Day 1", spot: "Pokhara", altitudeM: 822 },
      { day: "Day 2", spot: "Sanctuary Lodge (Birethanti)", altitudeM: 1100 },
      { day: "Day 3", spot: "Gurung Lodge (Majgaun)", altitudeM: 1400 },
      { day: "Day 4", spot: "Tanchok Nature Walk", altitudeM: 1450 },
      { day: "Day 5", spot: "Basanta Lodge (Dhampus)", altitudeM: 1650 },
      { day: "Day 6", spot: "Pokhara Luxury Resort", altitudeM: 822 }
    ]
  },
  "circuit_luxury": {
    name: "Annapurna Circuit Luxury Trek",
    points: [
      { day: "Day 1", spot: "Kathmandu / Besisahar", altitudeM: 760 },
      { day: "Day 2", spot: "Chame Luxury Lodge", altitudeM: 2670 },
      { day: "Day 3", spot: "Upper Pisang", altitudeM: 3300 },
      { day: "Day 4", spot: "Manang", altitudeM: 3540 },
      { day: "Day 5", spot: "Manang Acclimatization", altitudeM: 3540 },
      { day: "Day 6", spot: "Yak Kharka", altitudeM: 4050 },
      { day: "Day 7", spot: "Thorong Phedi High Camp", altitudeM: 4450 },
      { day: "Day 8", spot: "Thorong La Pass", altitudeM: 5416 },
      { day: "Day 9", spot: "Muktinath Heritage Suite", altitudeM: 3760 },
      { day: "Day 10", spot: "Jomsom / Pokhara Resort", altitudeM: 822 }
    ]
  },
  "annapurna_circuit": {
    name: "Annapurna Circuit Trek",
    points: [
      { day: "Day 1", spot: "Kathmandu", altitudeM: 1400 },
      { day: "Day 2", spot: "Dharapani", altitudeM: 1860 },
      { day: "Day 3", spot: "Chame", altitudeM: 2670 },
      { day: "Day 4", spot: "Upper Pisang", altitudeM: 3300 },
      { day: "Day 5", spot: "Manang", altitudeM: 3540 },
      { day: "Day 6", spot: "Manang (Acclimatization)", altitudeM: 3540 },
      { day: "Day 7", spot: "Yak Kharka", altitudeM: 4050 },
      { day: "Day 8", spot: "Thorong Phedi", altitudeM: 4450 },
      { day: "Day 9", spot: "Thorong La Pass (5,416m) / Muktinath", altitudeM: 5416 },
      { day: "Day 10", spot: "Jomsom", altitudeM: 2720 },
      { day: "Day 11", spot: "Tatopani Hot Springs", altitudeM: 1200 },
      { day: "Day 12", spot: "Pokhara", altitudeM: 820 },
      { day: "Day 13", spot: "Kathmandu", altitudeM: 1400 },
      { day: "Day 14", spot: "Departure", altitudeM: 1400 }
    ]
  },
  "manaslu": {
    name: "Manaslu Circuit Trek",
    points: [
      { day: "Day 1", spot: "Kathmandu", altitudeM: 1400 },
      { day: "Day 2", spot: "Soti Khola", altitudeM: 700 },
      { day: "Day 3", spot: "Jagat", altitudeM: 1410 },
      { day: "Day 4", spot: "Deng", altitudeM: 1800 },
      { day: "Day 5", spot: "Namrung", altitudeM: 2660 },
      { day: "Day 6", spot: "Sama Gaon", altitudeM: 3530 },
      { day: "Day 7", spot: "Sama Gaon (Acclimatization)", altitudeM: 3530 },
      { day: "Day 8", spot: "Samdo", altitudeM: 3860 },
      { day: "Day 9", spot: "Dharmasala", altitudeM: 4480 },
      { day: "Day 10", spot: "Larkya La Pass", altitudeM: 5106 },
      { day: "Day 11", spot: "Bimthang", altitudeM: 3720 },
      { day: "Day 12", spot: "Dharapani", altitudeM: 1860 }
    ]
  },
  "langtang": {
    name: "Langtang Valley Trek",
    points: [
      { day: "Day 1", spot: "Kathmandu", altitudeM: 1400 },
      { day: "Day 2", spot: "Syabrubesi", altitudeM: 1550 },
      { day: "Day 3", spot: "Lama Hotel", altitudeM: 2480 },
      { day: "Day 4", spot: "Langtang Village", altitudeM: 3430 },
      { day: "Day 5", spot: "Kyanjin Gompa", altitudeM: 3870 },
      { day: "Day 6", spot: "Kyanjin Ri", altitudeM: 4773 },
      { day: "Day 7", spot: "Lama Hotel", altitudeM: 2480 },
      { day: "Day 8", spot: "Syabrubesi", altitudeM: 1550 },
      { day: "Day 9", spot: "Kathmandu", altitudeM: 1400 }
    ]
  },
  "poonhill": {
    name: "Ghorepani Poon Hill Trek",
    points: [
      { day: "Day 1", spot: "Pokhara", altitudeM: 822 },
      { day: "Day 2", spot: "Tikhedhunga", altitudeM: 1540 },
      { day: "Day 3", spot: "Ghorepani", altitudeM: 2874 },
      { day: "Day 4", spot: "Poon Hill Sunrise", altitudeM: 3210 },
      { day: "Day 5", spot: "Tadapani", altitudeM: 2630 },
      { day: "Day 6", spot: "Ghandruk", altitudeM: 1940 },
      { day: "Day 7", spot: "Pokhara", altitudeM: 822 }
    ]
  },
  "gokyo": {
    name: "Gokyo Lakes & Cho La Pass Trek",
    points: [
      { day: "Day 1", spot: "Kathmandu", altitudeM: 1400 },
      { day: "Day 2", spot: "Lukla", altitudeM: 2860 },
      { day: "Day 3", spot: "Namche Bazaar", altitudeM: 3440 },
      { day: "Day 4", spot: "Dole", altitudeM: 4110 },
      { day: "Day 5", spot: "Machhermo", altitudeM: 4470 },
      { day: "Day 6", spot: "Gokyo Lakes", altitudeM: 4790 },
      { day: "Day 7", spot: "Gokyo Ri Peak", altitudeM: 5357 },
      { day: "Day 8", spot: "Thagnak", altitudeM: 4700 },
      { day: "Day 9", spot: "Cho La Pass", altitudeM: 5420 },
      { day: "Day 10", spot: "Dzongla", altitudeM: 4830 },
      { day: "Day 11", spot: "Lobuche", altitudeM: 4940 },
      { day: "Day 12", spot: "Pheriche", altitudeM: 4370 },
      { day: "Day 13", spot: "Namche Bazaar", altitudeM: 3440 },
      { day: "Day 14", spot: "Lukla", altitudeM: 2860 },
      { day: "Day 15", spot: "Kathmandu", altitudeM: 1400 }
    ]
  },
  "mustang": {
    name: "Upper Mustang Trek",
    points: [
      { day: "Day 1", spot: "Pokhara", altitudeM: 822 },
      { day: "Day 2", spot: "Jomsom", altitudeM: 2720 },
      { day: "Day 3", spot: "Kagbeni", altitudeM: 2810 },
      { day: "Day 4", spot: "Chele", altitudeM: 3050 },
      { day: "Day 5", spot: "Syangboche", altitudeM: 3800 },
      { day: "Day 6", spot: "Tsarang", altitudeM: 3560 },
      { day: "Day 7", spot: "Lo Manthang", altitudeM: 3840 },
      { day: "Day 8", spot: "Lo Manthang (Exploration)", altitudeM: 3840 },
      { day: "Day 9", spot: "Dhakmar", altitudeM: 3820 },
      { day: "Day 10", spot: "Syangboche", altitudeM: 3800 },
      { day: "Day 11", spot: "Chhusang", altitudeM: 2980 },
      { day: "Day 12", spot: "Jomsom", altitudeM: 2720 },
      { day: "Day 13", spot: "Pokhara", altitudeM: 822 }
    ]
  }
};

function getSplinePath(points, includeM = true) {
  if (points.length === 0) return "";
  let d = includeM ? `M ${points[0].x},${points[0].y}` : `L ${points[0].x},${points[0].y}`;
  if (points.length === 1) return d;
  
  const tension = 0.15;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    
    const cpX1 = p1.x + (p2.x - p0.x) * tension;
    const cpY1 = p1.y + (p2.y - p0.y) * tension;
    
    const cpX2 = p2.x - (p3.x - p1.x) * tension;
    const cpY2 = p2.y - (p3.y - p1.y) * tension;
    
    d += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${p2.x},${p2.y}`;
  }
  return d;
}

export function renderAltitudeChart(containerId, trekKey = "ebc") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const data = trekAltitudeProfiles[trekKey] || trekAltitudeProfiles["ebc"];
  const points = data.points;
  
  const unit = typeof getCurrentUnit === 'function' ? getCurrentUnit() : 'm';
  const isFeet = unit === 'ft';
  const unitLabel = isFeet ? 'ft' : 'm';

  const convertAlt = (p) => isFeet ? (p.altitudeFt || Math.round(p.altitudeM * 3.28084)) : p.altitudeM;

  const convertedPoints = points.map(p => ({
    ...p,
    displayAlt: convertAlt(p)
  }));

  const width = 800;
  const height = 280;
  const paddingLeft = 50;
  const paddingRight = 40;
  const paddingTop = 40;
  const paddingBottom = 60;

  const maxPoint = Math.max(...convertedPoints.map(p => p.displayAlt));
  const minPoint = Math.min(...convertedPoints.map(p => p.displayAlt));
  const maxAlt = maxPoint + (isFeet ? 1500 : 500);
  const minAlt = Math.max(0, minPoint - (isFeet ? 1500 : 500));

  const getX = (index) => paddingLeft + (index / (convertedPoints.length - 1)) * (width - paddingLeft - paddingRight);
  const getY = (alt) => height - paddingBottom - ((alt - minAlt) / (maxAlt - minAlt)) * (height - paddingTop - paddingBottom);

  const coords = convertedPoints.map((p, i) => ({ x: getX(i), y: getY(p.displayAlt) }));
  const pathCoords = getSplinePath(coords, true);
  const areaCoords = `${pathCoords} L ${getX(convertedPoints.length - 1)},${height - paddingBottom} L ${getX(0)},${height - paddingBottom} Z`;

  const gridLine1Val = isFeet ? 6000 : 2000;
  const gridLine2Val = isFeet ? 12000 : 4000;

  const chartHTML = `
    <!-- Card Header Row -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px;">
      <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
        <!-- Trek Selector -->
        <select id="altitude-trek-selector" class="control-select" style="background: #ffffff; color: var(--color-primary-navy); border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 12px; font-size: 0.9rem; font-weight: 600; cursor: pointer; outline: none; transition: border-color var(--transition-fast);">
          <option value="ebc" ${trekKey === 'ebc' ? 'selected' : ''}>Everest Base Camp</option>
          <option value="abc" ${trekKey === 'abc' ? 'selected' : ''}>Annapurna Base Camp</option>
          <option value="annapurna_circuit" ${trekKey === 'annapurna_circuit' ? 'selected' : ''}>Annapurna Circuit</option>
          <option value="manaslu" ${trekKey === 'manaslu' ? 'selected' : ''}>Manaslu Circuit</option>
          <option value="langtang" ${trekKey === 'langtang' ? 'selected' : ''}>Langtang Valley</option>
          <option value="poonhill" ${trekKey === 'poonhill' ? 'selected' : ''}>Ghorepani Poon Hill</option>
          <option value="gokyo" ${trekKey === 'gokyo' ? 'selected' : ''}>Gokyo Lakes & Cho La</option>
          <option value="mustang" ${trekKey === 'mustang' ? 'selected' : ''}>Upper Mustang</option>
        </select>

        <!-- Inline Unit Selector Toggle -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-neutral-400); text-transform: uppercase; letter-spacing: 0.05em; user-select: none;">Altitude in:</span>
          <div style="display: inline-flex; background: #f1f5f9; padding: 3px; border-radius: 30px; border: 1px solid #e2e8f0;">
            <button type="button" class="altitude-unit-toggle-btn ${!isFeet ? 'active' : ''}" data-unit="m">METER</button>
            <button type="button" class="altitude-unit-toggle-btn ${isFeet ? 'active' : ''}" data-unit="ft">FEET</button>
          </div>
        </div>
      </div>
      
      <!-- Download Export Button -->
      <button type="button" id="altitude-download-btn" class="altitude-download-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        DOWNLOAD
      </button>
    </div>

    <!-- SVG Area Chart -->
    <div style="overflow-x: auto; width: 100%;">
      <svg viewBox="0 0 ${width} ${height}" class="altitude-chart-svg" style="width: 100%; max-width: 100%; min-width: 650px; height: auto; display: block; overflow: visible;">
        <defs>
          <linearGradient id="altitudeGradient-${trekKey}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10B981" stop-opacity="0.45"/>
            <stop offset="100%" stop-color="#10B981" stop-opacity="0.01"/>
          </linearGradient>
        </defs>
        
        <!-- Background Grid Lines -->
        <line x1="${paddingLeft}" y1="${getY(gridLine1Val)}" x2="${width - paddingRight}" y2="${getY(gridLine1Val)}" stroke="#E2E8F0" stroke-dasharray="4" stroke-width="1"/>
        <line x1="${paddingLeft}" y1="${getY(gridLine2Val)}" x2="${width - paddingRight}" y2="${getY(gridLine2Val)}" stroke="#E2E8F0" stroke-dasharray="4" stroke-width="1"/>
        
        <!-- Grid Labels -->
        <text x="${paddingLeft - 8}" y="${getY(gridLine1Val) + 4}" font-size="10.5" font-weight="600" text-anchor="end" fill="#94A3B8">${gridLine1Val.toLocaleString()} ${unitLabel}</text>
        <text x="${paddingLeft - 8}" y="${getY(gridLine2Val) + 4}" font-size="10.5" font-weight="600" text-anchor="end" fill="#94A3B8">${gridLine2Val.toLocaleString()} ${unitLabel}</text>

        <!-- Area & Peak Line -->
        <path d="${areaCoords}" fill="url(#altitudeGradient-${trekKey})" />
        <path d="${pathCoords}" fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round"/>

        <!-- Solid X-axis Base Line -->
        <line x1="${paddingLeft}" y1="${height - paddingBottom}" x2="${width - paddingRight}" y2="${height - paddingBottom}" stroke="#CBD5E1" stroke-width="1.5"/>

        <!-- Nodes and Labels -->
        ${convertedPoints.map((p, i) => `
          <!-- Vertical Dotted Anchor Lines to X-axis -->
          <line x1="${getX(i)}" y1="${getY(p.displayAlt)}" x2="${getX(i)}" y2="${height - paddingBottom}" stroke="#F1F5F9" stroke-dasharray="2" stroke-width="1"/>
          
          <!-- Data Dots -->
          <circle cx="${getX(i)}" cy="${getY(p.displayAlt)}" r="5.5" fill="#FFFFFF" stroke="#10B981" stroke-width="2.5"/>
          
          <!-- Altitude values above nodes -->
          <text x="${getX(i)}" y="${getY(p.displayAlt) - 12}" font-size="10.5" font-weight="700" text-anchor="middle" fill="#334155">${p.displayAlt.toLocaleString()}${unitLabel}</text>
          
          <!-- Slanted Spot Names on X-axis -->
          <g transform="translate(${getX(i)}, ${height - paddingBottom + 20})">
            <text transform="rotate(-25)" font-size="9.5" font-weight="600" text-anchor="end" fill="#64748B">${p.spot}</text>
          </g>
        `).join('')}
      </svg>
    </div>
  `;

  container.innerHTML = chartHTML;

  // Re-bind selector event listener
  const selector = document.getElementById('altitude-trek-selector');
  if (selector) {
    selector.addEventListener('change', (e) => renderAltitudeChart(containerId, e.target.value));
  }

  // Bind unit switcher toggle buttons
  const unitButtons = container.querySelectorAll('.altitude-unit-toggle-btn');
  unitButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedUnit = e.target.getAttribute('data-unit');
      if (typeof setUnit === 'function') {
        setUnit(selectedUnit);
        
        // Also update unit selector value in header to match
        const globalUnitSelect = document.getElementById('unit-select');
        if (globalUnitSelect) {
          globalUnitSelect.value = selectedUnit;
        }
      }
    });
  });

  // Bind download button click
  const downloadBtn = document.getElementById('altitude-download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const svg = container.querySelector('.altitude-chart-svg');
      if (!svg) return;
      
      const svgClone = svg.cloneNode(true);
      svgClone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      
      // Inline styles for high-fidelity rendering on exported SVG
      svgClone.style.background = "#FFFFFF";
      svgClone.style.padding = "20px 10px 10px 10px";
      svgClone.style.borderRadius = "12px";
      
      svgClone.querySelectorAll('text').forEach(t => {
        t.style.fontFamily = "system-ui, -apple-system, sans-serif";
      });

      // Embed gradient definition styles in exported SVG
      const styleTag = document.createElementNS("http://www.w3.org/2000/svg", "style");
      styleTag.textContent = `
        text { font-family: system-ui, -apple-system, sans-serif; }
      `;
      svgClone.insertBefore(styleTag, svgClone.firstChild);
      
      const svgData = new XMLSerializer().serializeToString(svgClone);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `${trekKey}-altitude-profile.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('altitude-chart-wrapper');
  if (wrapper) {
    const key = wrapper.getAttribute('data-trek-key') || 'ebc';
    renderAltitudeChart('altitude-chart-wrapper', key);
  }
});

window.addEventListener('unitchange', () => {
  const wrapper = document.getElementById('altitude-chart-wrapper');
  if (wrapper) {
    const key = wrapper.getAttribute('data-trek-key') || 'ebc';
    renderAltitudeChart('altitude-chart-wrapper', key);
  }
});
