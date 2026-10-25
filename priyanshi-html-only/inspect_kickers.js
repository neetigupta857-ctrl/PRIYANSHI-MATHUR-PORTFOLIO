const fs = require('fs');

const pathC = 'c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html';
const s = fs.readFileSync(pathC, 'utf8');

const m = s.match(/<[^>]+class="[^"]*(?:overline|kicker|eyebrow|tag|stream|badge|spec|curved|split|about|monograph)[^"]*"[^>]*>[^<]*<\/[^>]+>/gi);
console.log('Count:', m ? m.length : 0);
if (m) {
  const unique = [...new Set(m.map(x => x.trim()))];
  console.log('Unique tags (' + unique.length + '):');
  unique.forEach(u => console.log(u));
}
