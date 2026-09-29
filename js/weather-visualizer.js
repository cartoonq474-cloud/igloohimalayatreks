// Weather Onboarding Visualizer State Management

const monthData = [
  { name: "January", min: -15, max: 9 },
  { name: "February", min: -20, max: 11 },
  { name: "March", min: -2, max: 15 },
  { name: "April", min: 1, max: 18 },
  { name: "May", min: 4, max: 19 },
  { name: "June", min: 9, max: 20 },
  { name: "July", min: 10, max: 19 },
  { name: "August", min: 10, max: 19 },
  { name: "September", min: 9, max: 18 },
  { name: "October", min: 2, max: 16 },
  { name: "November", min: -5, max: 12 },
  { name: "December", min: -10, max: 10 }
];

const baseDailyData = [
  { label: "Day 1 (1300 m / 4265 ft)", min: 5, max: 19 },
  { label: "Day 2 (2651 m / 8697 ft)", min: -10, max: 11 },
  { label: "Day 3 (3440 m / 11286 ft)", min: -15, max: 6 },
  { label: "Day 4 (3700 m / 12139 ft)", min: -15, max: 6 },
  { label: "Day 5 (3956 m / 12979 ft)", min: -17, max: 5 },
  { label: "Day 6 (4380 m / 14370 ft)", min: -25, max: -5 },
  { label: "Day 7 (4380 m / 14370 ft)", min: -25, max: -5 },
  { label: "Day 8 (4938 m / 16200 ft)", min: -20, max: 0 },
  { label: "Day 9 (5160 m / 16929 ft)", min: -20, max: -3 },
  { label: "Day 10 (4371 m / 14340 ft)", min: -15, max: 4 },
  { label: "Day 11 (3440 m / 11286 ft)", min: -15, max: 6 },
  { label: "Day 12 (2860 m / 9383 ft)", min: -10, max: 11 },
  { label: "Day 13 (1300 m / 4265 ft)", min: 5, max: 19 }
];

const monthOffsets = {
  "January": 0,
  "February": 2,
  "March": 7,
  "April": 10,
  "May": 12,
  "June": 15,
  "July": 16,
  "August": 16,
  "September": 14,
  "October": 9,
  "November": 4,
  "December": 1
};

let currentTab = "daily"; // "daily" or "monthly"
let tempUnit = localStorage.getItem("igloo-temp-unit") || "c"; // "c" or "f"
let currentMonth = "January";

function formatTemp(c) {
  if (tempUnit === "f") {
    const f = Math.floor((c * 9) / 5 + 32);
    return `${f}°F`;
  }
  return `${c}°C`;
}

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

