/**
 * @jest-environment jsdom
 */
import Ship from "./Ship";
import GameBoard from "./GameBoard";
import Player from "./Player";

describe("Player Class Tests", () => {
  // Setup the DOM before EVERY test in this file
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="human"></div>
      <div id="computer"></div>
    `;
  });

  describe("Utility and DOM Methods", () => {
    let player;

    beforeEach(() => {
      player = new Player("human");
    });

    test("getCoordinates should correctly convert index to x, y", () => {
      expect(player.getCoordinates(0)).toEqual({ x: 0, y: 0 });
      expect(player.getCoordinates(15)).toEqual({ x: 1, y: 5 });
      expect(player.getCoordinates(99)).toEqual({ x: 9, y: 9 });
    });

    test("getIndex should correctly convert x, y to index", () => {
      expect(player.getIndex(0, 0)).toBe(0);
      expect(player.getIndex(1, 5)).toBe(15);
      expect(player.getIndex(9, 9)).toBe(99);
    });

    test("createPlaceholderGrid should append 100 cells to the container", () => {
      const container = document.getElementById("human");
      expect(container.children.length).toBe(100);
      expect(container.children[0].classList.contains("cell")).toBe(true);
      expect(container.children[0].dataset.index).toBe("0");
    });

    test("markShipPosition should color cells containing ships white", () => {
      const ship = player.board.shipFleet.patrolBoat;
      // placeShip at 0,0 'right' occupies (0,0) and (1,0) in your logic
      player.board.placeShip(ship, 0, 0, "right"); 

      player.markShipPosition();

      // (0,0) -> Index 0
      expect(player.boardMatrix.children[0].style.backgroundColor).toBe("white");
      
      // (1,0) -> Index 10 (since x=1, y=0: 10*1 + 0 = 10)
      const nextIndex = player.getIndex(1, 0); 
      expect(player.boardMatrix.children[nextIndex].style.backgroundColor).toBe("white");
    });
  });
});

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
