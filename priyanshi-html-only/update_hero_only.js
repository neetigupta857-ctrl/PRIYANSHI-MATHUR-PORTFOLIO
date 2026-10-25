const fs = require('fs');

function updateHeroOnly(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Locate current <section id="pdfCover" ... </section>
  const p1 = html.indexOf('id="pdfCover"');
  if (p1 === -1) {
    console.error('Could not find id="pdfCover" in', filePath);
    return;
  }
  const pStart = html.lastIndexOf('<section', p1);
  const pEnd = html.indexOf('</section>', p1) + 10;

  // 2. Build clean editorial HTML hero overlay with page1_img0.jpg
  const newHeroSection = `<section id="pdfCover" class="pdf-cover hero-luxury" aria-label="Interior Design Portfolio">
  <img src="page1_img0.jpg" alt="Interior Architecture and Design Concept" class="hero-bg-img" loading="eager" fetchpriority="high">
  <div class="hero-center-overlay" aria-hidden="true" style="background: rgba(15, 14, 12, 0.55);"></div>
  <div class="hero-content-panel">
    <div class="hero-overline">INTERIOR ARCHITECTURE &amp; 3D VISUALISATION</div>
    <h1 class="hero-title">
      <span class="hero-title-line">INTERIOR</span>
      <span class="hero-title-line">DESIGN</span>
    </h1>
    <div class="hero-subtitle">Portfolio</div>
    <div class="hero-action">
      <a href="#view" class="hero-btn" aria-label="Explore selected works">
        <span>EXPLORE SELECTED WORKS →</span>
      </a>
    </div>
    <div class="hero-footer-label" style="margin-top: 32px; font-family: var(--site-font-body); font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase; color: #C5A880; font-weight: 600;">
      BY: PRIYANSHI MATHUR
    </div>
  </div>
</section>`;

  html = html.slice(0, pStart) + newHeroSection + html.slice(pEnd);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Successfully updated hero section ONLY in', filePath);
}

updateHeroOnly('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html');
updateHeroOnly('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html');