export function renderWeatherChart(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const isDaily = currentTab === "daily";
  const isFahrenheit = tempUnit === "f";

  // Data to render
  let points = [];
  if (isDaily) {
    const offset = monthOffsets[currentMonth] || 0;
    points = baseDailyData.map(d => ({
      label: d.label,
      min: d.min + offset,
      max: d.max + offset
    }));
  } else {
    points = monthData.map(m => ({
      label: m.name,
      min: m.min,
      max: m.max
    }));
  }

  // Dimensions
  const width = isDaily ? 1000 : 800; // Scrollable if daily
  const height = 300;
  const paddingLeft = isDaily ? 130 : 60;
  const paddingRight = 40;
  const paddingTop = 50;
  const paddingBottom = 60;

  const allVals = points.flatMap(p => [p.min, p.max]);
  const maxVal = Math.max(...allVals) + 5;
  const minVal = Math.min(...allVals) - 5;

  const getX = (index) => paddingLeft + (index / (points.length - 1)) * (width - paddingLeft - paddingRight);
  const getY = (val) => height - paddingBottom - ((val - minVal) / (maxVal - minVal)) * (height - paddingTop - paddingBottom);

  // Generate Splines and Range Areas
  let pathHTML = "";
  let areaCoords = "";
  const colorTheme = isDaily ? "#00a8ff" : "#f59e0b"; // Blue for daily, Orange for monthly
  const fillOpacity = isDaily ? "0.15" : "0.12";

  if (isDaily) {
    // Range Area Chart with top/bottom lines
    const maxCoords = points.map((p, i) => ({ x: getX(i), y: getY(p.max) }));
    const minCoords = points.map((p, i) => ({ x: getX(i), y: getY(p.min) }));
    
    const maxSpline = getSplinePath(maxCoords, true);
    const minCoordsReversed = [...minCoords].reverse();
    const minSplineReversed = getSplinePath(minCoordsReversed, false);
    
    areaCoords = `${maxSpline} ${minSplineReversed} Z`;
    
    pathHTML = `
      <path d="${areaCoords}" fill="url(#weatherGradient)" />
      <path d="${maxSpline}" fill="none" stroke="${colorTheme}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="${getSplinePath(minCoords, true)}" fill="none" stroke="${colorTheme}" stroke-width="2.5" stroke-linecap="round"/>
    `;
  } else {
    // Single Average Max Chart
    const maxCoords = points.map((p, i) => ({ x: getX(i), y: getY(p.max) }));
    const maxSpline = getSplinePath(maxCoords, true);
    
    areaCoords = `${maxSpline} L ${getX(points.length - 1)},${height - paddingBottom} L ${getX(0)},${height - paddingBottom} Z`;
    
    pathHTML = `
      <path d="${areaCoords}" fill="url(#weatherGradient)" />
      <path d="${maxSpline}" fill="none" stroke="${colorTheme}" stroke-width="2.5" stroke-linecap="round"/>
    `;
  }

  // Draw grid lines
  const gridLines = [];
  const step = isFahrenheit ? 20 : 10;
  const startGrid = Math.ceil(minVal / step) * step;
  const endGrid = Math.floor(maxVal / step) * step;
  for (let val = startGrid; val <= endGrid; val += step) {
    gridLines.push(val);
  }

  const wrapperHTML = `
    <!-- Segmented Tab Group Switcher -->
    <div class="weather-tab-group">
      <button type="button" class="weather-tab-btn ${isDaily ? 'active' : ''}" data-tab="daily">Daily Temperature Variation</button>
      <button type="button" class="weather-tab-btn ${!isDaily ? 'active' : ''}" data-tab="monthly">Average Temperature (Month to Month)</button>
    </div>

    <!-- Interactive Sub-control Row -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
      <!-- Month Dropdown (Daily Tab Only) -->
      <div>
        ${isDaily ? `
          <select id="weather-month-selector" class="control-select" style="background: #ffffff; color: var(--color-primary-navy); border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 16px; font-size: 0.95rem; font-weight: bold; cursor: pointer; outline: none;">
            ${monthData.map(m => `<option value="${m.name}" ${currentMonth === m.name ? 'selected' : ''}>${m.name}</option>`).join('')}
          </select>
        ` : `
          <span style="font-size: 1.1rem; font-weight: 700; color: var(--color-primary-navy);">Everest Averages</span>
        `}
      </div>

      <!-- Unit Switcher -->
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-neutral-400); text-transform: uppercase; letter-spacing: 0.05em; user-select: none;">Temperature in:</span>
        <div style="display: inline-flex; background: #f1f5f9; padding: 3px; border-radius: 30px; border: 1px solid #e2e8f0;">
          <button type="button" class="weather-unit-btn ${!isFahrenheit ? 'active' : ''}" data-unit="c">CELSIUS</button>
          <button type="button" class="weather-unit-btn ${isFahrenheit ? 'active' : ''}" data-unit="f">FAHRENHEIT</button>
        </div>
      </div>
    </div>

    <!-- Scrollable Chart Container -->
    <div class="weather-scroll-container">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 100%; min-width: ${isDaily ? '850px' : '650px'}; height: auto; display: block; overflow: visible;">
        <defs>
          <linearGradient id="weatherGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${colorTheme}" stop-opacity="${fillOpacity}"/>
            <stop offset="100%" stop-color="${colorTheme}" stop-opacity="0.0"/>
          </linearGradient>
        </defs>

        <!-- Horizontal Grid Lines -->
        ${gridLines.map(val => `
          <line x1="${paddingLeft}" y1="${getY(val)}" x2="${width - paddingRight}" y2="${getY(val)}" stroke="#E2E8F0" stroke-dasharray="4"/>
          <text x="${paddingLeft - 8}" y="${getY(val) + 4}" font-size="10.5" font-weight="600" text-anchor="end" fill="#94A3B8">${isFahrenheit ? Math.round((val * 9)/5 + 32) : val}°</text>
        `).join('')}

        <!-- Spline Line and Shaded Areas -->
        ${pathHTML}

        <!-- Solid X-axis Base Line -->
        <line x1="${paddingLeft}" y1="${height - paddingBottom}" x2="${width - paddingRight}" y2="${height - paddingBottom}" stroke="#CBD5E1" stroke-width="1.5"/>

        <!-- Nodes, Anchors, and Labels -->
        ${points.map((p, i) => {
          const x = getX(i);
          const yMin = getY(p.min);
          const yMax = getY(p.max);

          const minLabel = formatTemp(p.min);
          const maxLabel = formatTemp(p.max);

          return `
            <!-- Vertical Anchor Line (Between Max and Min for daily, or to baseline for monthly) -->
            <line x1="${x}" y1="${yMax}" x2="${x}" y2="${isDaily ? yMin : height - paddingBottom}" stroke="${colorTheme}" stroke-dasharray="2" stroke-width="1.5" opacity="0.6"/>
            
            <!-- Nodes (Min/Max points) -->
            <circle cx="${x}" cy="${yMax}" r="4.5" fill="#FFFFFF" stroke="${colorTheme}" stroke-width="2"/>
            ${isDaily ? `<circle cx="${x}" cy="${yMin}" r="4.5" fill="#FFFFFF" stroke="${colorTheme}" stroke-width="2"/>` : ''}

            <!-- Min/Max Floating Label Box -->
            <g transform="translate(${x}, ${yMax - 22})">
              <!-- Label bubble background -->
              <rect x="-38" y="-12" width="76" height="24" rx="4" fill="${colorTheme}"/>
              <!-- Label texts -->
              <text x="0" y="-1" font-size="8.5" font-weight="700" text-anchor="middle" fill="#FFFFFF">Min: ${minLabel}</text>
              <text x="0" y="8" font-size="8.5" font-weight="700" text-anchor="middle" fill="#FFFFFF">Max: ${maxLabel}</text>
            </g>

            <!-- Slanted X-axis labels -->
            <g transform="translate(${x}, ${height - paddingBottom + 20})">
              <text transform="rotate(-15)" font-size="9" font-weight="600" text-anchor="end" fill="#64748B">${p.label}</text>
            </g>
          `;
        }).join('')}
      </svg>
    </div>

    <!-- Custom Navigation Scrollbar Bar -->
    <div class="weather-scroll-controls">
      <button type="button" class="weather-scroll-btn prev">◀</button>
      <div class="weather-scrollbar-track">
        <div class="weather-scrollbar-thumb"></div>
      </div>
      <button type="button" class="weather-scroll-btn next">▶</button>
    </div>
  `;

  container.innerHTML = wrapperHTML;

  // Bind Switch Tab click handlers
  const tabButtons = container.querySelectorAll('.weather-tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentTab = e.target.getAttribute('data-tab');
      renderWeatherChart(containerId);
    });
  });

  // Bind Month selector change handlers
  const monthSelector = container.querySelector('#weather-month-selector');
  if (monthSelector) {
    monthSelector.addEventListener('change', (e) => {
      currentMonth = e.target.value;
      renderWeatherChart(containerId);
    });
  }

  // Bind unit switcher button handlers
  const unitButtons = container.querySelectorAll('.weather-unit-btn');
  unitButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tempUnit = e.target.getAttribute('data-unit');
      localStorage.setItem("igloo-temp-unit", tempUnit);
      renderWeatherChart(containerId);
    });
  });

  // Setup scrollbar thumb tracking and sync logic
  const scrollContainer = container.querySelector('.weather-scroll-container');
  const thumb = container.querySelector('.weather-scrollbar-thumb');
  const prevBtn = container.querySelector('.weather-scroll-btn.prev');
  const nextBtn = container.querySelector('.weather-scroll-btn.next');
  
  if (scrollContainer && thumb) {
    const updateThumb = () => {
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const controls = container.querySelector('.weather-scroll-controls');
      if (maxScroll <= 0) {
        thumb.style.width = '100%';
        thumb.style.left = '0%';
        if (controls) controls.style.display = 'none';
        return;
      }
      if (controls) controls.style.display = 'flex';
      const scrollRatio = scrollContainer.scrollLeft / maxScroll;
      const visibleRatio = scrollContainer.clientWidth / scrollContainer.scrollWidth;
      const thumbWidth = Math.max(20, visibleRatio * 100);
      thumb.style.width = `${thumbWidth}%`;
      thumb.style.left = `${scrollRatio * (100 - thumbWidth)}%`;
    };

    scrollContainer.addEventListener('scroll', updateThumb);
    window.addEventListener('resize', updateThumb);
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -200, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
      });
    }
    
    // Call initially to size and position
    setTimeout(updateThumb, 50);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('weather-chart-wrapper');
  if (wrapper) {
    renderWeatherChart('weather-chart-wrapper');
  }
});
