import { Chess, Color, Peice, Peices } from "../shared/chess"
import { IClientInfo, IMove, IState } from "../shared/messages";
import { Vector2 } from "../shared/utils";

const game = new Chess(8, 8);

declare function io(): any;

let socket = io();
let userhashmap = {};
let socketid;

let myColor = Color.White;
let selected: null | Vector2 = null

const widthMargin = 40;
const heightMargin = 20;


document.onmousedown = (e) => {
	e.preventDefault()
}

redrawGameBoard();

//socket.io

socket.on('connect', function () {
	console.log("hello " + socket.id);
	socketid = socket.id;                           //store socket.id for use in the game
});

socket.on('state', (msg: IState) => {
	console.log("state recived");

	game.board = msg.board;
	game.turn = msg.turn;

	console.log(game.board);

	redrawGameBoard();
});

socket.on('clientInfo', (msg: IClientInfo) => {
	myColor = msg.color;
})

function redrawGameBoard() {
	let boardElement = document.getElementById("board")!;
	boardElement.innerHTML = "";

	let largestWidth = (window.innerWidth - widthMargin) / game.board.width
	let largestHeight = (window.innerHeight - heightMargin) / game.board.height

	let squareSize: number = Math.floor(largestWidth > largestHeight ? largestHeight : largestWidth);

	boardElement.setAttribute("style", `width: ${squareSize * game.board.width}; height: ${squareSize * game.board.height}`);


	for (let y = 0; y < game.board.height; y++) {
		for (let x = 0; x < game.board.width; x++) {
			let square = document.createElement("div");

			let i = (x + y * game.board.height);

			if (y % 2 == 0) {
				square.setAttribute("class", (i % 2 == 0 ? "lightsquare" : "darksquare"));
			}
			else {
				square.setAttribute("class", (i % 2 == 0 ? "darksquare" : "lightsquare"));
			}

			square.classList.add("square");
			square.setAttribute("style", `width: ${squareSize}; height: ${squareSize};`);
			square.setAttribute("id", x.toString() + ":" + y.toString());

			let pos = new Vector2(x, y);

			square.onmousedown = () => {
				if (!selected)
					selected = pos;
				else if (selected == pos)
					selected = null;
				else {
					let peice = game.getPeiceAtPos(selected);

					if (peice) {
						let move = game.move({ original: selected, moved: pos } as IMove, myColor);

						if (move) {
							cleanGamePeices();
							populateGameBoard();
						}
						else {
							selected = pos;
						}
					}
					else {
						selected = pos;
					}
				}

				clearBoardEffects();
				if (selected) {
					displayPeiceMoves(selected);
					getSquareAtPos(pos)?.classList.add("selected");
				}

			}

			boardElement.appendChild(square);

		}
	}

	populateGameBoard();
}

function cleanGamePeices() {
	const peices = document.querySelectorAll('.peice');

	peices.forEach(peice => {
		peice.remove();
	});
}

function populateGameBoard() {
	for (const peice of game.board.peices) {
		let square = getSquareAtPos(peice.pos);

		if (!square) {
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

function clearBoardEffects() {
	const elements = document.querySelectorAll('.board-effect');

	elements.forEach(element => {
		element.remove();
	});

	for (const element of document.getElementsByClassName("selected")) {
		element.classList.remove("selected")
	}
}

function displayPeiceMoves(pos: Vector2) {
	let peice = game.getPeiceAtPos(pos);
	let moves = [];

	if (peice)
		moves = game.getMoves(peice);
	else {
		//console.error("Trying to display peice off board no peice at: ", pos);
		return
	}

	for (const move of moves) {
		let square = getSquareAtPos(move);


		let overlay = document.createElement("div");
		overlay.classList.add("possible-move");
		overlay.classList.add("board-effect");

		square?.appendChild(overlay);
	}

}

function getSquareAtPos(pos: Vector2) {
	return document.getElementById(pos.x + ":" + pos.y);
}

function getPeiceSvg(peice: Peice) {
	let prefix = "";
	let body = ""

	const suffix = "_svg_NoShadow.svg"

	if (peice.color == Color.White)
		prefix = "w_"
	else
		prefix = "b_"

	switch (peice.type) {
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
		case Peices.Bishop:
			body = "bishop";
			break;
	}

	return prefix + body + suffix;
}

window.onresize = redrawGameBoard;