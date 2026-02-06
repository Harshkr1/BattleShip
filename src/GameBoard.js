import Ship from "./Ship";

//  keeping by default 0-9 indexing alright
export default class GameBoard {
  board;
  missedShots;
  shipFleet;
  placedFleet;

  constructor() {
    this.board = Array.from({ length: 10 }, () => new Array(10).fill(null));
    this.missedShots = []; // Track coordinates of misses
    this.placedFleet = new Set();
    this.shipFleet = {
      carrier: new Ship("Carrier", 5),
      battleShip: new Ship("Battleship", 4),
      destroyer: new Ship("Destroyer", 3),
      submarine: new Ship("Submarine", 3),
      patrolBoat: new Ship("Patrol Boat", 2),
    };
  }

  isFleetSunked() {
    const ships = Object.values(this.shipFleet);
    for (const ship of ships) {
      if (!ship.isShipSunk()) return false;
    }
    return true;
  }

  // to check if already a ship is present in the coordinate
  isShipPlaced(x, y) {
    return this.board[x][y] != null ? true : false;
  }

  // to check if ship can be placed at the given coordinates or not.
  canPlace(ship, x, y, orientation) {
    const shipLength = ship.length;
    const len = shipLength - 1;

    // if it is already placed no need to place it again for a particular board.
    if (this.placedFleet.has(ship.name)) return false;

    // checking basic boundary limits
    let withinBounds = false;
    if (orientation === "left") withinBounds = x - len >= 0;
    if (orientation === "right") withinBounds = x + len <= 9;
    if (orientation === "up") withinBounds = y - len >= 0;
    if (orientation === "down") withinBounds = y + len <= 9;

    if (!withinBounds) return false;

    // If within bounds, check for collisions with existing ships
    for (let i = 0; i < shipLength; i++) {
      let checkX = x;
      let checkY = y;

      if (orientation === "left") checkX = x - i;
      if (orientation === "right") checkX = x + i;
      if (orientation === "up") checkY = y - i;
      if (orientation === "down") checkY = y + i;

      if (this.isShipPlaced(checkX, checkY)) {
        return false;
      }
    }

    return true;
  }

  // orientation will have up, down, left, and right option
  placeShip(ship, x, y, orientation) {
    const shipLength = ship.length;
    if (!this.canPlace(ship, x, y, orientation)) {
      throw Error(
        "Cannot Place at the given Coordinate, Change the Coordinate",
      );
    }

    for (let i = 0; i < shipLength; i++) {
      const boardInfo = { name: ship.name, index: i }; // 'i' is the position on the ship

      switch (orientation) {
        case "left":
          this.board[x - i][y] = boardInfo;
          break;
        case "right":
          this.board[x + i][y] = boardInfo;
          break;
        case "up":
          this.board[x][y - i] = boardInfo;
          break;
        case "down":
          this.board[x][y + i] = boardInfo;
          break;
      }

      // add the placed ship inside the set to keep track of ships that has already been placed.
      this.placedFleet.add(ship.name);
    }
  }

  findShipFromName(nameOfShip) {
    const ships = Object.values(this.shipFleet);
    // Find the ship where the name matches exactly
    return ships.find((ship) => ship.name === nameOfShip);
  }

  // function to receive attack from an User and mark it as hit if not hit then notes the numberOfMisses
  receiveAttack(x, y) {
    if (!this.isShipPlaced(x, y)) {
      this.missedShots.push([x, y]);
      return "miss";
    }

    // Extract ship data from board
    // this.board[x][y] now looks like { name: "Carrier", index: 2 }
    const { name, index } = this.board[x][y];

    // Find the actual Ship object and call hit(index)
    const ship = this.findShipFromName(name);
    if (ship) {
      ship.hit(index);
      return "hit";
    }
  }

  // to check whether full fleet is placed or not
  isFleetPlaced() {
    if (this.placedFleet.size == 5) return true;
    return false;
  }
}
