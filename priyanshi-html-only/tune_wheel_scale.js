const fs = require('fs');

function tuneWheel(dir) {
  const indexPath = dir + '/index.html';
  const scriptPath = dir + '/script.js';
  const tsxPath = dir + '/components/ui/works-wheel.tsx';

  // 1. Update script.js geometry
  if (fs.existsSync(scriptPath)) {
    let js = fs.readFileSync(scriptPath, 'utf8');

    // Tune geometry to show 1 full card + half of adjacent cards (approx 1.5 - 2 visible)
    js = js.replace(/const CARD_H = [0-9.]+;/, 'const CARD_H = 0.46;');
    js = js.replace(/const CARD_MAX_W = [0-9.]+;/, 'const CARD_MAX_W = 0.42;');
    js = js.replace(/const CARD_RATIO = [0-9.]+;/, 'const CARD_RATIO = 1.45;');
    js = js.replace(/const STEP = [0-9.]+;/, 'const STEP = 28;');
    js = js.replace(/const DRUM = [0-9.]+;/, 'const DRUM = 2.45;');
    js = js.replace(/const LENS = [0-9.]+;/, 'const LENS = 3.2;');
    js = js.replace(/const RING_R = [0-9.]+;/, 'const RING_R = 1.25;');
    js = js.replace(/const BOW = [0-9.]+;/, 'const BOW = 1.65;');
    js = js.replace(/const CULL = [0-9.]+;/, 'const CULL = 2.4;');

    fs.writeFileSync(scriptPath, js, 'utf8');
    console.log('Tuned geometry in', scriptPath);
  }

  // 2. Update index.html height
  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf8');

    // Replace height in CSS
    html = html.replace(
      /\.works-wheel-section\s*\{[\s\S]*?height:\s*820px;[\s\S]*?min-height:\s*48rem;/,
      `.works-wheel-section {
  position: relative;
  width: 100%;
  height: 680px;
  min-height: 40rem;`
    );

    // Replace inline style on worksWheelMount if any
    html = html.replace(
      /id="worksWheelMount"[^>]*style="[^"]*"/,
      'id="worksWheelMount" class="works-wheel-section" style="height: 680px; min-height: 40rem;"'
    );

    fs.writeFileSync(indexPath, html, 'utf8');
    console.log('Tuned height in', indexPath);
  }

  // 3. Update React TSX component if present
  if (fs.existsSync(tsxPath)) {
    let tsx = fs.readFileSync(tsxPath, 'utf8');
    tsx = tsx.replace(/const CARD_H = [0-9.]+;/, 'const CARD_H = 0.46;');
    tsx = tsx.replace(/const CARD_MAX_W = [0-9.]+;/, 'const CARD_MAX_W = 0.42;');
    tsx = tsx.replace(/const CARD_RATIO = [0-9.]+;/, 'const CARD_RATIO = 1.45;');
    tsx = tsx.replace(/const STEP = [0-9.]+;/, 'const STEP = 28;');
    tsx = tsx.replace(/const DRUM = [0-9.]+;/, 'const DRUM = 2.45;');
    tsx = tsx.replace(/const LENS = [0-9.]+;/, 'const LENS = 3.2;');
    tsx = tsx.replace(/const RING_R = [0-9.]+;/, 'const RING_R = 1.25;');
    tsx = tsx.replace(/const BOW = [0-9.]+;/, 'const BOW = 1.65;');
    tsx = tsx.replace(/const CULL = [0-9.]+;/, 'const CULL = 2.4;');
    fs.writeFileSync(tsxPath, tsx, 'utf8');
    console.log('Tuned geometry in', tsxPath);
  }
}

tuneWheel('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only');
tuneWheel('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO');
