const fs = require('fs');

function updateWorkspace(dir) {
  const indexPath = dir + '/index.html';
  const scriptPath = dir + '/script.js';

  if (!fs.existsSync(indexPath) || !fs.existsSync(scriptPath)) {
    console.log('Skipping missing dir:', dir);
    return;
  }

  // --- 1. UPDATE index.html CSS and Layout ---
  let html = fs.readFileSync(indexPath, 'utf8');

  // Replace wheel-gallery-section and related styles with wide unboxed layout
  const oldCssPattern = /\/\* --- 3D WORKS WHEEL GALLERY COMPONENT --- \*\/[\s\S]*?\.works-wheel-index button\.active \{[^}]*\}/;
  
  const modernUnboxedCss = `/* --- 3D WORKS WHEEL GALLERY COMPONENT --- */
.wheel-gallery-section {
  margin: 10px 0 60px;
  border: none;
  background: transparent;
  position: relative;
  box-shadow: none;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  padding: 0;
}
.wheel-intro-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 6vw;
  border-top: 1px solid rgba(26,26,26,0.12);
  border-bottom: 1px solid rgba(26,26,26,0.12);
  font-family: var(--font-cinzel), serif;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  background: rgba(244, 241, 234, 0.75);
  backdrop-filter: blur(8px);
}
.wheel-tag {
  color: var(--terracotta);
  font-weight: 600;
  margin-right: 16px;
}
.wheel-hint {
  color: var(--muted-dark);
  font-family: var(--font-garamond), serif;
  text-transform: none;
  font-size: 1.05rem;
  letter-spacing: 0.02em;
}
.wheel-counter {
  color: var(--charcoal);
  font-weight: 600;
}
.works-wheel-section {
  position: relative;
  width: 100%;
  height: 820px;
  min-height: 48rem;
  overflow: hidden;
  user-select: none;
  background: transparent;
  color: var(--charcoal);
}
.works-wheel-stage {
  position: absolute;
  inset: 0;
  cursor: grab;
  touch-action: pan-x;
  outline: none;
}
.works-wheel-stage:active {
  cursor: grabbing;
}
.works-wheel-stage:focus-visible {
  outline: 2px solid var(--charcoal);
  outline-offset: -4px;
}
.works-wheel-drum {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-style: preserve-3d;
  will-change: transform;
}
.works-wheel-card {
  position: absolute;
  backface-visibility: hidden;
  text-decoration: none;
  color: inherit;
  display: block;
  transition: opacity 0.15s ease;
  will-change: transform, opacity;
}
.works-wheel-card-inner {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 25px 60px -15px rgba(26,26,26,0.45), 0 10px 25px -10px rgba(26,26,26,0.25);
  border: 1px solid rgba(255,255,255,0.45);
  background: #E8E3D9;
  transform-origin: center center;
  transition: box-shadow 0.35s ease, transform 0.35s ease;
  will-change: transform;
}
.works-wheel-card:hover .works-wheel-card-inner {
  box-shadow: 0 35px 70px -15px rgba(26,26,26,0.65), 0 15px 30px -10px rgba(26,26,26,0.35);
  transform: scale(1.02);
}
.works-wheel-card-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  image-rendering: -webkit-optimize-contrast;
}
.works-wheel-card-action {
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 9999px;
  background: rgba(244, 241, 234, 0.95);
  color: #1A1A1A;
  font-family: var(--font-cinzel), serif;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(26,26,26,0.25);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.25s ease, transform 0.25s ease;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.works-wheel-card:hover .works-wheel-card-action {
  opacity: 1;
  transform: translateY(0);
}
.works-wheel-svg {
  width: 12px;
  height: 12px;
}
.works-wheel-center-label {
  pointer-events: none;
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-family: var(--font-cinzel), serif;
  letter-spacing: 0.1em;
  font-weight: 500;
  color: var(--charcoal);
  text-transform: uppercase;
  font-size: 3.5rem;
  transition: opacity 0.15s ease;
}
.works-wheel-front-title {
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 5vw;
  transform: translateY(-50%);
  font-family: var(--font-garamond), serif;
  font-style: italic;
  font-size: clamp(2.2rem, 3.8vw, 3.6rem);
  color: var(--charcoal);
  max-width: 28vw;
  line-height: 1.1;
  opacity: 0;
  transition: opacity 0.2s ease;
  text-shadow: 0 2px 12px rgba(244, 241, 234, 0.9);
}
.works-wheel-index {
  position: absolute;
  top: 7.5%;
  right: 4vw;
  text-align: right;
  line-height: 1.95;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 20;
}
.works-wheel-index li {
  margin: 0;
  padding: 0;
}
.works-wheel-index button {
  background: none;
  border: none;
  padding: 3px 8px;
  font-family: var(--font-cinzel), serif;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: var(--muted-dark);
  cursor: pointer;
  transition: color 0.2s ease, font-weight 0.2s ease;
  outline: none;
}
.works-wheel-index button:hover,
.works-wheel-index button.active {
  color: var(--charcoal);
  font-weight: 600;
}
.works-wheel-index button.active {
  border-right: 2px solid var(--terracotta);
  padding-right: 10px;
}`;

  if (oldCssPattern.test(html)) {
    html = html.replace(oldCssPattern, modernUnboxedCss);
    console.log('Replaced CSS in', indexPath);
  } else {
    console.log('CSS pattern not matched in', indexPath);
  }

  // Update wheel mount element size in index.html
  html = html.replace(
    /id="worksWheelMount"[^>]*class="works-wheel-section"[^>]*>/,
    'id="worksWheelMount" class="works-wheel-section" style="height: 820px; min-height: 48rem;">'
  );

  fs.writeFileSync(indexPath, html, 'utf8');

  // --- 2. UPDATE script.js Geometric Scale and GSAP Tweening ---
  let js = fs.readFileSync(scriptPath, 'utf8');

  // Increase card sizes from 38% height / 34% max width to 58% height / 52% max width
  js = js.replace(/const CARD_H = [0-9.]+;/, 'const CARD_H = 0.58;');
  js = js.replace(/const CARD_MAX_W = [0-9.]+;/, 'const CARD_MAX_W = 0.52;');
  js = js.replace(/const CARD_RATIO = [0-9.]+;/, 'const CARD_RATIO = 1.48;');
  js = js.replace(/const STEP = [0-9.]+;/, 'const STEP = 36;');
  js = js.replace(/const DRUM = [0-9.]+;/, 'const DRUM = 2.05;');
  js = js.replace(/const LENS = [0-9.]+;/, 'const LENS = 2.8;');
  js = js.replace(/const RING_R = [0-9.]+;/, 'const RING_R = 1.18;');
  js = js.replace(/const BOW = [0-9.]+;/, 'const BOW = 1.55;');

  // Set lazy loading and eager for first image in wheel markup
  js = js.replace(
    '<img src="${item.image}" alt="${item.title}" draggable="false" />',
    '<img src="${item.image}" alt="${item.title}" draggable="false" loading="${i < 2 ? \'eager\' : \'lazy\'}" decoding="async" />'
  );

  fs.writeFileSync(scriptPath, js, 'utf8');
  console.log('Updated geometry and image loading in', scriptPath);
}

updateWorkspace('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only');
updateWorkspace('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO');
