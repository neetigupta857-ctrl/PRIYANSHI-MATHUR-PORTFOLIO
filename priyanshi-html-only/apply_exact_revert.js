const fs = require('fs');

let html = fs.readFileSync('E:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html.bak', 'utf8');

// 1. Apply removeStartAConversation (from step 675)
html = html.replace(
  /<div class="monograph-cta-band">[\s\S]*?\${buttonLink\("Start a conversation",\s*"contact",\s*"btn primary"\)}[\s\S]*?<\/div>/,
  ''
);
html = html.replace(
  '${buttonLink("Start a conversation", "contact", "btn primary")}',
  ''
);

// 2. Apply fix_scroll_top (from step 700)
if (!html.includes("history.scrollRestoration = 'manual'")) {
  html = html.replace(
    'window.addEventListener("hashchange", render);',
    "if ('scrollRestoration' in history) history.scrollRestoration = 'manual';\nwindow.addEventListener('hashchange', render);"
  );
}

// 3. Apply removeProjectCounts (from step 714)
html = html.replace(
  /<div class="wheel-counter">\$\{arr\.length\}\s*PROJECTS<\/div>/g,
  ''
);
html = html.replace(
  /<div class="wheel-counter">[^<]*<\/div>/g,
  ''
);
html = html.replace(
  /<span class="filter-count"><strong>\$\{String\(arr\.length\)[^<]*<\/strong>[^<]*<\/span>/g,
  '<span class="filter-count">CURATED ASSIGNMENTS &amp; DRAFTING SHEETS</span>'
);
html = html.replace(
  /<span class="filter-count"><strong>[^<]*<\/strong>\s*SELECTED DESIGN WORKS<\/span>/g,
  '<span class="filter-count">SELECTED DESIGN WORKS</span>'
);
html = html.replace(
  /\.wheel-counter\s*\{[^}]*\}/g,
  '.wheel-counter { display: none !important; }'
);

// 4. Apply compactHeaderSpace (from step 729)
html = html.replace(
  /\.monograph-page-header\s*\{[\s\S]*?margin:\s*0\s+auto\s+40px;[\s\S]*?padding-bottom:\s*35px;\s*\}/,
  `.monograph-page-header {
  max-width: 1380px;
  margin: 0 auto 14px;
  border-bottom: 1px solid #D0C7C5;
  padding-bottom: 18px;
}`
);
html = html.replace(
  /margin:\s*10px\s+0\s+10px;/,
  'margin: 0 0 10px;'
);

// 5. Apply compactInteriorGaps (from step 743)
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
html = html.replace(
  /\.project-grid\s*\{[\s\S]*?gap:\s*40px\s+24px;/,
  `.project-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 28px 20px;`
);

// Write to index.html and sync
fs.writeFileSync('index.html', html, 'utf8');
fs.writeFileSync('E:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html', html, 'utf8');

console.log('Successfully reverted index.html in both workspaces to exact step 751 state! Total length:', html.length);
