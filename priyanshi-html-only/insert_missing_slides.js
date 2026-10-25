const fs = require('fs');

function restoreMissingHomeSlides(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  // Check if aboutTeaser already exists
  if (html.includes('id="aboutTeaser"')) {
    console.log('Slides already present in', filePath);
    return;
  }

  const pdfCoverEnd = html.indexOf('</section>', html.indexOf('id="pdfCover"'));
  if (pdfCoverEnd === -1) {
    console.error('Cannot find pdfCover end tag in', filePath);
    return;
  }

  const insertionPoint = pdfCoverEnd + 10; // right after </section>

  const slidesHtml = `

<!-- SLIDE 2: Dual-Panel Split Slide (#aboutTeaser) -->
<section id="aboutTeaser" class="split-slide-section" aria-label="Spatial Design and 3D Visualisation Disciplines">
  <div class="split-columns-container">
    <!-- Left Column: Spatial Design / Interior Architecture -->
    <a href="#interior-design" class="split-panel split-panel-left" data-page="interior-design" aria-label="Explore Spatial Design and Interior Architecture">
      <img src="material_flatlay.jpg" alt="Spatial Design &amp; Materiality" class="split-bg-img" loading="lazy">
      <div class="split-overlay-left" aria-hidden="true"></div>
      <div class="split-panel-content">
        <div class="split-overline">01 / DISCIPLINE &amp; STUDIO PRACTICE</div>
        <h2 class="split-headline">Spatial Design &amp;<br>Interior Architecture</h2>
        <span class="split-btn split-btn-interior">
          <span>EXPLORE INTERIOR WORKS</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </div>
    </a>

    <!-- Right Column: 3D Visualisation / Atmosphere -->
    <a href="#visualisation" class="split-panel split-panel-right" data-page="visualisation" aria-label="Explore Architectural 3D Visualisation">
      <img src="1.jpg" alt="Architectural 3D Visualisation" class="split-bg-img" loading="lazy">
      <div class="split-overlay-right" aria-hidden="true"></div>
      <div class="split-panel-content">
        <div class="split-overline">02 / FORM, LIGHT &amp; MATERIALITY</div>
        <h2 class="split-headline">Architectural 3D<br>Visualisation &amp; Atmosphere</h2>
        <span class="split-btn split-btn-vis">
          <span>EXPLORE 3D RENDERS</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </div>
    </a>
  </div>
</section>

<!-- SLIDE 3: About the Designer Section (#aboutIntroSection) -->
<section id="aboutIntroSection" class="about-intro-section" aria-label="About the Designer — Priyanshi Mathur">
  <div class="about-intro-container">
    <div class="about-intro-left">
      <div class="about-portrait-frame">
        <img src="priyanshi_portrait.jpg" alt="Priyanshi Mathur — Interior Designer and 3D Visualiser" class="about-portrait-img" loading="lazy">
        <span class="about-portrait-caption">PRIYANSHI MATHUR — DUBAI &amp; INDIA</span>
      </div>
    </div>
    <div class="about-intro-right">
      <div class="about-intro-overline">ABOUT THE DESIGNER</div>
      <h2 class="about-intro-headline">Crafting spatial narratives through technical rigor &amp; atmospheric light.</h2>
      <p class="about-intro-bio">
        I am a junior interior designer and architectural 3D visualiser educated at Capital Education, Dubai. My practice merges disciplined AutoCAD construction drawings, spatial ergonomics, and joinery detailing with evocative 3ds Max and Corona architectural renderings.
      </p>
      <a href="#about" class="about-more-link" data-page="about" aria-label="Read full profile and credentials">
        <span>READ FULL BIOGRAPHY &amp; CREDENTIALS →</span>
      </a>
    </div>
  </div>
</section>

<!-- SLIDE 4: Editorial Contact Section (#contactSlideSection) -->
<section id="contactSlideSection" class="contact-slide-section" aria-label="Editorial Contact and Commission Enquiries">
  <div class="contact-slide-container">
    <div class="contact-slide-left">
      <div class="contact-slide-overline">COMMISSIONS &amp; COLLABORATIONS</div>
      <h2 class="contact-slide-headline">Let's create thoughtful spaces together.</h2>
      <p class="contact-slide-description">
        Available for residential and commercial interior design commissions, technical CAD drafting packages, and architectural 3D visualisation projects worldwide.
      </p>
      <div class="contact-slide-details">
        <a href="mailto:priyamathur2700@gmail.com" class="contact-detail-row">
          <span class="contact-icon-bubble">✉</span>
          <div>
            <span class="contact-detail-label">Direct Inquiries</span>
            <span class="contact-detail-value">priyamathur2700@gmail.com</span>
          </div>
        </a>
        <a href="tel:+919876543210" class="contact-detail-row">
          <span class="contact-icon-bubble">☎</span>
          <div>
            <span class="contact-detail-label">Phone / WhatsApp</span>
            <span class="contact-detail-value">+91 98765 43210</span>
          </div>
        </a>
      </div>
    </div>

    <div class="contact-slide-right">
      <div class="walkthrough-card">
        <span class="walkthrough-eyebrow">PORTFOLIO WALKTHROUGH</span>
        <h3 class="walkthrough-heading">Request a Live Project Walkthrough</h3>
        <p class="walkthrough-body">
          Interested in full technical sets, AutoCAD drawing packages, high-res Corona rendering archives, or design methodology? Let's arrange a dedicated consultation.
        </p>
        <a href="#contact" class="walkthrough-btn" data-page="contact">
          <span>SEND FORM ENQUIRY →</span>
        </a>
      </div>
    </div>
  </div>

  <div class="slide-transition-banner">
    <div class="transition-subtext" style="font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; color: #8C9994;">
      © 2026 Priyanshi Mathur · Architectural Design &amp; 3D Visualisation
    </div>
    <div class="transition-subtext" style="font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; color: #C5A880;">
      Dubai · India · Remote Global
    </div>
  </div>
</section>
`;

  html = html.slice(0, insertionPoint) + slidesHtml + html.slice(insertionPoint);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Successfully inserted missing home slides into', filePath);
}

restoreMissingHomeSlides('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/index.html');
restoreMissingHomeSlides('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/index.html');
