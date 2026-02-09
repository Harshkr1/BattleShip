import Ship from "./Ship.js";
import GameBoard from "./GameBoard.js";

export default class Player {
  type;
  board;
  orientation;
  boardMatrix;
  constructor(type) {
    this.type = type;
    this.board = new GameBoard();
    this.orientation = new Array("left", "right", "up", "down");
    this.boardMatrix = this.createPlaceholderGrid(type);
    this.handleClick();
  }

  // Function to get Random  coordinate'
  getRandomCoordinate() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    return { x, y };
  }

  // returns coordinate from Index to detection marking properly
  getCoordinates(index) {
    const x = Math.floor(index / 10);
    const y = index - x * 10;
    return { x, y };
  }
  // returns index from x and y cooridnates for a
  getIndex(x, y) {
    return 10 * x + y;
  }

  // Function to get Random  orientation'
  getRandomOrientation() {
    return this.orientation[Math.floor(Math.random() * 4)];
  }

  // Function to place  full fleet in the gameBoard
  placeFleet() {
    //until full fleet is placed in the Board
    while (!this.board.isFleetPlaced()) {
      const shipFleet = Object.values(this.board.shipFleet);

      //get a random index from 0-4 and then try to place until that ship is placed alright
      const randomIndex = Math.floor(Math.random() * 5);

      //get a random ship from the fleet and place it first.
      const randomShip = shipFleet[randomIndex];

      //untill the particular ship is placed please place the ship properly.
      while (!this.board.placedFleet.has(randomShip.name)) {
        const { x, y } = this.getRandomCoordinate();
        const orientation = this.getRandomOrientation();

        try {
          this.board.placeShip(randomShip, x, y, orientation);
        } catch (error) {
          // If placement fails, the loop continues to try a new random coordinate
          continue;
        }
      }
    }
  }

  handleClick() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        const index = cell.dataset.index;
        const { x, y } = this.getCoordinates(index);
        console.log(index);
      });
    });
  }

  // creates grid for the players
  createPlaceholderGrid(type) {
    const boardMatrixType = document.getElementById(type);
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      boardMatrixType.appendChild(cell);
    }
    return boardMatrixType;
  }

  // marks position of the ships in the board for human player for visual identification.
  markShipPosition() {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (this.board.board[row][col] !== null) {
          const index = this.getIndex(row, col);
          // Set the background color to white for cells containing a ship
          this.boardMatrix.children[index].style.backgroundColor = "white";
        }
      }
    }
  }
}
