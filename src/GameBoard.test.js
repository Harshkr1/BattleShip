import Ship from "./Ship.js";
import GameBoard from "./GameBoard.js";

describe(" GameBoard class ", () => {
  test("isFleetSunked()", () => {
    const gameBoard = new GameBoard();
    // Converts Object into array.
    const ships = Object.values(gameBoard.shipFleet);

    for (const ship of ships) {
      for (var i = 0; i < ship.length; i++) {
        ship.hit(i);
      }
    }
    expect(gameBoard.isFleetSunked()).toBe(true);
  });
});

describe("GameBoard - canPlace() Boundary Tests", () => {
  let gameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard();
  });

  test("Carrier (Length 5) boundaries", () => {
    expect(gameBoard.canPlace(gameBoard.shipFleet.carrier, 4, 0, "left")).toBe(
      true,
    );
    expect(gameBoard.canPlace(gameBoard.shipFleet.carrier, 3, 0, "left")).toBe(
      false,
    );

    expect(gameBoard.canPlace(gameBoard.shipFleet.carrier, 5, 0, "right")).toBe(
      true,
    );
    expect(gameBoard.canPlace(gameBoard.shipFleet.carrier, 6, 0, "right")).toBe(
      false,
    );

    expect(gameBoard.canPlace(gameBoard.shipFleet.carrier, 0, 4, "up")).toBe(
      true,
    );
    expect(gameBoard.canPlace(gameBoard.shipFleet.carrier, 0, 3, "up")).toBe(
      false,
    );

    expect(gameBoard.canPlace(gameBoard.shipFleet.carrier, 0, 5, "down")).toBe(
      true,
    );
    expect(gameBoard.canPlace(gameBoard.shipFleet.carrier, 0, 6, "down")).toBe(
      false,
    );
  });

  test("Patrol Boat (Length 2) boundaries", () => {
    expect(
      gameBoard.canPlace(gameBoard.shipFleet.patrolBoat, 1, 0, "left"),
    ).toBe(true);
    expect(
      gameBoard.canPlace(gameBoard.shipFleet.patrolBoat, 0, 0, "left"),
    ).toBe(false);
    expect(
      gameBoard.canPlace(gameBoard.shipFleet.patrolBoat, 8, 0, "right"),
    ).toBe(true);
    expect(
      gameBoard.canPlace(gameBoard.shipFleet.patrolBoat, 9, 0, "right"),
    ).toBe(false);
  });

  test("Mid-sized ships (Destroyer/Submarine - Length 3)", () => {
    expect(
      gameBoard.canPlace(gameBoard.shipFleet.destroyer, 0, 7, "down"),
    ).toBe(true);
    expect(
      gameBoard.canPlace(gameBoard.shipFleet.submarine, 0, 8, "down"),
    ).toBe(false);
  });
});

describe("GameBoard - placeShip() Boundary Tests", () => {
  let gameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard();
  });

  test("Carrier (Length 5) boundaries with index tracking", () => {
    gameBoard.placeShip(gameBoard.shipFleet.carrier, 4, 0, "left");

    // We now expect objects with the ship name and the relative index
    expect(gameBoard.board[4][0]).toEqual({ name: "Carrier", index: 0 });
    expect(gameBoard.board[3][0]).toEqual({ name: "Carrier", index: 1 });
    expect(gameBoard.board[2][0]).toEqual({ name: "Carrier", index: 2 });
    expect(gameBoard.board[1][0]).toEqual({ name: "Carrier", index: 3 });
    expect(gameBoard.board[0][0]).toEqual({ name: "Carrier", index: 4 });

    // Empty squares remain null
    expect(gameBoard.board[4][1]).toBe(null);
  });

  test("Patrol Boat (Length 2) boundaries with index tracking", () => {
    gameBoard.placeShip(gameBoard.shipFleet.patrolBoat, 8, 0, "right");

    expect(gameBoard.board[8][0]).toEqual({ name: "Patrol Boat", index: 0 });
    expect(gameBoard.board[9][0]).toEqual({ name: "Patrol Boat", index: 1 });

    expect(gameBoard.board[7][0]).toBe(null);
  });

  test("Mid-sized ships (Destroyer/Submarine) with index tracking", () => {
    // Destroyer DOWN (0,7 to 0,9)
    gameBoard.placeShip(gameBoard.shipFleet.destroyer, 0, 7, "down");
    expect(gameBoard.board[0][7]).toEqual({ name: "Destroyer", index: 0 });
    expect(gameBoard.board[0][8]).toEqual({ name: "Destroyer", index: 1 });
    expect(gameBoard.board[0][9]).toEqual({ name: "Destroyer", index: 2 });

    // Submarine UP (5,2 to 5,0)
    gameBoard.placeShip(gameBoard.shipFleet.submarine, 5, 2, "up");
    expect(gameBoard.board[5][2]).toEqual({ name: "Submarine", index: 0 });
    expect(gameBoard.board[5][1]).toEqual({ name: "Submarine", index: 1 });
    expect(gameBoard.board[5][0]).toEqual({ name: "Submarine", index: 2 });

    expect(gameBoard.board[1][7]).toBe(null);
    expect(gameBoard.board[5][3]).toBe(null);
  });
});

describe("GameBoard - placeShip() Collision Tests", () => {
  let gameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard();
  });

  test("Throws error when placing a ship over another ship", () => {
    gameBoard.placeShip(gameBoard.shipFleet.carrier, 4, 0, "left");

    expect(() => {
      gameBoard.placeShip(gameBoard.shipFleet.patrolBoat, 2, 0, "down");
    }).toThrow("Cannot Place at the given Coordinate, Change the Coordinate");

    expect(gameBoard.board[2][1]).toBe(null);
  });

  test("Throws error when placing a ship partially out of bounds", () => {
    expect(() => {
      gameBoard.placeShip(gameBoard.shipFleet.carrier, 2, 5, "left");
    }).toThrow("Cannot Place at the given Coordinate, Change the Coordinate");
  });
});

describe("GameBoard - isShipPlaced() Tests", () => {
  let gameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard();
  });

  test("Testing to cheeck whether Carrier is placed or not ", () => {
    gameBoard.placeShip(gameBoard.shipFleet.carrier, 4, 0, "left");

    expect(gameBoard.isShipPlaced(4, 0)).toBe(true);
    expect(gameBoard.isShipPlaced(3, 0)).toBe(true);
    expect(gameBoard.isShipPlaced(2, 0)).toBe(true);
    expect(gameBoard.isShipPlaced(1, 0)).toBe(true);
    expect(gameBoard.isShipPlaced(0, 0)).toBe(true);
    expect(gameBoard.isShipPlaced(4, 1)).toBe(false);
    expect(gameBoard.isShipPlaced(4, 2)).toBe(false);
    expect(gameBoard.isShipPlaced(4, 3)).toBe(false);
  });
});

test("receiveAttack() triggers the correct hit position on a ship", () => {
  const gameBoard = new GameBoard();
  // Place Patrol Boat (Length 2) at (5,5) and (5,6)
  gameBoard.placeShip(gameBoard.shipFleet.patrolBoat, 5, 5, "down");

  // Attack the second half of the boat
  gameBoard.receiveAttack(5, 6);

  const ship = gameBoard.shipFleet.patrolBoat;
  expect(ship.hitPositions[1]).toBe(true); // Second position hit
  expect(ship.hitPositions[0]).toBe(false); // First position still safe
  expect(ship.noOfHits).toBe(1);
});
