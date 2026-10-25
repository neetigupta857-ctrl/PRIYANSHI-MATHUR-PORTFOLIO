const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const checks = [
  'id="pdfCover"',
  'page1_img0.jpg',
  'id="aboutTeaser"',
  'material_flatlay.jpg',
  'split-btn-interior',
  'split-btn-vis',
  'id="aboutIntroSection"',
  'priyanshi_portrait.jpg',
  'id="contactSlideSection"',
  'priyamathur2700@gmail.com',
  'worksWheelMount',
  'capital-assignment-01-portfolio',
  'CAPITAL/Priyanshi_Assignment_01 .pdf'
];

checks.forEach(c => {
  console.log(c, '->', html.includes(c) ? 'PRESENT' : 'MISSING');
});
