const fs = require('fs');

function compact(path) {
  let html = fs.readFileSync(path, 'utf8');

  // 1. Compact header space (step 729)
  html = html.replace(
    /\.monograph-page-header\s*\{[\s\S]*?margin:\s*0\s+auto\s+30px;[\s\S]*?padding-bottom:\s*24px;\s*\}/,
    `.monograph-page-header {
  max-width: 1380px;
  margin: 0 auto 14px;
  border-bottom: 1px solid #D0C7C5;
  padding-bottom: 18px;
}`
  );

  // 2. Compact interior filter band and project-grid (step 743)
  html = html.replace(
    /\.monograph-filter-band\s*\{[\s\S]*?margin-bottom:\s*32px;/,
    `.monograph-filter-band {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-top: 1px solid #D0C7C5;
  border-bottom: 1px solid #D0C7C5;
  margin-bottom: 24px;`
  );

  html = html.replace(
    /\.project-grid\s*\{[\s\S]*?gap:\s*40px\s+24px;/,
    `.project-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 28px 20px;`
  );

  fs.writeFileSync(path, html, 'utf8');
}

compact('index.html');
compact('E:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html');
console.log('Compacted whitespace rules applied successfully in both workspaces!');
