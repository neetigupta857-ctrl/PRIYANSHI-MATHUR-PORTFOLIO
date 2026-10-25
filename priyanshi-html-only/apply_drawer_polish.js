const fs = require('fs');

function polishDrawer(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }
  let s = fs.readFileSync(filePath, 'utf8');

  // Locate drawer CSS block between /* Curved Drawer Overlay */ and /* Custom Cursor Follower */
  const oldDrawerCssStart = s.indexOf('/* Curved Drawer Overlay */');
  const oldDrawerCssEnd = s.indexOf('/* Custom Cursor Follower */');

  if (oldDrawerCssStart === -1 || oldDrawerCssEnd === -1) {
    console.error('Could not locate drawer CSS block in', filePath);
    return;
  }

  const polishedDrawerCss = `/* Curved Drawer Overlay */
.curved-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(18, 4, 8, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1001;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
}
.curved-menu-overlay.is-open {
  opacity: 1;
  pointer-events: auto;
}
.curved-menu-drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  height: 100dvh;
  width: 100vw;
  max-width: 490px;
  background: #2b090f !important;
  z-index: 1002;
  transform: translateX(calc(100% + 100px));
  transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1);
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.45), -1px 0 0 rgba(212, 175, 122, 0.18);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  box-sizing: border-box;
}
.curved-menu-drawer.is-open {
  transform: translateX(0);
}
.curved-menu-svg {
  position: absolute;
  top: 0;
  left: -99px;
  width: 100px;
  height: 100%;
  fill: #2b090f !important;
  pointer-events: none;
}
.curved-menu-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.curved-menu-header {
  border-bottom: 1px solid rgba(212, 175, 122, 0.22);
  padding: 24px 32px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  box-sizing: border-box;
}
.curved-menu-header-label {
  margin: 0;
  font-family: var(--site-font-body);
  font-size: 0.72rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #d8c3a5;
  font-weight: 500;
}
.curved-drawer-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}
.curved-drawer-download-btn {
  border: 1px solid rgba(216, 195, 165, 0.4);
  background: rgba(255, 255, 255, 0.06);
  color: #f7f2eb;
  font-family: var(--site-font-body);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 500;
  padding: 7px 14px;
  text-decoration: none;
  box-shadow: none;
  border-radius: 3px;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.curved-drawer-download-btn:hover {
  background: rgba(216, 195, 165, 0.2);
  color: #ffffff;
  border-color: rgba(216, 195, 165, 0.85);
  box-shadow: 0 0 14px rgba(216, 195, 165, 0.3);
}
.curved-drawer-close-btn {
  background: transparent;
  border: none;
  color: #f7f2eb;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  padding: 4px 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s ease, color 0.25s ease;
}
.curved-drawer-close-btn:hover {
  color: #ffffff;
  transform: scale(1.15) rotate(90deg);
}
.curved-menu-nav {
  display: flex;
  flex-direction: column;
  padding: 0 32px 32px 36px;
  box-sizing: border-box;
}
.curved-menu-link {
  display: flex;
  align-items: baseline;
  padding: 1.15rem 0;
  border-bottom: 1px solid rgba(212, 175, 122, 0.16);
  text-decoration: none;
  color: #f7f2eb;
  font-family: 'Cinzel', Georgia, serif;
  font-size: clamp(1.4rem, 2.5vw, 1.85rem);
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 0.04em;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.curved-menu-link .c-num {
  font-family: var(--site-font-body);
  font-size: 0.85rem;
  font-weight: 400;
  color: rgba(216, 195, 165, 0.65);
  margin-right: 0.95rem;
  transition: color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.curved-menu-link .c-text {
  color: #f7f2eb;
  transition: color 0.3s cubic-bezier(0.16, 1, 0.3, 1), text-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.curved-menu-link:hover {
  transform: translateX(8px);
  color: #ffffff;
  border-color: rgba(212, 175, 122, 0.45);
}
.curved-menu-link:hover .c-num {
  color: rgba(255, 235, 215, 0.9);
}
.curved-menu-link:hover .c-text {
  color: #ffffff;
  text-shadow: 0 0 16px rgba(212, 175, 122, 0.4);
}

`;

  s = s.substring(0, oldDrawerCssStart) + polishedDrawerCss + s.substring(oldDrawerCssEnd);

  fs.writeFileSync(filePath, s, 'utf8');
  console.log('Successfully polished drawer header and menu link micro-interactions in', filePath);
}

polishDrawer('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html');
polishDrawer('E:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html');
