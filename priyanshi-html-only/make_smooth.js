const fs = require('fs');

function makeWheelButterySmooth(dir) {
  const scriptPath = dir + '/script.js';
  const tsxPath = dir + '/components/ui/works-wheel.tsx';

  if (!fs.existsSync(scriptPath)) return;
  let js = fs.readFileSync(scriptPath, 'utf8');

  // Replace WHEEL_UNITS, DRAG_UNITS, and SETTLE
  js = js.replace(/const WHEEL_UNITS = [0-9.]+;/, 'const WHEEL_UNITS = 260;');
  js = js.replace(/const DRAG_UNITS = [0-9.]+;/, 'const DRAG_UNITS = 180;');
  js = js.replace(/const SETTLE = [0-9.]+;/, 'const SETTLE = 220;');

  // Find and replace the to() function and wheel event handler
  const oldCodeMarker = '  // Smooth GSAP Tween to target - zero CPU spinning when at rest';
  const endCodeMarker = '  indexBtns.forEach(btn => {';

  const startIdx = js.indexOf(oldCodeMarker);
  const endIdx = js.indexOf(endCodeMarker);

  if (startIdx !== -1 && endIdx !== -1) {
    const smoothCode = `  // Smooth GSAP Inertia Tweening - responsive, buttery smooth feel
  let targetTurn = state.turn;

  function to(next, duration = 0.55, ease = "power2.out") {
    targetTurn = clamp(next, 0, last + 1);
    if (typeof gsap !== "undefined") {
      gsap.killTweensOf(state);
      if (reduced || duration === 0) {
        state.turn = targetTurn;
        renderFrame();
      } else {
        gsap.to(state, {
          turn: targetTurn,
          duration: duration,
          ease: ease,
          onUpdate: renderFrame,
          overwrite: "auto"
        });
      }
    } else {
      state.turn = targetTurn;
      renderFrame();
    }
  }

  updateLayout();

  // Stage events: effortless wheel, drag, keys
  stage.addEventListener("wheel", (e) => {
    // Highly responsive multiplier with normalized delta
    const delta = e.deltaMode === 1 ? e.deltaY * 33 : (e.deltaMode === 2 ? e.deltaY * 300 : e.deltaY);
    const step = delta / WHEEL_UNITS;

    // Accumulate target from targetTurn instead of interrupting state midway
    const next = clamp(targetTurn + step, 0, last + 1);

    if ((step > 0 && targetTurn < last + 1) || (step < 0 && targetTurn > 0)) {
      e.preventDefault();
    }

    targetTurn = next;
    to(targetTurn, 0.45, "power1.out");

    clearTimeout(settleTimeout);
    settleTimeout = setTimeout(() => {
      // Gently snap to the closest card after user finishes scrolling
      const snapped = Math.round(targetTurn);
      to(snapped, 0.5, "power2.out");
    }, SETTLE);
  }, { passive: false });

  stage.addEventListener("pointerdown", (e) => {
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
  stage.addEventListener("pointercancel", stopDrag);

  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "PageDown") to(Math.round(state.turn) + 1, 0.45);
    else if (e.key === "ArrowUp" || e.key === "PageUp") to(Math.round(state.turn) - 1, 0.45);
    else return;
    e.preventDefault();
  });

`;

    js = js.substring(0, startIdx) + smoothCode + js.substring(endIdx);
    fs.writeFileSync(scriptPath, js, 'utf8');
    console.log('Made wheel smooth in', scriptPath);
  } else {
    console.log('Markers not found in', scriptPath);
  }

  // Update works-wheel.tsx if exists
  if (fs.existsSync(tsxPath)) {
    let tsx = fs.readFileSync(tsxPath, 'utf8');
    tsx = tsx.replace(/const WHEEL_UNITS = [0-9.]+;/, 'const WHEEL_UNITS = 260;');
    tsx = tsx.replace(/const DRAG_UNITS = [0-9.]+;/, 'const DRAG_UNITS = 180;');
    tsx = tsx.replace(/const SETTLE = [0-9.]+;/, 'const SETTLE = 220;');
    fs.writeFileSync(tsxPath, tsx, 'utf8');
    console.log('Updated tsx constants in', tsxPath);
  }
}

makeWheelButterySmooth('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only');
makeWheelButterySmooth('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO');
