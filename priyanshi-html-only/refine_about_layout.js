const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Updated About Page CSS
const oldCssStart = '/* ==========================================================================\n   STANDALONE ABOUT EDITORIAL VIEW (#about)';
const oldCssEnd = '/* Responsive adjustments */';

const newAboutCss = `/* ==========================================================================
   STANDALONE ABOUT EDITORIAL VIEW (#about)
   ========================================================================== */
.about-page-editorial {
  background-color: #F4F1EA;
  color: #1A1A1A;
  width: 100%;
  margin: 0;
  padding: 120px 0 80px;
  box-sizing: border-box;
}

.about-page-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 5vw;
  box-sizing: border-box;
}

/* SECTION 1: Asymmetrical 2-Column Editorial Spread */
.about-editorial-section-1 {
  padding: 40px 0 75px;
}

.about-editorial-spread {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 4.5rem;
  align-items: start;
}

/* Left Column: Headline & Bio Narrative */
.about-spread-left {
  display: flex;
  flex-direction: column;
}

.about-editorial-overline {
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #B86B63;
  margin-bottom: 1.2rem;
}

.about-editorial-headline {
  font-family: 'Cinzel', 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.4rem, 4.2vw, 3.5rem);
  font-weight: 400;
  line-height: 1.18;
  color: #1A1A1A;
  margin: 0 0 2rem;
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
  gap: 1.3rem;
}

.about-editorial-bio {
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 1.05rem;
  line-height: 1.8;
  color: #2D2A26;
  margin: 0;
  font-weight: 350;
}

.about-editorial-bio strong {
  font-weight: 600;
  color: #1A1A1A;
}

/* Right Column: Technical & Practice Overview Panel */
.about-spread-right {
  position: sticky;
  top: 100px;
}

.about-practice-panel {
  background: rgba(184, 107, 99, 0.05);
  border: 1px solid #D0C7C5;
  border-left: 3px solid #B86B63;
  padding: 2.2rem 2.4rem;
  border-radius: 0 4px 4px 0;
  box-shadow: 0 12px 30px -10px rgba(26, 26, 26, 0.05);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.about-practice-panel:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 36px -10px rgba(184, 107, 99, 0.1);
}

.about-practice-panel-header {
  margin-bottom: 1.8rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E5E0D8;
}

.about-practice-panel-kicker {
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #B86B63;
  display: block;
  margin-bottom: 0.35rem;
}

.about-practice-panel-title {
  font-family: 'Cinzel', Georgia, serif;
  font-size: 1.35rem;
  font-weight: 500;
  color: #1A1A1A;
  margin: 0;
  line-height: 1.3;
}

.about-practice-list {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.about-practice-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.about-practice-item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.about-practice-item-title {
  font-family: 'Cinzel', Georgia, serif;
  font-size: 0.96rem;
  font-weight: 600;
  color: #1A1A1A;
  letter-spacing: 0.04em;
}

.about-practice-item-tag {
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #B86B63;
  font-weight: 600;
}

.about-practice-item-desc {
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 0.88rem;
  line-height: 1.6;
  color: #55504A;
  margin: 0;
}

.about-practice-panel-footer {
  margin-top: 1.8rem;
  padding-top: 1.2rem;
  border-top: 1px solid #E5E0D8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8C827A;
}

.about-practice-panel-footer span:last-child {
  color: #B86B63;
  font-weight: 600;
}

/* SECTION 2: Credentials Metadata Grid */
.about-editorial-section-2 {
  padding: 60px 0;
  border-top: 1px solid #D0C7C5;
  border-bottom: 1px solid #D0C7C5;
}

.about-credentials-header {
  margin-bottom: 2.5rem;
}

.about-credentials-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  border-top: 1px solid #E5E0D8;
  border-left: 1px solid #E5E0D8;
}

.about-credential-card {
  padding: 2.2rem 2.5rem;
  border-right: 1px solid #E5E0D8;
  border-bottom: 1px solid #E5E0D8;
  background: rgba(255, 255, 255, 0.35);
  display: flex;
  flex-direction: column;
  transition: background 0.3s ease;
}

.about-credential-card:hover {
  background: rgba(255, 255, 255, 0.7);
}

.about-credential-label {
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #B86B63;
  margin-bottom: 0.8rem;
}

.about-credential-title {
  font-family: 'Cinzel', 'Cormorant Garamond', Georgia, serif;
  font-size: 1.45rem;
  font-weight: 500;
  color: #1A1A1A;
  line-height: 1.3;
  margin: 0 0 0.5rem;
}

.about-credential-desc {
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #4A453E;
  margin: 0;
}

/* SECTION 3: Tools & Capabilities */
.about-editorial-section-3 {
  padding: 70px 0 30px;
}

.about-capabilities-header {
  margin-bottom: 3rem;
}

.about-capabilities-headline {
  font-family: 'Cinzel', 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.2rem, 3.8vw, 3rem);
  font-weight: 400;
  color: #1A1A1A;
  margin: 0.3rem 0 0;
}

.about-capabilities-groups {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.about-caps-subgroup {
  display: flex;
  flex-direction: column;
}

.about-caps-subgroup-title {
  font-family: 'Cinzel', Georgia, serif;
  font-size: 1.15rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1A1A1A;
  margin: 0 0 1.2rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid #D0C7C5;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.about-caps-subgroup-title span {
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 0.7rem;
  color: #B86B63;
  letter-spacing: 0.16em;
}

.about-tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.about-tag-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.55rem 1rem;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid #D0C7C5;
  border-radius: 2px;
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1A1A1A;
  transition: all 0.25s ease;
}

.about-tag-badge:hover {
  background: #FAF8F5;
  border-color: #B86B63;
  color: #B86B63;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(184, 107, 99, 0.12);
}

.about-tag-badge.featured {
  border-color: #C49A87;
  background: rgba(184, 107, 99, 0.08);
}

/* Entrance animation classes */
.about-anim-fade-up {
  opacity: 1;
  transition: opacity 0.8s ease, transform 0.8s ease;
}
`;

