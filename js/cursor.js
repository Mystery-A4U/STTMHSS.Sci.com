/* ======================================================================
   CURSOR.JS — a small "atomic" custom cursor: a solid dot that tracks the
   mouse exactly, plus a lagging ring with one electron orbiting it. The
   ring grows and the electron speeds up over links, buttons and cards.
   Only runs on devices with a real mouse (hover:hover + pointer:fine),
   so touch devices keep their native cursor untouched.
   ====================================================================== */
(function () {
  if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.documentElement.classList.add("custom-cursor");

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  const electron = document.createElement("div");
  electron.className = "cursor-electron";
  document.body.append(dot, ring, electron);

  const HOVER_SEL =
    "a, button, .btn, .card, .info-card, input, textarea, select, .intro-skip, [role='button']";

  let mouseX = window.innerWidth / 2,
    mouseY = window.innerHeight / 2;
  let ringX = mouseX,
    ringY = mouseY;
  let size = 34,
    targetSize = 34;
  let angle = 0;
  let hovering = false;
  let visible = false;

  function show() {
    if (visible) return;
    visible = true;
    dot.style.opacity = 1;
    ring.style.opacity = 1;
    electron.style.opacity = 1;
  }
  function hide() {
    visible = false;
    dot.style.opacity = 0;
    ring.style.opacity = 0;
    electron.style.opacity = 0;
  }

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    show();
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  document.addEventListener("mouseleave", hide);
  document.addEventListener("mouseenter", show);

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest && e.target.closest(HOVER_SEL)) {
      hovering = true;
      targetSize = 66;
      ring.classList.add("hover");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest && e.target.closest(HOVER_SEL)) {
      hovering = false;
      targetSize = 34;
      ring.classList.remove("hover");
    }
  });

  document.addEventListener("mousedown", () => dot.classList.add("click"));
  document.addEventListener("mouseup", () => dot.classList.remove("click"));

  function loop() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    size += (targetSize - size) * 0.16;
    angle += hovering ? 0.1 : 0.045;

    const orbitR = size / 2 - 5;
    const ex = ringX + Math.cos(angle) * orbitR;
    const ey = ringY + Math.sin(angle) * orbitR * 0.62; // slightly elliptical orbit

    ring.style.width = size + "px";
    ring.style.height = size + "px";
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    electron.style.transform = `translate(${ex}px, ${ey}px) translate(-50%, -50%)`;

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
