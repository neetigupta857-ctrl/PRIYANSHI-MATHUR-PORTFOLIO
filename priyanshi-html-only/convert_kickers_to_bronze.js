const fs = require('fs');

const pathC = 'c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html';
const pathE = 'E:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html';

function convertKickersToBronze(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const initialLength = content.length;

  // 1. .about-editorial-overline (e.g. "01 — PHILOSOPHY & PRACTICE", "02 — CREDENTIALS & FOUNDATIONS", "03 — CAPABILITIES")
  content = content.replace(
    /(\.about-editorial-overline\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#8c6d53$2'
  );

  // 2. .about-stream-entry-tag (e.g. "Core Discipline", "Digital Craft", "Methodology")
  content = content.replace(
    /(\.about-stream-entry-tag\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#8c6d53$2'
  );

  // 3. .about-intro-overline (e.g. "03 — ABOUT THE DESIGNER")
  content = content.replace(
    /(\.about-intro-overline\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#8c6d53$2'
  );

  // 4. .split-panel-left .split-overline (e.g. "01 — SPATIAL DESIGN")
  content = content.replace(
    /(\.split-panel-left\s+\.split-overline\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#8c6d53$2'
  );

  // 5. .monograph-kicker (e.g. "01 — ARCHITECTURAL 3D VISUALISATION", "02 — INTERIOR DESIGN & TECHNICAL DRAFTING")
  content = content.replace(
    /(\.monograph-kicker\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#8c6d53$2'
  );

  // 6. .case-hero .eyebrow & .case-copy .eyebrow, .section-head .eyebrow, .availability .eyebrow
  content = content.replace(
    /(\.case-hero\s+\.eyebrow\s*\{[^}]*?color:\s*)[^;]+!important(;)/g,
    '$1#8c6d53 !important$2'
  );
  content = content.replace(
    /(\.case-copy\s+\.eyebrow,\s*\n\s*\.section-head\s+\.eyebrow,\s*\n\s*\.availability\s+\.eyebrow\s*\{[^}]*?color:\s*)[^;]+!important(;)/g,
    '$1#8c6d53 !important$2'
  );

  // 7. .contact-slide-overline ("GET IN TOUCH")
  content = content.replace(
    /(\.contact-slide-overline\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#8c6d53$2'
  );

  // 8. .about-stream-entry-index ("01.", "02.", "03.") -> set to #8c6d53 for full bronze harmonization
  content = content.replace(
    /(\.about-stream-entry-index\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#8c6d53$2'
  );

  // 9. .about-editorial-headline em and .monograph-page-title em
  // Keep burgundy or bronze? The prompt says "Change all small uppercase kicker labels and tags (like 'PHILOSOPHY & PRACTICE', 'CORE DISCIPLINE', 'DIGITAL CRAFT', 'METHODOLOGY') from salmon/coral to antique bronze (#8c6d53)"
  // The italic ems are in headlines, but let's check .about-editorial-overline and .about-stream-entry-tag specifically.

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated:', filePath, '(length:', initialLength, '->', content.length, ')');
}

convertKickersToBronze(pathC);
convertKickersToBronze(pathE);
