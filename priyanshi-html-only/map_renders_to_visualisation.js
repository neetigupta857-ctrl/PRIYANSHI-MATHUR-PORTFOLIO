const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Define authentic 3D Visualisation projects pulling EXCLUSIVELY from RENDERS folder
const authenticRendersProjects = [
  {
    id: "regency-grand-wedding-venue",
    title: "Regency Grand Wedding Venue",
    category: "3D Visualisation",
    categoryKey: "visualisation",
    type: "Bespoke Hospitality & Grand Event Pavilion",
    location: "Commercial Hospitality Sector",
    year: "2024 · Studio Architectural Render",
    role: "Photorealistic 3D Modeling, Texturing & Volumetric Lighting",
    software: "3ds Max · Corona Renderer · Adobe Photoshop",
    image: "RENDERS/REGENCY HALL/1.jpg",
    images: [
      "RENDERS/REGENCY HALL/1.jpg",
      "RENDERS/REGENCY HALL/2.jpg",
      "RENDERS/REGENCY HALL/3.jpg",
      "RENDERS/REGENCY HALL/4.jpg",
      "RENDERS/REGENCY HALL/5.jpg",
      "RENDERS/REGENCY HALL/6.jpg"
    ],
    description: "An authentic architectural 3D CGI rendering study of a grand wedding venue and luxury banquet hall, exploring monumental double-height volumes, opulent crystal chandeliers, tiered coffered ceilings, and atmospheric warm evening lighting.",
    brief: "Develop high-resolution photorealistic architectural renderings for an expansive luxury event and wedding destination to communicate material opulence and immersive guest circulation.",
    concept: "Symmetrical classical framing paired with dramatic warm cove illumination, polished Italian marble flooring reflections, and tailored acoustic wall paneling.",
    materials: "Polished Crema Marfil marble · warm brass trims · acoustical upholstered velvet wall panels · crystal lighting"
  },
  {
    id: "goa-coastal-villa-pavilion",
    title: "Goa Coastal Villa & Sanctuary",
    category: "3D Visualisation",
    categoryKey: "visualisation",
    type: "Tropical Modernist Residential Architecture",
    location: "Goa, Coastal India",
    year: "2024 · Studio 3D Visualisation",
    role: "Architectural 3D CGI & Daylight Simulation",
    software: "3ds Max · Corona Renderer · Forest Pack",
    image: "RENDERS/GOA VILLA/1.jpg",
    images: [
      "RENDERS/GOA VILLA/1.jpg",
      "RENDERS/GOA VILLA/2.jpg",
      "RENDERS/GOA ROOM/1.jpg",
      "RENDERS/GOA ROOM/2.jpg",
      "RENDERS/GOA ROOM/3.jpg",
      "RENDERS/GOA ROOM/4.jpg"
    ],
    description: "A tropical coastal residence study exploring indoor-outdoor connectivity, natural louvered shading, textured laterite stone walls, and tranquil reflections along a private lap pool pavilion.",
    brief: "Capture the tactile serenity of a private sanctuary villa in Goa under both crisp zenith tropical daylight and golden dusk hour.",
    concept: "Framed deep overhangs, perforated timber screens filtering sunlight into dramatic shadow patterns, and seamless polished concrete floor transitions to the outdoor terrace.",
    materials: "Exposed architectural concrete · teak louvers · Goan laterite stone · natural water features"
  },
  {
    id: "havelock-island-resort-suites",
    title: "Havelock Island Resort Pavilion",
    category: "3D Visualisation",
    categoryKey: "visualisation",
    type: "Island Hospitality & Waterfront Suites",
    location: "Havelock Island, Andaman",
    year: "2024 · Hospitality CGI Study",
    role: "Environmental Modeling & Architectural Visualisation",
    software: "3ds Max · Corona Renderer · Photoshop",
    image: "RENDERS/HAVELOCK ISLAND/1.jpg",
    images: [
      "RENDERS/HAVELOCK ISLAND/1.jpg",
      "RENDERS/HAVELOCK ISLAND/2.jpg"
    ],
    description: "Architectural 3D exploration of an island luxury retreat nestled along the oceanfront, focusing on sustainable organic timber structures, wide thatched decks, and panoramic marine vistas.",
    brief: "Model and render bespoke waterfront guest villas seamlessly embedded within dense island flora and coastal shores.",
    concept: "Elevated timber stilts minimizing site disturbance, panoramic low-iron glass facades, and natural woven rattan textures reflecting the island vernacular.",
    materials: "Weathered reclaimed timber · woven wicker · textured lime plaster · low-E architectural glazing"
  },
  {
    id: "manan-gurugram-luxury-residence",
    title: "Manan Residence, Gurugram",
    category: "3D Visualisation",
    categoryKey: "visualisation",
    type: "Luxury Urban Villa & Spatial Architecture",
    location: "Gurugram, NCR",
    year: "2024 · Architectural CGI Portfolio",
    role: "3D Visualisation, Camera Composition & Materials",
    software: "3ds Max · Corona · Adobe Photoshop",
    image: "RENDERS/MANAN GURUGRAM/1.jpg",
    images: [
      "RENDERS/MANAN GURUGRAM/1.jpg",
      "RENDERS/MANAN GURUGRAM/2.jpg",
      "RENDERS/MANAN GURUGRAM/3.jpg",
      "RENDERS/MANAN GURUGRAM/4.jpg",
      "RENDERS/MANAN GURUGRAM/5.jpg",
      "RENDERS/MANAN GURUGRAM/6.jpg",
      "RENDERS/MANAN GURUGRAM/7.jpg",
      "RENDERS/MANAN GURUGRAM/8.jpg",
      "RENDERS/MANAN GURUGRAM/9.jpg",
      "RENDERS/MANAN GURUGRAM/10.jpg"
    ],
    description: "An authentic architectural rendering collection for a premier multi-level residence in Gurugram, highlighting monumental double-height living areas, sculptural feature walls, and tailored material contrasts.",
    brief: "Produce a comprehensive photorealistic visual sequence showcasing both interior living expanses and exterior facade composition.",
    concept: "Interlocking cubic geometry, bookmatched marble backdrops, integrated architectural cove channels, and floor-to-ceiling glass systems.",
    materials: "Bookmatched Statuario marble · fluted acoustic walnut · brushed bronze hardware · neutral upholstery"
  },
  {
    id: "arora-residence-contemporary-living",
    title: "Arora Residence Masterwork",
    category: "3D Visualisation",
    categoryKey: "visualisation",
    type: "Contemporary Private Residence",
    location: "New Delhi",
    year: "2024 · Residential CGI Study",
    role: "Photorealistic Lighting, Scene Assembly & Camera Choreography",
    software: "3ds Max · Corona Renderer · Photoshop",
    image: "RENDERS/ARORA RESIDENCE/1.jpg",
    images: [
      "RENDERS/ARORA RESIDENCE/1.jpg",
      "RENDERS/ARORA RESIDENCE/2.jpg",
      "RENDERS/ARORA RESIDENCE/3.jpg",
      "RENDERS/ARORA RESIDENCE/4.jpg",
      "RENDERS/ARORA RESIDENCE/5.jpg",
      "RENDERS/ARORA RESIDENCE/6.jpg"
    ],
    description: "Contemporary residential 3D visualization study highlighting spacious open-plan living, refined private master suites, custom vanity millwork, and balanced artificial lighting fixtures.",
    brief: "Generate detailed photorealistic visuals depicting spatial circulation, custom joinery, and warm, inviting interior ambience.",
    concept: "Calibrated color temperatures between functional 4000K recessed downlights and ambient 2700K indirect coves, accentuating natural wood textures.",
    materials: "Smoked oak cabinetry · satin brass hardware · large-format porcelain slabs · textured wall finishes"
  },
  {
    id: "77-arvind-gupta-residence",
    title: "77 Arvind Gupta Villa",
    category: "3D Visualisation",
    categoryKey: "visualisation",
    type: "Private Residential Architecture",
    location: "NCR",
    year: "2024 · Studio 3D Visualisation",
    role: "Architectural 3D Modeling & Photorealistic Rendering",
    software: "3ds Max · Corona Renderer",
    image: "RENDERS/77 ARVIND GUPTA/1.jpg",
    images: [
      "RENDERS/77 ARVIND GUPTA/1.jpg",
      "RENDERS/77 ARVIND GUPTA/2.jpg",
      "RENDERS/77 ARVIND GUPTA/3.jpg",
      "RENDERS/77 ARVIND GUPTA/4.jpg",
      "RENDERS/77 ARVIND GUPTA/5.jpg",
      "RENDERS/77 ARVIND GUPTA/6.jpg"
    ],
    description: "A complete architectural 3D rendering suite showcasing exterior facade articulation, landscaped courtyard integration, and refined spatial zoning.",
    brief: "Create realistic exterior and interior perspectives displaying material joints, glazing reflections, and architectural volume.",
    concept: "Crisp rectilinear volumes balanced with organic green landscapes and textured stone cladding.",
    materials: "Granite cladding · dark charcoal aluminum louvers · clear structural glass"
  },
  {
    id: "vrindavan-sanctuary-3d",
    title: "Vrindavan Spiritual Sanctuary",
    category: "3D Visualisation",
    categoryKey: "visualisation",
    type: "Spiritual Architecture & Meditation Pavilion",
    location: "Vrindavan, Uttar Pradesh",
    year: "2024 · 3D Architectural Visualisation",
    role: "Spatial Modeling, Traditional Elements & Lighting",
    software: "3ds Max · Corona · Photoshop",
    image: "RENDERS/VRINDAVAN 3D/1.jpg",
    images: [
      "RENDERS/VRINDAVAN 3D/1.jpg",
      "RENDERS/VRINDAVAN 3D/2.jpg",
      "RENDERS/VRINDAVAN 3D/3.jpg",
      "RENDERS/VRINDAVAN 3D/4.jpg"
    ],
    description: "A serene architectural and spatial 3D study dedicated to meditative sanctuaries, featuring classical stone arches, intricate jali screens, and diffused golden natural illumination.",
    brief: "Communicate sacred spatial proportions, tranquil atmosphere, and traditional architectural detailing through photorealistic CGI.",
    concept: "Jali screen light perforations casting dynamic spiritual shadow patterns across quiet marble floors throughout the day.",
    materials: "Sandstone carvings · hand-carved jali panels · pure white Makrana marble · brass oil fixtures"
  },
  {
    id: "suite-room-hospitality-concept",
    title: "Executive Suite & Luxury Hospitality",
    category: "3D Visualisation",
    categoryKey: "visualisation",
    type: "Boutique Hotel Suite Design",
    location: "Hospitality Concept",
    year: "2024 · 3D Interior Visualisation",
    role: "Interior 3D Rendering & Material Direction",
    software: "3ds Max · Corona Renderer",
    image: "RENDERS/SUITE ROOM/1.jpg",
    images: [
      "RENDERS/SUITE ROOM/1.jpg",
      "RENDERS/SUITE ROOM/2.jpg",
      "RENDERS/SUITE ROOM/3.jpg",
      "RENDERS/SUITE ROOM/4.jpg"
    ],
    description: "High-end boutique hospitality suite render exploring tailored guest comfort, custom headboard millwork, integrated reading fixtures, and ensuite connectivity.",
    brief: "Visualize an intimate yet spacious luxury hotel room highlighting acoustic warmth and bespoke joinery.",
    concept: "Low-glare indirect lighting concealed behind wall panels, neutral linen textures, and warm walnut furnishings.",
    materials: "American walnut · bouclé fabric · brushed gunmetal fittings · acoustical felt"
  }
];

