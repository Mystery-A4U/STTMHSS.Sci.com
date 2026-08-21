/* ======================================================================
   INTRO.JS — wings flap, feathers fall & trace a path, then the screen
   irises open into the school photo.
   You shouldn't need to edit this file — customise content in config.js.
   ====================================================================== */

(function(){
  const NS = "http://www.w3.org/2000/svg";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const wingStage   = document.getElementById("wingStage");
  const featherField= document.getElementById("featherField");
  const introEl     = document.getElementById("intro");
  const introSkip    = document.getElementById("introSkip");
  const scrollCue    = document.getElementById("scrollCue");
  const schoolZoom   = document.getElementById("schoolZoom");
  const schoolImg    = document.getElementById("schoolImg");
  const schoolFallbackText = document.getElementById("schoolFallbackText");
  const captionEyebrow = document.getElementById("captionEyebrow");
  const captionTitle   = document.getElementById("captionTitle");
  const tracePath     = document.getElementById("tracePathLine");
  const site           = document.getElementById("site");
  const body            = document.body;

  /* ---------------------------------------------------------------
     Populate the school photo + captions from config.js
     --------------------------------------------------------------- */
  schoolImg.src = SITE.schoolImage;
  schoolImg.alt = SITE.schoolImageAlt;
  schoolFallbackText.textContent = SITE.schoolName;
  schoolImg.addEventListener("error", () => schoolZoom.classList.add("no-photo"));

  captionEyebrow.textContent = SITE.place;
  captionTitle.innerHTML = SITE.schoolName.replace(
    /(Matriculation Higher Secondary School)/,
    "<em>$1</em>"
  );

  /* ---------------------------------------------------------------
     Build one wing (SVG, made of individually-rotated feathers).
     Both wings reuse this exact markup — CSS mirrors the right one.
     --------------------------------------------------------------- */
  function buildWing(seedOffset){
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 640 560");

    const FEATHER_COUNT = 12;
    const anchorX = 585, anchorY = 300;

    for(let i = 0; i < FEATHER_COUNT; i++){
      const t = i / (FEATHER_COUNT - 1);
      // fan angle: from near-horizontal (top) sweeping down past vertical
      const jitter = (Math.sin((i + seedOffset) * 12.9898) * 43758.5453) % 1;
      const angle = -35 - t * 130 + (jitter * 6 - 3);
      const scale = 0.5 + Math.pow(t, 0.85) * 0.95 + (jitter * 0.06);
      // spread anchor points a little along the wing bone for a layered look
      const ax = anchorX - t * 60;
      const ay = anchorY - (t - 0.42) * 210;

      // outer group: fixed positioning (fan angle, anchor, length) via SVG attribute
      const pos = document.createElementNS(NS, "g");
      pos.setAttribute("class", "quill-pos");
      pos.setAttribute("transform",
        `translate(${ax} ${ay}) rotate(${angle}) translate(-60 -300) scale(${scale})`
      );

      // inner group: CSS-animated ripple (kept separate so the flap animation
      // only adds a rotation on top, instead of overwriting the position above)
      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", "quill");
      g.style.animationDelay = (i * 0.022).toFixed(3) + "s";
      if(i % 3 === 1){ g.style.setProperty("--feather-fill", "url(#featherCreamFill)"); }

      const use = document.createElementNS(NS, "use");
      use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#feather-shape");
      use.setAttribute("href", "#feather-shape");
      use.style.opacity = (0.75 + t * 0.25).toFixed(2);
      g.appendChild(use);
      pos.appendChild(g);
      svg.appendChild(pos);
    }
    return svg;
  }

  const leftWing = document.createElement("div");
  leftWing.className = "wing left";
  leftWing.appendChild(buildWing(0));

  const rightWing = document.createElement("div");
  rightWing.className = "wing right";
  rightWing.appendChild(buildWing(50));

  wingStage.appendChild(leftWing);
  wingStage.appendChild(rightWing);

  /* ---------------------------------------------------------------
     Loose falling feathers with gentle physics-like sway
     --------------------------------------------------------------- */
  function spawnFeather(delay){
    const depthRoll = Math.random();
    const depth = depthRoll < 0.33 ? "near" : depthRoll < 0.7 ? "mid" : "far";
    const depthCfg = {
      near: { scale:[0.5,0.8], blur:0,   opacity:1,    z:3, dur:[4200,5400] },
      mid:  { scale:[0.32,0.5],blur:1,   opacity:.85,  z:2, dur:[5000,6400] },
      far:  { scale:[0.18,0.32],blur:2.4,opacity:.55,  z:1, dur:[5800,7400] }
    }[depth];

    const el = document.createElement("div");
    el.className = "loose-feather";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 120 320");
    svg.setAttribute("width", "44");
    svg.setAttribute("height", "118");
    const g = document.createElementNS(NS,"g");
    if(Math.random() < 0.4){ g.style.setProperty("--feather-fill", "url(#featherCreamFill)"); }
    const use = document.createElementNS(NS, "use");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#feather-shape");
    use.setAttribute("href", "#feather-shape");
    g.appendChild(use);
    svg.appendChild(g);
    el.appendChild(svg);

    const scale = depthCfg.scale[0] + Math.random() * (depthCfg.scale[1]-depthCfg.scale[0]);
    const startX = 20 + Math.random() * 60; // vw
    const startY = -8 - Math.random() * 10; // vh
    const drift1 = (Math.random() - 0.5) * 26;
    const drift2 = (Math.random() - 0.5) * 30;
    const drift3 = (Math.random() - 0.5) * 18;
    const rot0 = Math.random() * 360;
    const spin = (Math.random() < 0.5 ? 1 : -1) * (180 + Math.random()*260);
    const fallDist = 118 + Math.random() * 6; // vh, past bottom of screen
    const dur = depthCfg.dur[0] + Math.random() * (depthCfg.dur[1]-depthCfg.dur[0]);

    el.style.left = startX + "vw";
    el.style.top = startY + "vh";
    el.style.zIndex = depthCfg.z;
    el.style.filter = depthCfg.blur ? `blur(${depthCfg.blur}px)` : "none";
    el.style.opacity = "0";

    featherField.appendChild(el);

    el.animate([
      { transform:`translate(0,0) rotate(${rot0}deg) scale(${scale})`, opacity:0, offset:0 },
      { opacity:depthCfg.opacity, offset:0.06 },
      { transform:`translate(${drift1}vw, 28vh) rotate(${rot0+spin*0.3}deg) scale(${scale})`, offset:0.32 },
      { transform:`translate(${drift1+drift2}vw, 60vh) rotate(${rot0+spin*0.65}deg) scale(${scale})`, offset:0.62 },
      { transform:`translate(${drift1+drift2+drift3}vw, 92vh) rotate(${rot0+spin}deg) scale(${scale})`, offset:0.9 },
      { transform:`translate(${drift1+drift2+drift3}vw, ${fallDist}vh) rotate(${rot0+spin*1.05}deg) scale(${scale})`, opacity:0, offset:1 }
    ], {
      duration: dur,
      delay: delay,
      easing: "cubic-bezier(.42,0,.55,1)",
      fill: "forwards"
    });

    setTimeout(() => el.remove(), delay + dur + 200);
  }

  /* ---------------------------------------------------------------
     Draw-on the trace path with stroke-dashoffset
     --------------------------------------------------------------- */
  function drawTracePath(duration){
    const len = tracePath.getTotalLength();
    tracePath.style.strokeDasharray = len;
    tracePath.style.strokeDashoffset = len;
    tracePath.animate(
      [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
      { duration, easing:"cubic-bezier(.65,0,.35,1)", fill:"forwards" }
    );
  }

  /* ---------------------------------------------------------------
     Reveal the rest of the site behind the intro
     --------------------------------------------------------------- */
  function endIntro(){
    introEl.classList.add("hidden");
    site.classList.add("revealed");
    body.classList.remove("no-scroll");
    setTimeout(() => { introEl.style.display = "none"; }, 1200);
  }

  function goToEnd(){
    // used by the skip button — jump straight past the animation
    introEl.querySelectorAll(".wing").forEach(w => w.style.transition = "none");
    endIntro();
  }

  introSkip.addEventListener("click", goToEnd);

  /* ---------------------------------------------------------------
     Timeline
     --------------------------------------------------------------- */
  if(reduceMotion){
    schoolZoom.classList.add("open");
    goToEnd();
  } else {
    setTimeout(() => introSkip.classList.add("show"), 900);

    // 1. wings enter
    leftWing.classList.add("enter");
    rightWing.classList.add("enter");

    // 2. wings flap
    setTimeout(() => {
      leftWing.classList.remove("enter"); rightWing.classList.remove("enter");
      leftWing.classList.add("flap"); rightWing.classList.add("flap");
    }, 1150);

    // 3. feathers begin releasing mid-flap, trace path draws
    setTimeout(() => {
      drawTracePath(2600);
      for(let i = 0; i < 42; i++){
        spawnFeather(i * 70 + Math.random()*120);
      }
    }, 1900);

    // 4. wings retreat off-stage
    setTimeout(() => {
      leftWing.classList.remove("flap"); rightWing.classList.remove("flap");
      leftWing.classList.add("retreat"); rightWing.classList.add("retreat");
    }, 2500);

    // 5. iris-zoom opens into the school photo
    setTimeout(() => {
      schoolZoom.classList.add("open");
    }, 4300);

    // 6. caption fades in
    setTimeout(() => {
      schoolZoom.classList.add("caption-in");
      scrollCue.classList.add("show");
    }, 5700);

    // 7. end intro, reveal site
    setTimeout(() => { endIntro(); }, 8000);
  }

  // allow scrolling / clicking the scroll cue to skip ahead once photo is showing
  scrollCue.addEventListener("click", goToEnd);
  window.addEventListener("wheel", function onWheel(){
    if(schoolZoom.classList.contains("open")){
      goToEnd();
      window.removeEventListener("wheel", onWheel);
    }
  }, { passive:true });

})();
