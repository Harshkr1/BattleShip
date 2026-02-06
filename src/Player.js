import Ship from "./Ship";
import GameBoard from "./GameBoard";

export default class Player {
  type;
  board;
  orientation;

  constructor(type, board) {
    this.type = type;
    this.board = new GameBoard();
    this.orientation = new Array("left", "right", "up", "down");
  }

  // Function to get Random  coordinate'
  getRandomCoordinate() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    return { x, y };
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
}
