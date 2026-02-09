import "./style.css";
import Player from "./Player.js";




function initializeHumanPlayer() {
  const humanPlayer = new Player("human");
  humanPlayer.placeFleet();
  humanPlayer.markShipPosition();
}

function initializeComputerPlayer() {
  const computerPlayer = new Player("computer");
  computerPlayer.placeFleet();
  computerPlayer.markShipPosition();
}

function initialization() {
  initializeHumanPlayer();
  initializeComputerPlayer();
}

initialization();
