const fs = require('fs');
const path = require('path');

let s = fs.readFileSync('index.html', 'utf8');

// 1. UPDATE CSS FOR TOPBAR ACTIONS & HAMBURGER (remove white square / border, set side-by-side gap: 20px)
const oldTopbarActionsCss = `.topbar-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.topbar-download-btn {
  border: 1px solid #555555;
  background: transparent;
  color: #222222;
  font-family: var(--site-font-body);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 500;
  padding: 0.65rem 1.25rem;
  text-decoration: none;
  box-shadow: none;
  border-radius: 0;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.topbar-download-btn:hover {
  background: #222222;
  color: #F4F1EA;
  border-color: #222222;
  transform: none;
  box-shadow: none;
}
.menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.08);
  width: 48px;
  height: 48px;
  padding: 0;
  cursor: pointer;
  z-index: 1001;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
  transition: background 0.25s ease;
}
.menu-btn:hover {
  background: #F4F1EA;
}`;

const newTopbarActionsCss = `.topbar-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}
.topbar-download-btn {
  border: 1px solid #555555;
  background: transparent;
  color: #222222;
  font-family: var(--site-font-body);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 500;
  padding: 0.65rem 1.25rem;
  text-decoration: none;
  box-shadow: none;
  border-radius: 0;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.topbar-download-btn:hover {
  background: #222222;
  color: #F4F1EA;
  border-color: #222222;
  transform: none;
  box-shadow: none;
}
.menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  width: auto;
  height: auto;
  padding: 8px 4px;
  cursor: pointer;
  z-index: 1001;
  position: relative;
  box-shadow: none;
  transition: opacity 0.25s ease;
}
.menu-btn:hover {
  background: transparent;
  opacity: 0.75;
}`;

if (s.includes(oldTopbarActionsCss)) {
  s = s.replace(oldTopbarActionsCss, newTopbarActionsCss);
  console.log('1. Updated topbar actions & menu-btn CSS successfully.');
} else {
  console.error('1. Could not find exact oldTopbarActionsCss.');
}

// 2. UPDATE TOPBAR HTML: Name on left, hide nav links, right side download button + hamburger
const oldHeaderHtml = `<header class="topbar">
  <a class="brand-block" href="#home" aria-label="Priyanshi Mathur home">
    <span class="brand-line-1">PRIYANSHI MATHUR</span>
    <span class="brand-line-2">INTERIOR · VISUALISATION</span>
    <span class="brand-line-3">LONDON COLLEGE OF ARTS</span>
  </a>
  <nav class="nav" id="nav" aria-label="Main navigation">
    <a href="#home" data-page="home" class="nav-link-home">HOME</a>
    <a href="#about" data-page="about">ABOUT</a>
    <a href="#visualisation" data-page="visualisation">3D VISUALISATION</a>
    <a href="#interior-design" data-page="interior-design">INTERIOR DESIGN</a>
    <a href="#contact" data-page="contact">CONTACT</a>
    <a href="#portfolio" class="download" data-page="portfolio">DOWNLOAD PORTFOLIO &gt;</a>
  </nav>
  <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-label="Toggle Navigation Menu">
    <div class="menu-btn-burger">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </button>
</header>`;

const newHeaderHtml = `<header class="topbar">
  <a class="brand-block" href="#home" aria-label="Priyanshi Mathur home">
    <span class="brand-line-1">PRIYANSHI MATHUR</span>
    <span class="brand-line-2">INTERIOR · VISUALISATION</span>
    <span class="brand-line-3">LONDON COLLEGE OF ARTS</span>
  </a>
  <div class="topbar-actions">
    <a href="#portfolio" class="topbar-download-btn" data-page="portfolio">DOWNLOAD PORTFOLIO &gt;</a>
    <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-label="Toggle Navigation Menu">
      <div class="menu-btn-burger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  </div>
</header>`;

if (s.includes(oldHeaderHtml)) {
  s = s.replace(oldHeaderHtml, newHeaderHtml);
  console.log('2. Updated topbar HTML markup successfully.');
} else {
  console.error('2. Could not find exact oldHeaderHtml.');
}

// 3. UPDATE HERO CSS (full-bleed, radial-gradient text protection, refined glass button)
const heroCssStart = s.indexOf('.hero-editorial-frame {');
const heroCssEnd = s.indexOf('/* SLIDE 2: 50/50 Dual-Panel Split Section */');