// 2. Extract existing Capital Interior projects from projects array
const pStart = html.indexOf('const projects = [');
const pEnd = html.indexOf('];\nfunction img');
if (pStart === -1 || pEnd === -1) {
  console.error('Could not locate projects array in index.html');
  process.exit(1);
}

const existingProjectsCode = html.slice(pStart + 17, pEnd + 1);
const allExisting = eval(existingProjectsCode);
const capitalProjects = allExisting.filter(p => p.categoryKey !== 'visualisation');

console.log('Retained', capitalProjects.length, 'Capital Interior Design projects');
console.log('Injecting', authenticRendersProjects.length, 'authentic 3D Visualisation projects from RENDERS folder');

const mergedProjects = [...authenticRendersProjects, ...capitalProjects];
const newProjectsCode = 'const projects = ' + JSON.stringify(mergedProjects, null, 2) + ';';

html = html.slice(0, pStart) + newProjectsCode + html.slice(pEnd + 2);

// 3. Update function img(n, alt="") to support both direct file paths and assets dictionary
const oldImgFunc = 'function img(n,alt=""){return `<img src="${assets[n]}" alt="${esc(alt)}" loading="lazy">`}';
const newImgFunc = 'function img(n,alt=""){const s=assets[n]||n;return `<img src="${s}" alt="${esc(alt)}" loading="lazy">`}';

