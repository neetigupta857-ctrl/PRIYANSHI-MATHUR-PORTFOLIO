const fs = require('fs');

let s = fs.readFileSync('index.html', 'utf8');

// 1. Replace drawer to remove social icons
const drawerStart = s.indexOf('<aside id="curvedMenuDrawer"');
const drawerEnd = s.indexOf('</aside>', drawerStart) + 8;

if (drawerStart !== -1 && drawerEnd > drawerStart) {
  const newDrawer = `<aside id="curvedMenuDrawer" class="curved-menu-drawer" aria-label="Curved Navigation Drawer" aria-hidden="true">
  <svg class="curved-menu-svg" viewBox="0 0 100 800" preserveAspectRatio="none">
    <path id="curvePath" d="M100 0 L200 0 L200 800 L100 800 Q-100 400 100 0"></path>
  </svg>
  <div class="curved-menu-content">
    <div class="curved-menu-header">
      <p>Navigation</p>
    </div>
    <nav class="curved-menu-nav">
      <a href="#home" data-page="home" class="curved-menu-link">
        <span class="c-num">01.</span>
        <span class="c-text">Home</span>
      </a>
      <a href="#about" data-page="about" class="curved-menu-link">
        <span class="c-num">02.</span>
        <span class="c-text">About</span>
      </a>
      <a href="#visualisation" data-page="visualisation" class="curved-menu-link">
        <span class="c-num">03.</span>
        <span class="c-text">3D Visualisation</span>
      </a>
      <a href="#interior-design" data-page="interior-design" class="curved-menu-link">
        <span class="c-num">04.</span>
        <span class="c-text">Interior Design</span>
      </a>
      <a href="#contact" data-page="contact" class="curved-menu-link">
        <span class="c-num">05.</span>
        <span class="c-text">Contact</span>
      </a>
    </nav>
  </div>
</aside>`;

  s = s.substring(0, drawerStart) + newDrawer + s.substring(drawerEnd);
  console.log('Drawer updated successfully.');
} else {
  console.log('Drawer not found or already replaced.');
}

// 2. Replace hero section #pdfCover
const heroStart = s.indexOf('<section id="pdfCover"');
const heroEnd = s.indexOf('</section>', heroStart) + 10;

if (heroStart !== -1 && heroEnd > heroStart) {
  const newHero = `<section id="pdfCover" class="pdf-cover hero-luxury hero-editorial-frame" aria-label="Interior Design Portfolio">
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

  s = s.substring(0, heroStart) + newHero + s.substring(heroEnd);
  console.log('Hero section updated successfully.');
} else {
  console.log('Hero section not found or already replaced.');
}

fs.writeFileSync('index.html', s, 'utf8');
console.log('index.html successfully written.');