if (heroCssStart !== -1 && heroCssEnd > heroCssStart) {
  const newHeroCss = `.hero-editorial-frame {
  margin: 0;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  position: relative;
  background: #0A0E0D;
  border-radius: 0;
  overflow: hidden;
  box-sizing: border-box;
}
.hero-luxury[hidden] {
  display: none !important;
}

.hero-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  z-index: 1;
  transform: scale(1.03);
  transition: transform 12s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform;
}

/* Very soft localized radial text-protection shadow behind center typography */
.hero-editorial-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 46% 52%, rgba(12, 20, 18, 0.42) 0%, rgba(12, 20, 18, 0.15) 45%, transparent 75%);
  z-index: 2;
  pointer-events: none;
}

.hero-content-panel {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  padding-left: clamp(3rem, 7vw, 7rem);
  padding-right: 2rem;
  box-sizing: border-box;
}

.hero-kicker-row {
  display: flex;
  align-items: center;
  margin-bottom: 1.15rem;
}

.hero-overline {
  font-family: var(--site-font-body);
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  color: #d8ccb8;
  font-weight: 500;
  text-transform: uppercase;
}

.hero-title {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-title-line {
  display: block;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 400;
  font-size: clamp(3.5rem, 6.2vw, 5.8rem);
  line-height: 0.96;
  letter-spacing: 0.03em;
  color: #f7f4ef;
}

.hero-subtitle {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.2rem, 3.6vw, 3.2rem);
  font-style: italic;
  font-weight: 400;
  color: #c9a96e;
  line-height: 1.1;
  margin-top: 0.25rem;
  margin-bottom: 2.2rem;
}

.hero-action {
  margin-top: 0;
}

/* Refined architectural glass finish button */
.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 32px;
  background: rgba(15, 24, 21, 0.35);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  letter-spacing: 0.2em;
  font-size: 0.72rem;
  font-family: var(--site-font-body);
  font-weight: 500;
  text-transform: uppercase;
  color: #F5F2EB;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 0;
}

.hero-btn-arrow {
  display: inline-block;
  transition: transform 0.3s ease;
}

.hero-btn:hover {
  background: rgba(25, 38, 34, 0.55);
  border-color: rgba(255, 255, 255, 0.85);
  color: #FFFFFF;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  transform: translateY(-2px);
}

.hero-btn:hover .hero-btn-arrow {
  transform: translateX(4px);
}

@media (max-width: 900px) {
  .hero-editorial-frame {
    margin: 0;
    width: 100%;
    height: 100vh;
    height: 100dvh;
    border-radius: 0;
  }
  .hero-content-panel {
    padding-left: clamp(1.5rem, 5vw, 3rem);
    padding-right: 1.5rem;
  }
}

`;

  s = s.substring(0, heroCssStart) + newHeroCss + s.substring(heroCssEnd);
  console.log('3. Updated hero CSS rules successfully.');
} else {
  console.error('3. Could not locate heroCss range.');
}

// 4. UPDATE HERO SECTION HTML (remove gold hairline before kicker, remove meta caption, keep original cover & text placement)
const oldHeroHtml = `<section id="pdfCover" class="pdf-cover hero-luxury hero-editorial-frame" aria-label="Interior Design Portfolio">
  <img src="pdf_cover_page.jpg" alt="Interior Architecture and Design Concept" class="hero-bg-img" loading="eager" fetchpriority="high">
  <div class="hero-editorial-overlay" aria-hidden="true"></div>
  <div class="hero-content-panel">
    <div class="hero-kicker-row">
      <span class="hero-hairline" aria-hidden="true"></span>
      <span class="hero-overline">INTERIOR ARCHITECTURE &amp; 3D VISUALISATION</span>
    </div>
    <h1 class="hero-title">
      <span class="hero-title-line">INTERIOR</span>
      <span class="hero-title-line">DESIGN</span>
    </h1>
    <div class="hero-subtitle">Portfolio</div>
    <div class="hero-action">
      <a href="#visualisation" class="hero-btn" data-page="visualisation" aria-label="Explore selected works">
        <span>EXPLORE SELECTED WORKS</span>
        <span class="hero-btn-arrow" aria-hidden="true">→</span>
      </a>
    </div>
  </div>
  <div class="hero-meta-caption" aria-hidden="true">SELECTED WORKS · 2024 — 2026</div>
</section>`;

const newHeroHtml = `<section id="pdfCover" class="pdf-cover hero-luxury hero-editorial-frame" aria-label="Interior Design Portfolio">
  <img src="pdf_cover_page.jpg" alt="Interior Architecture and Design Concept" class="hero-bg-img" loading="eager" fetchpriority="high">
  <div class="hero-editorial-overlay" aria-hidden="true"></div>
  <div class="hero-content-panel">
    <div class="hero-kicker-row">
      <span class="hero-overline">INTERIOR ARCHITECTURE &amp; 3D VISUALISATION</span>
    </div>
    <h1 class="hero-title">
      <span class="hero-title-line">INTERIOR</span>
      <span class="hero-title-line">DESIGN</span>
    </h1>
    <div class="hero-subtitle">Portfolio</div>
    <div class="hero-action">
      <a href="#visualisation" class="hero-btn" data-page="visualisation" aria-label="Explore selected works">
        <span>EXPLORE SELECTED WORKS</span>
        <span class="hero-btn-arrow" aria-hidden="true">→</span>
      </a>
    </div>
  </div>
</section>`;

if (s.includes(oldHeroHtml)) {
  s = s.replace(oldHeroHtml, newHeroHtml);
  console.log('4. Updated hero section HTML markup successfully.');
} else {
  console.error('4. Could not find exact oldHeroHtml.');
}

// Write to index.html
fs.writeFileSync('index.html', s, 'utf8');
console.log('Successfully wrote index.html in current workspace.');

// Sync to destination path
const destPath = 'E:\\projects\\priyanshi mathur portfolio\\PORTFOLIO 2\\PORTFOLIO\\index.html';
fs.writeFileSync(destPath, s, 'utf8');
console.log('Successfully synced index.html to E: project directory.');
