const fs = require('fs');

function fixHtml(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('File does not exist:', filePath);
    return;
  }
  let html = fs.readFileSync(filePath, 'utf8');
  const needle = '<script src="script.js"></script>';
  const idx = html.indexOf(needle);
  if (idx !== -1) {
    const before = html.substring(0, idx);
    const after = html.substring(idx);
    if (!before.trim().endsWith('</script>')) {
      html = before + '</script>\n' + after;
      fs.writeFileSync(filePath, html, 'utf8');
      console.log('Fixed missing </script> in', filePath);
    } else {
      console.log('Already has </script> in', filePath);
    }
  } else {
    console.log('script.js needle not found in', filePath);
  }
}

fixHtml('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html');
fixHtml('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html');