// Replace CSS in <style>
const sIdx = html.indexOf(oldCssStart);
const eIdx = html.indexOf(oldCssEnd);
if (sIdx !== -1 && eIdx !== -1) {
  html = html.slice(0, sIdx) + newAboutCss + '\n' + html.slice(eIdx);
  console.log('CSS replaced successfully');
} else {
  console.log('Could not find CSS slice markers');
}

// 2. Updated function about() with asymmetrical 2-column layout and Practice Overview Panel
const newAboutFunction = `function about() {
  return \`
  <article class="about-page-editorial" aria-label="About Priyanshi Mathur">
    <div class="about-page-container">
      
      <!-- SECTION 1: Asymmetrical 2-Column Editorial Spread -->
      <section class="about-editorial-section-1 about-anim-section" aria-label="Design Philosophy and Practice Overview">
        <div class="about-editorial-spread">
          
          <!-- Left Column: Main Headline & Professional Bio -->
          <div class="about-spread-left">
            <div class="about-editorial-overline">01 — PHILOSOPHY &amp; BACKGROUND</div>
            
            <h1 class="about-editorial-headline">
              Design is more than a room. It is the experience of <em>being in it.</em>
            </h1>
            
            <div class="about-bio-paragraphs">
              <p class="about-editorial-bio">
                Priyanshi Mathur is an interior designer and 3D visualizer committed to creating intentional, harmonious spatial environments. Her multidisciplinary design methodology bridges a Bachelor's in Business Administration from Indira Gandhi National Open University (IGNOU, 2022) with advanced professional credentials from Capital Education, Dubai, where she earned an Advanced Diploma in Interior Design.
              </p>
              <p class="about-editorial-bio">
                Her academic and studio projects synthesize technical drafting, descriptive geometry, building systems, and sustainable material curation. With over two years of focused architectural visualization experience collaborating on high-end residential layouts, hospitality concepts, and commercial spaces, she transforms abstract conceptual intentions into buildable, atmospheric architectural realities.
              </p>
              <p class="about-editorial-bio">
                Driven by curiosity and spatial empathy, her practice balances functional efficiency with understated luxury—ensuring every interior is rooted in authentic materials, balanced natural illumination, and human comfort.
              </p>
            </div>
          </div>

          <!-- Right Column: Technical & Practice Overview Panel -->
          <aside class="about-spread-right" aria-label="Technical and Practice Overview">
            <div class="about-practice-panel">
              
              <div class="about-practice-panel-header">
                <span class="about-practice-panel-kicker">STUDIO DISCIPLINES</span>
                <h2 class="about-practice-panel-title">Practice &amp; Technical Focus</h2>
              </div>

              <div class="about-practice-list">
                
                <!-- Practice 1: Spatial Planning -->
                <div class="about-practice-item">
                  <div class="about-practice-item-header">
                    <span class="about-practice-item-title">Spatial Planning</span>
                    <span class="about-practice-item-tag">CORE DISCIPLINE</span>
                  </div>
                  <p class="about-practice-item-desc">
                    Ergonomic space allocation, circulation flow optimization, technical AutoCAD floor plans, and functional partition layouts.
                  </p>
                </div>

                <!-- Practice 2: Sustainable Design -->
                <div class="about-practice-item">
                  <div class="about-practice-item-header">
                    <span class="about-practice-item-title">Sustainable Design</span>
                    <span class="about-practice-item-tag">METHODOLOGY</span>
                  </div>
                  <p class="about-practice-item-desc">
                    Eco-conscious material specification, natural daylight harvesting, low-VOC finishes, and energy-responsive interior systems.
                  </p>
                </div>

                <!-- Practice 3: Architectural 3D CGI -->
                <div class="about-practice-item">
                  <div class="about-practice-item-header">
                    <span class="about-practice-item-title">Areas of Practice</span>
                    <span class="about-practice-item-tag">EXPERTISE</span>
                  </div>
                  <p class="about-practice-item-desc">
                    Photorealistic CGI rendering, custom joinery detailing, physical mood boards, lighting design, and comprehensive interior construction documentation.
                  </p>
                </div>

              </div>

              <div class="about-practice-panel-footer">
                <span>PRACTICE MATRIX</span>
                <span>DUBAI &amp; GLOBAL</span>
              </div>

            </div>
          </aside>

        </div>
      </section>

      <!-- SECTION 2: Credentials Metadata Grid -->
      <section class="about-editorial-section-2 about-anim-section" aria-label="Academic Foundations and Credentials">
        <div class="about-credentials-header">
          <div class="about-editorial-overline">02 — CREDENTIALS &amp; FOUNDATIONS</div>
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
          <div class="about-editorial-overline">CAPABILITIES</div>
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
  console.log('function about() replaced successfully');
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
