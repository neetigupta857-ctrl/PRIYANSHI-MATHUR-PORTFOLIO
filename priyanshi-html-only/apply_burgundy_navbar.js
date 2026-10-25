const fs = require('fs');

function applyBurgundyNavbar(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }
  let s = fs.readFileSync(filePath, 'utf8');

  // Replace topbar CSS block with frosted burgundy glass styling
  const oldTopbarCss = `.topbar {
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  background: #F4F1EA;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  transition: all .3s ease;
}
.topbar.scrolled {
  background: #F4F1EA;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
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
  color: #222222;
  letter-spacing: 0.05em;
}
.brand-line-2 {
  font-family: var(--site-font-body);
  font-size: 0.65rem;
  font-weight: 500;
  color: #444444;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-top: 3px;
}
.brand-line-3 {
  font-family: var(--site-font-body);
  font-size: 0.6rem;
  font-weight: 400;
  color: #888888;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-top: 2px;
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
  background: #1C2321;
  transition: transform 0.35s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.25s ease;
}`;

  const newTopbarCss = `.topbar {
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  background: rgba(62, 14, 22, 0.84);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(212, 175, 122, 0.28);
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  transition: all .3s ease;
}
.topbar.scrolled {
  background: rgba(52, 10, 18, 0.92);
  border-bottom: 1px solid rgba(212, 175, 122, 0.35);
  box-shadow: 0 4px 24px rgba(20, 4, 8, 0.35);
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
  color: #d8c3a5;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-top: 3px;
}
.brand-line-3 {
  font-family: var(--site-font-body);
  font-size: 0.6rem;
  font-weight: 400;
  color: #d8c3a5;
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
  border: 1px solid rgba(216, 195, 165, 0.45);
  background: rgba(255, 248, 240, 0.06);
  color: #f5ece0;
  font-family: var(--site-font-body);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 500;
  padding: 0.65rem 1.25rem;
  text-decoration: none;
  box-shadow: none;
  border-radius: 3px;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.topbar-download-btn:hover {
  background: rgba(216, 195, 165, 0.22);
  color: #ffffff;
  border-color: rgba(216, 195, 165, 0.85);
  transform: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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
  background: #f5ece0;
  transition: transform 0.35s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.25s ease;
}`;

  if (s.includes(oldTopbarCss)) {
    s = s.replace(oldTopbarCss, newTopbarCss);
    console.log('Successfully updated topbar styling to frosted burgundy glass in', filePath);
  } else {
    console.error('Could not find oldTopbarCss in', filePath);
  }

  // Update slide-out drawer links to dark burgundy (#4a121b)
  const oldDrawerLinkCss = `.curved-menu-link {
  display: flex;
  align-items: baseline;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: #1C2321;
  font-family: 'Cinzel', Georgia, serif;
  font-size: clamp(1.4rem, 2.5vw, 1.85rem);
  text-transform: uppercase;
  font-weight: 400;
  transition: transform 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.curved-menu-link .c-num {
  font-family: var(--site-font-body);
  font-size: 0.85rem;
  font-weight: 300;
  color: #C46851;
  margin-right: 0.85rem;
}
.curved-menu-link:hover {
  transform: translateX(10px);
  color: #C46851;
  border-color: #C46851;
}`;

  const newDrawerLinkCss = `.curved-menu-link {
  display: flex;
  align-items: baseline;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(74, 18, 27, 0.12);
  text-decoration: none;
  color: #4a121b;
  font-family: 'Cinzel', Georgia, serif;
  font-size: clamp(1.4rem, 2.5vw, 1.85rem);
  text-transform: uppercase;
  font-weight: 400;
  transition: transform 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.curved-menu-link .c-num {
  font-family: var(--site-font-body);
  font-size: 0.85rem;
  font-weight: 300;
  color: #8b2635;
  margin-right: 0.85rem;
}
.curved-menu-link:hover {
  transform: translateX(10px);
  color: #8b2635;
  border-color: #8b2635;
}`;

  if (s.includes(oldDrawerLinkCss)) {
    s = s.replace(oldDrawerLinkCss, newDrawerLinkCss);
    console.log('Successfully updated drawer links to dark burgundy (#4a121b) in', filePath);
  } else {
    console.log('Could not find oldDrawerLinkCss, checking partial matches...');
  }

  fs.writeFileSync(filePath, s, 'utf8');
}

applyBurgundyNavbar('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html');
applyBurgundyNavbar('E:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html');
