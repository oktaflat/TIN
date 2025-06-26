/** @module pauseMenu */
/**
 * Renders pauseMenu in given container
 * @param {Element} container - container the board will be rendered in
 */
export function generatePauseMenu(container) {
  const pauseMenu = document.createElement("div");
  pauseMenu.id = "pause-container";

  const continueButton = document.createElement("button");
  continueButton.className = "menu-button";
  continueButton.id = "pause-continue";
  continueButton.textContent = "CONTINUE";

  const resetButton = document.createElement("button");
  resetButton.className = "menu-button";
  resetButton.id = "pause-reset";
  resetButton.textContent = "RESET";

  const quitButton = document.createElement("button");
  quitButton.className = "menu-button";
  quitButton.id = "pause-quit";
  quitButton.textContent = "QUIT";

  container.appendChild(pauseMenu);
  pauseMenu.appendChild(continueButton);
  pauseMenu.appendChild(resetButton);
  pauseMenu.appendChild(quitButton);
}

export function deletePauseMenu() {
  const pauseMenu = document.getElementById("pause-container");
  pauseMenu.replaceChildren();
  pauseMenu.remove();
}
