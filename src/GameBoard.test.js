import Ship from "./Ship";
import GameBoard from "./GameBoard";

describe(" GameBoard class ", () =>{
    test("isFleetSunked()",()=>{
        const gameBoard = new GameBoard();
        // Converts Object into array.
        const ships = Object.values(gameBoard.shipFleet);

        for(const ship of ships){
            for(var i=0;i<ship.length;i++){
                ship.hit(i);
            }
        }
        expect(gameBoard.isFleetSunked()).toBe(true);
    })
})
