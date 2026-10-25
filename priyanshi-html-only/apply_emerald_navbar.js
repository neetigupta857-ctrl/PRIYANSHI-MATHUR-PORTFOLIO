const fs = require('fs');

function applyEmeraldCharcoalNavbar(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }
  let s = fs.readFileSync(filePath, 'utf8');

  // Locate current topbar CSS block from '.topbar {' up to '.curved-menu-active'
  const oldTopbarStart = s.indexOf('.topbar {');
  const oldTopbarEnd = s.indexOf('.curved-menu-active .menu-btn-burger', oldTopbarStart);

  if (oldTopbarStart === -1 || oldTopbarEnd === -1) {
    console.error('Could not locate topbar CSS block in', filePath);
    return;
  }

  const newEmeraldNavbarCss = `.topbar {
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  background: #0d1815;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(201, 169, 110, 0.3);
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  transition: all .3s ease;
}
.topbar.scrolled {
  background: rgba(13, 24, 21, 0.96);
  border-bottom: 1px solid rgba(201, 169, 110, 0.45);
  box-shadow: 0 4px 24px rgba(6, 12, 10, 0.45);
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
  color: #f6f3ec;
  letter-spacing: 0.05em;
}
.brand-line-2 {
  font-family: var(--site-font-body);
  font-size: 0.65rem;
  font-weight: 500;
  color: #c9a96e;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-top: 3px;
}
.brand-line-3 {
  font-family: var(--site-font-body);
  font-size: 0.6rem;
  font-weight: 400;
  color: #c9a96e;
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
  border: 1px solid rgba(201, 169, 110, 0.45);
  background: rgba(201, 169, 110, 0.06);
  color: #f6f3ec;
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
  background: rgba(201, 169, 110, 0.2);
  color: #ffffff;
  border-color: rgba(201, 169, 110, 0.85);
  transform: none;
  box-shadow: 0 0 16px rgba(201, 169, 110, 0.35);
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
  background: #f6f3ec;
  transition: transform 0.35s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.25s ease;
}
`;

  s = s.substring(0, oldTopbarStart) + newEmeraldNavbarCss + s.substring(oldTopbarEnd);
  console.log('Successfully applied emerald-charcoal navbar styles to', filePath);

  fs.writeFileSync(filePath, s, 'utf8');
}

applyEmeraldCharcoalNavbar('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html');
applyEmeraldCharcoalNavbar('E:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html');
