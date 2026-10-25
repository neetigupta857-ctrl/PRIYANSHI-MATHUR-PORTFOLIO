const fs = require('fs');
['index.html', 'C:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html'].forEach(f => {
  if (!fs.existsSync(f)) return;
  let h = fs.readFileSync(f, 'utf8');
  if (!h.includes('ScrollTrigger.min.js')) {
    h = h.replace(
      'gsap.min.js"></script>',
      'gsap.min.js"></script>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>\n<script>if (window.gsap && window.ScrollTrigger) { gsap.registerPlugin(ScrollTrigger); }</script>'
    );
    fs.writeFileSync(f, h, 'utf8');
    console.log('Added ScrollTrigger + registered plugin in:', f);
  } else {
    console.log('ScrollTrigger already present in:', f);
  }
});
