import Ship from "./Ship";

describe("Ship Class", () => {
  test("isSunk status should update correctly", () => {
    const ship = new Ship("sample", 4); // Added 'const'
    // Manually setting noOfHits doesn't trigger the logic inside hit()
    // but for the sake of this test:
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    expect(ship.isShipSunk()).toBe(true);
  });

  test("hit() method ignores out of bounds", () => {
    const ship = new Ship("sample", 4); // Added 'const'
    ship.hit(23);
    expect(ship.isShipSunk()).toBe(false);
  });
});
