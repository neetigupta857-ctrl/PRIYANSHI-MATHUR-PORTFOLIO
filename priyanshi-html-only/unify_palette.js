const fs = require('fs');

const pathC = 'c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html';
const pathE = 'E:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html';

function unifyPalette(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const initialLength = content.length;

  // 1. Split Panel Left (.split-panel-left .split-overline): "01 — SPATIAL DESIGN"
  content = content.replace(
    /(\.split-panel-left\s+\.split-overline\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#4a121b$2'
  );

  // 2. About Intro Overline (.about-intro-overline): "03 — ABOUT THE DESIGNER"
  content = content.replace(
    /(\.about-intro-overline\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#4a121b$2'
  );

  // 3. About More Link on hover (.about-more-link:hover)
  content = content.replace(
    /(\.about-more-link:hover\s*\{[^}]*?color:\s*)[^;]+(;[^}]*?border-bottom-color:\s*)[^;]+(;)/g,
    '$1#4a121b$2#4a121b$3'
  );

  // 4. Standalone About Editorial Overline (.about-editorial-overline): "01 — PHILOSOPHY & PRACTICE", "02 — CREDENTIALS", "03 — CAPABILITIES"
  content = content.replace(
    /(\.about-editorial-overline\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#4a121b$2'
  );

  // 5. About editorial italic accent (.about-editorial-headline em)
  content = content.replace(
    /(\.about-editorial-headline\s+em\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#4a121b$2'
  );

  // 6. About stream entry index (.about-stream-entry-index): "01.", "02.", "03."
  content = content.replace(
    /(\.about-stream-entry-index\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#4a121b$2'
  );

  // 7. About stream entry tag (.about-stream-entry-tag): "Core Discipline", "Digital Craft", "Methodology" -> Antique Champagne Bronze #8c6d53
  content = content.replace(
    /(\.about-stream-entry-tag\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#8c6d53$2'
  );

  // 8. About credential label (.about-credential-label): "EDUCATION", "DEGREE & DIPLOMA", etc. -> Antique Champagne Bronze #8c6d53
  content = content.replace(
    /(\.about-credential-label\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#8c6d53$2'
  );

  // 9. About caps subgroup title tag (.about-caps-subgroup-title span): "DIGITAL TOOLS", "AREAS OF PRACTICE" -> Antique Champagne Bronze #8c6d53
  content = content.replace(
    /(\.about-caps-subgroup-title\s+span\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#8c6d53$2'
  );

  // 10. About tag badge hover (.about-tag-badge:hover)
  content = content.replace(
    /(\.about-tag-badge:hover\s*\{[^}]*?border-color:\s*)[^;]+(;[^}]*?color:\s*)[^;]+(;[^}]*?box-shadow:\s*0\s+4px\s+12px\s+)rgba\([^)]+\)(;)/g,
    '$1#4a121b$2#4a121b$3rgba(74, 18, 27, 0.12)$4'
  );

  // 11. About tag badge featured (.about-tag-badge.featured)
  content = content.replace(
    /(\.about-tag-badge\.featured\s*\{[^}]*?border-color:\s*)[^;]+(;[^}]*?background:\s*)rgba\([^)]+\)(;)/g,
    '$1rgba(140, 109, 83, 0.45)$2rgba(140, 109, 83, 0.08)$3'
  );

  // 12. Monograph kicker (.monograph-kicker): "01 — ARCHITECTURAL 3D VISUALISATION", "02 — INTERIOR DESIGN & TECHNICAL DRAFTING"
  content = content.replace(
    /(\.monograph-kicker\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#4a121b$2'
  );

  // 13. Monograph title em (.monograph-page-title em)
  content = content.replace(
    /(\.monograph-page-title\s+em\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#4a121b$2'
  );

  // 14. Monograph filter spec tag (.monograph-filter-band .filter-spec-tag): "ACADEMIC & STUDIO ARCHIVE / CAPITAL" -> Antique Champagne Bronze #8c6d53
  content = content.replace(
    /(\.monograph-filter-band\s+\.filter-spec-tag\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#8c6d53$2'
  );

  // 15. Wheel tag (.wheel-tag): "01.0 / 3D VISUALISATION GALLERY" -> Antique Champagne Bronze #8c6d53
  content = content.replace(
    /(\.wheel-tag\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#8c6d53$2'
  );

  // 16. Wheel active badge (.wheel-active-badge) -> Antique Champagne Bronze #8c6d53
  content = content.replace(
    /(\.wheel-active-badge\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#8c6d53$2'
  );

  // 17. Case study eyebrow (.case-hero .eyebrow): "01 / Project overview", etc. -> Deep Wine Burgundy #4a121b
  content = content.replace(
    /(\.case-hero\s+\.eyebrow\s*\{[^}]*?color:\s*)[^;]+!important(;)/g,
    '$1#4a121b !important$2'
  );

  // 18. Case study metadata labels (.case-info label): "Project Type", "Location", "Year", "Role" -> Antique Champagne Bronze #8c6d53
  content = content.replace(
    /(\.case-info\s+label\s*\{[^}]*?color:\s*)[^;]+!important(;)/g,
    '$1#8c6d53 !important$2'
  );

  // 19. Case copy eyebrows (.case-copy .eyebrow, .section-head .eyebrow, .availability .eyebrow) -> Deep Wine Burgundy #4a121b
  content = content.replace(
    /(\.case-copy\s+\.eyebrow,\s*\n\s*\.section-head\s+\.eyebrow,\s*\n\s*\.availability\s+\.eyebrow\s*\{[^}]*?color:\s*)[^;]+!important(;)/g,
    '$1#4a121b !important$2'
  );

  // 20. Case copy strong section headers -> Deep Wine Burgundy #4a121b
  content = content.replace(
    /(\.case-copy\s+strong\[style\*="var\(--sand\)"\],\s*\n\s*\.case-copy\s+strong\s*\{[^}]*?color:\s*)[^;]+!important(;)/g,
    '$1#4a121b !important$2'
  );

  // 21. Hairlines: .about-editorial-hairline and .monograph-kicker-hairline
  // Set hairline divider to soft champagne bronze hairline rgba(140, 109, 83, 0.3)
  content = content.replace(
    /(\.about-editorial-hairline\s*\{[^}]*?background:\s*)[^;]+(;)/g,
    '$1rgba(140, 109, 83, 0.3)$2'
  );
  content = content.replace(
    /(\.monograph-kicker-hairline\s*\{[^}]*?background:\s*)[^;]+(;)/g,
    '$1rgba(140, 109, 83, 0.3)$2'
  );

  // 22. Cursor follower hovering border
  content = content.replace(
    /(\.cursor-follower-border\.is-hovering\s*\{[^}]*?border-color:\s*)[^;]+(;[^}]*?background-color:\s*)rgba\([^)]+\)(;)/g,
    '$1#4a121b$2rgba(74, 18, 27, 0.08)$3'
  );

  // 23. Contact slide overline (.contact-slide-overline) -> Deep Wine Burgundy #4a121b
  content = content.replace(
    /(\.contact-slide-overline\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#4a121b$2'
  );

  // 24. Contact detail item hover & icon circle (.contact-detail-item:hover .contact-icon-circle and .contact-icon-circle)
  content = content.replace(
    /(\.contact-detail-item:hover\s+\.contact-icon-circle\s*\{[^}]*?border-color:\s*)[^;]+(;[^}]*?color:\s*[^;]+;[^}]*?background:\s*)rgba\([^)]+\)(;)/g,
    '$1#4a121b$2rgba(74, 18, 27, 0.18)$3'
  );
  content = content.replace(
    /(\.contact-icon-circle\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#8c6d53$2'
  );

  // 25. Walkthrough action button hover (.walkthrough-action-btn:hover)
  content = content.replace(
    /(\.walkthrough-action-btn:hover\s*\{[^}]*?background:\s*)[^;]+(;[^}]*?color:\s*[^;]+;[^}]*?border-color:\s*)[^;]+(;)/g,
    '$1#4a121b$2#4a121b$3'
  );

  // 26. Contact slide footer span last-child -> Antique Champagne Bronze #8c6d53
  content = content.replace(
    /(\.contact-slide-footer\s+span:last-child\s*\{[^}]*?color:\s*)[^;]+(;)/g,
    '$1#8c6d53$2'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated:', filePath, '(length:', initialLength, '->', content.length, ')');
}

unifyPalette(pathC);
unifyPalette(pathE);
