import "./style.css";
import Player from "./Player.js";

function createPlaceholderGrid(elementId) {
  const board = document.getElementById(elementId);
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    board.appendChild(cell);
  }
}

function getCoordinates(index) {
  const x = Math.floor(index / 10);
  const y = index - x * 10;
  return { x, y };
}

function handleClick() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const index = cell.dataset.index;
      const { x, y } = getCoordinates(index);
    });
  });
}

function initializeHumanPlayer() {
  createPlaceholderGrid("player-board");
}

function initialization() {
  initializeHumanPlayer();
  createPlaceholderGrid("enemy-board");
  handleClick();
}

initialization();
