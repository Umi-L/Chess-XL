import { Vector2 } from "./utils";
import { Board, Color } from "./chess";

export interface IMove {
	original: Vector2,
	moved: Vector2
}

export enum SpecialMoves {
	EnPassent,
	Castle
}

export interface IState {
	board: Board,
	turn: Color
}

export interface IClientInfo {
	color: Color
}