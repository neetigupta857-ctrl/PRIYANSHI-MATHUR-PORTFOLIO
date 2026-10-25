const fs = require('fs');

let s = fs.readFileSync('index.html', 'utf8');

// Find start of .hero-luxury and end of @media (max-width: 900px) block for hero
const startIdx = s.indexOf('.hero-luxury {');
const splitStart = s.indexOf('/* SLIDE 2: 50/50 Dual-Panel Split Section */');

console.log('startIdx:', startIdx, 'splitStart:', splitStart);

if (startIdx !== -1 && splitStart !== -1 && splitStart > startIdx) {
  const newHeroCss = `/* ========================================================
   HOME COVER HERO: LUXURY ARCHITECTURAL EDITORIAL LOOK
   ======================================================== */
.hero-editorial-frame {
  margin: 0 2.2vw 2.2vw;
  height: calc(100vh - 96px);
  height: calc(100dvh - 96px);
  position: relative;
  background: #0A0E0D;
  border-radius: 4px;
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

/* Smooth multi-stop editorial gradient overlay eliminates harsh vertical split */
.hero-editorial-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(95deg, rgba(10, 14, 13, 0.88) 0%, rgba(12, 18, 16, 0.72) 42%, rgba(15, 20, 18, 0.22) 78%, rgba(15, 20, 18, 0.10) 100%);
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

.hero-hairline {
  display: inline-block;
  width: 38px;
  height: 1px;
  background: #c9a96e;
  margin-right: 14px;
  flex-shrink: 0;
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

/* Luxury frosted-glass architectural button */
.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 32px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.28);
  letter-spacing: 0.2em;
  font-size: 0.72rem;
  font-family: var(--site-font-body);
  font-weight: 500;
  text-transform: uppercase;
  color: #F5F2EB;
  text-decoration: none;
  transition: all 0.35s ease;
  border-radius: 0;
}

.hero-btn-arrow {
  display: inline-block;
  transition: transform 0.35s ease;
}

.hero-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: #c9a96e;
  color: #FFFFFF;
  box-shadow: 0 0 25px rgba(201, 169, 110, 0.35);
  transform: translateY(-2px);
}

.hero-btn:hover .hero-btn-arrow {
  transform: translateX(4px);
}

.hero-meta-caption {
  position: absolute;
  bottom: 2rem;
  right: 2.5rem;
  z-index: 3;
  font-family: var(--site-font-body);
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  color: rgba(247, 244, 239, 0.65);
  text-transform: uppercase;
  pointer-events: none;
}

@media (max-width: 900px) {
  .hero-editorial-frame {
    margin: 0 1rem 1.5rem;
    height: calc(100vh - 84px);
    height: calc(100dvh - 84px);
  }
  .hero-content-panel {
    padding-left: clamp(1.5rem, 5vw, 3rem);
    padding-right: 1.5rem;
  }
  .hero-meta-caption {
    bottom: 1.25rem;
    right: 1.5rem;
    font-size: 0.6rem;
  }
}

`;

  s = s.substring(0, startIdx) + newHeroCss + s.substring(splitStart);
  fs.writeFileSync('index.html', s, 'utf8');
  console.log('Hero CSS successfully updated in index.html!');
} else {
  console.error('Could not find slice boundaries for hero CSS.');
}
