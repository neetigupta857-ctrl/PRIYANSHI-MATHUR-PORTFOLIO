const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Updated Monograph CSS for Section 1 (No boxy cards, true print monograph layout)
const oldCssStart = '/* ==========================================================================\n   STANDALONE ABOUT EDITORIAL VIEW (#about)';
const oldCssEnd = '/* SECTION 2: Credentials Metadata Grid */';

const newMonographCss = `/* ==========================================================================
   STANDALONE ABOUT EDITORIAL VIEW (#about) — ASYMMETRIC PRINT MONOGRAPH
   ========================================================================== */
.about-page-editorial {
  background-color: #F4F1EA;
  color: #1A1A1A;
  width: 100%;
  margin: 0;
  padding: 130px 0 90px;
  box-sizing: border-box;
}

.about-page-container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 5vw;
  box-sizing: border-box;
}

/* SECTION 1: Pure Editorial Monograph Spread */
.about-editorial-section-1 {
  padding: 30px 0 85px;
}

.about-monograph-spread {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 5.5rem;
  align-items: start;
}

/* Left Editorial Narrative Column */
.about-monograph-left {
  display: flex;
  flex-direction: column;
}

.about-editorial-kicker-line {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 1.6rem;
}

.about-editorial-overline {
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #B86B63;
  margin: 0;
  white-space: nowrap;
}

.about-editorial-hairline {
  flex: 1;
  height: 1px;
  background: #D0C7C5;
}

.about-editorial-headline {
  font-family: 'Cinzel', 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.4rem, 4.4vw, 3.6rem);
  font-weight: 400;
  line-height: 1.15;
  color: #1A1A1A;
  margin: 0 0 2.2rem;
  letter-spacing: -0.02em;
}

.about-editorial-headline em {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 400;
  color: #B86B63;
}

.about-bio-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about-editorial-bio {
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 1.05rem;
  line-height: 1.85;
  color: #2D2A26;
  margin: 0;
  font-weight: 350;
}

.about-editorial-bio strong {
  font-weight: 600;
  color: #1A1A1A;
}

/* Right Column: Disciplines Stream with Fine Hairline Rules */
.about-monograph-right {
  display: flex;
  flex-direction: column;
  padding-top: 0.6rem;
}

.about-disciplines-stream-header {
  margin-bottom: 2rem;
}

.about-disciplines-stream-title {
  font-family: 'Cinzel', Georgia, serif;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1A1A1A;
  margin: 0 0 0.4rem;
}

.about-disciplines-stream-sub {
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #8C827A;
}

.about-disciplines-stream {
  display: flex;
  flex-direction: column;
}

.about-stream-entry {
  padding: 1.8rem 0;
  border-top: 1px solid #D0C7C5;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: padding-left 0.3s ease;
}

.about-stream-entry:last-child {
  border-bottom: 1px solid #D0C7C5;
}

.about-stream-entry:hover {
  padding-left: 0.4rem;
}

.about-stream-entry-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.about-stream-entry-index {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-style: italic;
  color: #B86B63;
  margin-right: 0.6rem;
}

.about-stream-entry-name {
  font-family: 'Cinzel', Georgia, serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: #1A1A1A;
  letter-spacing: 0.04em;
}

.about-stream-entry-tag {
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #B86B63;
  font-weight: 600;
}

.about-stream-entry-desc {
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 0.9rem;
  line-height: 1.65;
  color: #55504A;
  margin: 0;
}

/* Responsive adjustments for Monograph */
@media (max-width: 960px) {
  .about-monograph-spread {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
}
`;

// Replace CSS
const sIdx = html.indexOf(oldCssStart);
const eIdx = html.indexOf(oldCssEnd);
if (sIdx !== -1 && eIdx !== -1) {
  html = html.slice(0, sIdx) + newMonographCss + '\n' + html.slice(eIdx);
  console.log('Monograph CSS replaced successfully');
} else {
  console.log('Could not find CSS slice markers');
}

