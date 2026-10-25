const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Add hidden styles and About Page styles
const aboutCss = `
.pdf-cover[hidden], .split-slide-section[hidden], .about-intro-section[hidden], .contact-slide-section[hidden] {
  display: none !important;
}

/* ==========================================================================
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

/* SECTION 1: Bio & Visual Split */
.about-editorial-section-1 {
  padding: 40px 0 70px;
}

.about-bio-split-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 5rem;
  align-items: center;
}

.about-split-visual-col {
  position: relative;
  width: 100%;
}

.about-editorial-frame {
  position: relative;
  border: 1px solid #D0C7C5;
  background: #EAE6DE;
  padding: 12px;
  box-shadow: 0 16px 40px -12px rgba(26, 26, 26, 0.08);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease;
}

.about-editorial-frame:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 50px -12px rgba(26, 26, 26, 0.12);
}

.about-editorial-img {
  width: 100%;
  height: auto;
  aspect-ratio: 4/5;
  object-fit: cover;
  display: block;
  filter: contrast(1.02) brightness(0.98);
}

.about-frame-caption {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #8C827A;
}

.about-split-bio-col {
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
  margin-bottom: 1rem;
}

.about-editorial-headline {
  font-family: 'Cinzel', 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.4rem, 4.4vw, 3.6rem);
  font-weight: 400;
  line-height: 1.16;
  color: #1A1A1A;
  margin: 0 0 1.8rem;
  letter-spacing: -0.02em;
}

.about-editorial-headline em {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 400;
  color: #B86B63;
}

.about-editorial-bio {
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 1.05rem;
  line-height: 1.8;
  color: #2D2A26;
  margin: 0 0 1.3rem;
  font-weight: 350;
}

.about-editorial-bio strong {
  font-weight: 600;
  color: #1A1A1A;
}

/* High-end Pull-Quote */
.about-pull-quote {
  position: relative;
  margin: 1.6rem 0 0.5rem;
  padding: 1.4rem 1.6rem 1.4rem 1.8rem;
  border-left: 3px solid #B86B63;
  background: rgba(184, 107, 99, 0.05);
  border-radius: 0 6px 6px 0;
}

.about-pull-quote-text {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.22rem, 1.8vw, 1.42rem);
  font-style: italic;
  font-weight: 400;
  line-height: 1.5;
  color: #1A1A1A;
  margin: 0;
}

.about-pull-quote-author {
  display: block;
  margin-top: 0.6rem;
  font-family: var(--site-font-body), -apple-system, sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
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

/* Responsive adjustments */
@media (max-width: 960px) {
  .about-bio-split-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .about-split-visual-col {
    max-width: 520px;
    margin: 0 auto;
  }
  .about-credentials-grid {
    grid-template-columns: 1fr;
  }
  .about-capabilities-groups {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 600px) {
  .about-page-editorial {
    padding-top: 95px;
  }
  .about-credential-card {
    padding: 1.5rem;
  }
}
`;

if (!html.includes('.about-page-editorial')) {
  html = html.replace('</style>', aboutCss + '\n</style>');
}

