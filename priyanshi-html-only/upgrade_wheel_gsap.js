const fs = require('fs');

function upgradeWheelToGsap(filePath) {
  if (!fs.existsSync(filePath)) return;
  let js = fs.readFileSync(filePath, 'utf8');

  // Replace initWorksWheel implementation with optimized GSAP-driven version
  const startMarker = 'function initWorksWheel() {';
  const endMarker = 'window.initWorksWheel = initWorksWheel;';

  const startIdx = js.indexOf(startMarker);
  const endIdx = js.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    console.log('Markers not found in', filePath);
    return;
  }

  const newFunction = `function initWorksWheel() {
  const mount = document.getElementById("worksWheelMount");
  if (!mount) return;

  // Geometry: tuned for large, immersive, unboxed presence
  const CARD_H = 0.58;
  const CARD_MAX_W = 0.52;
  const CARD_RATIO = 1.48;
  const STEP = 36;
  const DRUM = 2.05;
  const LENS = 2.8;
  const RING_R = 1.18;
  const BOW = 1.55;
  const TITLE = 0.124;
  const INDEX = 0.04;
  const CULL = 1.6;
  const WHEEL_UNITS = 850;
  const DRAG_UNITS = 380;
  const SETTLE = 120;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const rad = (deg) => (deg * Math.PI) / 180;
  const bowAt = (drumDeg, bow) => -bow * (1 - Math.cos(rad(drumDeg)));

  function place(ringDeg, drumDeg, ringR, drumR, bow, m) {
    return (
      \`translateX(\${m * bowAt(drumDeg, bow)}px)\` +
      \` rotateZ(\${(1 - m) * ringDeg}deg) translateY(\${-(1 - m) * ringR}px)\` +
      \` rotateX(\${m * drumDeg}deg) translateZ(\${m * drumR}px)\`
    );
  }

  // Get authentic 3D projects from window.projects
  const rawItems = (typeof window.projects !== "undefined" && Array.isArray(window.projects))
    ? window.projects.filter(p => p.categoryKey === "visualisation")
    : [];

  const items = rawItems.map(p => ({
    title: p.title,
    image: p.image || (p.images && p.images[0]) || "",
    href: \`#project/\${p.id}\`
  }));

  const count = items.length;
  if (!count) return;
  const last = Math.max(count - 1, 0);

  // Build clean unboxed DOM layout
  mount.innerHTML = \`
    <div class="works-wheel-stage" tabindex="0" role="listbox" aria-label="3D Visualisation Works Wheel">
      <div class="works-wheel-drum">
        \${items.map((item, i) => \`
          <a id="works-wheel-\${i}" class="works-wheel-card" href="\${item.href}" role="option" aria-selected="\${i === 0}">
            <span class="works-wheel-card-inner">
              <img src="\${item.image}" alt="\${item.title}" draggable="false" loading="\${i < 2 ? 'eager' : 'lazy'}" decoding="async" />
              <span class="works-wheel-card-action">
                <svg viewBox="0 0 12 12" class="works-wheel-svg" aria-hidden="true">
                  <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Explore Study
              </span>
            </span>
          </a>
        \`).join("")}
      </div>
    </div>
    <div class="works-wheel-center-label">Works '26</div>
    <div class="works-wheel-front-title"></div>
    <ol class="works-wheel-index">
      \${items.map((item, i) => \`
        <li>
          <button type="button" data-index="\${i}">\${item.title}</button>
        </li>
      \`).join("")}
    </ol>
  \`;

  const stage = mount.querySelector(".works-wheel-stage");
  const drum = mount.querySelector(".works-wheel-drum");
  const cardEls = mount.querySelectorAll(".works-wheel-card");
  const centerLabel = mount.querySelector(".works-wheel-center-label");
  const frontTitle = mount.querySelector(".works-wheel-front-title");
  const indexBtns = mount.querySelectorAll(".works-wheel-index button");

  // State object for GSAP animation
  const state = { turn: 0 };
  let active = 0;
  let dragY = null;
  let settleTimeout = null;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function getMetrics() {
    const w = stage.clientWidth || mount.clientWidth || window.innerWidth || 1200;
    const h = stage.clientHeight || mount.clientHeight || 820;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;
    return {
      w,
      h,
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    };
  }

  function updateLayout() {
    const m = getMetrics();
    stage.style.perspective = \`\${m.depth}px\`;
    centerLabel.style.fontSize = \`\${m.title}px\`;
    frontTitle.style.fontSize = \`\${m.title}px\`;
    const indexOl = mount.querySelector(".works-wheel-index");
    if (indexOl) indexOl.style.fontSize = \`\${m.index}px\`;

    cardEls.forEach(card => {
      card.style.width = \`\${m.cardW}px\`;
      card.style.height = \`\${m.cardH}px\`;
      card.style.marginLeft = \`\${-m.cardW / 2}px\`;
      card.style.marginTop = \`\${-m.cardH / 2}px\`;
    });
    renderFrame();
  }

  function renderFrame() {
    const m = getMetrics();
    const t = state.turn;
    const morph = clamp(t, 0, 1);
    const pos = Math.max(0, t - 1);

    if (drum) {
      drum.style.transform = \`translateZ(\${-morph * m.drumR}px)\`;
    }

    for (let i = 0; i < count; i++) {
      const d = i - pos;
      const drumDeg = d * STEP;
      const card = cardEls[i];
      if (card) {
        card.style.transform = place(
          d * (360 / count),
          drumDeg,
          m.ringR,
          m.drumR,
          m.bow,
          morph
        );
        card.style.opacity = morph > 0.5 && Math.abs(d) > CULL ? "0" : "1";
        card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        const face = card.firstElementChild;
        if (face) {
          face.style.transform = \`scale(\${lerp(m.ringScale, 1, morph)})\`;
        }
      }
    }

    if (centerLabel) centerLabel.style.opacity = String(1 - morph);
    if (frontTitle) {
      frontTitle.style.opacity = String(morph);
      const near = clamp(Math.round(pos), 0, last);
      if (items[near]) frontTitle.textContent = items[near].title;
    }

    const nearIdx = clamp(Math.round(pos), 0, last);
    if (nearIdx !== active) {
      active = nearIdx;
      indexBtns.forEach((btn, bIdx) => {
        btn.classList.toggle("active", bIdx === active);
      });
      cardEls.forEach((card, cIdx) => {
        card.setAttribute("aria-selected", String(cIdx === active));
      });
    }
  }

  // Smooth GSAP Tween to target - zero CPU spinning when at rest
  function to(next, duration = 0.55) {
    const clampedNext = clamp(next, 0, last + 1);
    if (typeof gsap !== "undefined") {
      gsap.killTweensOf(state);
      if (reduced || duration === 0) {
        state.turn = clampedNext;
        renderFrame();
      } else {
        gsap.to(state, {
          turn: clampedNext,
          duration: duration,
          ease: "power2.out",
          onUpdate: renderFrame,
          overwrite: "auto"
        });
      }
    } else {
      state.turn = clampedNext;
      renderFrame();
    }
  }

  updateLayout();

  // Stage events: wheel, pointer, keys
  stage.addEventListener("wheel", (e) => {
    const currentTarget = (typeof gsap !== "undefined" ? gsap.getProperty(state, "turn") : state.turn) || state.turn;
    const next = currentTarget + e.deltaY / WHEEL_UNITS;
    if (next > 0 && next < last + 1) e.preventDefault();
    to(next, 0.4);
    clearTimeout(settleTimeout);
    settleTimeout = setTimeout(() => to(Math.round(state.turn), 0.45), SETTLE);
  }, { passive: false });

  stage.addEventListener("pointerdown", (e) => {
    dragY = e.clientY;
    stage.setPointerCapture(e.pointerId);
    if (typeof gsap !== "undefined") gsap.killTweensOf(state);
  });

  stage.addEventListener("pointermove", (e) => {
    if (dragY === null) return;
    const delta = (dragY - e.clientY) / DRAG_UNITS;
    state.turn = clamp(state.turn + delta, 0, last + 1);
    renderFrame();
    dragY = e.clientY;
  });

  const stopDrag = () => {
    dragY = null;
    if (state.turn > 1) to(Math.round(state.turn), 0.4);
  };
  stage.addEventListener("pointerup", stopDrag);
  stage.addEventListener("pointercancel", stopDrag);

  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") to(Math.round(state.turn) + 1, 0.4);
    else if (e.key === "ArrowUp") to(Math.round(state.turn) - 1, 0.4);
    else return;
    e.preventDefault();
  });

  indexBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index, 10);
      to(idx + 1, 0.6);
    });
  });

  window.addEventListener("resize", updateLayout, { passive: true });
}

`;

  const updatedJs = js.substring(0, startIdx) + newFunction + js.substring(endIdx);
  fs.writeFileSync(filePath, updatedJs, 'utf8');
  console.log('Upgraded initWorksWheel to GSAP in', filePath);
}

upgradeWheelToGsap('c:/Users/neeti/Downloads/priyanshi-portfolio-html-only/priyanshi-html-only/script.js');
upgradeWheelToGsap('e:/projects/priyanshi mathur portfolio/PORTFOLIO 2/PORTFOLIO/script.js');
