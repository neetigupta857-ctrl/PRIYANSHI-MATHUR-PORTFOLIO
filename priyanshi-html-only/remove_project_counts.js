const fs = require('fs');

function removeProjectCounts(dir) {
  const indexPath = dir + '/index.html';
  if (!fs.existsSync(indexPath)) return;
  let html = fs.readFileSync(indexPath, 'utf8');

  // 1. Remove the wheel-counter in 3D visualization page
  html = html.replace(
    /<div class="wheel-counter">\$\{arr\.length\}\s*PROJECTS<\/div>/g,
    ''
  );
  html = html.replace(
    /<div class="wheel-counter">[^<]*<\/div>/g,
    ''
  );

  // 2. Remove the filter-count numbers in interior / drafting page
  html = html.replace(
    /<span class="filter-count"><strong>\$\{String\(arr\.length\)[^<]*<\/strong>[^<]*<\/span>/g,
    '<span class="filter-count">CURATED ASSIGNMENTS &amp; DRAFTING SHEETS</span>'
  );
  html = html.replace(
    /<span class="filter-count"><strong>[^<]*<\/strong>\s*SELECTED DESIGN WORKS<\/span>/g,
    '<span class="filter-count">SELECTED DESIGN WORKS</span>'
  );

  // 3. Remove .wheel-counter styling or hide it
  html = html.replace(
    /\.wheel-counter\s*\{[^}]*\}/g,
    '.wheel-counter { display: none !important; }'
  );

  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('Removed project count indicators in', indexPath);
}

removeProjectCounts('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only');
removeProjectCounts('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO');
