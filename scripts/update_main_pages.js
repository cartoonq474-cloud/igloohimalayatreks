const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// ==========================================
// 1. UPDATE CONTACT.HTML
// ==========================================
function updateContact() {
  const filePath = path.join(ROOT, 'contact.html');
  let html = fs.readFileSync(filePath, 'utf8');

  // Update title & description
  html = html.replace(
    /<title>.*?<\/title>/i,
    '<title>Contact Us — Igloo Himalaya Treks Pvt. Ltd. | Local Trusted Trekking Agency in Nepal</title>'
  );

  html = html.replace(
    /<meta name="description" content=".*?"/i,
    '<meta name="description" content="Contact Igloo Himalaya Treks Pvt. Ltd., a local trusted trekking agency in Kathmandu, Nepal. Direct phone/WhatsApp: +977 9860843980, office at Aja Swan Marg, Geetanjali Chowk, Ward 16, Kathmandu."'
  );

  // Update Page Header Banner
  html = html.replace(
    /<h1 style="font-size: 2\.8rem; color: white; margin-top: 10px;">.*?<\/h1>[\s\S]*?<p style="font-size: 1\.1rem; color: var\(--color-neutral-300\); max-width: 700px; margin: 15px auto 0 auto;">[\s\S]*?<\/p>/,
    `<h1 style="font-size: 2.8rem; color: white; margin-top: 10px;">Contact Igloo Himalaya Treks Pvt. Ltd.</h1>
        <p style="font-size: 1.1rem; color: var(--color-neutral-300); max-width: 700px; margin: 15px auto 0 auto;">
          Local Trusted Trekking Agency in Nepal. Our office is located at Aja Swan Marg, Geetanjali Chowk, Ward 16, Kathmandu. Reach out via email, direct phone, WhatsApp, or visit our office.
        </p>`
  );

  // Update Contact Cards Column
  const contactCardsRegex = /<!-- Contact Cards Column -->[\s\S]*?<!-- Contact Form Column -->/;
  const newContactCards = `<!-- Contact Cards Column -->
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div class="card" style="padding: 24px;">
            <h4 style="font-size: 1.15rem; color: var(--color-primary-navy); margin-bottom: 8px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> Main Office Address</h4>
            <p style="color: var(--color-neutral-600); font-size: 0.95rem; line-height: 1.6;">
              <strong>Igloo Himalaya Treks Pvt. Ltd.</strong><br>
              Aja Swan Marg, Geetanjali Chowk, Ward 16<br>
              Kathmandu, Nepal
            </p>
          </div>

          <div class="card" style="padding: 24px;">
            <h4 style="font-size: 1.15rem; color: var(--color-primary-navy); margin-bottom: 8px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Phone & Direct Contacts</h4>
            <p style="color: var(--color-neutral-600); font-size: 0.95rem; margin-bottom: 6px;">
              <strong>Direct Phone / Mobile:</strong> <a href="tel:+9779860843980" style="color: #0E3458; font-weight: 600; text-decoration: none;">+977 9860843980</a>
            </p>
            <p style="color: #25D366; font-weight: 600; font-size: 0.95rem; margin-bottom: 6px;">
              <a href="https://wa.me/9779860843980" target="_blank" rel="noopener" style="color: #25D366; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
                WhatsApp: +977 9860843980 (24/7)
              </a>
            </p>
          </div>

          <div class="card" style="padding: 24px;">
            <h4 style="font-size: 1.15rem; color: var(--color-primary-navy); margin-bottom: 8px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A96C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Email & Social Profiles</h4>
            <p style="color: var(--color-neutral-600); font-size: 0.95rem; margin-bottom: 6px;">
              <strong>Business Email:</strong> <a href="mailto:info@igloohimalayatreks.com" style="color: #1A96C8; text-decoration: none;">info@igloohimalayatreks.com</a>
            </p>
            <p style="color: var(--color-neutral-600); font-size: 0.95rem; margin-bottom: 6px;">
              <strong>Company Gmail:</strong> <a href="mailto:igloohimalayatreks@gmail.com" style="color: #1A96C8; text-decoration: none;">igloohimalayatreks@gmail.com</a>
            </p>
            <p style="color: var(--color-neutral-600); font-size: 0.95rem; margin-bottom: 6px;">
              <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/igloo-himalaya-treks-268269433/" target="_blank" rel="noopener" style="color: #0A66C2; text-decoration: none;">Igloo Himalaya Treks on LinkedIn ↗</a>
            </p>
            <p style="color: var(--color-neutral-600); font-size: 0.92rem; margin-top: 8px; border-top: 1px solid #f1f5f9; padding-top: 8px;">
              <strong>Office Hours:</strong> Sun – Fri: 09:00 AM – 07:00 PM (NPT)<br>
              <em>Emergency lines & WhatsApp active 24/7/365.</em>
            </p>
          </div>
        </div>

        <!-- Contact Form Column -->`;

  html = html.replace(contactCardsRegex, newContactCards);

  // Update map section text
  html = html.replace(
    /<!-- Map Representation Placeholder -->[\s\S]*?<\/main>/,
    `<!-- Map Representation Placeholder -->
    <section class="section-padding" style="background: var(--color-neutral-100); padding-top: 40px; padding-bottom: 40px;">
      <div class="container text-center">
        <h3 style="font-size: 1.4rem; margin-bottom: 16px;">Our Location in Kathmandu, Nepal</h3>
        <div style="background: white; border-radius: var(--radius-md); padding: 40px; border: 1px solid var(--color-neutral-300);">
          <span style="font-size: 2.5rem; display: block; margin-bottom: 10px;">📍</span>
          <p style="font-size: 1.15rem; color: var(--color-neutral-800); font-weight: 700;">
            Aja Swan Marg, Geetanjali Chowk, Ward 16, Kathmandu, Nepal
          </p>
          <p style="font-size: 0.95rem; color: var(--color-neutral-600); margin-top: 6px;">
            <strong>Igloo Himalaya Treks Pvt. Ltd.</strong> — Local Trusted Trekking Agency in Nepal
          </p>
        </div>
      </div>
    </section>
  </main>`
  );

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('✔ contact.html updated.');
}

