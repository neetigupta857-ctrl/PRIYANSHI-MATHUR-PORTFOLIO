function initWorksWheel() {
  const mount = document.getElementById("worksWheelMount");
  if (!mount) return;

  // Geometry: tuned for large, immersive, unboxed presence
  const CARD_H = 0.46;
  const CARD_MAX_W = 0.42;
  const CARD_RATIO = 1.45;
  const STEP = 28;
  const DRUM = 2.45;
  const LENS = 3.2;
  const RING_R = 1.25;
  const BOW = 1.65;
  const TITLE = 0.124;
  const INDEX = 0.04;
  const CULL = 2.4;
  const WHEEL_UNITS = 220; // Lower number = much lighter, effortless scrolling (was 850)
  const DRAG_UNITS = 150;  // Lower number = lighter dragging (was 380)
  const SETTLE = 180;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const rad = (deg) => (deg * Math.PI) / 180;
  const bowAt = (drumDeg, bow) => -bow * (1 - Math.cos(rad(drumDeg)));

  function place(ringDeg, drumDeg, ringR, drumR, bow, m) {
    return (
      `translateX(${m * bowAt(drumDeg, bow)}px)` +
      ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
      ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
    );
  }

  // Get authentic 3D projects from window.projects or projects
  const projs = (typeof window.projects !== "undefined" && Array.isArray(window.projects))
    ? window.projects
    : ((typeof projects !== "undefined" && Array.isArray(projects)) ? projects : []);

  const rawItems = projs.filter(p => p.categoryKey === "visualisation");

  const items = rawItems.map(p => {
    let imgPath = p.image || (p.images && p.images[0]) || "";
    // Use ultra-fast web-optimized thumb if present in directory
    const thumbPath = imgPath.replace(/1\.jpg$/i, "thumb.jpg");
    return {
      title: p.title,
      image: thumbPath,
      fullImage: imgPath,
      href: `#project/${p.id}`
    };
  });

  const count = items.length;
  if (!count) {
    // If projects are still loading, try again in 50ms
    setTimeout(initWorksWheel, 50);
    return;
  }

  const last = Math.max(count - 1, 0);

  // Build clean unboxed DOM layout
  mount.innerHTML = `
    <div class="works-wheel-stage" tabindex="0" role="listbox" aria-label="3D Visualisation Works Wheel">
      <div class="works-wheel-drum">
        ${items.map((item, i) => `
          <a id="works-wheel-${i}" class="works-wheel-card" href="${item.href}" data-project="${rawItems[i] ? rawItems[i].id : ''}" role="option" aria-selected="${i === 0}">
            <span class="works-wheel-card-inner">
              <img src="${item.image}" alt="${item.title}" draggable="false" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async" />
              <span class="works-wheel-card-action">
                <svg viewBox="0 0 12 12" class="works-wheel-svg" aria-hidden="true">
                  <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Explore Study
              </span>
            </span>
          </a>
        `).join("")}
      </div>
    </div>
    <div class="works-wheel-center-label">Selected Projects</div>
    <div class="works-wheel-front-title"></div>
  `;

  const stage = mount.querySelector(".works-wheel-stage");
  const drum = mount.querySelector(".works-wheel-drum");
  const cardEls = mount.querySelectorAll(".works-wheel-card");
  const centerLabel = mount.querySelector(".works-wheel-center-label");
  const frontTitle = mount.querySelector(".works-wheel-front-title");

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
    stage.style.perspective = `${m.depth}px`;
    centerLabel.style.fontSize = `${m.title}px`;
    frontTitle.style.fontSize = `${m.title}px`;

    cardEls.forEach(card => {
      card.style.width = `${m.cardW}px`;
      card.style.height = `${m.cardH}px`;
      card.style.marginLeft = `${-m.cardW / 2}px`;
      card.style.marginTop = `${-m.cardH / 2}px`;
    });
    renderFrame();
  }

  function renderFrame() {
    const m = getMetrics();
    const t = state.turn;
    const morph = clamp(t, 0, 1);
    const pos = Math.max(0, t - 1);

    if (drum) {
      drum.style.transform = `translateZ(${-morph * m.drumR}px)`;
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
          face.style.transform = `scale(${lerp(m.ringScale, 1, morph)})`;
        }
      }
    }

    if (centerLabel) {
      // Visible in the center of the ring when at start; cleanly fades completely out as user scrolls into drum view
      centerLabel.style.opacity = String(Math.max(0, 1 - morph * 1.5));
    }
    if (frontTitle) {
      frontTitle.style.opacity = String(morph);
      const near = clamp(Math.round(pos), 0, last);
      if (items[near]) frontTitle.textContent = items[near].title;
    }

    const nearIdx = clamp(Math.round(pos), 0, last);
    if (nearIdx !== active) {
      active = nearIdx;
      cardEls.forEach((card, cIdx) => {
        card.setAttribute("aria-selected", String(cIdx === active));
      });
    }
  }

  // Smooth GSAP Inertia Tweening - prevents animation stutter and hanging
  let targetTurn = state.turn;

  function to(next, duration = 0.45, ease = "power2.out") {
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

  // Optimized wheel & drag handling with RAF throttling to prevent UI thread hanging
  let wheelRaf = null;

  stage.addEventListener("wheel", (e) => {
    // Normalize delta across all input hardware (mouse wheel, magic mouse, trackpad)
    const rawDelta = e.deltaMode === 1 ? e.deltaY * 33 : (e.deltaMode === 2 ? e.deltaY * 300 : e.deltaY);
    const step = rawDelta / 200;

    const next = clamp(targetTurn + step, 0, last + 1);

    if ((step > 0 && targetTurn < last + 1) || (step < 0 && targetTurn > 0)) {
      e.preventDefault();
    }

    targetTurn = next;

    if (!wheelRaf) {
      wheelRaf = requestAnimationFrame(() => {
        to(targetTurn, 0.28, "power1.out");
        wheelRaf = null;
      });
    }

    clearTimeout(settleTimeout);
    settleTimeout = setTimeout(() => {
      const snapped = Math.round(targetTurn);
      to(snapped, 0.35, "power2.out");
    }, 120);
  }, { passive: false });

  let startY = 0;
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
    const delta = (dragY - e.clientY) / 140;
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
    to(snapped, 0.35, "power2.out");
  };
  stage.addEventListener("pointerup", stopDrag);
  stage.addEventListener("pointercancel", stopDrag);

  // Directly handle click on cards and Explore Study action
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
  });

  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "PageDown") to(Math.round(targetTurn) + 1, 0.35);
    else if (e.key === "ArrowUp" || e.key === "PageUp") to(Math.round(targetTurn) - 1, 0.35);
    else return;
    e.preventDefault();
  });

  window.addEventListener("resize", updateLayout, { passive: true });
}

