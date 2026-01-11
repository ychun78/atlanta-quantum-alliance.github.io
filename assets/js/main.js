/* ============================================================
   ACCESS CODE LOCK  (optional – remove if not needed)
   ============================================================ */

const ACCESS_CODE = "quantum2025"; // Change to your code

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
      errorMsg.style.display = "block";
    }
  });

  codeInput.addEventListener("keydown", e => {
    if (e.key === "Enter") codeSubmit.click();
  });
}


/* ============================================================
   PEOPLE MODAL
   ============================================================ */

const personCards = document.querySelectorAll(".person-card");
const personModal = document.getElementById("person-modal");

if (personCards.length && personModal) {

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
      nameEl.textContent = card.dataset.name || "";
      roleEl.textContent = card.dataset.role || "";
      instEl.textContent = card.dataset.institution || "";
      fieldEl.textContent = card.dataset.field || "";
      bioEl.textContent = card.dataset.bio || "";
      personModal.classList.add("open");
    });
  });

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });
}


/* ============================================================
   PEOPLE FILTERING (school + focus area)
   ============================================================ */

const campusFilters = document.querySelectorAll(".filter-campus");
const roleFilters = document.querySelectorAll(".filter-role");  // optional future use
const focusFilters = document.querySelectorAll(".filter-focus");
const allCards = document.querySelectorAll(".person-card");

function applyPeopleFilters() {
  if (!allCards.length) return;

  const selectedCampuses = Array.from(campusFilters)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  const selectedFocus = Array.from(focusFilters)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  allCards.forEach(card => {
    const cardCampusList = card.dataset.campus.split(' ');
    const cardFocusList = card.dataset.focus.split(' ');
    const showCampus = selectedCampuses.some(campus => cardCampusList.includes(campus));
    const showFocus = selectedFocus.some(focus => cardFocusList.includes(focus));

    if (showCampus && showFocus) {
      card.style.display = ""; // Set display to default (which is "block" via CSS grid)
    } else {
      card.style.display = "none";
    }

  });
}

if (allCards.length) {
  [...campusFilters, ...focusFilters].forEach(cb =>
    cb.addEventListener("change", applyPeopleFilters)
  );
  applyPeopleFilters();
}


/* ============================================================
   EVENTS — LIST / CALENDAR TOGGLE
   ============================================================ */

const viewButtons = document.querySelectorAll(".view-btn");
const eventViews = document.querySelectorAll(".event-view");

if (viewButtons.length && eventViews.length) {
  viewButtons.forEach(btn => {
    btn.addEventListener("click", () => {

      const target = btn.dataset.view;

      // Set active button
      viewButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Show matching event view
      eventViews.forEach(view => {
        if (view.id === `events-${target}`) {
          view.classList.add("active");
        } else {
          view.classList.remove("active");
        }
      });
    });
  });
}
