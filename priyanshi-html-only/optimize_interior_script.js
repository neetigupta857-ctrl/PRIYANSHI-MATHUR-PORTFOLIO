const fs = require('fs');

function optimizeScriptPerformance(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }
  let s = fs.readFileSync(filePath, 'utf8');

  // 1. Throttle / cache getBoundingClientRect in ChromaGrid on pointermove & during scroll
  const oldChromaMove = `  const onMove = (event) => {
    if (!config.spotlight) return;
    const box = root.getBoundingClientRect();
    state.tx = event.clientX - box.left;
    state.ty = event.clientY - box.top;
    if (!state.primed || state.power < 0.02) {
      state.x = state.tx;
      state.y = state.ty;
      state.primed = true;
    }
    state.target = 1;
    wake();
  };`;

  const newChromaMove = `  let cachedRootBox = null;
  const getRootBox = () => {
    if (!cachedRootBox) cachedRootBox = root.getBoundingClientRect();
    return cachedRootBox;
  };

  const invalidateChromaBox = () => {
    cachedRootBox = null;
  };

  window.addEventListener("scroll", invalidateChromaBox, { passive: true });

  const onMove = (event) => {
    if (!config.spotlight) return;
    const box = getRootBox();
    state.tx = event.clientX - box.left;
    state.ty = event.clientY - box.top;
    if (!state.primed || state.power < 0.02) {
      state.x = state.tx;
      state.y = state.ty;
      state.primed = true;
    }
    state.target = 1;
    wake();
  };`;

  if (s.includes(oldChromaMove)) {
    s = s.replace(oldChromaMove, newChromaMove);
    console.log('1. Optimized ChromaGrid onMove to eliminate layout thrashing in', filePath);
  } else {
    console.log('1. oldChromaMove not matched directly in', filePath);
  }

  // 2. Throttle place() in ChromaGrid during resize / layout changes
  const oldPlaceCall = `  if (window.ResizeObserver) {
    const resizeObserver = new ResizeObserver(place);
    resizeObserver.observe(root);
  } else {
    window.addEventListener("resize", place, { passive: true });
  }`;

  const newPlaceCall = `  let placeTimeout = 0;
  const debouncedPlace = () => {
    invalidateChromaBox();
    if (placeTimeout) cancelAnimationFrame(placeTimeout);
    placeTimeout = requestAnimationFrame(place);
  };

  if (window.ResizeObserver) {
    const resizeObserver = new ResizeObserver(debouncedPlace);
    resizeObserver.observe(root);
  } else {
    window.addEventListener("resize", debouncedPlace, { passive: true });
  }`;

  if (s.includes(oldPlaceCall)) {
    s = s.replace(oldPlaceCall, newPlaceCall);
    console.log('2. Debounced ChromaGrid place() in', filePath);
  } else {
    console.log('2. oldPlaceCall not matched in', filePath);
  }

  // 3. Optimize TiltedCards onMove: Skip calculations when scrolling or pointer is outside, throttle rect invalidation on scroll
  const oldTiltedListeners = `    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', () => { invalidateRects(); arbitrate(); }, { passive: true, capture: true });
    window.addEventListener('resize', invalidateRects, { passive: true });`;

  const newTiltedListeners = `    let scrollTimer = 0;
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', () => {
      invalidateRects();
      if (!scrollTimer) {
        scrollTimer = requestAnimationFrame(() => {
          arbitrate();
          scrollTimer = 0;
        });
      }
    }, { passive: true, capture: true });
    window.addEventListener('resize', invalidateRects, { passive: true });`;

  if (s.includes(oldTiltedListeners)) {
    s = s.replace(oldTiltedListeners, newTiltedListeners);
    console.log('3. Debounced Magnet scroll listener in', filePath);
  } else {
    console.log('3. oldTiltedListeners not matched in', filePath);
  }

  // Invalidate cachedRect on scroll for tilted cards so they don't reflow during rapid pointer events
  const oldTiltedEnter = `    const onEnter = (e) => {
      pointer.inside = true;
      cachedRect = figure.getBoundingClientRect();`;

  const newTiltedEnter = `    window.addEventListener("scroll", () => { cachedRect = null; }, { passive: true });
    const onEnter = (e) => {
      pointer.inside = true;
      cachedRect = figure.getBoundingClientRect();`;

  if (s.includes(oldTiltedEnter)) {
    s = s.replace(oldTiltedEnter, newTiltedEnter);
    console.log('4. Added passive scroll cache reset for tilted cards in', filePath);
  } else {
    console.log('4. oldTiltedEnter not matched in', filePath);
  }

  fs.writeFileSync(filePath, s, 'utf8');
}

optimizeScriptPerformance('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/script.js');
optimizeScriptPerformance('E:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/script.js');
