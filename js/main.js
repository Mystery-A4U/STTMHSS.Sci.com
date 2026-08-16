/* ======================================================================
   MAIN.JS — renders the page content from config.js and wires up
   navigation / scroll interactions. No need to edit this file for
   normal customisation — use config.js instead.
   ====================================================================== */

(function(){

  const initials = (name) => name
    .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/,"")
    .split(/\s+&\s+|\s+/)
    .filter(Boolean)
    .slice(0,2)
    .map(w => w[0])
    .join("")
    .toUpperCase();

  /* ---------------------------------------------------------------
     Nav + brand + footer
     --------------------------------------------------------------- */
  document.getElementById("navSchoolName").textContent = SITE.schoolShortName;
  document.getElementById("navPlace").textContent = SITE.place;
  document.getElementById("navDate").textContent = `${SITE.eventDate}`;
  document.getElementById("footSchoolName").textContent = SITE.schoolName;
  document.getElementById("footPlace").textContent = SITE.place;
  document.getElementById("footDate").textContent = `${SITE.eventDay}, ${SITE.eventDate}`;
  document.getElementById("footTime").textContent = SITE.eventTime;
  document.getElementById("footVenue").textContent = SITE.eventVenue;
  document.getElementById("footCopy").textContent = `© ${new Date().getFullYear()} ${SITE.schoolName}.`;
  document.getElementById("creditLink").textContent = SITE.creditHandle;

  ["navMark","footMark"].forEach(id => {
    const el = document.getElementById(id);
    if(SITE.schoolLogo){
      el.innerHTML = `<img src="${SITE.schoolLogo}" alt="${SITE.schoolShortName} logo">`;
    } else {
      el.textContent = initials(SITE.schoolShortName);
    }
  });

  /* ---------------------------------------------------------------
     Banner
     --------------------------------------------------------------- */
  const bannerEl = document.querySelector(".banner");
  const bannerImg = document.getElementById("bannerImg");
  bannerImg.src = SITE.schoolImage;
  bannerImg.alt = SITE.schoolImageAlt;
  bannerImg.addEventListener("error", () => bannerEl.classList.add("no-photo"));

  document.getElementById("bannerEyebrow").textContent = `${SITE.eventDay}, ${SITE.eventDate} · ${SITE.place}`;
  document.getElementById("bannerTitle").innerHTML =
    `${SITE.exhibitionName.split("—")[0]}<br><em>${SITE.exhibitionName.split("—")[1] || ""}</em>`;
  document.getElementById("bannerSub").textContent =
    `${SITE.exhibitionTagline} Hosted by ${SITE.schoolName}, ${SITE.place} — an afternoon of student-built experiments, working models and the inventions that inspired them.`;

  // subtle parallax tilt on the banner photo
  bannerEl.addEventListener("mousemove", (e) => {
    const r = bannerEl.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    bannerImg.style.transform = `scale(1.06) translate(${px * -14}px, ${py * -10}px)`;
  });
  bannerEl.addEventListener("mouseleave", () => { bannerImg.style.transform = "scale(1.06)"; });

  /* ---------------------------------------------------------------
     About section
     --------------------------------------------------------------- */
  document.getElementById("aboutLede").innerHTML =
    `${SITE.schoolName} presents <em>${SITE.exhibitionName.split("—")[1] || SITE.exhibitionName}</em> — ` +
    `a student-led showcase of working models, experiments and research, held alongside a hall of ` +
    `history's greatest inventions and the people behind them.`;

  const infoCards = [
    { k:"Date", v:`${SITE.eventDay}, ${SITE.eventDate}` },
    { k:"Time", v:SITE.eventTime },
    { k:"Venue", v:SITE.eventVenue },
    { k:"Entry", v:"Open to students, parents & visitors" },
  ];
  document.getElementById("infoCards").innerHTML = infoCards.map(c => `
    <div class="info-card">
      <div class="k">${c.k}</div>
      <div class="v">${c.v}</div>
    </div>
  `).join("");

  /* ---------------------------------------------------------------
     Visit section
     --------------------------------------------------------------- */
  const visitItems = [
    { k:"School", v:SITE.schoolName },
    { k:"Location", v:SITE.place + ", Tamil Nadu" },
    { k:"Date", v:`${SITE.eventDay}, ${SITE.eventDate}` },
    { k:"Time", v:SITE.eventTime },
    { k:"Venue", v:SITE.eventVenue },
  ];
  document.getElementById("visitList").innerHTML = visitItems.map(i => `
    <li><span class="k">${i.k}</span><span class="v">${i.v}</span></li>
  `).join("");

  /* ---------------------------------------------------------------
     Inventions & inventors — rendered from CATEGORIES in config.js
     --------------------------------------------------------------- */
  const quillIconSVG = `
    <svg class="quill-icon" viewBox="0 0 120 320"><use href="#feather-shape"></use></svg>
  `;

  function card(item){
    const invInitials = initials(item.inventor);
    return `
    <article class="card">
      <div class="invention-media">
        <img src="${item.inventionImage}" alt="${item.invention}"
             onerror="this.closest('.card').classList.add('img-missing-invention')">
        <div class="ph">
          <svg viewBox="0 0 120 320"><use href="#feather-shape"></use></svg>
        </div>
        <span class="year-badge">${item.year}</span>
      </div>
      <div class="body">
        <h4 class="invention-name">${item.invention}</h4>
        <p class="detail">${item.detail}</p>
        <div class="inventor-row">
          <span class="inventor-avatar">
            <img src="${item.inventorImage}" alt="${item.inventor}"
                 onerror="this.closest('.card').classList.add('img-missing-inventor'); this.parentElement.textContent='${invInitials}'">
          </span>
          <span class="inventor-name">${item.inventor}</span>
        </div>
      </div>
    </article>`;
  }

  document.getElementById("categoryContainer").innerHTML = CATEGORIES.map(cat => `
    <div class="category reveal">
      <div class="category-head">
        ${quillIconSVG}
        <h3>${cat.label}</h3>
        <span class="count">${String(cat.items.length).padStart(2,"0")} Featured</span>
      </div>
      <div class="card-grid">
        ${cat.items.map(card).join("")}
      </div>
    </div>
  `).join("");

  /* ---------------------------------------------------------------
     Nav background on scroll + reveal-on-scroll
     --------------------------------------------------------------- */
  const topnav = document.getElementById("topnav");
  window.addEventListener("scroll", () => {
    topnav.classList.toggle("scrolled", window.scrollY > 40);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("in"); });
  }, { threshold:0.15 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

})();