// ==========================================
// 2. UPDATE ABOUT.HTML
// ==========================================
function updateAbout() {
  const filePath = path.join(ROOT, 'about.html');
  let html = fs.readFileSync(filePath, 'utf8');

  // Title & description
  html = html.replace(
    /<title>.*?<\/title>/i,
    '<title>About Us — Igloo Himalaya Treks Pvt. Ltd. | Local Trusted Trekking Agency in Nepal</title>'
  );

  // Trust Snapshot Bar
  const trustBarRegex = /<!-- 02\. TRUST SNAPSHOT BAR -->[\s\S]*?<!-- 03 & 04\. OUR STORY & WHY WE STARTED -->/;
  const newTrustBar = `<!-- 02. TRUST SNAPSHOT BAR -->
    <div class="trust-snapshot-bar">
      <div class="container">
        <div class="trust-grid">
          <div>
            <div class="trust-item-val">2025</div>
            <div class="trust-item-lbl">Established</div>
          </div>
          <div>
            <div class="trust-item-val">Kathmandu</div>
            <div class="trust-item-lbl">Headquarters (Ward 16)</div>
          </div>
          <div>
            <div class="trust-item-val">100% Local</div>
            <div class="trust-item-lbl">Trusted Agency</div>
          </div>
          <div>
            <div class="trust-item-val">Govt Licensed</div>
            <div class="trust-item-lbl">Ministry of Tourism</div>
          </div>
          <div>
            <div class="trust-item-val">NMA & Legal</div>
            <div class="trust-item-lbl">Certified Partner</div>
          </div>
          <div>
            <div class="trust-item-val">Trekking & Peaks</div>
            <div class="trust-item-lbl">Comprehensive Portfolio</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 03 & 04. OUR STORY & WHY WE STARTED -->`;
  html = html.replace(trustBarRegex, newTrustBar);

  // Timeline & History Section (Milestones from Google Sheet)
  const timelineRegex = /<!-- 05\. VISUAL COMPANY TIMELINE -->[\s\S]*?<!-- 06\. WHAT LOCAL OPERATOR MEANS & OPERATIONAL CHAIN -->/;
  const newTimeline = `<!-- 05. VISUAL COMPANY TIMELINE -->
    <section class="section-padding" style="background: #f8fafc; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
      <div class="container">
        <div class="text-center" style="margin-bottom: 30px;">
          <span class="pill pill-copper">Our History & Growth</span>
          <h2 class="section-title">Company Establishment & Journey</h2>
          <p style="color: #64748b; max-width: 680px; margin: 10px auto 0 auto;">Combining decades of practical mountain guiding experience with professional agency operations.</p>
        </div>

        <div class="timeline-wrapper">
          <!-- 2025: Establishment -->
          <div class="timeline-item left">
            <div class="timeline-dot"></div>
            <div class="timeline-card">
              <span class="timeline-year">2025</span>
              <h4 style="font-size: 1.1rem; color: #0E3458; margin-bottom: 8px;">Company Establishment & Initial Operations</h4>
              <p style="color: #64748b; font-size: 0.9rem; line-height: 1.5; margin: 0;">
                Igloo Himalaya Treks Pvt. Ltd. was established in Kathmandu in 2025. The company began primarily with trekking services, helping travellers explore Nepal’s mountain trails with experienced local trekking leaders.
              </p>
            </div>
          </div>

          <!-- Service Development: Climbing & Tours -->
          <div class="timeline-item right">
            <div class="timeline-dot"></div>
            <div class="timeline-card">
              <span class="timeline-year">Service Expansion</span>
              <h4 style="font-size: 1.1rem; color: #0E3458; margin-bottom: 8px;">Service Development: Peak Climbing & Tours</h4>
              <p style="color: #64748b; font-size: 0.9rem; line-height: 1.5; margin: 0;">
                Building on its trekking operations, the company expanded into peak climbing and tours. This broadened its services for travellers interested in mountain climbs, cultural visits, and journeys beyond the trekking trails.
              </p>
            </div>
          </div>

          <!-- Website Development & Online Listings -->
          <div class="timeline-item left">
            <div class="timeline-dot"></div>
            <div class="timeline-card">
              <span class="timeline-year">Global Reach</span>
              <h4 style="font-size: 1.1rem; color: #0E3458; margin-bottom: 8px;">Website Development & Online Listings</h4>
              <p style="color: #64748b; font-size: 0.9rem; line-height: 1.5; margin: 0;">
                The company developed its website to showcase trip packages, detailed itineraries, and destination information. Selected trekking trips were also listed on Tripadvisor, making them accessible to travellers researching trips in Nepal.
              </p>
            </div>
          </div>

          <!-- Current Portfolio -->
          <div class="timeline-item right">
            <div class="timeline-dot"></div>
            <div class="timeline-card">
              <span class="timeline-year">Present</span>
              <h4 style="font-size: 1.1rem; color: #0E3458; margin-bottom: 8px;">Current Trekking & Climbing Portfolio</h4>
              <p style="color: #64748b; font-size: 0.9rem; line-height: 1.5; margin: 0;">
                The website features comprehensive packages across Everest, Annapurna, Langtang, Manaslu, Kanchenjunga, Upper Mustang, and Dolpo. Climbing packages include Island Peak, Mera Peak, Lobuche Peak, and Yala Peak with verified local safety standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 06. WHAT LOCAL OPERATOR MEANS & OPERATIONAL CHAIN -->`;
  html = html.replace(timelineRegex, newTimeline);

  // Proof Wall / Associations & Registrations (7 cards from Google Sheet)
  const proofWallRegex = /<!-- 16 & 17\. PROOF WALL & OFFICIAL CREDENTIALS -->[\s\S]*?<!-- 18 & 19\. KATHMANDU OFFICE & WHAT WE WILL NEVER PROMISE -->/;
  const newProofWall = `<!-- 16 & 17. PROOF WALL & OFFICIAL CREDENTIALS -->
    <section id="proof-wall" class="section-padding" style="background: #f8fafc; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
      <div class="container">
        <div class="text-center" style="margin-bottom: 30px;">
          <span class="pill pill-alpine">Official Registrations & Documents</span>
          <h2 class="section-title">Government Registration & Industry Affiliations</h2>
          <p style="color: #64748b; max-width: 660px; margin: 10px auto 0 auto;">Igloo Himalaya Treks Pvt. Ltd. is fully certified and recognized by government ministries and tourism authorities in Nepal.</p>
        </div>

        <div class="proof-grid" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
          
          <!-- Doc 1: Tourism Authority License -->
          <div class="proof-card">
            <div class="proof-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0E3458" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="4" rx="1"/><path d="M4 7v10"/><path d="M8 7v10"/><path d="M12 7v10"/><path d="M16 7v10"/><path d="M20 7v10"/><rect x="2" y="17" width="20" height="4" rx="1"/></svg>
            </div>
            <h4 style="font-size: 1rem; color: #0E3458; margin-bottom: 4px;">Tourism Authority License</h4>
            <div style="font-weight: 700; color: #1A96C8; font-size: 0.85rem; margin-bottom: 8px;">Department of Tourism</div>
            <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 14px;">Official license to organize trekking, mountaineering, and cultural tours in Nepal.</p>
            <button class="btn btn-secondary open-license-modal" data-title="Tourism Authority License" data-desc="Official Tourism Authority License issued by the Nepal Ministry of Tourism authorizing nationwide trekking and expedition operations." style="padding: 6px 14px; font-size: 0.8rem;">Verify Document</button>
          </div>

          <!-- Doc 2: Company Registration -->
          <div class="proof-card">
            <div class="proof-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0E3458" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <h4 style="font-size: 1rem; color: #0E3458; margin-bottom: 4px;">Business Registration Document</h4>
            <div style="font-weight: 700; color: #1A96C8; font-size: 0.85rem; margin-bottom: 8px;">Office of the Company Registrar</div>
            <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 14px;">Legally incorporated as Igloo Himalaya Treks Pvt. Ltd. under Nepal Government law.</p>
            <button class="btn btn-secondary open-license-modal" data-title="Business Registration Document" data-desc="Official Certificate of Incorporation of Igloo Himalaya Treks Pvt. Ltd. registered under the Companies Act of Nepal." style="padding: 6px 14px; font-size: 0.8rem;">Verify Document</button>
          </div>

          <!-- Doc 3: PAN Certificate -->
          <div class="proof-card">
            <div class="proof-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0E3458" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><line x1="12" y1="6" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="18"/></svg>
            </div>
            <h4 style="font-size: 1rem; color: #0E3458; margin-bottom: 4px;">PAN Certificate</h4>
            <div style="font-weight: 700; color: #1A96C8; font-size: 0.85rem; margin-bottom: 8px;">Inland Revenue Department</div>
            <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 14px;">Official Permanent Account Number (PAN) tax certificate issued by the Government of Nepal.</p>
            <button class="btn btn-secondary open-license-modal" data-title="PAN Certificate" data-desc="PAN Tax Certificate issued by Nepal Inland Revenue Department ensuring complete legal and financial compliance." style="padding: 6px 14px; font-size: 0.8rem;">Verify Document</button>
          </div>

          <!-- Doc 4: Kathmandu Municipality Certificate -->
          <div class="proof-card">
            <div class="proof-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0E3458" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <h4 style="font-size: 1rem; color: #0E3458; margin-bottom: 4px;">Kathmandu Municipality Certificate</h4>
            <div style="font-weight: 700; color: #1A96C8; font-size: 0.85rem; margin-bottom: 8px;">Ward 16, Kathmandu</div>
            <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 14px;">Local municipal government operating registration and business certificate.</p>
            <button class="btn btn-secondary open-license-modal" data-title="Kathmandu Municipality Certificate" data-desc="Municipal Registration Certificate issued by Kathmandu Metropolitan City Ward 16 for official local commercial operations." style="padding: 6px 14px; font-size: 0.8rem;">Verify Document</button>
          </div>

          <!-- Doc 5: Dept of Cottage & Small Industries -->
          <div class="proof-card">
            <div class="proof-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0E3458" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </div>
            <h4 style="font-size: 1rem; color: #0E3458; margin-bottom: 4px;">Cottage & Small Industries</h4>
            <div style="font-weight: 700; color: #1A96C8; font-size: 0.85rem; margin-bottom: 8px;">Department Registration</div>
            <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 14px;">Registered enterprise under the Ministry of Industry, Commerce and Supplies.</p>
            <button class="btn btn-secondary open-license-modal" data-title="Department of Cottage & Small Industries" data-desc="Official registration under Department of Cottage & Small Industries authorizing adventure tourism enterprises." style="padding: 6px 14px; font-size: 0.8rem;">Verify Document</button>
          </div>

          <!-- Doc 6: Nepal Rastra Bank Forex License -->
          <div class="proof-card">
            <div class="proof-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0E3458" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
            </div>
            <h4 style="font-size: 1rem; color: #0E3458; margin-bottom: 4px;">Foreign Exchange License</h4>
            <div style="font-weight: 700; color: #1A96C8; font-size: 0.85rem; margin-bottom: 8px;">Nepal Rastra Bank</div>
            <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 14px;">Authorized central bank license for secure foreign currency wire & card transactions.</p>
            <button class="btn btn-secondary open-license-modal" data-title="Foreign Exchange License" data-desc="Central Bank (Nepal Rastra Bank) authorization allowing legal receipt and handling of international currencies." style="padding: 6px 14px; font-size: 0.8rem;">Verify Document</button>
          </div>

          <!-- Doc 7: NMA Document -->
          <div class="proof-card">
            <div class="proof-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0E3458" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="M4.14 15.08 7.9 7.64l3.18 6.36"/></svg>
            </div>
            <h4 style="font-size: 1rem; color: #0E3458; margin-bottom: 4px;">NMA Mountaineering Document</h4>
            <div style="font-weight: 700; color: #1A96C8; font-size: 0.85rem; margin-bottom: 8px;">Nepal Mountaineering Association</div>
            <p style="font-size: 0.8rem; color: #64748b; margin-bottom: 14px;">Certified organizer for trekking peaks including Island Peak, Mera Peak, Lobuche, and Yala Peak.</p>
            <button class="btn btn-secondary open-license-modal" data-title="NMA Mountaineering Document" data-desc="Official Nepal Mountaineering Association (NMA) certification for peak climbing permits and alpine expedition leadership." style="padding: 6px 14px; font-size: 0.8rem;">Verify Document</button>
          </div>

        </div>
      </div>
    </section>

    <!-- 18 & 19. KATHMANDU OFFICE & WHAT WE WILL NEVER PROMISE -->`;
  html = html.replace(proofWallRegex, newProofWall);

  // Office & Headquarters Box
  html = html.replace(
    /Paknajol Marg, Thamel-16, Kathmandu, Nepal/g,
    'Aja Swan Marg, Geetanjali Chowk, Ward 16, Kathmandu, Nepal'
  );

  html = html.replace(
    /WhatsApp: \+977 980 000 0000 \| Call: \+977 1 4700000/g,
    'Direct Phone / WhatsApp: +977 9860843980 | Email: info@igloohimalayatreks.com'
  );

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('✔ about.html updated.');
}

