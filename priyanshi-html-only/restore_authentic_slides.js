const fs = require('fs');

const eBak = fs.readFileSync('E:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html.bak', 'utf8');

// Extract the exact slides section from E bak
const p1 = eBak.indexOf('<section id="aboutTeaser"');
const p2 = eBak.indexOf('<main id="view"');
if (p1 === -1 || p2 === -1) {
  console.error('Markers not found in E bak: p1=' + p1 + ', p2=' + p2);
  process.exit(1);
}
const slidesSection = eBak.slice(p1, p2);

function applyTo(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  // Find pdfCover end
  const pCover = html.indexOf('id="pdfCover"');
  if (pCover === -1) {
    console.error('Could not find id="pdfCover" in ' + filePath);
    return;
  }
  const pdfCoverEnd = html.indexOf('</section>', pCover) + 10;

  // Find view start
  const viewStart = html.indexOf('id="view"');
  if (viewStart === -1) {
    console.error('Could not find id="view" in ' + filePath);
    return;
  }
  const mainStart = html.lastIndexOf('<', viewStart);

  html = html.slice(0, pdfCoverEnd) + '\n\n' + slidesSection + '\n' + html.slice(mainStart);

  // Ensure <main id="view" is used instead of mismatched <section id="view">... </main>
  html = html.replace('<section id="view" tabindex="-1">', '<main id="view" tabindex="-1">');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Successfully applied authentic original slides to', filePath);
}

applyTo('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html');
applyTo('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html');
