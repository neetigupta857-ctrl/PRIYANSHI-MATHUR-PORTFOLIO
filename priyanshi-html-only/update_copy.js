const fs = require('fs');

function updateCopy(dir) {
  const indexPath = dir + '/index.html';
  const scriptPath = dir + '/script.js';
  const tsxPath = dir + '/components/ui/works-wheel.tsx';

  // 1. In index.html: replace "Turn wheel or drag vertically to explore studies" -> "Scroll down or drag vertically to explore studies"
  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf8');

    // Regex replace for hint text
    html = html.replace(
      /Turn wheel or drag vertically/gi,
      'Scroll down or drag vertically'
    );
    html = html.replace(
      /Turn wheel to explore/gi,
      'Scroll down to explore'
    );

    // Also check if Works '26 exists in index.html
    html = html.replace(/Works\s*['’]26/g, 'Selected Works');

    fs.writeFileSync(indexPath, html, 'utf8');
    console.log('Updated copy in', indexPath);
  }

  // 2. In script.js: replace "Works '26" -> "Selected Works"
  if (fs.existsSync(scriptPath)) {
    let js = fs.readFileSync(scriptPath, 'utf8');

    js = js.replace(/<div class="works-wheel-center-label">[^<]*<\/div>/g, '<div class="works-wheel-center-label">Selected Works</div>');
    js = js.replace(/Works\s*['’]26/g, 'Selected Works');

    fs.writeFileSync(scriptPath, js, 'utf8');
    console.log('Updated copy in', scriptPath);
  }

  // 3. In components/ui/works-wheel.tsx
  if (fs.existsSync(tsxPath)) {
    let tsx = fs.readFileSync(tsxPath, 'utf8');
    tsx = tsx.replace(/label\s*=\s*"Works '26"/g, 'label = "Selected Works"');
    tsx = tsx.replace(/Works\s*['’]26/g, 'Selected Works');
    fs.writeFileSync(tsxPath, tsx, 'utf8');
    console.log('Updated copy in', tsxPath);
  }
}

updateCopy('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only');
updateCopy('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO');
