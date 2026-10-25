const fs = require('fs');

const pathC = 'c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html';
const content = fs.readFileSync(pathC, 'utf8');

// Let's inspect where 01, 02, 03 are located in HTML
const regex = /(?:>|\n)[^<>\n]*(?:01|02|03|SPATIAL|VISUALISATION|ABOUT|ARCHITECTURAL|TECHNICAL|PHILOSOPHY)[^<>\n]*(?:<|\n)/gi;
let match;
const matches = [];
while ((match = regex.exec(content)) !== null) {
  const txt = match[0].trim().replace(/^[>\n]+|[<\n]+$/g, '').trim();
  if (txt.length > 0 && txt.length < 100) {
    matches.push(txt);
  }
}
console.log('Sample text matches:', [...new Set(matches)].slice(0, 30));
