const fs = require('fs');

function compactInteriorGaps(dir) {
  const indexPath = dir + '/index.html';
  if (!fs.existsSync(indexPath)) return;
  let html = fs.readFileSync(indexPath, 'utf8');

  // 1. Compact .monograph-filter-band
  // Old: margin: 0 auto 40px; padding: 16px 0;
  // New: margin: 0 auto 24px; padding: 12px 0;
  html = html.replace(
    /\.monograph-filter-band\s*\{[\s\S]*?margin:\s*0\s+auto\s+40px;[\s\S]*?padding:\s*16px\s+0;/,
    `.monograph-filter-band {
  max-width: 1380px;
  margin: 0 auto 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;`
  );

  // 2. Compact project-grid gaps
  // Old: gap: 40px 24px;
  // New: gap: 28px 20px;
  html = html.replace(
    /\.project-grid\s*\{[\s\S]*?gap:\s*40px\s+24px;/,
    `.project-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 28px 20px;`
  );

  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('Compacted interior page whitespace in', indexPath);
}

compactInteriorGaps('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only');
compactInteriorGaps('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO');
