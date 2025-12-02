/* ============================================================
   ACCESS CODE LOCK  (optional – remove if not needed)
   ============================================================ */

const ACCESS_CODE = "quantum2024"; // Change to your code

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

const personCards = document.querySelectorAll(".pe