/* ========================================================
   REACT BITS: CHROMAGRID COMPONENT LOGIC & SPOTLIGHT PHYSICS
   ======================================================== */
function initChromaGrid(options = {}) {
  const root = document.getElementById("interiorChromaGrid") || document.querySelector(".chroma-grid");
  if (!root) return;

  const config = {
    damping: options.damping ?? 0.45,
    fadeOut: options.fadeOut ?? 0.6,
    softness: options.softness ?? 0.6,
    spotlight: options.reveal !== "card"
  };

  const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

  // Generate radial falloff gradient stops matching React Bits component
  const falloffStops = (softness) => {
    const core = clamp(1 - softness, 0, 0.95);
    const stops = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      const u = clamp((t - core) / Math.max(0.0001, 1 - core), 0, 1);
      const alpha = 1 - u * u * u * (u * (u * 6 - 15) + 10);
      stops.push(`rgba(0, 0, 0, ${alpha.toFixed(3)}) ${(t * 100).toFixed(1)}%`);
    }
    return stops.join(", ");
  };

  root.style.setProperty("--chroma-stops", falloffStops(clamp(config.softness, 0, 1)));

  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const state = { x: 0, y: 0, tx: 0, ty: 0, power: 0, target: 0, primed: false };
  let raf = 0;
  let last = 0;

  const place = () => {
    const box = root.getBoundingClientRect();
    root.querySelectorAll("[data-chroma-area]").forEach((node) => {
      const rect = node.getBoundingClientRect();
      node.style.setProperty("--chroma-ox", `${rect.left - box.left}px`);
      node.style.setProperty("--chroma-oy", `${rect.top - box.top}px`);
    });
  };

  const frame = (now) => {
    raf = 0;
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
    last = now;

    const follow = reduce ? 1 : 1 - Math.exp(-dt / Math.max(0.01, config.damping * 0.32));
    state.x += (state.tx - state.x) * follow;
    state.y += (state.ty - state.y) * follow;

    const span = state.target > state.power ? 0.1 : Math.max(0.02, config.fadeOut * 0.35);
    state.power += (state.target - state.power) * (reduce ? 1 : 1 - Math.exp(-dt / span));

    root.style.setProperty("--chroma-x", `${state.x.toFixed(2)}px`);
    root.style.setProperty("--chroma-y", `${state.y.toFixed(2)}px`);
    root.style.setProperty("--chroma-power", state.power.toFixed(4));

    const settled =
      Math.abs(state.tx - state.x) < 0.1 &&
      Math.abs(state.ty - state.y) < 0.1 &&
      Math.abs(state.target - state.power) < 0.002;

    if (settled) {
      state.power = state.target;
      root.style.setProperty("--chroma-power", state.power.toFixed(4));
      last = 0;
    } else {
      raf = requestAnimationFrame(frame);
    }
  };

  const wake = () => {
    if (!raf) raf = requestAnimationFrame(frame);
  };

  let cachedRootBox = null;
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
  };

  const onLeave = () => {
    state.target = 0;
    wake();
  };

  let placeTimeout = 0;
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
  }

  root.addEventListener("pointermove", onMove, { passive: true });
  root.addEventListener("pointerdown", onMove, { passive: true });
  root.addEventListener("pointerleave", onLeave, { passive: true });
  root.addEventListener("pointercancel", onLeave, { passive: true });

  place();
  setTimeout(place, 100);
}