// 2. Add GSAP & ScrollTrigger CDN if not loaded
if (!html.includes('cdnjs.cloudflare.com/ajax/libs/gsap')) {
  const gsapCdn = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
`;
  html = html.replace('</head>', gsapCdn + '</head>');
}

// 3. Replace function about()
const newAboutFunction = `function about() {
  return \`
  <article class="about-page-editorial" aria-label="About Priyanshi Mathur">
    <div class="about-page-container">
      
      <!-- SECTION 1: Bio & Visual Split -->
      <section class="about-editorial-section-1 about-anim-section" aria-label="Bio and Design Philosophy">
        <div class="about-bio-split-grid">
          
          <!-- Left: Architectural Detail / Material Flatlay -->
          <div class="about-split-visual-col">
            <div class="about-editorial-frame">
              <img src="material_flatlay.jpg" alt="Architectural Material Flatlay — Finishes, Textiles and Spatial Textures" class="about-editorial-img" loading="eager">
              <div class="about-frame-caption">
                <span>FIG. 01 / SPATIAL TACTILITY</span>
                <span>MATERIAL STUDY</span>
              </div>
            </div>
          </div>

          <!-- Right: Headline, Bio Text & Pull-Quote -->
          <div class="about-split-bio-col">
            <div class="about-editorial-overline">01 — THE DESIGNER &amp; PHILOSOPHY</div>
            <h1 class="about-editorial-headline">
              A practice built on <em>curiosity,</em> precision and spatial empathy.
            </h1>
            
            <p class="about-editorial-bio">
              Priyanshi Mathur is an interior designer and 3D visualizer committed to crafting atmospheres that resonate on both emotional and functional levels. Bridging academic rigor in business management with comprehensive interior architecture training from Capital Education, Dubai, her work synthesizes space planning, light modulation, and authentic material selection.
            </p>
            <p class="about-editorial-bio">
              With over two years of hands-on practice collaborating alongside architectural studios on high-end residential, hospitality, and pavilion concepts, she brings concepts from initial conceptual sketches to photorealistic 3D visualization and precise construction detailing.
            </p>

            <!-- High-End Pull-Quote with Accent Vertical Border -->
            <blockquote class="about-pull-quote">
              <p class="about-pull-quote-text">
                “Design is not just about creating spaces — it is about creating experiences that inspire, connect, and leave a lasting impression.”
              </p>
              <cite class="about-pull-quote-author">Priyanshi Mathur — Design Manifesto</cite>
            </blockquote>
          </div>

        </div>
      </section>

      <!-- SECTION 2: Credentials Metadata Grid -->
      <section class="about-editorial-section-2 about-anim-section" aria-label="Professional Credentials and Background">
        <div class="about-credentials-header">
          <div class="about-editorial-overline">02 — BACKGROUND &amp; QUALIFICATIONS</div>
          <h2 class="about-editorial-headline" style="font-size: clamp(2rem, 3.5vw, 2.8rem); margin-bottom: 0;">
            Academic foundations &amp; professional focus.
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
const oldAboutRegex = /function about\(\)\{[\s\S]*?<\/section>`\}/;
if (oldAboutRegex.test(html)) {
  html = html.replace(oldAboutRegex, newAboutFunction);
  console.log('function about() successfully replaced');
} else {
  console.log('oldAboutRegex did not match directly, searching for function about()...');
  const startIdx = html.indexOf('function about(){');
  if (startIdx !== -1) {
    const endIdx = html.indexOf('function indexPage(key)', startIdx);
    if (endIdx !== -1) {
      html = html.slice(0, startIdx) + newAboutFunction + '\n' + html.slice(endIdx);
      console.log('function about() successfully sliced & replaced');
    }
  }
}

// 4. Update function render() to hide slides and trigger GSAP animations
const oldRenderStart = 'function render(){let hash=location.hash.slice(1)||"home";';
const newRenderCode = `function initAboutAnimations() {
  if (typeof gsap !== "undefined") {
    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    const sections = document.querySelectorAll(".about-anim-section");
    sections.forEach((sec, idx) => {
      gsap.fromTo(sec, 
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: typeof ScrollTrigger !== "undefined" ? {
            trigger: sec,
            start: "top 85%",
            toggleActions: "play none none none"
          } : undefined
        }
      );
    });

    const badges = document.querySelectorAll(".about-tag-badge");
    if (badges.length > 0) {
      gsap.fromTo(badges,
        { opacity: 0, scale: 0.95, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: typeof ScrollTrigger !== "undefined" ? {
            trigger: ".about-editorial-section-3",
            start: "top 80%",
            toggleActions: "play none none none"
          } : undefined
        }
      );
    }
  }
}

function render(){let hash=location.hash.slice(1)||"home";let [page,id]=hash.split("/");if(page==="visualization")page="visualisation";let view=document.getElementById("view");let footer=document.getElementById("siteFooter");const isHome=page==="home";["pdfCover","aboutTeaser","aboutIntroSection","contactSlideSection"].forEach(sId=>{const el=document.getElementById(sId);if(el)el.hidden=!isHome;});if(footer)footer.hidden=isHome;view.hidden=isHome;if(page==="project"){view.innerHTML=casePage(id)}else if(page==="about"){view.innerHTML=about();setTimeout(initAboutAnimations, 50);}else if(page==="visualisation"||page==="interior")view.innerHTML=indexPage(page);else if(page==="contact")view.innerHTML=contact();else if(page==="portfolio")view.innerHTML=portfolio();else view.innerHTML=home();`;

if (html.includes(oldRenderStart)) {
  const renderEndIdx = html.indexOf('document.querySelectorAll(".nav a[data-page]")', html.indexOf(oldRenderStart));
  const oldRenderHeader = html.slice(html.indexOf(oldRenderStart), renderEndIdx);
  html = html.replace(oldRenderHeader, newRenderCode);
  console.log('render() successfully updated with slide hiding & GSAP animations');
}

fs.writeFileSync(targetPath, html, 'utf8');
console.log('File successfully written to', targetPath);
