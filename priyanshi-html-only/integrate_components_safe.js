const fs = require('fs');

function restoreCustomComponents(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Update render() to call initWorksWheel when page is "visualisation"
  const oldRenderWheelCheck = `if(typeof window.initScrollAnimations==="function"){setTimeout(window.initScrollAnimations,60);}}`;
  const newRenderWheelCheck = `if(page==="visualisation"&&typeof window.initWorksWheel==="function"){setTimeout(window.initWorksWheel,40);}if(typeof window.initScrollAnimations==="function"){setTimeout(window.initScrollAnimations,60);}}`;

  if (!html.includes('initWorksWheel') && html.includes(oldRenderWheelCheck)) {
    html = html.replace(oldRenderWheelCheck, newRenderWheelCheck);
    console.log('Updated render() to initialize WorksWheel in', filePath);
  }

  // 2. Re-integrate WorksWheel container into indexPage for visualisation
  // Locate indexPage
  let pStart = html.indexOf('function indexPage(key) {');
  if (pStart === -1) pStart = html.indexOf('function indexPage(key){');
  let pEnd = html.indexOf('function casePage(id) {');
  if (pEnd === -1) pEnd = html.indexOf('function casePage(id){');

  if (pStart !== -1 && pEnd !== -1) {
    const newIndexPage = `function indexPage(key) {
  const isV = key === "visualisation";
  const arr = projects.filter(p => isV ? p.categoryKey === "visualisation" : (p.categoryKey === "interior" || p.categoryKey === "interior-design"));
  
  if (isV) {
    return \`
    <article class="monograph-page-article" aria-label="Architectural 3D Visualisation">
      <div class="monograph-page-header">
        <div class="monograph-kicker-line">
          <span class="monograph-kicker">01 — ARCHITECTURAL 3D VISUALISATION</span>
          <span class="monograph-kicker-hairline"></span>
        </div>
        <h1 class="monograph-page-title">Architecture in <em>perspective.</em></h1>
        <p class="monograph-page-lede">Authentic architectural 3D renders exploring form, light, materiality, and spatial atmosphere. Sourced exclusively from authentic project archives including grand wedding venues, coastal villas, and luxury residential architecture.</p>
      </div>

      <section class="monograph-page-body" style="padding-bottom: 0;">
        <section class="wheel-gallery-section" aria-label="3D Works Interactive Wheel">
          <div class="wheel-intro-bar">
            <div>
              <span class="wheel-tag">01.0 / 3D VISUALISATION GALLERY</span>
              <span class="wheel-hint">Scroll down or drag vertically to explore studies · Click card to open case study</span>
            </div>
            <div class="wheel-counter" style="display: none !important;"></div>
          </div>
          <div id="worksWheelMount" class="works-wheel-section" style="height: 560px; min-height: 34rem;"></div>
        </section>
      </section>
    </article>\`;
  }

  return \`
  <article class="monograph-page-article" aria-label="Interior Design &amp; Spatial Planning">
    <div class="monograph-page-header">
      <div class="monograph-kicker-line">
        <span class="monograph-kicker">02 — INTERIOR DESIGN &amp; TECHNICAL DRAFTING</span>
        <span class="monograph-kicker-hairline"></span>
      </div>
      <h1 class="monograph-page-title">Drafting, geometry &amp; <em>space.</em></h1>
      <p class="monograph-page-lede">Academic and professional technical drafting assignments, descriptive geometry studies, construction detailing, and spatial planning coursework sourced exclusively from authentic project archives at Capital Education, Dubai.</p>
    </div>

    <section class="monograph-page-body">
      <div class="monograph-filter-band">
        <div class="filter-band-left">
          <span class="filter-spec-tag">ACADEMIC &amp; STUDIO ARCHIVE / CAPITAL</span>
          <span class="filter-count">CURATED ASSIGNMENTS &amp; DRAFTING SHEETS</span>
        </div>
        <div class="filter-band-right">
          <span class="filter-source-note">Technical Drafting · Geometry · Spatial Planning · Capital Education, Dubai</span>
        </div>
      </div>

      <div class="project-grid">
        \${arr.map((p, i) => card(p, i, false)).join("")}
      </div>
    </section>
  </article>\`;
}

`;

    html = html.slice(0, pStart) + newIndexPage + html.slice(pEnd);
    console.log('Successfully re-integrated WorksWheel into indexPage in', filePath);
  }

  fs.writeFileSync(filePath, html, 'utf8');
}

restoreCustomComponents('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html');
restoreCustomComponents('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html');
console.log('Custom component restoration complete!');