if (html.includes(oldImgFunc)) {
  html = html.replace(oldImgFunc, newImgFunc);
  console.log('function img updated to resolve both direct paths and assets dictionary');
} else {
  console.log('oldImgFunc not found exactly, checking regex replacement...');
  html = html.replace(/function img\(n,alt=""\)\{return `<img src="\$\{assets\[n\]\}" alt="\$\{esc\(alt\)\}" loading="lazy">`\}/, newImgFunc);
}

// 4. Update lightbox click listener to support direct image paths
const oldLightboxClick = 'document.getElementById("lightboxImage").src=assets[lb.dataset.lightbox];';
const newLightboxClick = 'const lbSrc=lb.dataset.lightbox;document.getElementById("lightboxImage").src=assets[lbSrc]||lbSrc;';

if (html.includes(oldLightboxClick)) {
  html = html.replace(oldLightboxClick, newLightboxClick);
  console.log('Lightbox click handler updated to support file paths');
}

// 5. Update indexPage(key) for Visualisation to feature authentic 3D projects with Monograph Styling
const newVisIndexHeader = `function indexPage(key) {
  const isV = key === "visualisation";
  const arr = projects.filter(p => isV ? p.categoryKey === "visualisation" : (p.categoryKey === "interior" || p.categoryKey === "interior-design"));
  
  if (isV) {
    return \`
    <article class="monograph-page-article" aria-label="Architectural 3D Visualisation">
      <div class="monograph-page-header">
        <div class="monograph-kicker-line">
          <span class="monograph-kicker">01 / ARCHIVE: RENDERS — ARCHITECTURAL 3D VISUALISATION</span>
          <span class="monograph-kicker-hairline"></span>
        </div>
        <h1 class="monograph-page-title">Architecture in <em>perspective.</em></h1>
        <p class="monograph-page-lede">Authentic architectural 3D renders exploring form, light, materiality, and spatial atmosphere. Sourced exclusively from authentic project archives in the RENDERS folder including the grand wedding venue, coastal villas, and luxury residential architecture.</p>
      </div>

      <section class="monograph-page-body" style="padding-bottom: 0;">
        <div class="monograph-filter-band">
          <div class="filter-band-left">
            <span class="filter-spec-tag">STUDIO 3D ARCHIVE / RENDERS</span>
            <span class="filter-count"><strong>\${String(arr.length).padStart(2, '0')}</strong> AUTHENTIC ARCHITECTURAL RENDERS</span>
          </div>
          <div class="filter-band-right">
            <span class="filter-source-note">Grand Wedding Venues · Coastal Villas · Residential CGI · 3ds Max &amp; Corona</span>
          </div>
        </div>

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

        <!-- Monograph Architectural Grid of Authentic Renders -->
        <div class="project-grid" style="margin-top: 3rem;">
          \${arr.map((p, i) => card(p, i, false)).join("")}
        </div>
      </section>
    </article>\`;
  }`;

const funcIndexStart = html.indexOf('function indexPage(key) {');
const funcIndexEnd = html.indexOf('return `\n  <article class="monograph-page-article" aria-label="Interior Design &amp; Spatial Planning">', funcIndexStart);

if (funcIndexStart !== -1 && funcIndexEnd !== -1) {
  html = html.slice(0, funcIndexStart) + newVisIndexHeader + '\n\n  ' + html.slice(funcIndexEnd);
  console.log('indexPage() updated with authentic RENDERS and Monograph styling');
} else {
  console.log('Could not find indexPage bounds, checking alternative signature...');
  const altStart = html.indexOf('function indexPage(key){');
  if (altStart !== -1 && funcIndexEnd !== -1) {
    html = html.slice(0, altStart) + newVisIndexHeader + '\n\n  ' + html.slice(funcIndexEnd);
    console.log('indexPage() updated via alt signature');
  }
}

// 6. Save updated file
fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully saved updated', targetPath);

// 7. Sync to secondary path if present
const ePath = 'e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html';
if (fs.existsSync(ePath)) {
  fs.writeFileSync(ePath, html, 'utf8');
  console.log('Synchronized to', ePath);
}
