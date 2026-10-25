const fs = require('fs');

function restoreCover(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  const p1 = html.indexOf('id="pdfCover"');
  if (p1 === -1) return;
  const pStart = html.lastIndexOf('<section', p1);
  const pEnd = html.indexOf('</section>', p1) + 10;

  const exactCover = `<section id="pdfCover" class="pdf-cover hero-luxury" aria-label="Interior Design Portfolio">
  <img src="cover_extracted.webp" alt="Interior Design Portfolio cover by Priyanshi Mathur" class="hero-bg-img" loading="eager" fetchpriority="high">
  <a href="#view" class="hero-scroll-btn" aria-label="Explore selected works">
    <span>EXPLORE SELECTED WORKS →</span>
  </a>
</section>`;

  html = html.slice(0, pStart) + exactCover + html.slice(pEnd);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Restored exact cover in', filePath);
}

restoreCover('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html');
restoreCover('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html');
