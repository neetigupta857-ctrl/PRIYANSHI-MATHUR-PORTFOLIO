const fs = require('fs');

function compactHeaderSpace(dir) {
  const indexPath = dir + '/index.html';
  if (!fs.existsSync(indexPath)) return;
  let html = fs.readFileSync(indexPath, 'utf8');

  // Replace monograph-page-header margin and padding
  // Old: margin: 0 auto 40px; padding-bottom: 35px; (total ~75px of blank gap below the hairline)
  // New: margin: 0 auto 16px; padding-bottom: 18px; (compact, balanced gap)
  html = html.replace(
    /\.monograph-page-header\s*\{[\s\S]*?margin:\s*0\s+auto\s+40px;[\s\S]*?padding-bottom:\s*35px;\s*\}/,
    `.monograph-page-header {
  max-width: 1380px;
  margin: 0 auto 14px;
  border-bottom: 1px solid #D0C7C5;
  padding-bottom: 18px;
}`
  );

  // Also reduce wheel-gallery-section top margin from 10px to 0
  html = html.replace(
    /margin:\s*10px\s+0\s+10px;/,
    'margin: 0 0 10px;'
  );

  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('Compacted header whitespace in', indexPath);
}

compactHeaderSpace('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only');
compactHeaderSpace('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO');
