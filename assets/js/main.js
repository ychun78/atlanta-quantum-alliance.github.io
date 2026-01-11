const ACCESS_CODE = "quantum2025";

const lockOverlay = document.getElementById("access-lock");
const codeInput = document.getElementById("access-code-input");
const codeSubmit = document.getElementById("access-code-submit");
const errorMsg = document.getElementById("access-error");

if (lockOverlay && codeInput && codeSubmit) {
  if (sessionStorage.getItem("aqa-unlocked") === "true") {
    lockOverlay.style.display = "none";
  }

  codeSubmit.addEventListener("click", () => {
    if (codeInput.value.trim() === ACCESS_CODE) {
      lockOverlay.style.display = "none";
      sessionStorage.setItem("aqa-unlocked", "true");
    } else {
      if (errorMsg) errorMsg.style.display = "block";
    }
  });

  codeInput.addEventListener("keydown", e => {
    if (e.key === "Enter") codeSubmit.click();
  });
}

async function renderPeopleFromJSON() {
  const grid = document.getElementById("people-grid");
  if (!grid) return;

  try {
    const res = await fetch("assets/data/people.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load people.json: ${res.status}`);
    const people = await res.json();

    grid.innerHTML = "";

    people.forEach(p => {
      const card = document.createElement("article");
      card.className = "person-card";

      card.dataset.campus = (p.campuses || []).join(" ").trim();
      card.dataset.focus = (p.focus || []).join(" ").trim();

      card.dataset.name = p.name || "";
      card.dataset.role = p.role || "";
      card.dataset.institution = p.institution || "";
      card.dataset.field = p.field || "";
      card.dataset.bio = p.bio || "";

      const safeName = p.name || "Person";
      const imgSrc = p.image || "";
      const cardFocusText = p.cardFocusText || "";

      card.innerHTML = `
        <img src="${imgSrc}" alt="${safeName}">
        <h3>${safeName}</h3>
        <p>Focus: ${cardFocusText}</p>
      `;

      grid.appendChild(card);
    });

    initPeopleModal();
    initPeopleFilters();
  } catch (err) {
    console.error(err);
    grid.innerHTML = `<p style="color:#b91c1c;">Failed to load people data. Check assets/data/people.json</p>`;
  }
}

function initPeopleModal() {
  const personCards = document.querySelectorAll(".person-card");
  const personModal = document.getElementById("person-modal");
  if (!personCards.length || !personModal) return;

  const nameEl = document.getElementById("modal-name");
  const roleEl = document.getElementById("modal-role");
  const instEl = document.getElementById("modal-institution");
  const fieldEl = document.getElementById("modal-field");
  const bioEl = document.getElementById("modal-bio");

  const closeBtn = personModal.querySelector(".modal-close");
  const backdrop = personModal.querySelector(".modal-backdrop");

  const closeModal = () => personModal.classList.remove("open");

  personCards.forEach(card => {
    card.addEventListener("click", () => {
      if (nameEl) nameEl.textContent = card.dataset.name || "";
      if (roleEl) roleEl.textContent = card.dataset.role || "";
      if (instEl) instEl.textContent = card.dataset.institution || "";
      if (fieldEl) fieldEl.textContent = card.dataset.field || "";
      if (bioEl) bioEl.textContent = card.dataset.bio || "";
      personModal.classList.add("open");
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });
}

function initPeopleFilters() {
  const campusFilters = document.querySelectorAll(".filter-campus");
  const focusFilters = document.querySelectorAll(".filter-focus");
  const allCards = document.querySelectorAll(".person-card");

  const keywordInput = document.getElementById("people-keyword");
  const campusModeRadios = document.querySelectorAll('input[name="campus-mode"]');
  const focusModeRadios = document.querySelectorAll('input[name="focus-mode"]');

  function applyPeopleFilters() {
    if (!allCards.length) return;

    const selectedCampuses = Array.from(campusFilters)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    const selectedFocus = Array.from(focusFilters)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    const campusMode =
      document.querySelector('input[name="campus-mode"]:checked')?.value || "any";
    const focusMode =
      document.querySelector('input[name="focus-mode"]:checked')?.value || "any";

    const kw = (keywordInput?.value || "").trim().toLowerCase();

    allCards.forEach(card => {
      const cardCampusList = (card.dataset.campus || "").split(" ").filter(Boolean);
      const cardFocusList = (card.dataset.focus || "").split(" ").filter(Boolean);

      const showCampus =
        selectedCampuses.length === 0 ||
        (campusMode === "all"
          ? selectedCampuses.every(c => cardCampusList.includes(c))
          : selectedCampuses.some(c => cardCampusList.includes(c)));

      const showFocus =
        selectedFocus.length === 0 ||
        (focusMode === "all"
          ? selectedFocus.every(f => cardFocusList.includes(f))
          : selectedFocus.some(f => cardFocusList.includes(f)));

      const haystack = [
        card.dataset.name,
        card.dataset.role,
        card.dataset.institution,
        card.dataset.field,
        card.dataset.bio
      ].join(" ").toLowerCase();

      const showKeyword = kw.length === 0 || haystack.includes(kw);

      card.style.display = (showCampus && showFocus && showKeyword) ? "block" : "none";
    });
  }

  [...campusFilters, ...focusFilters].forEach(cb =>
    cb.addEventListener("change", applyPeopleFilters)
  );

  if (keywordInput) keywordInput.addEventListener("input", applyPeopleFilters);
  campusModeRadios.forEach(r => r.addEventListener("change", applyPeopleFilters));
  focusModeRadios.forEach(r => r.addEventListener("change", applyPeopleFilters));

  applyPeopleFilters();
}

renderPeopleFromJSON();