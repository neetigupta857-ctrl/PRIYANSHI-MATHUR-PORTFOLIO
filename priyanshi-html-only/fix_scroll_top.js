const fs = require('fs');

function fixScrollToTopOnRedirect(dir) {
  const indexPath = dir + '/index.html';
  const scriptPath = dir + '/script.js';

  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf8');

    // 1. Add history.scrollRestoration = 'manual' at start of router
    if (!html.includes("history.scrollRestoration = 'manual'")) {
      html = html.replace(
        'window.projects = projects;',
        `window.projects = projects;
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}`
      );
    }

    // 2. Replace the smooth scrollTo with instant, robust reset in render()
    const oldScroll = 'window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });';
    const robustScroll = `// Instant scroll reset to top of document on page redirection
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 80);`;

    if (html.includes(oldScroll)) {
      html = html.replace(oldScroll, robustScroll);
      console.log('Replaced scrollTo in render() in', indexPath);
    } else {
      console.log('oldScroll not found in', indexPath);
    }

    fs.writeFileSync(indexPath, html, 'utf8');
    console.log('Updated index.html in', dir);
  }

  if (fs.existsSync(scriptPath)) {
    let js = fs.readFileSync(scriptPath, 'utf8');

    // In script.js ScrollTrigger refresh, make sure it doesn't reset scroll or push position
    if (!js.includes("history.scrollRestoration = 'manual'")) {
      js = `if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }\n` + js;
      fs.writeFileSync(scriptPath, js, 'utf8');
      console.log('Added manual scrollRestoration to', scriptPath);
    }
  }
}

fixScrollToTopOnRedirect('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only');
fixScrollToTopOnRedirect('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO');
