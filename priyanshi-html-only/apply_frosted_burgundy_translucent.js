const fs = require('fs');

function applyTrueFrostedBurgundyNavbar(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }
  let s = fs.readFileSync(filePath, 'utf8');

  // 1. UPDATE NAVBAR CSS
  const oldTopbarStart = s.indexOf('.topbar {');
  const oldTopbarEnd = s.indexOf('.curved-menu-active .menu-btn-burger', oldTopbarStart);

  if (oldTopbarStart === -1 || oldTopbarEnd === -1) {
    console.error('Could not locate topbar CSS block in', filePath);
    return;
  }

  const newFrostedNavbarCss = `.topbar {
  height: 82px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  background: rgba(58, 12, 20, 0.42) !important;
  backdrop-filter: blur(16px) saturate(140%) !important;
  -webkit-backdrop-filter: blur(16px) saturate(140%) !important;
  border-bottom: 1px solid rgba(255, 235, 215, 0.22) !important;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.18) !important;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  transition: all .3s ease;
}
.topbar.scrolled {
  background: rgba(45, 9, 15, 0.65) !important;
  border-bottom: 1px solid rgba(255, 235, 215, 0.3) !important;
  box-shadow: 0 6px 32px rgba(0, 0, 0, 0.28) !important;
}
.brand-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  line-height: 1.25;
}
.brand-line-1 {
  font-family: 'Cinzel', 'Cormorant Garamond', Georgia, serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #f7f2eb;
  letter-spacing: 0.05em;
}
.brand-line-2 {
  font-family: var(--site-font-body);
  font-size: 0.65rem;
  font-weight: 500;
  color: #e0cdb2;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-top: 3px;
}
.brand-line-3 {
  font-family: var(--site-font-body);
  font-size: 0.6rem;
  font-weight: 400;
  color: #e0cdb2;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-top: 2px;
  opacity: 0.85;
}
.nav {
  display: none !important;
}
.topbar-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}
.topbar-download-btn {
  border: 1px solid rgba(245, 236, 224, 0.45);
  background: rgba(255, 255, 255, 0.08);
  color: #f7f2eb;
  font-family: var(--site-font-body);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 500;
  padding: 9px 18px;
  text-decoration: none;
  box-shadow: none;
  border-radius: 3px;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.topbar-download-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  color: #ffffff;
  border-color: rgba(255, 235, 215, 0.8);
  transform: none;
  box-shadow: 0 0 16px rgba(255, 235, 215, 0.25);
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
  opacity: 0.8;
}
.menu-btn-burger {
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.menu-btn-burger span {
  display: block;
  height: 2px;
  width: 100%;
  background: #f7f2eb;
  transition: transform 0.35s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.25s ease;
}
`;

  s = s.substring(0, oldTopbarStart) + newFrostedNavbarCss + s.substring(oldTopbarEnd);

  // 2. UPDATE HERO SECTION & COVER TO REMOVE TOP OFFSET AND EXTEND BEHIND NAVBAR
  // Ensure .hero and .hero-editorial-frame have top: 0, margin-top: 0, padding-top: 0
  const oldEditorialStart = s.indexOf('.hero-editorial-frame {');
  const oldEditorialEnd = s.indexOf('.hero-luxury[hidden] {', oldEditorialStart);

  if (oldEditorialStart !== -1 && oldEditorialEnd !== -1) {
    const newEditorialCss = `.hero-editorial-frame {
  margin: 0 !important;
  margin-top: 0 !important;
  padding-top: 0 !important;
  top: 0 !important;
  width: 100%;
  height: 100vh !important;
  height: 100dvh !important;
  min-height: 100vh !important;
  position: relative;
  background: #0A0E0D;
  border-radius: 0;
  overflow: hidden;
  box-sizing: border-box;
}
`;
    s = s.substring(0, oldEditorialStart) + newEditorialCss + s.substring(oldEditorialEnd);
  }

  // Also update .hero rule for #home
  const oldHeroStart = s.indexOf('.hero{');
  if (oldHeroStart !== -1) {
    const oldHeroEnd = s.indexOf('}', oldHeroStart) + 1;
    const newHeroCss = `.hero{margin-top:0 !important;padding-top:0 !important;top:0 !important;min-height:100vh !important;height:100vh;max-height:1000px;position:relative;display:flex;align-items:flex-end;padding:0 7vw 8vh;isolation:isolate}`;
    s = s.substring(0, oldHeroStart) + newHeroCss + s.substring(oldHeroEnd);
  }

  // Ensure scroll-margin-top does not displace the first cover
  s = s.replace(
    'section,.intro,.case-hero,.page-top,#view{scroll-margin-top:var(--topbar-height,82px)}',
    '.intro,.case-hero,.page-top,#view{scroll-margin-top:var(--topbar-height,82px)}#pdfCover{scroll-margin-top:0 !important;margin-top:0 !important;padding-top:0 !important;top:0 !important;}'
  );

  fs.writeFileSync(filePath, s, 'utf8');
  console.log('Successfully updated translucent frosted burgundy navbar and zero top offset in', filePath);
}

applyTrueFrostedBurgundyNavbar('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html');
applyTrueFrostedBurgundyNavbar('E:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html');
