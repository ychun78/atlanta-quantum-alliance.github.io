/* ============================
   PEOPLE MODAL
   ============================ */
alert("main.js loaded!");
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

  const closeModal = () => {
    personModal.classList.remove("open");
  };

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

/* ============================
   EVENTS VIEW TOGGLE
   ============================ */

const viewButtons = document.querySelectorAll(".view-btn");
const eventViews = document.querySelectorAll(".event-view");

if (viewButtons.length && eventViews.length) {
  viewButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.view; // "list" or "calendar"

      // update button active state
      viewButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      /
