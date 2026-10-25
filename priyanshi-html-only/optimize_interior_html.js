const fs = require('fs');

function optimizeInteriorPerformance(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }
  let s = fs.readFileSync(filePath, 'utf8');

  // 1. Add decoding="async", explicit aspect-ratio and width/height to Interior drafting card images
  const oldImageMarkup = `<img class="chroma-mono" src="\${p.image}" alt="\${esc(p.title)}" loading="lazy">
                      <img class="chroma-color" src="\${p.image}" alt="" aria-hidden="true" loading="lazy">`;

  const newImageMarkup = `<img class="chroma-mono" src="\${p.image}" alt="\${esc(p.title)}" loading="lazy" decoding="async" width="400" height="250" style="width: 100%; height: 100%; aspect-ratio: 16 / 10; object-fit: cover;">
                      <img class="chroma-color" src="\${p.image}" alt="" aria-hidden="true" loading="lazy" decoding="async" width="400" height="250" style="width: 100%; height: 100%; aspect-ratio: 16 / 10; object-fit: cover;">`;

  if (s.includes(oldImageMarkup)) {
    s = s.replace(oldImageMarkup, newImageMarkup);
    console.log('1. Optimized image tags with lazy loading, async decoding and explicit dimensions in', filePath);
  } else {
    console.log('1. oldImageMarkup not found directly, checking variations...');
  }

  // 2. Add explicit CSS rules for .chroma-media img, will-change only on active cards, and remove any backdrop-filter from repeating grid cards
  const oldChromaMediaImgCss = `.chroma-media img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  -webkit-user-drag: none;
}`;

  const newChromaMediaImgCss = `.chroma-media img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: var(--chroma-ratio, 16 / 10);
  object-fit: cover;
  user-select: none;
  -webkit-user-drag: none;
  content-visibility: auto;
}

/* Optimize grid cards: No heavy backdrop-filters on repeating cards; will-change only when active */
.chroma-card {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  contain: content;
}

.tilted-card[data-active="true"] .tilted-card__body {
  will-change: transform;
}

.tilted-card:not([data-active="true"]) .tilted-card__body {
  will-change: auto;
}`;

  if (s.includes(oldChromaMediaImgCss)) {
    s = s.replace(oldChromaMediaImgCss, newChromaMediaImgCss);
    console.log('2. Injected CSS performance optimizations for chroma-media img and cards in', filePath);
  } else {
    console.log('2. oldChromaMediaImgCss not matched in', filePath);
  }

  fs.writeFileSync(filePath, s, 'utf8');
}

optimizeInteriorPerformance('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html');
optimizeInteriorPerformance('E:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html');
