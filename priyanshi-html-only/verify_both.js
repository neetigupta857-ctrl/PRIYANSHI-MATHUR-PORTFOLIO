const fs = require('fs');

const checks = [
  'id="pdfCover"',
  'page1_img0.jpg',
  'INTERIOR ARCHITECTURE &amp; 3D VISUALISATION',
  'id="aboutTeaser"',
  'material_flatlay.jpg',
  'id="aboutIntroSection"',
  'priyanshi_portrait.jpg',
  'id="contactSlideSection"',
  'worksWheelMount',
  'capital-assignment-01-portfolio',
  'CAPITAL/Priyanshi_Assignment_01 .pdf'
];

['c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html', 'e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html'].forEach(f => {
  console.log('--- Checking ' + f + ' ---');
  const content = fs.readFileSync(f, 'utf8');
  checks.forEach(c => {
    console.log(c, '->', content.includes(c) ? 'PRESENT' : 'MISSING');
  });
});