// 2. Updated function about() with True Asymmetric Monograph Layout
const newAboutFunction = `function about() {
  return \`
  <article class="about-page-editorial" aria-label="About Priyanshi Mathur">
    <div class="about-page-container">
      
      <!-- SECTION 1: True Asymmetric Monograph Spread -->
      <section class="about-editorial-section-1 about-anim-section" aria-label="Philosophy and Practice Overview">
        <div class="about-monograph-spread">
          
          <!-- Left Column: Main Headline & Professional Bio -->
          <div class="about-monograph-left">
            <div class="about-editorial-kicker-line">
              <span class="about-editorial-overline">01 — PHILOSOPHY &amp; PRACTICE</span>
              <span class="about-editorial-hairline"></span>
            </div>
            
            <h1 class="about-editorial-headline">
              Design is more than a room. It is the experience of <em>being in it.</em>
            </h1>
            
            <div class="about-bio-paragraphs">
              <p class="about-editorial-bio">
                Priyanshi Mathur is an interior designer and 3D visualizer committed to creating intentional, harmonious spatial environments. Her multidisciplinary practice bridges a Bachelor's in Business Administration from Indira Gandhi National Open University (IGNOU, 2022) with advanced professional credentials from Capital Education, Dubai, where she completed an intensive Advanced Diploma in Interior Design.
              </p>
              <p class="about-editorial-bio">
                Her academic assignments and studio coursework encompass descriptive geometry, construction detailing, building systems, AutoCAD spatial planning, and sustainable material specification. With over two years of focused architectural 3D visualization experience collaborating on luxury residential layouts, grand hospitality venues, and architectural pavilions, she translates conceptual design briefs into buildable, atmospheric environments.
              </p>
              <p class="about-editorial-bio">
                Guided by curiosity and spatial empathy, her practice prioritizes human proportion, natural light modulation, and tactile material integrity over transient ornamentation.
              </p>
            </div>
          </div>

          <!-- Right Column: Clean Inline Editorial Text Entries with 1px Hairlines -->
          <aside class="about-monograph-right" aria-label="Core Practice Disciplines">
            
            <div class="about-disciplines-stream-header">
              <h2 class="about-disciplines-stream-title">Areas of Practice</h2>
              <span class="about-disciplines-stream-sub">Technical Drafting &amp; Spatial Systems</span>
            </div>

            <div class="about-disciplines-stream">
              
              <!-- Discipline 1: Spatial Planning -->
              <article class="about-stream-entry">
                <div class="about-stream-entry-meta">
                  <div>
                    <span class="about-stream-entry-index">01.</span>
                    <span class="about-stream-entry-name">Spatial Planning</span>
                  </div>
                  <span class="about-stream-entry-tag">Core Discipline</span>
                </div>
                <p class="about-stream-entry-desc">
                  Ergonomic space allocation, circulation flow optimization, technical AutoCAD drafting, and functional partition layouts.
                </p>
              </article>

              <!-- Discipline 2: Atmospheric 3D Visualization -->
              <article class="about-stream-entry">
                <div class="about-stream-entry-meta">
                  <div>
                    <span class="about-stream-entry-index">02.</span>
                    <span class="about-stream-entry-name">Atmospheric 3D Visualization</span>
                  </div>
                  <span class="about-stream-entry-tag">Digital Craft</span>
                </div>
                <p class="about-stream-entry-desc">
                  Photorealistic CGI rendering, nuanced lighting studies, materiality mapping, and spatial storytelling in 3ds Max and Corona.
                </p>
              </article>

              <!-- Discipline 3: Sustainable Design -->
              <article class="about-stream-entry">
                <div class="about-stream-entry-meta">
                  <div>
                    <span class="about-stream-entry-index">03.</span>
                    <span class="about-stream-entry-name">Sustainable Design</span>
                  </div>
                  <span class="about-stream-entry-tag">Methodology</span>
                </div>
                <p class="about-stream-entry-desc">
                  Eco-conscious material specification, natural daylight harvesting, low-VOC finishes, and energy-responsive interior systems.
                </p>
              </article>

            </div>

          </aside>

        </div>
      </section>

      <!-- SECTION 2: Credentials Metadata Grid -->
      <section class="about-editorial-section-2 about-anim-section" aria-label="Academic Foundations and Credentials">
        <div class="about-credentials-header">
          <div class="about-editorial-kicker-line">
            <span class="about-editorial-overline">02 — CREDENTIALS &amp; FOUNDATIONS</span>
            <span class="about-editorial-hairline"></span>
          </div>
          <h2 class="about-editorial-headline" style="font-size: clamp(2rem, 3.5vw, 2.8rem); margin-bottom: 0;">
            Academic foundations &amp; qualifications.
          </h2>
        </div>

        <div class="about-credentials-grid">
          <!-- Item 1: Education -->
          <div class="about-credential-card">
            <span class="about-credential-label">EDUCATION</span>
            <h3 class="about-credential-title">Capital Education, Dubai &amp; IGNOU</h3>
            <p class="about-credential-desc">Advanced Diploma in Interior Design (Capital Education, Dubai) and Bachelor of Business Administration (IGNOU, 2022).</p>
          </div>

          <!-- Item 2: Degree -->
          <div class="about-credential-card">
            <span class="about-credential-label">DEGREE &amp; DIPLOMA</span>
            <h3 class="about-credential-title">BBA (2022) &amp; Adv. Diploma</h3>
            <p class="about-credential-desc">Specialized interior curriculum covering technical drafting, spatial analysis, building systems, and sustainable materials.</p>
          </div>

          <!-- Item 3: Background -->
          <div class="about-credential-card">
            <span class="about-credential-label">BACKGROUND</span>
            <h3 class="about-credential-title">Architectural 3D Visualisation</h3>
            <p class="about-credential-desc">2+ years of architectural visualization studio experience producing CGI renders, lighting studies, and immersive walkthroughs.</p>
          </div>

          <!-- Item 4: Focus -->
          <div class="about-credential-card">
            <span class="about-credential-label">FOCUS</span>
            <h3 class="about-credential-title">Spatial Planning &amp; Interior Design</h3>
            <p class="about-credential-desc">Space planning, construction detailing, AutoCAD drafting, joinery specifications, and photorealistic spatial presentation.</p>
          </div>
        </div>
      </section>

      <!-- SECTION 3: Tools & Capabilities -->
      <section class="about-editorial-section-3 about-anim-section" aria-label="Capabilities, Software and Disciplines">
        <div class="about-capabilities-header">
          <div class="about-editorial-kicker-line">
            <span class="about-editorial-overline">03 — CAPABILITIES</span>
            <span class="about-editorial-hairline"></span>
          </div>
          <h2 class="about-capabilities-headline">Tools &amp; Skills</h2>
        </div>

        <div class="about-capabilities-groups">
          
          <!-- Software Stack -->
          <div class="about-caps-subgroup">
            <h3 class="about-caps-subgroup-title">
              Software Stack
              <span>DIGITAL TOOLS</span>
            </h3>
            <div class="about-tags-cloud">
              <span class="about-tag-badge featured">AutoCAD</span>
              <span class="about-tag-badge featured">3ds Max</span>
              <span class="about-tag-badge featured">Autodesk Maya</span>
              <span class="about-tag-badge">Adobe Photoshop</span>
              <span class="about-tag-badge">Illustrator</span>
              <span class="about-tag-badge">Premiere Pro</span>
              <span class="about-tag-badge">CorelDRAW</span>
            </div>
          </div>

          <!-- Core Disciplines -->
          <div class="about-caps-subgroup">
            <h3 class="about-caps-subgroup-title">
              Core Disciplines
              <span>AREAS OF PRACTICE</span>
            </h3>
            <div class="about-tags-cloud">
              <span class="about-tag-badge featured">Space Planning</span>
              <span class="about-tag-badge featured">Sustainable Design</span>
              <span class="about-tag-badge">Technical Drafting</span>
              <span class="about-tag-badge">Photorealistic Rendering</span>
              <span class="about-tag-badge">Interior Design Concepts</span>
              <span class="about-tag-badge">Joinery Detailing</span>
              <span class="about-tag-badge">Mood Boards &amp; Materiality</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  </article>\`;
}`;

// Replace function about()
const funcStart = html.indexOf('function about()');
const funcEnd = html.indexOf('function indexPage(key)');
if (funcStart !== -1 && funcEnd !== -1) {
  html = html.slice(0, funcStart) + newAboutFunction + '\n' + html.slice(funcEnd);
  console.log('function about() replaced successfully with Monograph spread');
} else {
  console.log('Could not find function about() bounds');
}

fs.writeFileSync(targetPath, html, 'utf8');
console.log('File written to', targetPath);

// Sync to secondary path if present
const ePath = 'e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html';
if (fs.existsSync(ePath)) {
  fs.writeFileSync(ePath, html, 'utf8');
  console.log('Synchronized to', ePath);
}
