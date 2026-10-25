const fs = require('fs');

function applyBurgundyMenuDrawer(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }
  let s = fs.readFileSync(filePath, 'utf8');

  // 1. UPDATE CSS FOR SLIDE-OUT CURVED DRAWER
  const oldDrawerCssStart = s.indexOf('/* Curved Drawer Overlay */');
  const oldDrawerCssEnd = s.indexOf('/* Custom Cursor Follower */');

  if (oldDrawerCssStart === -1 || oldDrawerCssEnd === -1) {
    console.error('Could not locate drawer CSS block in', filePath);
    return;
  }

  const newDrawerCss = `/* Curved Drawer Overlay */
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
  padding: 2.2rem 2.8rem 2.5rem 3.2rem;
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
.curved-menu-header {
  border-bottom: 1px solid rgba(212, 175, 122, 0.22);
  padding-bottom: 1.25rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
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
  transition: transform 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.curved-menu-link .c-num {
  font-family: var(--site-font-body);
  font-size: 0.85rem;
  font-weight: 400;
  color: #d8c3a5;
  margin-right: 0.95rem;
  transition: color 0.25s ease;
}
.curved-menu-link:hover {
  transform: translateX(12px);
  color: #ffffff;
  border-color: rgba(212, 175, 122, 0.45);
}
.curved-menu-link:hover .c-num {
  color: #f7f2eb;
}

`;

  s = s.substring(0, oldDrawerCssStart) + newDrawerCss + s.substring(oldDrawerCssEnd);

  // 2. UPDATE DRAWER HTML MARKUP (with Navigation header, Download button, and X close button)
  const oldDrawerHtml = `<aside id="curvedMenuDrawer" class="curved-menu-drawer" aria-label="Curved Navigation Drawer" aria-hidden="true">
  <svg class="curved-menu-svg" viewBox="0 0 100 800" preserveAspectRatio="none">
    <path id="curvePath" d="M100 0 L200 0 L200 800 L100 800 Q-100 400 100 0"></path>
  </svg>
  <div class="curved-menu-content">
    <div class="curved-menu-header">
      <p>Navigation</p>
    </div>
    <nav class="curved-menu-nav">
      <a href="#home" data-page="home" class="curved-menu-link">
        <span class="c-num">01.</span>
        <span class="c-text">Home</span>
      </a>
      <a href="#about" data-page="about" class="curved-menu-link">
        <span class="c-num">02.</span>
        <span class="c-text">About</span>
      </a>
      <a href="#visualisation" data-page="visualisation" class="curved-menu-link">
        <span class="c-num">03.</span>
        <span class="c-text">3D Visualisation</span>
      </a>
      <a href="#interior-design" data-page="interior-design" class="curved-menu-link">
        <span class="c-num">04.</span>
        <span class="c-text">Interior Design</span>
      </a>
      <a href="#contact" data-page="contact" class="curved-menu-link">
        <span class="c-num">05.</span>
        <span class="c-text">Contact</span>
      </a>
    </nav>
  </div>
</aside>`;

  const newDrawerHtml = `<aside id="curvedMenuDrawer" class="curved-menu-drawer" aria-label="Curved Navigation Drawer" aria-hidden="true">
  <svg class="curved-menu-svg" viewBox="0 0 100 800" preserveAspectRatio="none">
    <path id="curvePath" d="M100 0 L200 0 L200 800 L100 800 Q-100 400 100 0"></path>
  </svg>
  <div class="curved-menu-content">
    <div class="curved-menu-header">
      <p class="curved-menu-header-label">Navigation</p>
      <div class="curved-drawer-actions">
        <a href="#portfolio" class="curved-drawer-download-btn" data-page="portfolio">DOWNLOAD PORTFOLIO &gt;</a>
        <button type="button" class="curved-drawer-close-btn" id="drawerCloseBtn" aria-label="Close navigation menu">✕</button>
      </div>
    </div>
    <nav class="curved-menu-nav">
      <a href="#home" data-page="home" class="curved-menu-link">
        <span class="c-num">01.</span>
        <span class="c-text">Home</span>
      </a>
      <a href="#about" data-page="about" class="curved-menu-link">
        <span class="c-num">02.</span>
        <span class="c-text">About</span>
      </a>
      <a href="#visualisation" data-page="visualisation" class="curved-menu-link">
        <span class="c-num">03.</span>
        <span class="c-text">3D Visualisation</span>
      </a>
      <a href="#interior-design" data-page="interior-design" class="curved-menu-link">
        <span class="c-num">04.</span>
        <span class="c-text">Interior Design</span>
      </a>
      <a href="#contact" data-page="contact" class="curved-menu-link">
        <span class="c-num">05.</span>
        <span class="c-text">Contact</span>
      </a>
    </nav>
  </div>
</aside>`;

  if (s.includes(oldDrawerHtml)) {
    s = s.replace(oldDrawerHtml, newDrawerHtml);
    console.log('Successfully updated drawer HTML markup in', filePath);
  } else {
    console.error('Could not find exact oldDrawerHtml in', filePath);
  }

  // 3. ATTACH DRAWER CLOSE BUTTON LISTENER IN SCRIPT
  const oldScriptListener = `if (curvedOverlay) {
  curvedOverlay.addEventListener("click", () => setCurvedMenu(false));
}`;

  const newScriptListener = `if (curvedOverlay) {
  curvedOverlay.addEventListener("click", () => setCurvedMenu(false));
}
const drawerCloseBtn = document.getElementById("drawerCloseBtn");
if (drawerCloseBtn) {
  drawerCloseBtn.addEventListener("click", () => setCurvedMenu(false));
}`;

  if (s.includes(oldScriptListener)) {
    s = s.replace(oldScriptListener, newScriptListener);
    console.log('Successfully wired drawerCloseBtn listener in', filePath);
  } else {
    console.log('oldScriptListener not matched exactly in', filePath);
  }

  fs.writeFileSync(filePath, s, 'utf8');
}

applyBurgundyMenuDrawer('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html');
applyBurgundyMenuDrawer('E:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html');
