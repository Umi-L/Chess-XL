import { Vector2 } from "./utils";
import { Board, Color } from "./chess";

export interface IMove{
    original: Vector2,
    moved: Vector2,
    special: SpecialMoves | null
}

export enum SpecialMoves{
    EnPassent,
    Castle
}

export interface IState{
    board: Board,
    turn: Color
}