// ==========================================
// 3. UPDATE TEAM.HTML
// ==========================================
function updateTeam() {
  const filePath = path.join(ROOT, 'team.html');
  let html = fs.readFileSync(filePath, 'utf8');

  // Title & description
  html = html.replace(
    /<title>.*?<\/title>/i,
    '<title>Meet Our Team — Igloo Himalaya Treks Pvt. Ltd. | Local Mountain Guides & Leaders</title>'
  );

  html = html.replace(
    /<meta name="description" content=".*?"/i,
    '<meta name="description" content="Meet our experienced trekking leaders and certified climbing guides at Igloo Himalaya Treks Pvt. Ltd., including Ramesh Karki (20 yrs experience, Dhading) and Sonam Tamang (NMA certified, Solukhumbu)."'
  );

  // Add Ramesh Karki and Sonam Tamang to the Senior Guides section
  // Let's insert them right at the start of .guide-card-grid
  const guideGridStart = '<div class="guide-card-grid">';
  const newGuideCards = `<div class="guide-card-grid">

          <!-- Guide: Ramesh Karki (From Google Sheet) -->
          <div class="guide-profile-card team-card-item guides">
            <div class="guide-img-box">
              <img src="images/licensed-trekking-guide-leading-foreign-trekkers-on-a-himalayan-trail-in-nepal.webp" alt="Ramesh Karki - Senior Trekking Leader">
              <span class="guide-region-tag" style="background: #1A96C8;">Dhading Native</span>
            </div>
            <div class="guide-card-body">
              <div>
                <div class="guide-name">Ramesh Karki</div>
                <div class="guide-role">Senior Trekking Leader</div>
                <div class="guide-info-list">
                  <strong>Origin:</strong> Dhading, Nepal<br>
                  <strong>Experience:</strong> 20 Years Guiding Trails<br>
                  <strong>Education:</strong> School Leaving Certificate (SLC)<br>
                  <strong>Languages:</strong> English, Nepali, Hindi
                </div>
              </div>
              <div class="guide-quote" style="margin-bottom: 12px;">"20 years on Nepal's trails have taught me that personal care, pacing, and local stories make the greatest journeys."</div>
              <div style="background: #f1f5f9; padding: 6px 12px; border-radius: 6px; font-size: 0.78rem; color: #0E3458; font-weight: 600; text-align: center;">Verified Trekking Leader • First Aid Trained</div>
            </div>
          </div>

          <!-- Guide: Sonam Tamang (From Google Sheet) -->
          <div class="guide-profile-card team-card-item guides climbing">
            <div class="guide-img-box">
              <img src="images/kamal-tamang-trekking-guide-in-nepal.webp" alt="Sonam Tamang - NMA Climbing Guide">
              <span class="guide-region-tag" style="background: #F6851F;">Solukhumbu Native</span>
            </div>
            <div class="guide-card-body">
              <div>
                <div class="guide-name">Sonam Tamang</div>
                <div class="guide-role">NMA Certified Climbing Guide</div>
                <div class="guide-info-list">
                  <strong>Origin:</strong> Solukhumbu (Everest Region)<br>
                  <strong>Experience:</strong> 15 Years Mountain Climbing<br>
                  <strong>Credentials:</strong> NMA Climbing Guide Cert • Grade 10<br>
                  <strong>Peaks Guided:</strong> Island Peak, Mera Peak, Ama Dablam, Lobuche East<br>
                  <strong>Languages:</strong> English, Nepali, Hindi
                </div>
              </div>
              <div class="guide-quote" style="margin-bottom: 12px;">"Safety on 6,000m peaks depends on technical rope precision, weather judgment, and calm high-altitude leadership."</div>
              <div style="background: #fef3c7; padding: 6px 12px; border-radius: 6px; font-size: 0.78rem; color: #b45309; font-weight: 600; text-align: center;">NMA Certified Climbing Guide • Solukhumbu</div>
            </div>
          </div>`;

  if (!html.includes('Ramesh Karki')) {
    html = html.replace(guideGridStart, newGuideCards);
  }

  // Add the 5 Pillars Education, Training & Skills Section (from Google Sheet Education field)
  const certSectionRegex = /<!-- 07\. CERTIFICATIONS & MANDATORY SAFETY BADGES -->[\s\S]*?<!-- 08\. GUIDE REQUEST & CTA BANNER -->/;
  const newCertSection = `<!-- 07. TEAM EDUCATION, TRAINING & SKILLS STANDARDS -->
    <section class="section-padding" style="background: #ffffff;">
      <div class="container">
        <div class="text-center" style="margin-bottom: 36px;">
          <span class="pill pill-alpine">Education & Practical Expertise</span>
          <h2 class="section-title">Team Qualifications & Professional Training</h2>
          <p style="color: #64748b; max-width: 680px; margin: 10px auto 0 auto;">Our guides combine formal education, accredited mountaineering certifications, and decades of high-altitude experience.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <span style="font-size: 1.8rem;">🏔️</span>
              <h4 style="font-size: 1.1rem; color: #0E3458; margin: 0;">Professional Trekking Knowledge</h4>
            </div>
            <p style="font-size: 0.88rem; color: #475569; line-height: 1.6; margin: 0;">
              Our trekking leaders bring up to 20 years of practical mountain guiding experience across Nepal's high trails. Team members have completed formal education including the School Leaving Certificate (SLC), combining trail mastery with sound decision-making.
            </p>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <span style="font-size: 1.8rem;">🧗</span>
              <h4 style="font-size: 1.1rem; color: #0E3458; margin: 0;">NMA Mountaineering Training</h4>
            </div>
            <p style="font-size: 0.88rem; color: #475569; line-height: 1.6; margin: 0;">
              Our climbing guides hold official Nepal Mountaineering Association (NMA) climbing guide certificates with up to 15 years of technical climbing experience on major peaks including Island Peak, Mera Peak, Lobuche East, and Ama Dablam.
            </p>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <span style="font-size: 1.8rem;">🩺</span>
              <h4 style="font-size: 1.1rem; color: #0E3458; margin: 0;">First Aid & Emergency Response</h4>
            </div>
            <p style="font-size: 0.88rem; color: #475569; line-height: 1.6; margin: 0;">
              Igloo Himalaya Treks equips every expedition leader with first-aid, CPR, and mountain emergency response skills. Daily pulse oximetry tracking and direct Kathmandu rescue dispatch safeguard our clients throughout their journeys.
            </p>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <span style="font-size: 1.8rem;">🙏</span>
              <h4 style="font-size: 1.1rem; color: #0E3458; margin: 0;">Nepalese Culture & Heritage Knowledge</h4>
            </div>
            <p style="font-size: 0.88rem; color: #475569; line-height: 1.6; margin: 0;">
              Born in native mountain districts like Solukhumbu, Dhading, Langtang, and Manaslu, our leaders provide travellers with rich insights into local Sherpa, Tamang, and Gurung customs, Buddhist monasteries, and traditional village life.
            </p>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <span style="font-size: 1.8rem;">🌐</span>
              <h4 style="font-size: 1.1rem; color: #0E3458; margin: 0;">Multilingual Communication Skills</h4>
            </div>
            <p style="font-size: 0.88rem; color: #475569; line-height: 1.6; margin: 0;">
              Our trekking and climbing leaders are fluent in English, Nepali, and Hindi, ensuring effortless communication with international adventurers, local teahouse families, national park authorities, and support crews.
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- 08. GUIDE REQUEST & CTA BANNER -->`;
  html = html.replace(certSectionRegex, newCertSection);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('✔ team.html updated.');
}

// ==========================================
// 4. UPDATE PRIVACY & TERMS
// ==========================================
function updateLegalPages() {
  ['privacy-policy.html', 'terms-and-conditions.html'].forEach((filename) => {
    const filePath = path.join(ROOT, filename);
    let html = fs.readFileSync(filePath, 'utf8');

    html = html.replace(
      /Office: Thamel, Kathmandu, Nepal/g,
      'Office: Aja Swan Marg, Geetanjali Chowk, Ward 16, Kathmandu, Nepal'
    );
    html = html.replace(
      /Head Office: Thamel, Kathmandu, Nepal/g,
      'Head Office: Aja Swan Marg, Geetanjali Chowk, Ward 16, Kathmandu, Nepal'
    );
    html = html.replace(
      /WhatsApp \/ Phone: \+977 980 000 0000/g,
      'WhatsApp / Phone: +977 9860843980'
    );

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✔ ${filename} updated.`);
  });
}

// Execute all updates
updateContact();
updateAbout();
updateTeam();
updateLegalPages();
console.log('🎉 All core pages successfully updated with Google Sheet information!');
