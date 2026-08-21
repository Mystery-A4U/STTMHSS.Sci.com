/* ======================================================================
   SCIENCE-BG.JS — a quiet, full-viewport canvas of drifting atoms
   (nucleus + orbiting electrons), dust motes and floating science
   symbols (⚛ E=mc² H₂O λ ...). Fixed behind the page content, in the
   gold/cream palette already used across the site. Pauses automatically
   when the tab is hidden and respects prefers-reduced-motion.
   ====================================================================== */
(function () {
  const canvas = document.getElementById("scienceCanvas");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const GOLD = "233,196,115";
  const CREAM = "248,241,226";
  const SYMBOLS = ["⚛", "H₂O", "E=mc²", "λ", "π", "Σ", "Δ", "DNA", "∞", "O₂", "CO₂", "F=ma"];

  let W, H, DPR;
  let atoms = [], dust = [], glyphs = [];

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    seed();
  }

  function seed() {
    const atomCount = Math.max(5, Math.min(11, Math.floor((W * H) / 230000)));
    atoms = Array.from({ length: atomCount }).map(() => ({
      x: rand(0, W),
      y: rand(0, H),
      vx: rand(-0.055, 0.055),
      vy: rand(-0.045, 0.045),
      r: rand(15, 32),
      tilt: rand(0, Math.PI),
      alpha: rand(0.12, 0.26),
      electrons: Array.from({ length: 2 + Math.floor(Math.random() * 2) }).map(
        () => ({
          angle: rand(0, Math.PI * 2),
          speed: rand(0.006, 0.015) * (Math.random() < 0.5 ? -1 : 1),
          ecc: rand(0.35, 0.55),
        })
      ),
    }));

    const dustCount = Math.max(24, Math.min(70, Math.floor((W * H) / 26000)));
    dust = Array.from({ length: dustCount }).map(() => ({
      x: rand(0, W),
      y: rand(0, H),
      vy: rand(0.04, 0.16),
      r: rand(0.6, 1.5),
      alpha: rand(0.12, 0.42),
    }));

    glyphs = Array.from({ length: 7 }).map(spawnGlyph);
  }

  function spawnGlyph() {
    return {
      text: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      x: rand(W * 0.06, W * 0.94),
      y: rand(H * 0.5, H * 1.15),
      vy: rand(0.07, 0.16),
      size: rand(13, 19),
      alpha: 0,
      maxAlpha: rand(0.09, 0.2),
      life: 0,
      fadeIn: rand(70, 130),
      total: rand(600, 1000),
    };
  }

  function drawAtom(a) {
    ctx.save();
    ctx.translate(a.x, a.y);
    ctx.rotate(a.tilt);
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${GOLD},${a.alpha})`;

    a.electrons.forEach((e, i) => {
      const rx = a.r,
        ry = a.r * e.ecc;
      ctx.save();
      ctx.rotate((Math.PI * i) / a.electrons.length);
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();

      const ex = Math.cos(e.angle) * rx;
      const ey = Math.sin(e.angle) * ry;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${GOLD}, ${Math.min(1, a.alpha + 0.5)})`;
      ctx.arc(ex, ey, 2.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (!reduceMotion) e.angle += e.speed;
    });

    ctx.beginPath();
    ctx.fillStyle = `rgba(${CREAM}, ${a.alpha + 0.22})`;
    ctx.arc(0, 0, 2.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (!reduceMotion) {
      a.x += a.vx;
      a.y += a.vy;
      if (a.x < -60) a.x = W + 60;
      if (a.x > W + 60) a.x = -60;
      if (a.y < -60) a.y = H + 60;
      if (a.y > H + 60) a.y = -60;
    }
  }

  function drawDust(d) {
    if (!reduceMotion) {
      d.y -= d.vy;
      if (d.y < -10) {
        d.y = H + 10;
        d.x = rand(0, W);
      }
    }
    ctx.beginPath();
    ctx.fillStyle = `rgba(${GOLD}, ${d.alpha})`;
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawGlyph(g, idx) {
    if (!reduceMotion) {
      g.life++;
      g.y -= g.vy;
      if (g.life < g.fadeIn) g.alpha = (g.life / g.fadeIn) * g.maxAlpha;
      else if (g.life > g.total - g.fadeIn)
        g.alpha = Math.max(0, (g.total - g.life) / g.fadeIn) * g.maxAlpha;
      else g.alpha = g.maxAlpha;
    } else {
      g.alpha = g.maxAlpha * 0.6;
    }

    ctx.font = `${g.size}px 'JetBrains Mono', monospace`;
    ctx.fillStyle = `rgba(${GOLD}, ${g.alpha})`;
    ctx.fillText(g.text, g.x, g.y);

    if (!reduceMotion && (g.life > g.total || g.y < -40)) {
      glyphs[idx] = spawnGlyph();
    }
  }

  let running = false;
  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    dust.forEach(drawDust);
    atoms.forEach(drawAtom);
    glyphs.forEach(drawGlyph);
    requestAnimationFrame(frame);
  }

  function start() {
    if (running) return;
    running = true;
    requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
  }

  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  resize();
  if (reduceMotion) {
    // draw a single calm frame and leave it static
    ctx.clearRect(0, 0, W, H);
    dust.forEach(drawDust);
    atoms.forEach(drawAtom);
    glyphs.forEach(drawGlyph);
  } else {
    start();
  }
})();
