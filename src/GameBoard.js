import Ship from "./Ship";

export default class GameBoard {
  board;
  shipFleet = {
    carrier: new Ship("Carrier", 5),
    battleShip: new Ship("Battleship", 4),
    destroyer: new Ship("Destroyer", 3),
    submarine: new Ship("Submarine", 3),
    patrolBoat: new Ship("Patrol Boat", 2),
  };

  fleetIsSinked;
  constructor() {
    this.board = Array.from({ length: 10 }, () => new Array(10).fill(null));
  }

  isFleetSunked() {
    const ships = Object.values(this.shipFleet);
    for (const ship of ships) {
      if (!ship.isShipSunk()) return false;
    }
    return true;
  }
}