/* ========================================================
   REACT BITS: TILTEDCARD COMPONENT PHYSICS & SPRING SOLVER
   ======================================================== */
function initTiltedCards(options = {}) {
  const figures = document.querySelectorAll(".tilted-card");
  if (!figures || figures.length === 0) return;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const smoother = (t) => {
    const x = clamp(t, 0, 1);
    return x * x * x * (x * (x * 6 - 15) + 10);
  };

  const stepSpring = (state, key, target, omega, zeta, dt) => {
    const velocity = `v${key}`;
    const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
    const h = dt / steps;
    for (let index = 0; index < steps; index++) {
      state[velocity] += (omega * omega * (target - state[key]) - 2 * zeta * omega * state[velocity]) * h;
      state[key] += state[velocity] * h;
    }
    const settled = Math.abs(target - state[key]) < 0.001 && Math.abs(state[velocity]) < 0.01;
    if (settled) {
      state[key] = target;
      state[velocity] = 0;
    }
    return !settled;
  };

  figures.forEach((figure) => {
    if (figure.dataset.tcInitialized === "true") return;
    figure.dataset.tcInitialized = "true";

    const body = figure.querySelector(".tilted-card__body");
    const shadow = figure.querySelector(".tilted-card__shadow");
    const caption = figure.querySelector(".tilted-card__caption");
    if (!body) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const settings = {
      amplitude: clamp(options.rotateAmplitude ?? 12, 0, 60),
      scale: Math.max(0.5, options.scaleOnHover ?? 1.05),
      smoothness: clamp(options.smoothness ?? 0.6, 0, 1),
      glare: clamp(options.glare ?? 0.5, 0, 1),
      shadow: clamp(options.shadow ?? 0.5, 0, 1),
      parallax: Math.max(0, options.parallax ?? 1),
      showTooltip: false
    };

    const state = {
      rx: 0, vrx: 0,
      ry: 0, vry: 0,
      lift: 0, vlift: 0,
      ty: 0, vty: 0,
      shown: 0, vshown: 0,
      tip: 0, vtip: 0,
      tx: 0, tyy: 0
    };

    const pointer = { nx: 0, ny: 0, x: 0, y: 0, inside: false, mouse: false, vx: 0, last: 0 };
    let raf = 0;
    let last = 0;

    const frame = (now) => {
      raf = 0;
      const dt = clamp((now - last) / 1000 || 0, 0, 0.05);
      last = Math.max(last, now);
      let busy = false;

      const amplitude = settings.amplitude * (reduced ? 0.3 : 1);
      const following = pointer.inside;
      let inputX = following ? pointer.nx : 0;
      let inputY = following ? pointer.ny : 0;

      const omega = 20 * Math.pow(0.2, settings.smoothness);
      const zeta = 1 - 0.3 * settings.smoothness;
      const lifted = following ? 1 : 0;

      busy = stepSpring(state, "rx", -inputY * amplitude, omega, zeta, dt) || busy;
      busy = stepSpring(state, "ry", inputX * amplitude, omega, zeta, dt) || busy;
      busy = stepSpring(state, "lift", lifted, omega, Math.max(zeta, 0.85), dt) || busy;

      const active = lifted > 0 || state.lift > 0.01;
      if (active !== figure.hasAttribute("data-active")) figure.toggleAttribute("data-active", active);

      const scale = 1 + (settings.scale - 1) * state.lift;
      const rx = state.rx;
      const ry = state.ry;
      const radiansX = (rx * Math.PI) / 180;
      const radiansY = (ry * Math.PI) / 180;

      body.style.transform = `translate3d(0, 0px, 0) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg) scale(${scale.toFixed(4)})`;
      body.style.setProperty("--tc-px", (Math.sin(radiansY) * settings.parallax).toFixed(4));
      body.style.setProperty("--tc-py", (-Math.sin(radiansX) * settings.parallax).toFixed(4));

      const reach = Math.max(amplitude, 1);
      body.style.setProperty("--tc-gx", `${(50 + (ry / reach) * 46).toFixed(2)}%`);
      body.style.setProperty("--tc-gy", `${(50 - (rx / reach) * 46).toFixed(2)}%`);

      const energy = Math.min(1, Math.hypot(rx, ry) / reach);
      body.style.setProperty("--tc-glare", (settings.glare * Math.max(state.lift, energy)).toFixed(3));

      if (shadow) {
        const offsetX = -Math.sin(radiansY) * 22;
        const offsetY = 12 + 16 * state.lift + Math.sin(radiansX) * 18;
        const spread = scale * (0.86 + 0.04 * state.lift);
        shadow.style.transform = `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0) scale(${spread.toFixed(4)})`;
        shadow.style.opacity = (settings.shadow * (0.6 + 0.4 * state.lift)).toFixed(3);
      }

      if (caption && settings.showTooltip) {
        const show = following ? 1 : 0;
        busy = stepSpring(state, "shown", show, 16, 1, dt) || busy;
        const followFactor = 1 - Math.exp(-dt / 0.035);
        state.tx += (pointer.x - state.tx) * followFactor;
        state.tyy += (pointer.y - state.tyy) * followFactor;
        if (Math.abs(pointer.x - state.tx) + Math.abs(pointer.y - state.tyy) > 0.2) busy = true;
        pointer.vx *= Math.exp(-dt / 0.08);
        busy = stepSpring(state, "tip", reduced ? 0 : clamp(-pointer.vx * 0.012, -14, 14), 18, 0.62, dt) || busy;
        caption.style.transform = `translate3d(${state.tx.toFixed(1)}px, ${state.tyy.toFixed(1)}px, 0) rotate(${state.tip.toFixed(2)}deg)`;
        caption.style.opacity = Math.max(0, state.shown).toFixed(3);
      }

      if (busy) raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    let cachedRect = null;
    const locate = (event) => {
      if (!cachedRect) cachedRect = figure.getBoundingClientRect();
      return {
        x: event.clientX - cachedRect.left,
        y: event.clientY - cachedRect.top,
        width: Math.max(1, cachedRect.width),
        height: Math.max(1, cachedRect.height)
      };
    };

    window.addEventListener("scroll", () => { cachedRect = null; }, { passive: true });
    const onEnter = (e) => {
      pointer.inside = true;
      cachedRect = figure.getBoundingClientRect();
      const spot = locate(e);
      pointer.x = spot.x;
      pointer.y = spot.y;
      state.tx = spot.x;
      state.tyy = spot.y;
      pointer.vx = 0;
      pointer.nx = clamp((spot.x - spot.width / 2) / (spot.width / 2), -1, 1);
      pointer.ny = clamp((spot.y - spot.height / 2) / (spot.height / 2), -1, 1);
      wake();
    };

    const onMove = (e) => {
      if (!pointer.inside) {
        pointer.inside = true;
        cachedRect = figure.getBoundingClientRect();
      }
      const spot = locate(e);
      const now = performance.now();
      const elapsed = Math.max(8, now - (pointer.last || now - 16)) / 1000;
      const dx = spot.x - pointer.x;
      pointer.vx += (dx / elapsed - pointer.vx) * 0.5;
      pointer.last = now;
      pointer.x = spot.x;
      pointer.y = spot.y;
      pointer.nx = clamp((spot.x - spot.width / 2) / (spot.width / 2), -1, 1);
      pointer.ny = clamp((spot.y - spot.height / 2) / (spot.height / 2), -1, 1);
      wake();
    };

    const onLeave = () => {
      pointer.inside = false;
      cachedRect = null;
      wake();
    };

    figure.addEventListener("pointerenter", onEnter, { passive: true });
    figure.addEventListener("pointermove", onMove, { passive: true });
    figure.addEventListener("pointerleave", onLeave, { passive: true });
  });
}

// ========================================================
// REACT BITS: MAGNET COMPONENT IMPLEMENTATION
// High-performance cursor attraction & spring physics for buttons
// ========================================================
(function() {
  const DEFAULT_SPRING = { stiffness: 170, damping: 16, mass: 1 };

  const smoothstep = (edge0, edge1, value) => {
    const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  };

  const registry = new Set();
  const field = { pointer: null, owner: null };
  let detach = null;

  const reach = (rect, pointer) => {
    const dx = pointer.x - (rect.left + rect.width / 2);
    const dy = pointer.y - (rect.top + rect.height / 2);
    const outside = Math.hypot(Math.max(0, Math.abs(dx) - rect.width / 2), Math.max(0, Math.abs(dy) - rect.height / 2));
    return { dx, dy, outside };
  };

  const arbitrate = () => {
    let winner = null;
    let nearest = Infinity;
    let closest = Infinity;
    for (const entry of registry) {
      const s = entry.settings;
      let near = null;
      if (field.pointer && !s.disabled && !entry.reduce) {
        if (!entry.cachedRect) entry.cachedRect = entry.wrapper.getBoundingClientRect();
        near = reach(entry.cachedRect, field.pointer);
        if (near.outside > s.padding) near = null;
      }
      if (!s.exclusive) {
        if (near || entry.active) entry.wake();
        continue;
      }
      if (!near) continue;
      const center = Math.hypot(near.dx, near.dy);
      if (near.outside < nearest || (near.outside === nearest && center < closest)) {
        winner = entry;
        nearest = near.outside;
        closest = center;
      }
    }
    const previous = field.owner;
    field.owner = winner;
    if (previous && previous !== winner) previous.wake();
    if (winner) winner.wake();
  };

  const attach = () => {
    let ticking = false;
    let cachedPointer = null;

    const onPointerMove = event => {
      if (event.pointerType === 'touch') return;
      cachedPointer = { x: event.clientX, y: event.clientY };
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          field.pointer = cachedPointer;
          arbitrate();
          ticking = false;
        });
      }
    };
    const onLeave = () => {
      field.pointer = null;
      arbitrate();
    };
    const invalidateRects = () => {
      registry.forEach(entry => { entry.cachedRect = null; });
    };

    let scrollTimer = 0;
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
    window.addEventListener('resize', invalidateRects, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', arbitrate, { capture: true });
      window.removeEventListener('resize', invalidateRects);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
    };
  };

  function createMagnet(wrapper, options = {}) {
    if (wrapper.dataset.magnetInitialized === "true") return;
    wrapper.dataset.magnetInitialized = "true";

    let inner = wrapper.querySelector(".magnet-inner");
    if (!inner) {
      inner = document.createElement("div");
      inner.className = "magnet-inner";
      inner.style.willChange = "transform";
      inner.style.display = "inline-block";
      inner.style.width = "100%";
      inner.style.height = "100%";
      while (wrapper.firstChild) {
        inner.appendChild(wrapper.firstChild);
      }
      wrapper.appendChild(inner);
    }

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const settings = {
      padding: Math.max(0, options.padding ?? 80),
      disabled: options.disabled ?? false,
      strength: Math.max(0.1, options.magnetStrength ?? 2.4),
      maxOffset: options.maxOffset ?? 28,
      exclusive: options.exclusive ?? true,
      axis: options.axis ?? 'both',
      tilt: options.tilt ?? 6,
      scale: options.scale ?? 1.04,
      stiffness: Math.max(1, options.spring?.stiffness ?? DEFAULT_SPRING.stiffness),
      damping: Math.max(0, options.spring?.damping ?? DEFAULT_SPRING.damping),
      mass: Math.max(0.01, options.spring?.mass ?? DEFAULT_SPRING.mass),
      onActiveChange: options.onActiveChange
    };

    const current = { x: 0, y: 0, tiltX: 0, tiltY: 0, scale: 1 };
    const velocity = { x: 0, y: 0, tiltX: 0, tiltY: 0, scale: 0 };
    let active = false;
    let raf = 0;
    let last = 0;

    const solve = (target, dt) => {
      let resting = true;
      Object.keys(current).forEach(key => {
        const force = settings.stiffness * (target[key] - current[key]) - settings.damping * velocity[key];
        velocity[key] += (force / settings.mass) * dt;
        current[key] += velocity[key] * dt;
        const epsilon = key === 'scale' ? 0.001 : 0.05;
        if (Math.abs(target[key] - current[key]) > epsilon || Math.abs(velocity[key]) > epsilon) resting = false;
      });
      return resting;
    };

    const measure = () => {
      const target = { x: 0, y: 0, tiltX: 0, tiltY: 0, scale: 1 };
      if (settings.disabled || reduce || !field.pointer) return { target, engaged: false };
      if (settings.exclusive && field.owner !== entry) return { target, engaged: false };
      const rect = wrapper.getBoundingClientRect();
      const { dx, dy, outside } = reach(rect, field.pointer);
      if (outside > settings.padding) return { target, engaged: false };
      const pull = settings.padding > 0 ? 1 - smoothstep(settings.padding * 0.5, settings.padding, outside) : 1;
      let x = settings.axis === 'y' ? 0 : (dx / settings.strength) * pull;
      let y = settings.axis === 'x' ? 0 : (dy / settings.strength) * pull;
      if (settings.maxOffset !== undefined && settings.maxOffset !== null) {
        const length = Math.hypot(x, y);
        if (length > settings.maxOffset) {
          x *= settings.maxOffset / length;
          y *= settings.maxOffset / length;
        }
      }
      const nx = Math.max(-1, Math.min(1, dx / Math.max(rect.width / 2, 1)));
      const ny = Math.max(-1, Math.min(1, dy / Math.max(rect.height / 2, 1)));
      target.x = x;
      target.y = y;
      target.tiltX = -ny * settings.tilt * pull;
      target.tiltY = nx * settings.tilt * pull;
      target.scale = 1 + (settings.scale - 1) * pull;
      return { target, engaged: true };
    };

    const apply = () => {
      const { x, y, tiltX, tiltY, scale } = current;
      const turned = Math.abs(tiltX) > 0.01 || Math.abs(tiltY) > 0.01;
      inner.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)${
        turned ? ` perspective(800px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)` : ''
      }${Math.abs(scale - 1) > 0.0005 ? ` scale(${scale.toFixed(4)})` : ''}`;
    };

    const frame = now => {
      raf = 0;
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;
      const { target, engaged } = measure();
      if (engaged !== active) {
        active = engaged;
        entry.active = engaged;
        if (engaged) wrapper.setAttribute('data-magnet-active', '');
        else wrapper.removeAttribute('data-magnet-active');
        settings.onActiveChange?.(engaged);
      }
      const steps = Math.ceil(dt / (1 / 120));
      let resting = true;
      for (let i = 0; i < steps; i++) resting = solve(target, dt / steps);
      if (resting) {
        Object.keys(current).forEach(key => {
          current[key] = target[key];
          velocity[key] = 0;
        });
      }
      apply();
      if (!resting) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    function wake() {
      if (!raf) raf = requestAnimationFrame(frame);
    }

    const entry = { wrapper, settings, reduce, wake, active: false };
    registry.add(entry);
    if (!detach) detach = attach();
  }

  function initMagnet(options = {}) {
    // Select primary interactive CTA buttons
    const selector = [
      ".nav .download",
      ".hero-btn",
      ".split-btn-charcoal",
      ".split-btn-glass",
      ".about-more-link",
      ".walkthrough-action-btn",
      ".menu-btn"
    ].join(", ");

    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      // If already wrapped or initialized, skip
      if (el.dataset.magnetInitialized === "true") return;

      // Check if element has its own display style
      let wrapper = el.parentElement;
      if (!wrapper || !wrapper.classList.contains("magnet-wrapper")) {
        // Wrap the button cleanly in a magnet-wrapper
        wrapper = document.createElement("div");
        wrapper.className = "magnet-wrapper";
        wrapper.style.position = "relative";
        wrapper.style.display = "inline-block";
        wrapper.style.verticalAlign = "middle";
        
        // Preserve layout flow if original was block or full width
        const computedDisplay = window.getComputedStyle(el).display;
        if (computedDisplay === "flex" || computedDisplay === "block") {
          wrapper.style.display = computedDisplay;
          wrapper.style.width = "auto";
        }

        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
      }

      createMagnet(wrapper, options);
    });
  }

  window.initMagnet = initMagnet;
})();

window.initWorksWheel = initWorksWheel;
window.initChromaGrid = initChromaGrid;
window.initTiltedCards = initTiltedCards;
if (typeof initScrollAnimations === "function") window.initScrollAnimations = initScrollAnimations;
if (typeof setupMobileNavigation === "function") window.setupMobileNavigation = setupMobileNavigation;
if (typeof setupSmoothScrollAndActiveLinks === "function") window.setupSmoothScrollAndActiveLinks = setupSmoothScrollAndActiveLinks;

/**
 * Smooth Cursor Follower
 * Direct vanilla JS implementation of the React CursorFollower component:
 * - Smooth lerp tracking (DOT_SMOOTHNESS: 0.2, BORDER_DOT_SMOOTHNESS: 0.1)
 * - Trailing border ring expands over interactive elements (a, button, img, input, textarea, select, [tabindex])
 */
function initCursorFollower() {
  const container = document.getElementById("cursorFollower");
  const dotEl = document.getElementById("cursorDot");
  const borderEl = document.getElementById("cursorBorder");

  if (!container || !dotEl || !borderEl) return;
  if (window._cursorFollowerInitialized) return;
  window._cursorFollowerInitialized = true;

  const mousePosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const dotPosition = { x: mousePosition.x, y: mousePosition.y };
  const borderDotPosition = { x: mousePosition.x, y: mousePosition.y };

  const DOT_SMOOTHNESS = 0.2;
  const BORDER_DOT_SMOOTHNESS = 0.1;

  let hasMoved = false;

  const handleMouseMove = (e) => {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
    if (!hasMoved) {
      hasMoved = true;
      dotPosition.x = e.clientX;
      dotPosition.y = e.clientY;
      borderDotPosition.x = e.clientX;
      borderDotPosition.y = e.clientY;
    }
  };

  const handleMouseEnter = () => borderEl.classList.add("is-hovering");
  const handleMouseLeave = () => borderEl.classList.remove("is-hovering");

  window.addEventListener("mousemove", handleMouseMove, { passive: true });

  function attachHoverListeners() {
    const interactiveElements = document.querySelectorAll(
      "a, button, img, input, textarea, select, [tabindex='0'], .tilted-card, .works-wheel-card, [role='button']"
    );
    interactiveElements.forEach((element) => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });
  }

  attachHoverListeners();

  // Observer or re-attach on DOM mutations or route changes
  const observer = new MutationObserver(() => {
    attachHoverListeners();
  });
  const app = document.getElementById("app") || document.body;
  observer.observe(app, { childList: true, subtree: true });

  const lerp = (start, end, factor) => start + (end - start) * factor;

  function animate() {
    dotPosition.x = lerp(dotPosition.x, mousePosition.x, DOT_SMOOTHNESS);
    dotPosition.y = lerp(dotPosition.y, mousePosition.y, DOT_SMOOTHNESS);

    borderDotPosition.x = lerp(borderDotPosition.x, mousePosition.x, BORDER_DOT_SMOOTHNESS);
    borderDotPosition.y = lerp(borderDotPosition.y, mousePosition.y, BORDER_DOT_SMOOTHNESS);

    dotEl.style.left = `${dotPosition.x}px`;
    dotEl.style.top = `${dotPosition.y}px`;

    borderEl.style.left = `${borderDotPosition.x}px`;
    borderEl.style.top = `${borderDotPosition.y}px`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

window.initCursorFollower = initCursorFollower;

// Auto-run when DOM content is ready
document.addEventListener("DOMContentLoaded", () => {
  if (typeof setupMobileNavigation === "function") setupMobileNavigation();
  if (typeof setupSmoothScrollAndActiveLinks === "function") setupSmoothScrollAndActiveLinks();
  setTimeout(() => {
    if (typeof initScrollAnimations === "function") initScrollAnimations();
    if (typeof initChromaGrid === "function") initChromaGrid();
    if (typeof initTiltedCards === "function") initTiltedCards();
    if (typeof initMagnet === "function") initMagnet();
    if (typeof initCursorFollower === "function") initCursorFollower();
  }, 100);
});
