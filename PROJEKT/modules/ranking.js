/** @module ranking */
/**
 * Empties ranking in localStorage
 */
export function emptyRanking() {
  localStorage.setItem("EASY", "");
  localStorage.setItem("MEDIUM", "");
  localStorage.setItem("HARD", "");
}

/**
 * Retrieves ranking from localStorage
 * @param {string} difficulty - game difficulty
 * @returns {any|any[]} - retrieved ranking
 */
export function getRanking(difficulty) {
  if (!localStorage.getItem(difficulty)) {
    return [];
  }
  return JSON.parse(localStorage.getItem(difficulty));
}

/**
 * Adds ranking to localStorage
 * @param {number} newTime - time in millis
 * @param {string} difficulty - game difficulty
 */
export function addRanking(newTime, difficulty) {
  console.log("Updating ranking");
  let ranking = getRanking(difficulty);

  ranking.push(newTime);
  ranking.sort(function (a, b) {
    return a - b;
  });
  if (ranking.length > 3) {
    ranking.length = 3;
  }
  localStorage.setItem(difficulty, JSON.stringify(ranking));
}
