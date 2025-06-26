/** @module game */
// game generates an X by Y board with Z amount of mines
// fill in with mines
// left click and right click operations

///////////////////
// X ARE ROWS    //
// Y ARE COLUMNS //
// for reference //
///////////////////

export const TILE_STATUS = {
  HIDDEN: "hidden",
  FLAGGED: "flagged",
  MINE: "mine",
  NUMBER: "number",
};

export class Tile {
  constructor(x, y, mineState, element) {
    this.x = x;
    this.y = y;
    this.mine = mineState;
    this.element = element;
  }
  set status(newStatus) {
    this.element.dataset.status = newStatus;
  }
  get status() {
    return this.element.dataset.status;
  }
}

//////////////////////
// BOARD GENERATION //
//////////////////////

/**
 * Generates array of game tiles
 * @param {number} tileCountX - row count
 * @param {number} tileCountY - column count
 * @param {number} minesCount - mines count
 * @returns {any[]} - array of Tile objects
 */
export function generateTiles(tileCountX, tileCountY, minesCount) {
  console.log("Generating tiles...");
  const tiles = [];
  const mines = generateMines(tileCountX, tileCountY, minesCount);

  for (let x = 0; x < tileCountX; x++) {
    const row = [];
    for (let y = 0; y < tileCountY; y++) {
      const tileElement = document.createElement("div");
      tileElement.className = "board-tile";
      tileElement.id = `tile-${x}-${y}`;
      tileElement.dataset.status = TILE_STATUS.HIDDEN;

      let tile = new Tile(
        x,
        y,
        mines.some((p) => p.x === x && p.y === y),
        tileElement,
      );

      row.push(tile);
    }
    tiles.push(row);
  }
  console.log("Tiles generated!");
  return tiles;
}

/**
 * Generates positions of mines
 * @param {number} tileCountX - row count
 * @param {number} tileCountY - column count
 * @param {number} minesCount - mine count
 * @returns {any[]} - array of positions
 */
function generateMines(tileCountX, tileCountY, minesCount) {
  console.log("Generating mines...");
  const minePositions = [];

  const mineAlreadyExists = function (position) {
    return minePositions.some((p) => p.x === position.x && p.y === position.y);
  };

  while (minePositions.length < minesCount) {
    const position = {
      x: randomNumber(tileCountX),
      y: randomNumber(tileCountY),
    };

    if (!mineAlreadyExists(position)) {
      minePositions.push(position);
    }
  }

  return minePositions;
}

/**
 * Generates random number in range
 * @param {number} max - max range
 * @returns {number} - generated number
 */
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

//////////////////
// BOARD RENDER //
//////////////////

/**
 * Renders gameBoard on the website
 * @param {any[]} gameBoard - array of Tile objects
 * @param {Element} container - container the board will be rendered in
 */
export function renderGame(gameBoard, container) {
  const boardDisplay = document.createElement("div");
  const boardLengthX = gameBoard.length;
  const boardLengthY = gameBoard[0].length;
  let tileSize = "30px";
  switch (boardLengthX) {
    case 9:
      tileSize = "40px";
      break;
    case 16:
      tileSize = "30px";
      break;
    case 30:
      tileSize = "20px";
      break;
  }
  boardDisplay.id = "board-display";
  boardDisplay.style.setProperty("--row-size", boardLengthX);
  boardDisplay.style.setProperty("--col-size", boardLengthY);
  boardDisplay.style.setProperty("--tile-size", tileSize);
  container.appendChild(boardDisplay);

  for (let x = 0; x < boardLengthX; x++) {
    for (let y = 0; y < boardLengthY; y++) {
      boardDisplay.appendChild(gameBoard[x][y].element);
    }
  }
}

////////////////
// GAME LOGIC //
////////////////

/**
 * Checks if tile isn't uncovered, then switches state between being flagged or hidden
 * @param {Tile} tile
 */
export function markTile(tile) {
  if (
    tile.status !== TILE_STATUS.HIDDEN &&
    tile.status !== TILE_STATUS.FLAGGED
  ) {
    return;
  }
  if (tile.status === TILE_STATUS.FLAGGED) {
    tile.status = TILE_STATUS.HIDDEN;
  } else {
    tile.status = TILE_STATUS.FLAGGED;
  }
}

/**
 * Checks if the board is a mine and then reveals tile accordingly
 * If the tile isn't a mine, recursively uncovers neighbouring tiles
 * @param {any[]} gameBoard - array of Tile objects
 * @param {Tile} tile - current 'working' tile
 */
export function revealTile(gameBoard, tile) {
  if (
    tile.status !== TILE_STATUS.HIDDEN ||
    tile.status === TILE_STATUS.FLAGGED
  ) {
    return;
  }
  if (tile.mine) {
    tile.status = TILE_STATUS.MINE;
    return;
  }

  tile.status = TILE_STATUS.NUMBER;
  const adjacentTiles = surroundingTiles(gameBoard, tile);
  const adjacentMines = adjacentTiles.filter((t) => t.mine === true);
  if (adjacentMines.length === 0) {
    adjacentTiles.forEach((t) => revealTile(gameBoard, t));
  } else {
    tile.element.textContent = adjacentMines.length.toString();
  }
}

/**
 * Reveals all tiles
 * @param {any[]} gameBoard - array of Tile objects
 */
export function revealAllTiles(gameBoard) {
  gameBoard.forEach((row) => {
    row.forEach((tile) => {
      if (tile.status === TILE_STATUS.FLAGGED) {
        tile.status = TILE_STATUS.HIDDEN;
      }
      revealTile(gameBoard, tile);
    });
  });
}

/**
 * Grabs all surrounding tiles of given tile
 * @param {any[]} gameBoard - array of Tile objects
 * @param {Tile} tile - current 'working' tile
 * @returns {any[]} - array of surrounding tiles
 */
function surroundingTiles(gameBoard, tile) {
  const adjacentTiles = [];

  for (let x = tile.x - 1; x <= tile.x + 1; x++) {
    for (let y = tile.y - 1; y <= tile.y + 1; y++) {
      const nearbyTile = gameBoard[x]?.[y];
      if (nearbyTile) {
        adjacentTiles.push(nearbyTile);
      }
    }
  }

  return adjacentTiles;
}

/**
 * Checks if all necessary tiles have been uncovered
 * @param {any[]} gameBoard - array of Tile objects
 * @returns {boolean} - result of the check
 */
export function checkWin(gameBoard) {
  return gameBoard.every((row) => {
    return row.every((tile) => {
      // tile passes if its uncovered and not a mine, if its a mine it needs to be hidden or flagged
      return (
        tile.status === TILE_STATUS.NUMBER ||
        (tile.mine &&
          (tile.status === TILE_STATUS.HIDDEN ||
            tile.status === TILE_STATUS.FLAGGED))
      );
    });
  });
}

/**
 * Checks if any tile is in 'MINE' status
 * @param {any[]} gameBoard - array of Tile objects
 * @returns {boolean} - result of the check
 */
export function checkLose(gameBoard) {
  return gameBoard.some((row) => {
    return row.some((tile) => {
      return tile.status === TILE_STATUS.MINE;
    });
  });
}
