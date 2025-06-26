/** @module startMenu */
/**
 * Renders startMenu in given container
 * @param {Element} container - container the board will be rendered in
 */
export function generateStartMenu(container) {
  const heading = document.createElement("h2");
  heading.className = "difficulty-heading";
  heading.textContent = "Select difficulty";

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";
  buttonContainer.id = "difficulty-selector";

  const easyDifficulty = document.createElement("button");
  easyDifficulty.className = "difficulty-button";
  easyDifficulty.id = "easy-diff";
  easyDifficulty.innerHTML =
    "<div class='button-background'>" +
    "<span>9x9x</span>" +
    "<span>9x9x</span>" +
    "<span>9x9x</span>" +
    "<span>9x9x</span>" +
    "</div>" +
    "<div class='button-text'>" +
    "EASY" +
    "</div>";

  const mediumDifficulty = document.createElement("button");
  mediumDifficulty.className = "difficulty-button";
  mediumDifficulty.id = "medium-diff";
  mediumDifficulty.textContent = "MEDIUM";
  mediumDifficulty.innerHTML =
    "<div class='button-background'>" +
    "<span>16x16x</span>" +
    "<span>16x16x</span>" +
    "<span>16x16x</span>" +
    "<span>16x16x</span>" +
    "</div>" +
    "<div class='button-text'>" +
    "MEDIUM" +
    "</div>";

  const hardDifficulty = document.createElement("button");
  hardDifficulty.className = "difficulty-button";
  hardDifficulty.id = "hard-diff";
  hardDifficulty.textContent = "HARD";
  hardDifficulty.innerHTML =
    "<div class='button-background'>" +
    "<span>30x16x</span>" +
    "<span>30x16x</span>" +
    "<span>30x16x</span>" +
    "<span>30x16x</span>" +
    "</div>" +
    "<div class='button-text'>" +
    "HARD" +
    "</div>";

  container.appendChild(heading);
  container.appendChild(buttonContainer);
  buttonContainer.appendChild(easyDifficulty);
  buttonContainer.appendChild(mediumDifficulty);
  buttonContainer.appendChild(hardDifficulty);
}
