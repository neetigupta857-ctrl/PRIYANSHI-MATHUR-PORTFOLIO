const fs = require('fs');
const filePath = 'index.html';
let content = fs.readFileSync(filePath, 'utf8');

const target = 'if(document.getElementById("aboutTeaser"))document.getElementById("aboutTeaser").hidden=page!=="home";';
const replacement = 'if(document.getElementById("aboutTeaser"))document.getElementById("aboutTeaser").hidden=page!=="home";if(document.getElementById("aboutIntroSection"))document.getElementById("aboutIntroSection").hidden=page!=="home";';

if (content.indexOf(target) !== -1) {
  content = content.replace(target, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated render logic for aboutIntroSection');
} else {
  console.log('Target string not found');
}
