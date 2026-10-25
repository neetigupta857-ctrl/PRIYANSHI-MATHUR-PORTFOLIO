const fs = require('fs');

function removeStartAConversation(dir) {
  const indexPath = dir + '/index.html';
  if (!fs.existsSync(indexPath)) return;
  let html = fs.readFileSync(indexPath, 'utf8');

  // 1. Remove the CTA band in casePage
  const oldCtaBand = `      <div class="monograph-cta-band">
        <div>
          <span class="cta-kicker">OPPORTUNITIES &amp; COLLABORATION</span>
          <h3 class="cta-heading">Interested in discussing this project or upcoming spatial work?</h3>
        </div>
        \${buttonLink("Start a conversation", "contact", "btn primary")}
      </div>`;

  // Alternate formatting without extra indent
  html = html.replace(
    /<div class="monograph-cta-band">[\s\S]*?\${buttonLink\("Start a conversation",\s*"contact",\s*"btn primary"\)}[\s\S]*?<\/div>/,
    ''
  );

  // 2. Remove the button from the home() function availability block
  html = html.replace(
    '${buttonLink("Start a conversation", "contact", "btn primary")}',
    ''
  );

  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('Removed "Start a conversation" button in', indexPath);
}

removeStartAConversation('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only');
removeStartAConversation('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO');
