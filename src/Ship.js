export default class ship {
  name;
  length;
  hitPositions;
  noOfhits = 0;
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hitPositions = new Array(length).fill(false);
  }
  hit(position) {
    this.hitPositions[position] = true;
    noOfhits++;
  }
}
