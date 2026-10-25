const fs = require('fs');

function fixCardClickAndRouting(dir) {
  const scriptPath = dir + '/script.js';
  const indexPath = dir + '/index.html';

  // 1. Update script.js works-wheel card markup to include data-project and data-page
  if (fs.existsSync(scriptPath)) {
    let js = fs.readFileSync(scriptPath, 'utf8');

    // Add data-project and clean clickability to works-wheel-card markup
    js = js.replace(
      '<a id="works-wheel-${i}" class="works-wheel-card" href="${item.href}" role="option" aria-selected="${i === 0}">',
      '<a id="works-wheel-${i}" class="works-wheel-card" href="${item.href}" data-project="${rawItems[i] ? rawItems[i].id : \'\'}" role="option" aria-selected="${i === 0}">'
    );

    // Also refine pointer events on stage so clicks on cards are not swallowed by setPointerCapture
    const oldPointerCode = `  stage.addEventListener("pointerdown", (e) => {
    dragY = e.clientY;
    stage.setPointerCapture(e.pointerId);
    if (typeof gsap !== "undefined") gsap.killTweensOf(state);
    targetTurn = state.turn;
  });

  stage.addEventListener("pointermove", (e) => {
    if (dragY === null) return;
    const delta = (dragY - e.clientY) / DRAG_UNITS;
    targetTurn = clamp(state.turn + delta, 0, last + 1);
    state.turn = targetTurn;
    renderFrame();
    dragY = e.clientY;
  });

  const stopDrag = () => {
    if (dragY === null) return;
    dragY = null;
    const snapped = Math.round(state.turn);
    to(snapped, 0.4, "power2.out");
  };
  stage.addEventListener("pointerup", stopDrag);
  stage.addEventListener("pointercancel", stopDrag);`;

    const newPointerCode = `  let startY = 0;
  let hasMoved = false;

  stage.addEventListener("pointerdown", (e) => {
    dragY = e.clientY;
    startY = e.clientY;
    hasMoved = false;
    if (typeof gsap !== "undefined") gsap.killTweensOf(state);
    targetTurn = state.turn;
  });

  stage.addEventListener("pointermove", (e) => {
    if (dragY === null) return;
    const diff = Math.abs(e.clientY - startY);
    if (diff > 5) {
      hasMoved = true;
      if (!stage.hasPointerCapture(e.pointerId)) {
        try { stage.setPointerCapture(e.pointerId); } catch(err){}
      }
    }
    const delta = (dragY - e.clientY) / DRAG_UNITS;
    targetTurn = clamp(state.turn + delta, 0, last + 1);
    state.turn = targetTurn;
    renderFrame();
    dragY = e.clientY;
  });

  const stopDrag = (e) => {
    if (dragY === null) return;
    dragY = null;
    if (stage.hasPointerCapture && stage.hasPointerCapture(e.pointerId)) {
      try { stage.releasePointerCapture(e.pointerId); } catch(err){}
    }
    const snapped = Math.round(state.turn);
    to(snapped, 0.4, "power2.out");
  };
  stage.addEventListener("pointerup", stopDrag);
  stage.addEventListener("pointercancel", stopDrag);

  // Allow direct click on cards to navigate if user didn't drag
  mount.querySelectorAll(".works-wheel-card").forEach((card, idx) => {
    card.addEventListener("click", (e) => {
      if (hasMoved) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      const proj = rawItems[idx];
      if (proj) {
        location.hash = "project/" + proj.id;
      }
    });
  });`;

    if (js.includes(oldPointerCode)) {
      js = js.replace(oldPointerCode, newPointerCode);
      console.log('Replaced pointer events in', scriptPath);
    } else {
      console.log('oldPointerCode not matched directly in', scriptPath);
    }

    fs.writeFileSync(scriptPath, js, 'utf8');
    console.log('Updated', scriptPath);
  }

  // 2. In index.html: make sure document click handler also catches a[href^="#project/"] directly
  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf8');

    const clickStart = 'document.addEventListener("click", e => {';
    const clickCheck = 'let proj = e.target.closest("[data-project]");';
    
    // Add check for any anchor pointing to #project/
    const addition = `let projLink = e.target.closest('a[href^="#project/"]');
  if (projLink) {
    e.preventDefault();
    const targetHash = projLink.getAttribute("href").slice(1);
    if (location.hash === "#" + targetHash) {
      render();
    } else {
      location.hash = targetHash;
    }
    return;
  }
  `;

    if (!html.includes('let projLink = e.target.closest(\'a[href^="#project/"]\');')) {
      html = html.replace(clickCheck, addition + clickCheck);
      fs.writeFileSync(indexPath, html, 'utf8');
      console.log('Added a[href^="#project/"] handler to index.html in', dir);
    }
  }
}

fixCardClickAndRouting('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only');
fixCardClickAndRouting('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO');
