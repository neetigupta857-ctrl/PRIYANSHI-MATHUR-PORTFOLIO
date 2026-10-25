const fs = require('fs');
['index.html', 'e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html'].forEach(f => {
  if (!fs.existsSync(f)) return;
  let h = fs.readFileSync(f, 'utf8');
  if (!h.includes('monograph_and_hero.css')) {
    h = h.replace('</head>', '<link rel="stylesheet" href="monograph_and_hero.css">\n</head>');
  }
  const tags = '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n<script src="ogl.min.js"></script>\n<script src="script.js"></script>\n<script>\n(function(){\n  if (typeof render === "function") {\n    const origRender = render;\n    render = function() {\n      origRender.apply(this, arguments);\n      if (typeof initWorksWheel === "function") setTimeout(initWorksWheel, 60);\n    };\n  }\n  window.addEventListener("hashchange", function(){ if (typeof initWorksWheel === "function") setTimeout(initWorksWheel, 80); });\n  setTimeout(function(){ if (typeof initWorksWheel === "function") initWorksWheel(); }, 150);\n})();\n</script>\n</body></html>';
  if (!h.includes('src="script.js"')) {
    h = h.replace('</body></html>', tags);
    fs.writeFileSync(f, h, 'utf8');
    console.log('CONNECTED 3D WHEEL IN:', f);
  } else {
    console.log('ALREADY CONNECTED IN:', f);
  }
});
