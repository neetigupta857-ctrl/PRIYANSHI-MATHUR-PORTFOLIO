const fs = require('fs');

// 1. Restore the exact working backup of index.html first
if (fs.existsSync('index.html.FINAL_WORKING_BACKUP')) {
  fs.copyFileSync('index.html.FINAL_WORKING_BACKUP', 'index.html');
  console.log('1. Restored clean index.html from FINAL_WORKING_BACKUP');
}

// 2. Re-inject ONLY the 3D Visualisation gallery container (from integrate_components_safe.js) without touching the Home hero
if (fs.existsSync('integrate_components_safe.js')) {
  require('./integrate_components_safe.js');
  console.log('2. Added 3D Visualisation gallery container');
}

// 3. Strip any Home hero / cover manipulation out of script.js so it ONLY runs initWorksWheel
['script.js', 'e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/script.js'].forEach(sf => {
  if (!fs.existsSync(sf)) return;
  let s = fs.readFileSync(sf, 'utf8');
  const wheelIdx = s.indexOf('function initWorksWheel');
  if (wheelIdx !== -1) {
    // Keep ONLY initWorksWheel and nothing before it that touches the cover/hero
    s = s.substring(wheelIdx);
    fs.writeFileSync(sf, s, 'utf8');
    console.log('3. Isolated ONLY initWorksWheel inside:', sf);
  }
});

// 4. Connect GSAP + OGL + wheel-only script.js to index.html (without monograph_and_hero.css changing the hero)
['index.html', 'e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html'].forEach(f => {
  if (!fs.existsSync(f)) return;
  let h = fs.readFileSync(f, 'utf8');
  const tags = '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n<script src="ogl.min.js"></script>\n<script src="script.js"></script>\n<script>\n(function(){\n  if (typeof render === "function") {\n    const origRender = render;\n    render = function() {\n      origRender.apply(this, arguments);\n      if (typeof initWorksWheel === "function") setTimeout(initWorksWheel, 60);\n    };\n  }\n  window.addEventListener("hashchange", function(){ if (typeof initWorksWheel === "function") setTimeout(initWorksWheel, 80); });\n  setTimeout(function(){ if (typeof initWorksWheel === "function") initWorksWheel(); }, 150);\n})();\n</script>\n</body></html>';
  if (!h.includes('src="script.js"')) {
    h = h.replace('</body></html>', tags);
    fs.writeFileSync(f, h, 'utf8');
    console.log('4. Connected isolated 3D wheel in:', f);
  }
});
