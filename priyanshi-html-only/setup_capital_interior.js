const fs = require('fs');

function setupCapitalInteriorProjects(dir) {
  const indexPath = dir + '/index.html';
  const scriptPath = dir + '/script.js';

  if (!fs.existsSync(indexPath)) return;
  let html = fs.readFileSync(indexPath, 'utf8');

  // 1. Update navigation links to support /interior-design and #interior-design
  html = html.replace(
    '<a href="#interior" data-page="interior">INTERIOR DESIGN</a>',
    '<a href="#interior-design" data-page="interior-design">INTERIOR DESIGN</a>'
  );
  html = html.replace(
    '<a href="#interior" class="split-btn split-btn-interior" data-page="interior" aria-label="Explore Interiors">',
    '<a href="#interior-design" class="split-btn split-btn-interior" data-page="interior-design" aria-label="Explore Interiors">'
  );
  html = html.replace(
    'data-page="interior" role="button"',
    'data-page="interior-design" role="button"'
  );
  html = html.replace(
    '<a class="category" href="#interior" data-page="interior">',
    '<a class="category" href="#interior-design" data-page="interior-design">'
  );

  // 2. Update render() function routing to map interior and interior-design
  html = html.replace(
    'if (page === "visualization") page = "visualisation";',
    'if (page === "visualization") page = "visualisation";\n    if (page === "interior" || page === "interior-design") page = "interior-design";'
  );
  html = html.replace(
    '} else if (page === "visualisation" || page === "interior") {',
    '} else if (page === "visualisation" || page === "interior-design" || page === "interior") {'
  );

  // 3. Update casePage back link
  html = html.replace(
    'href="#${isV ? \'visualisation\' : \'interior\'}" data-page="${isV ? \'visualisation\' : \'interior\'}"',
    'href="#${isV ? \'visualisation\' : \'interior-design\'}" data-page="${isV ? \'visualisation\' : \'interior-design\'}"'
  );

  // 4. Update indexPage() to handle "interior-design" as well as "interior"
  html = html.replace(
    'const arr = projects.filter(p => isV ? p.categoryKey === "visualisation" : p.categoryKey === "interior");',
    'const arr = projects.filter(p => isV ? p.categoryKey === "visualisation" : (p.categoryKey === "interior" || p.categoryKey === "interior-design"));'
  );

  // 5. Build rich curated academic & professional projects pulling EXCLUSIVELY from CAPITAL folder
  const capitalProjects = [
    {
      id: "capital-assignment-01-portfolio",
      title: "Comprehensive Interior Drafting & Spatial Design Portfolio",
      category: "Interior Design & Drafting",
      categoryKey: "interior-design",
      type: "Academic Coursework & Technical Package",
      location: "Capital Education, Dubai",
      year: "2023 · Advanced Diploma Module 01",
      role: "AutoCAD Drafting, Space Planning, Joinery Schedules",
      software: "AutoCAD · Technical Drafting · Hand Rendering",
      pdfFile: "CAPITAL/Priyanshi_Assignment_01 .pdf",
      image: "CAPITAL/priyanshi_assignment_01__pdf_0.jpg",
      images: [
        "CAPITAL/priyanshi_assignment_01__pdf_0.jpg",
        "CAPITAL/priyanshi_assignment_01__pdf_1.jpg",
        "CAPITAL/priyanshi_assignment_01__pdf_2.jpg",
        "CAPITAL/priyanshi_assignment_01__pdf_4.jpg",
        "CAPITAL/priyanshi_assignment_01__pdf_5.jpg",
        "CAPITAL/priyanshi_assignment_01__pdf_6.jpg",
        "CAPITAL/priyanshi_assignment_01__pdf_8.jpg"
      ],
      description: "A comprehensive 31-sheet technical drafting portfolio covering spatial layouts, scale plans, elevation sections, and furniture specifications created during coursework at Capital Education, Dubai.",
      brief: "Develop professional-grade construction drawings detailing residential and commercial spaces with precise dimensional hierarchies.",
      concept: "Strict adherence to international drafting standards, ergonomic anthropometry, and functional circulation pathways.",
      materials: "Ink on drafting vellum · digital CAD linework · joinery schedules"
    },
    {
      id: "capital-assignment-02-drawing-geometry",
      title: "Geometrical Projections & Architectural Orthographics",
      category: "Technical Drafting",
      categoryKey: "interior-design",
      type: "Geometric Analysis & Plan Projections",
      location: "Capital Education, Dubai",
      year: "2023 · Advanced Diploma Module 02",
      role: "Descriptive Geometry, Plan & Elevation Drawing",
      software: "AutoCAD · Manual Drafting · Scale Measurement",
      pdfFile: "CAPITAL/Priyanshi_Assignment_02.pdf",
      image: "CAPITAL/priyanshi_assignment_02_pdf_0.jpg",
      images: [
        "CAPITAL/priyanshi_assignment_02_pdf_0.jpg",
        "CAPITAL/priyanshi_assignment_02_pdf_2.jpg",
        "CAPITAL/priyanshi_assignment_02_pdf_3.jpg",
        "CAPITAL/priyanshi_assignment_02_pdf_4.jpg"
      ],
      description: "Studies in spatial geometry, orthographic projection, and 3D volumetric sectioning. Exploring true lengths, intersections, and planar surface developments.",
      brief: "Demonstrate mastery over complex multi-view architectural projections and cross-sectional spatial geometry.",
      concept: "Mathematical precision in space translation: converting three-dimensional interior forms into accurate two-dimensional drafting sheets.",
      materials: "Fine-point technical pen · geometric drafting compass · drafting scale"
    },
    {
      id: "capital-assignment-04-perspective-geometry",
      title: "Two-Point Perspective & Volumetric Interior Studies",
      category: "Spatial Planning",
      categoryKey: "interior-design",
      type: "Perspective Drawing & Volume Study",
      location: "Capital Education, Dubai",
      year: "2023 · Assignment 04",
      role: "Perspective Projection & Spatial Sketching",
      software: "Hand Drafting · Perspective Projections",
      pdfFile: "CAPITAL/Priyanshi_Assignment_04.pdf",
      image: "CAPITAL/Priyanshi_Assignment_04_pdf_0.jpg",
      images: [
        "CAPITAL/Priyanshi_Assignment_04_pdf_0.jpg"
      ],
      description: "Rigorous two-point perspective construction analyzing eye-level station points, horizon lines, and vanishing points in architectural interiors.",
      brief: "Construct true-to-scale perspective views of interior volumes to understand depth perception and spatial containment.",
      concept: "Visualizing volumetric compression and expansion through controlled horizon lines and field of view calibration.",
      materials: "Graphite on archival Bristol · 2H/HB technical pencils"
    },
    {
      id: "capital-assignment-05-orthographic-elevations",
      title: "Detailed Architectural Wall Elevations & Sections",
      category: "Technical Drafting",
      categoryKey: "interior-design",
      type: "Wall Elevations & Architectural Joinery",
      location: "Capital Education, Dubai",
      year: "2023 · Assignment 05",
      role: "Orthographic Drafting & Millwork Details",
      software: "AutoCAD · Manual Linework",
      pdfFile: "CAPITAL/Priyanshi_Assignment_05.pdf",
      image: "CAPITAL/Priyanshi_Assignment_05_pdf_0.jpg",
      images: [
        "CAPITAL/Priyanshi_Assignment_05_pdf_0.jpg"
      ],
      description: "Scale orthographic interior elevations showcasing door and window fenestration, dado heights, custom paneling, and ceiling coves.",
      brief: "Draft comprehensive vertical surfaces for interior spaces specifying material interfaces and finish transitions.",
      concept: "Harmonizing horizontal sill lines, header datum lines, and vertical architectural mullions for proportional balance.",
      materials: "Precision drafting vellum · technical ink linework"
    },
    {
      id: "capital-assignment-06-space-planning",
      title: "Functional Space Planning & Furniture Layouts",
      category: "Spatial Planning",
      categoryKey: "interior-design",
      type: "Residential Floor Plan & Circulation",
      location: "Capital Education, Dubai",
      year: "2023 · Assignment 06",
      role: "Space Planning, Circulation Analysis, Furniture Layout",
      software: "AutoCAD · Space Planning",
      pdfFile: "CAPITAL/Priyanshi_Assignment_06.pdf",
      image: "CAPITAL/Priyanshi_Assignment_06_pdf_0.jpg",
      images: [
        "CAPITAL/Priyanshi_Assignment_06_pdf_0.jpg"
      ],
      description: "Residential floor plan zoning and furniture arrangement with clear primary, secondary, and service circulation paths.",
      brief: "Plan complete room layouts ensuring universal clearances, comfortable movement corridors, and unobstructed functional zones.",
      concept: "User-centric layout planning maximizing daylight penetration and spatial openness while preserving acoustic privacy.",
      materials: "CAD vector drafting · standard architectural dimensioning"
    },
    {
      id: "capital-assignment-07-color-theory",
      title: "Color Theory & Material Contrast Studies",
      category: "Interior Design",
      categoryKey: "interior-design",
      type: "Material Study & Chromatic Palettes",
      location: "Capital Education, Dubai",
      year: "2023 · Assignment 07",
      role: "Color Harmonies, Swatch Planning & Contrast Analysis",
      software: "Hand Rendering · Color Harmonies · Gouache",
      pdfFile: "CAPITAL/Priyanshi_Assignment_07.pdf",
      image: "CAPITAL/Priyanshi_Assignment_07_pdf_0.jpg",
      images: [
        "CAPITAL/Priyanshi_Assignment_07_pdf_0.jpg"
      ],
      description: "Investigation of chromatic values, tint-shade dynamics, and tactile material reflections in interior architectural atmospheres.",
      brief: "Develop curated color palettes and analyze light absorption vs reflection across diverse surface finishes.",
      concept: "Calibrating warm neutral baselines with earth-pigment accents to establish timeless, grounding interiors.",
      materials: "Archival mixed media · pigment swatches · watercolor/gouache on watercolor paper"
    },
    {
      id: "capital-assignment-08-isometric-axonometry",
      title: "Axonometric & Isometric Spatial Projections",
      category: "Technical Drafting",
      categoryKey: "interior-design",
      type: "Axonometric Drawing & Spatial Geometry",
      location: "Capital Education, Dubai",
      year: "2023 · Assignment 08",
      role: "Axonometric Projection & Volume Cutaway",
      software: "AutoCAD · Manual Isometric Drafting",
      image: "CAPITAL/Priyanshi_assignment_08.jpg",
      images: [
        "CAPITAL/Priyanshi_assignment_08.jpg"
      ],
      description: "True 30°/60° isometric and axonometric drawings revealing simultaneous roof, wall, and floor relationships in interior spaces.",
      brief: "Draft an axonometric cutaway of an interior room demonstrating vertical assemblies and internal furniture volumes.",
      concept: "Unifying architectural plan and elevation into a single readable drawing for construction and client communication.",
      materials: "0.2mm - 0.7mm technical drafting pens · isometric grid layout"
    },
    {
      id: "capital-assignment-10-architectural-detailing",
      title: "Bespoke Millwork, Staircase & Construction Details",
      category: "Technical Drafting",
      categoryKey: "interior-design",
      type: "Joinery Details & Architectural Sections",
      location: "Capital Education, Dubai",
      year: "2023 · Assignment 10",
      role: "Joinery Detailing, Construction Specification",
      software: "AutoCAD · Detail Drafting",
      pdfFile: "CAPITAL/Priyanshi_Assignment_10.pdf",
      image: "CAPITAL/Priyanshi_Assignment_10_pdf_0.jpg",
      images: [
        "CAPITAL/Priyanshi_Assignment_10_pdf_0.jpg"
      ],
      description: "Detailed construction sheets specifying joinery assembly, tread-to-riser ratios, nosing details, and structural anchoring.",
      brief: "Create fabrication-level construction details for interior millwork and architectural components.",
      concept: "Seamless detailing where structural hardware remains concealed to celebrate purity of craftsmanship.",
      materials: "1:10 and 1:5 scale CAD detail sections · material callout tags"
    },
    {
      id: "capital-assignment-14-physical-model",
      title: "Physical Scale Architectural Model & Spatial Prototyping",
      category: "Spatial Planning",
      categoryKey: "interior-design",
      type: "Physical Model Prototyping",
      location: "Capital Education, Dubai",
      year: "2023 · Assignment 14",
      role: "Physical Model Making, Material Selection & Prototyping",
      software: "Physical Prototyping · Laser Cutting · Scale Modeling",
      pdfFile: "CAPITAL/Priyanshi_Assignment_14 (model) .pdf",
      image: "CAPITAL/Priyanshi_Assignment_14_pdf_0.jpg",
      images: [
        "CAPITAL/Priyanshi_Assignment_14_pdf_0.jpg",
        "CAPITAL/Priyanshi_Assignment_14__model___pdf_0.jpg"
      ],
      description: "Precision 1:50 scale architectural physical model examining spatial volume, light entry through clerestory windows, and physical massing.",
      brief: "Translate CAD drafting sets into a tactile three-dimensional model to evaluate spatial scale and daylight dynamics.",
      concept: "Tactile model verification of spatial flow, threshold transitions, and interior volume proportions.",
      materials: "Museum board · basswood timber · micro-acrylic glazing"
    },
    {
      id: "capital-assignment-17-hand-drafting-studio",
      title: "Studio Floor Plan Drafting & Specification Sheet",
      category: "Technical Drafting",
      categoryKey: "interior-design",
      type: "Full Floor Plan & Specification Matrix",
      location: "Capital Education, Dubai",
      year: "2023 · Assignment 17",
      role: "Scale Floor Plan Drafting, Room Legend & Keynotes",
      software: "Manual Drafting · Architectural Linework",
      image: "CAPITAL/Priyanshi_Assignment_17.jpg",
      images: [
        "CAPITAL/Priyanshi_Assignment_17.jpg"
      ],
      description: "Comprehensive drafted architectural plan sheet complete with title block, gridlines, door swings, wall tags, and finish schedule.",
      brief: "Produce a fully notated architectural plan drawing compliant with international interior documentation protocols.",
      concept: "Clarity and hierarchy in line weights ensuring effortless readability on the construction jobsite.",
      materials: "A2 architectural drafting sheet · technical drafting ink"
    },
    {
      id: "capital-assignment-18-elevation-rendering",
      title: "Rendered Wall Elevation & Lighting Atmosphere Study",
      category: "Interior Design",
      categoryKey: "interior-design",
      type: "Rendered Architectural Elevation",
      location: "Capital Education, Dubai",
      year: "2023 · Assignment 18",
      role: "Elevation Rendering, Shadow Casting & Lighting Mood",
      software: "Hand Rendering · Architectural Shadows · Markers",
      image: "CAPITAL/Priyanshi_Assignment_18.jpg",
      images: [
        "CAPITAL/Priyanshi_Assignment_18.jpg"
      ],
      description: "Artistic and technical rendered elevation showing 45° architectural sun shadow casting, textured timber surfaces, and warm accent lighting.",
      brief: "Render interior elevations to convey surface materiality, depth, and the emotional tone of warm artificial illumination.",
      concept: "Expressing architectural shadow geometry to bring flat orthographic elevations to lifelike three-dimensional clarity.",
      materials: "Archival drafting paper · alcohol markers · fine-liner ink"
    },
    {
      id: "capital-assignment-23-comprehensive-package",
      title: "Comprehensive Hospitality & Commercial Drafting Set",
      category: "Technical Drafting",
      categoryKey: "interior-design",
      type: "Full Technical Commercial Package",
      location: "Capital Education, Dubai",
      year: "2023 · Major Studio Assignment 23",
      role: "Commercial Space Planning, Reflected Ceiling & MEP Coordination",
      software: "AutoCAD · Technical Drafting · Joinery Sets",
      pdfFile: "CAPITAL/Priyanshi_Assignment_23.pdf",
      image: "CAPITAL/priyanshi_assignment_23_pdf_0.jpg",
      images: [
        "CAPITAL/priyanshi_assignment_23_pdf_0.jpg",
        "CAPITAL/priyanshi_assignment_23_pdf_1.jpg",
        "CAPITAL/priyanshi_assignment_23_pdf_3.jpg",
        "CAPITAL/priyanshi_assignment_23_pdf_4.jpg",
        "CAPITAL/priyanshi_assignment_23_pdf_6.jpg",
        "CAPITAL/priyanshi_assignment_23_pdf_8.jpg"
      ],
      description: "A major 19-sheet technical interior design documentation set detailing reception lobbies, executive meeting suites, custom banquettes, and ceiling grids.",
      brief: "Execute a multi-room commercial interior drawing set coordinating architectural partitions with lighting and mechanical services.",
      concept: "Rigorous alignment of ceiling grids with partition layouts to create harmonious, uncluttered commercial spaces.",
      materials: "AutoCAD CAD vector packages · architectural legend tables"
    },
    {
      id: "capital-assignment-24-capstone-project",
      title: "Advanced Interior Architecture Capstone Documentation",
      category: "Interior Design & Drafting",
      categoryKey: "interior-design",
      type: "Diploma Final Capstone Technical Package",
      location: "Capital Education, Dubai",
      year: "2023 · Capstone Assignment 24",
      role: "Lead Interior Architecture Drafting & Specification",
      software: "AutoCAD · Technical Schedules · Material Boards",
      pdfFile: "CAPITAL/Priyanshi_Assignment_24 .pdf",
      image: "CAPITAL/priyanshi_assignment_24__pdf_0.jpg",
      images: [
        "CAPITAL/priyanshi_assignment_24__pdf_0.jpg",
        "CAPITAL/priyanshi_assignment_24__pdf_1.jpg",
        "CAPITAL/priyanshi_assignment_24__pdf_2.jpg",
        "CAPITAL/priyanshi_assignment_24__pdf_3.jpg",
        "CAPITAL/priyanshi_assignment_24__pdf_4.jpg",
        "CAPITAL/priyanshi_assignment_24__pdf_5.jpg",
        "CAPITAL/priyanshi_assignment_24__pdf_9.jpg"
      ],
      description: "The 22-sheet graduation capstone portfolio synthesizing full-scope interior architecture: demolition plans, partition schedules, reflected ceilings, electrical layouts, and millwork packages.",
      brief: "Deliver a complete, tender-ready interior design construction document set ready for contractor bidding and execution.",
      concept: "Total architectural synthesis: uniting space planning, ergonomic human factors, sustainable materiality, and technical precision.",
      materials: "Comprehensive AutoCAD tender packages · detailed keynote callouts"
    }
  ];

  // Replace projects array in index.html with 3D renders + new curated CAPITAL interior projects
  let pStart = html.indexOf('const projects = [');
  if (pStart === -1) pStart = html.indexOf('const projects=[');
  const pEnd = html.indexOf('];', pStart);

  if (pStart !== -1 && pEnd !== -1) {
    const existingCode = html.substring(pStart, pEnd + 2);
    // Extract only visualisation projects from existing
    let arrayStr = existingCode;
    if (arrayStr.startsWith('const projects = ')) arrayStr = arrayStr.replace('const projects = ', '');
    else if (arrayStr.startsWith('const projects=')) arrayStr = arrayStr.replace('const projects=', '');
    const allP = eval(arrayStr);
    const visProjects = allP.filter(p => p.categoryKey === 'visualisation');

    const mergedProjects = [...visProjects, ...capitalProjects];
    const newProjectsCode = 'const projects = ' + JSON.stringify(mergedProjects, null, 2) + ';';

    html = html.substring(0, pStart) + newProjectsCode + html.substring(pEnd + 2);
    console.log('Updated projects array with', visProjects.length, '3D renders and', capitalProjects.length, 'CAPITAL interior projects!');
  }

  // 6. Update indexPage interior layout for Monograph Styling
  const oldInteriorHeader = `    <div class="monograph-page-header">
      <div class="monograph-kicker-line">
        <span class="monograph-kicker">02 — INTERIOR DESIGN &amp; SPATIAL PLANNING</span>
        <span class="monograph-kicker-hairline"></span>
      </div>
      <h1 class="monograph-page-title">Interiors with <em>intention.</em></h1>
      <p class="monograph-page-lede">Comprehensive interior design coursework, construction-ready AutoCAD drafting sets, space planning studies, and sustainable material specifications from Capital Education, Dubai.</p>
    </div>`;

  const newInteriorHeader = `    <div class="monograph-page-header">
      <div class="monograph-kicker-line">
        <span class="monograph-kicker">02 / ARCHIVE: CAPITAL EDUCATION, DUBAI — INTERIOR DESIGN &amp; TECHNICAL DRAFTING</span>
        <span class="monograph-kicker-hairline"></span>
      </div>
      <h1 class="monograph-page-title">Drafting, geometry &amp; <em>space.</em></h1>
      <p class="monograph-page-lede">Academic and professional technical drafting assignments, descriptive geometry studies, construction detailing, and spatial planning coursework sourced exclusively from authentic project archives at Capital Education, Dubai.</p>
    </div>`;

  if (html.includes(oldInteriorHeader)) {
    html = html.replace(oldInteriorHeader, newInteriorHeader);
    console.log('Updated interior page monograph header');
  }

  // 7. Update filter band on interior page
  const oldFilterBand = `<div class="monograph-filter-band">
        <div class="filter-band-left">
          <span class="filter-spec-tag">ARCHIVE / CAPITAL</span>
          <span class="filter-count"><strong>\${String(arr.length).padStart(2, '0')}</strong> SELECTED DESIGN WORKS</span>
        </div>
        <div class="filter-band-right">
          <span class="filter-source-note">Academic &amp; Studio Coursework · Capital Education, Dubai</span>
        </div>
      </div>`;

  const newFilterBand = `<div class="monograph-filter-band">
        <div class="filter-band-left">
          <span class="filter-spec-tag">ACADEMIC &amp; STUDIO ARCHIVE / CAPITAL</span>
          <span class="filter-count"><strong>\${String(arr.length).padStart(2, '0')}</strong> CURATED ASSIGNMENTS &amp; DRAFTING SHEETS</span>
        </div>
        <div class="filter-band-right">
          <span class="filter-source-note">Technical Drafting · Geometry · Spatial Planning · Capital Education, Dubai</span>
        </div>
      </div>`;

  if (html.includes(oldFilterBand)) {
    html = html.replace(oldFilterBand, newFilterBand);
    console.log('Updated interior page filter band');
  }

  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('Successfully saved updated', indexPath);

  // 8. Update script.js router link guards to support interior-design
  if (fs.existsSync(scriptPath)) {
    let js = fs.readFileSync(scriptPath, 'utf8');
    if (!js.includes('"interior-design"')) {
      js = js.replace(
        '["visualisation", "visualization", "interior", "about", "contact", "portfolio"]',
        '["visualisation", "visualization", "interior", "interior-design", "about", "contact", "portfolio"]'
      );
      fs.writeFileSync(scriptPath, js, 'utf8');
      console.log('Updated script.js router guards for interior-design');
    }
  }
}

setupCapitalInteriorProjects('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only');
setupCapitalInteriorProjects('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO');
