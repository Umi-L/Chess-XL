import { Chess, Color, Peice, Peices } from "../shared/chess"
import { IState } from "../shared/messages";

const game = new Chess(8, 8);

declare function io(): any;

let socket = io();
let userhashmap = {};
let socketid;

const widthMargin = 40;
const heightMargin = 20;

redrawGameBoard();

//socket.io

socket.on('connect', function() {
  console.log("hello " + socket.id);
  socketid = socket.id;                           //store socket.id for use in the game
});

socket.on('state', (msg:IState) => {
  console.log("state recived");

  game.board = msg.board;
  game.turn = msg.turn

  console.log(game.board);

  redrawGameBoard();
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

      square.classList.add("square");
      square.setAttribute("style", `width: ${squareSize}; height: ${squareSize};`);
      square.setAttribute("id", x.toString() + ":" + y.toString());

      boardElement.appendChild(square);

    }
  }

  populateGameBoard();
}
function populateGameBoard(){
  for (const peice of game.board.peices){
    let square = document.getElementById(peice.pos.x + ":" + peice.pos.y);

    if (!square){
      console.error("squareDoesNotExist")
      return
    }

    let svgElement = document.createElement("img");
    svgElement.setAttribute("src", "assets/peices/" + getPeiceSvg(peice));
    svgElement.classList.add("peice");

    square.appendChild(svgElement);

    //square!.setAttribute("style", "background-color: white;");
  }
}

function getPeiceSvg(peice: Peice){
  let prefix = "";
  let body = ""

  const suffix = "_svg_NoShadow.svg"

  if (peice.color == Color.White)
    prefix = "w_"
  else
    prefix = "b_"
  
  switch(peice.type){
    case Peices.King:
      body = "king";
      break;
    case Peices.Knight:
      body = "knight";
      break;
    case Peices.Pawn:
      body = "pawn";
      break;
    case Peices.Queen:
      body = "queen";
      break;
    case Peices.Rook:
      body = "rook";
      break;
    case Peices.bishop:
      body = "bishop";
      break;
  }

  return prefix + body + suffix;
}

window.onresize = redrawGameBoard;