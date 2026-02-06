import Ship from "./Ship";
import GameBoard from "./GameBoard";

import Player from "./Player";

describe("Player - getRandomCoordinate()", () => {
  let player;

  beforeEach(() => {
    // Note: Passing 'human' and a dummy board object as per your constructor
    player = new Player("human");
  });

  test("should return an object with x and y properties", () => {
    const coord = player.getRandomCoordinate();
    expect(coord).toHaveProperty("x");
    expect(coord).toHaveProperty("y");
  });

  test("should return coordinates within the 0-9 range", () => {
    // Run 100 times to ensure randomness stays in bounds
    for (let i = 0; i < 100; i++) {
      const { x, y } = player.getRandomCoordinate();

      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(10);

      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThan(10);
    }
  });
});

describe("Player - placeFleet()", () => {
  let player;

  beforeEach(() => {
    player = new Player("computer");
  });

  test("should place all 5 ships on the board", () => {
    player.placeFleet();

    // Check if the fleet size is 5
    expect(player.board.placedFleet.size).toBe(5);

    // Check if isFleetPlaced() returns true
    expect(player.board.isFleetPlaced()).toBe(true);

    // Verify specific ship names are in the set
    expect(player.board.placedFleet.has("Carrier")).toBe(true);
    expect(player.board.placedFleet.has("Battleship")).toBe(true);
    expect(player.board.placedFleet.has("Destroyer")).toBe(true);
    expect(player.board.placedFleet.has("Submarine")).toBe(true);
    expect(player.board.placedFleet.has("Patrol Boat")).toBe(true);
  });
});
