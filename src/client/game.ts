import { Chess } from "../shared/chess"

const game = new Chess(8, 8);

declare function io(): any;

let socket = io();
let userhashmap = {};
let socketid;

const widthMargin = 40;
const heightMargin = 20;

redrawGameBoard();

//socket.io
socket.on('userhashmap', function(msg:any){             //receive other player's info
  userhashmap = msg;                              //put the other player's info into userhashmap
});

socket.on('connect', function() {
  console.log("hello " + socket.id);
  socketid = socket.id;                           //store socket.id for use in the game
});

socket.on('state', (msg:any) => {
  game.board = msg;


});

function redrawGameBoard(){
  let boardElement = document.getElementById("board")!;
  boardElement.innerHTML = "";
  
  let largestWidth = (window.innerWidth - widthMargin) / game.board.width
  let largestHeight = (window.innerHeight - heightMargin) / game.board.height

  let squareSize:number = Math.floor(largestWidth > largestHeight ? largestHeight : largestWidth);

  boardElement.setAttribute("style", `width: ${squareSize*game.board.width}; height: ${squareSize*game.board.height}`);


  for (let y = 0; y < game.board.height; y++){
    for (let x = 0; x < game.board.width; x++){
      let square = document.createElement("div");

      let i = (x + y * game.board.height);

      if (y % 2 == 0){
        square.setAttribute("class", (i % 2 == 0 ? "lightsquare" : "darksquare"));
      }
      else{
        square.setAttribute("class", (i % 2 == 0 ? "darksquare" : "lightsquare"));
      }
      square.setAttribute("style", `width: ${squareSize}; height: ${squareSize};`);
      square.setAttribute("x", x.toString());
      square.setAttribute("y", y.toString());

      boardElement.appendChild(square);

    }
  }
}

window.onresize = redrawGameBoard;