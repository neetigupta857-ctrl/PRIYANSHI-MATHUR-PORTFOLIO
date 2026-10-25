const fs = require('fs');

function applyMiddleBoxPosition(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('File does not exist:', filePath);
    return;
  }
  let s = fs.readFileSync(filePath, 'utf8');

  // Replace hero-content-panel CSS so it occupies the middle box (left: 15%, width: 48%)
  const oldContentPanelCss = `.hero-content-panel {
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
}`;

  const newContentPanelCss = `.hero-content-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 15%;
  width: 48%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  padding: 0 3.5rem;
  box-sizing: border-box;
}`;

  if (s.includes(oldContentPanelCss)) {
    s = s.replace(oldContentPanelCss, newContentPanelCss);
    console.log('Successfully updated .hero-content-panel position to middle box in', filePath);
  } else {
    console.error('Could not find oldContentPanelCss in', filePath);
  }

  // Update media query responsive values
  const oldMediaCss = `@media (max-width: 900px) {
  .hero-editorial-frame {
    margin: 0;
    width: 100%;
    height: 100vh;
    height: 100dvh;
    border-radius: 0;
  }
  .hero-content-panel {
    padding-left: clamp(1.5rem, 5vw, 3rem);
    padding-right: 1.5rem;
  }
}`;

  const newMediaCss = `@media (max-width: 900px) {
  .hero-editorial-frame {
    margin: 0;
    width: 100%;
    height: 100vh;
    height: 100dvh;
    border-radius: 0;
  }
  .hero-content-panel {
    left: 6%;
    width: 88%;
    padding: 0 1.5rem;
  }
}`;

  if (s.includes(oldMediaCss)) {
    s = s.replace(oldMediaCss, newMediaCss);
    console.log('Successfully updated media query in', filePath);
  } else {
    console.log('oldMediaCss not matched exactly, checking substring...');
  }

  fs.writeFileSync(filePath, s, 'utf8');
}

applyMiddleBoxPosition('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html');
applyMiddleBoxPosition('E:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html');
