const fs = require('fs');

function compactSpace(dir) {
  const indexPath = dir + '/index.html';
  const scriptPath = dir + '/script.js';

  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf8');

    // 1. Remove 3rem padding-bottom on monograph-page-body
    html = html.replace(
      '<section class="monograph-page-body" style="padding-bottom: 3rem;">',
      '<section class="monograph-page-body" style="padding-bottom: 0;">'
    );

    // 2. Reduce monograph-page-article bottom padding
    html = html.replace(
      'padding: 130px 6vw 90px;',
      'padding: 130px 6vw 20px;'
    );

    // 3. Compact .wheel-gallery-section bottom margin
    html = html.replace(
      'margin: 10px 0 60px;',
      'margin: 10px 0 10px;'
    );

    // 4. Reduce wheel container height from 680px to 560px for a clean, tight fit without wasted space
    html = html.replace(
      /height:\s*680px;\s*min-height:\s*40rem;/g,
      'height: 560px; min-height: 34rem;'
    );
    html = html.replace(
      /style="height:\s*680px;\s*min-height:\s*40rem;"/g,
      'style="height: 560px; min-height: 34rem;"'
    );

    // 5. Compact footer padding from 50px 7vw 32px to 28px 7vw 20px, and margin-top from 50px to 18px
    html = html.replace(
      'footer{padding:50px 7vw 32px;',
      'footer{padding:28px 7vw 20px;'
    );
    html = html.replace(
      'margin-top:50px;padding-top:18px;border-top:1px solid rgba(59,74,68,0.18)',
      'margin-top:20px;padding-top:14px;border-top:1px solid rgba(59,74,68,0.18)'
    );

    fs.writeFileSync(indexPath, html, 'utf8');
    console.log('Compacted whitespace in', indexPath);
  }

  if (fs.existsSync(scriptPath)) {
    let js = fs.readFileSync(scriptPath, 'utf8');

    // Update fallback height in getMetrics
    js = js.replace(
      'mount.clientHeight || 820;',
      'mount.clientHeight || 560;'
    );

    fs.writeFileSync(scriptPath, js, 'utf8');
    console.log('Updated script metrics in', scriptPath);
  }
}

compactSpace('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only');
compactSpace('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO');
