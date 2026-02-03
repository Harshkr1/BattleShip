export default class Ship {
  name;
  length;
  hitPositions;
  noOfHits = 0;
  isSunk = false;
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hitPositions = new Array(length).fill(false);
  }
  hit(position) {
    if (position < 0 || position >= this.length) return;
    if (this.hitPositions[position] == true) return;

    this.hitPositions[position] = true;
    this.noOfHits++;

    if (this.noOfHits == this.length) {
      this.isSunk = true;
    }
  }
  isShipSunk() {
    return this.isSunk;
  }
}
