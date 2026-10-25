const fs = require('fs');

function applyBurgundyTicker(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }
  let s = fs.readFileSync(filePath, 'utf8');

  // Locate .bending-marquee-section CSS block
  const oldTickerStart = s.indexOf('.bending-marquee-section {');
  const oldTickerEnd = s.indexOf('/* SLIDE 3: About the Designer Intro Section', oldTickerStart);

  if (oldTickerStart === -1 || oldTickerEnd === -1) {
    console.error('Could not locate ticker CSS block in', filePath);
    return;
  }

  const newTickerCss = `.bending-marquee-section {
  width: 100%;
  max-width: 100vw;
  background: #4a121b !important; /* Rich architectural burgundy ribbon */
  border-top: 1px solid rgba(216, 195, 165, 0.35);
  border-bottom: 1px solid rgba(216, 195, 165, 0.35);
  padding: 1.1rem 0; /* Compact depth */
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  box-shadow: 0 4px 20px rgba(35, 7, 13, 0.25);
}

.bending-marquee-scene {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
}

.bending-marquee-straight-track {
  display: flex;
  width: max-content;
  white-space: nowrap;
  animation: straightMarqueeScroll 28s linear infinite;
  will-change: transform;
}

.bending-marquee-straight-track:hover {
  animation-play-state: paused;
}

.bending-marquee-group {
  display: flex;
  align-items: center;
  gap: 2.2rem;
  padding-right: 2.2rem;
}

.bm-item {
  font-family: 'Cinzel', 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(0.85rem, 1.25vw, 1.05rem);
  font-weight: 600;
  letter-spacing: 0.18em;
  color: #f7f2eb !important; /* Glowing warm ivory text */
  text-transform: uppercase;
  white-space: nowrap;
}

.bm-divider {
  font-size: 1.35rem;
  color: #d8c3a5 !important; /* Soft antique champagne separator */
  line-height: 1;
  display: inline-block;
  opacity: 0.95;
}

@keyframes straightMarqueeScroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 768px) {
  .bending-marquee-section {
    padding: 0.9rem 0;
  }
  .bm-item {
    font-size: 0.8rem;
    letter-spacing: 0.14em;
  }
  .bending-marquee-group {
    gap: 1.6rem;
    padding-right: 1.6rem;
  }
}

`;

  s = s.substring(0, oldTickerStart) + newTickerCss + s.substring(oldTickerEnd);

  fs.writeFileSync(filePath, s, 'utf8');
  console.log('Successfully styled ticker as rich burgundy ribbon with champagne accents in', filePath);
}

applyBurgundyTicker('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html');
applyBurgundyTicker('E:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html');
