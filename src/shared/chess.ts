import { Vector2 } from "./utils"
import { KING_OFFSETS, KNIGHT_OFFSETS, BISHOP_OFFSETS, QUEEN_OFFSETS, ROOK_OFFSETS } from "./offsets"
import { IMove } from "./messages"

export interface Peice {
	type: Peices,
	pos: Vector2,
	color: Color
}

interface Board {
	peices: Array<Peice>,
	width: number,
	height: number
}

export enum Peices {
	Pawn,
	Knight,
	Bishop,
	Rook,
	Queen,
	King
}

export enum Color {
	White,
	Black
}

export class Chess {
	board: Board
	turn: Color

	constructor(width: number, height: number) {
		this.board = {
			peices: new Array<Peice>,
			width: width,
			height: height
		}
		this.turn = Color.White;
	}

	move(move: IMove, playerMoving: Color): boolean {
		let peice = this.getPeiceAtPos(move.original);
		if (!peice) {
			console.error("tried to move peice that doesn't exist")
			return false;
		}
		if (peice.color != this.turn) {
			console.log("not your turn")
			return false
		}

		let possibleMoves = this.getMoves(peice);

		for (const possibleMove of possibleMoves) {
			if (Vector2.equals(possibleMove, move.moved)) {

				//get rid of peice at pos
				let peiceToDelete = this.getPeiceIndexAtPos(possibleMove);
				if (peiceToDelete) {
					this.board.peices.splice(peiceToDelete, 1);
				}

				peice.pos = move.moved;

				this.flipTurn();

				console.log("moved peice at: ", move.original, " to ", move.moved);

				return true;
			}
		}

		console.log("invalid move")
		return false;
	}

	getMoves(peice: Peice): Array<Vector2> {
		let posibleMoves: Array<Vector2> = [];

		switch (peice.type) {
			case Peices.Pawn:
				break;
			case Peices.King:
				posibleMoves = this.getJumpingPeiceMoves(peice.pos, KING_OFFSETS);
				break;
			case Peices.Knight:
				posibleMoves = this.getJumpingPeiceMoves(peice.pos, KNIGHT_OFFSETS);
				break;
			case Peices.Queen:
				posibleMoves = this.getSlidingPeiceMoves(peice.pos, QUEEN_OFFSETS);
				break;
			case Peices.Rook:
				posibleMoves = this.getSlidingPeiceMoves(peice.pos, ROOK_OFFSETS);
				break;
			case Peices.Bishop:
				posibleMoves = this.getSlidingPeiceMoves(peice.pos, BISHOP_OFFSETS);
				break;
		}
		return posibleMoves;
	}

	private flipTurn() {
		if (this.turn == Color.White) {
			this.turn = Color.Black
		}
		else {
			this.turn = Color.White
		}

		console.log("now", this.turn, "'s turn")
	}

	private getSlidingPeiceMoves(pos: Vector2, offsets: Array<Vector2>) {

		let positions: Array<Vector2> = [];

		for (const offset of offsets) {

			let multiplyer = 1;


			//while in board
			let checking = Vector2.add(pos, Vector2.multiply(offset, multiplyer));


			while (this.pointInBoard(checking)) {
				checking = Vector2.add(pos, Vector2.multiply(offset, multiplyer));

				let peice = this.getPeiceAtPos(checking);
				if (peice) {
					if (peice.color != this.turn) {
						positions.push(checking);
					}

					break
				}
				positions.push(checking);

				multiplyer++;
			}
		}

		return positions;
	}

	private getJumpingPeiceMoves(pos: Vector2, offsets: Array<Vector2>) {
		let positions: Array<Vector2> = [];

		for (const offset of offsets) {
			let checking = Vector2.add(pos, offset);

			if (!this.pointInBoard(checking))
				continue

			let peice = this.getPeiceAtPos(checking);
			if (peice) {
				if (peice.color == this.turn) {
					continue
				}
			}

			positions.push(checking);
		}

		return positions;
	}

	private pointInBoard(pos: Vector2): boolean {
		if (pos.x < this.board.width && pos.x >= 0 && pos.y < this.board.height && pos.y >= 0) {
			return true;
		}
		return false;
	}

	getPeiceAtPos(pos: Vector2): Peice | null {
		for (const peice of this.board.peices) {
			if (Vector2.equals(peice.pos, pos)) {
				return peice;
			}
		}
		return null
	}

	private getPeiceIndexAtPos(pos: Vector2): number | null {
		for (let i = 0; i < this.board.peices.length; i++) {
			let peice = this.board.peices[i];
			if (Vector2.equals(peice.pos, pos)) {
				return i;
			}
		}
		return null
	}
}