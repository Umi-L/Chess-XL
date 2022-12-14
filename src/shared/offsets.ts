import { Vector2 } from "./utils"

export const KNIGHT_OFFSETS: Array<Vector2> = [
    new Vector2(1, -2),
    new Vector2(-1, -2),

    new Vector2(1, 2),
    new Vector2(-1, 2),

    new Vector2(2, -1),
    new Vector2(2, 1),

    new Vector2(-2, -1),
    new Vector2(-2, 1),
]

export const KING_OFFSETS: Array<Vector2> = [
    new Vector2(0,-1),
    new Vector2(1,-1),
    new Vector2(1, 0),
    new Vector2(1,1),
    new Vector2(0,1),
    new Vector2(-1,1),
    new Vector2(-1,0),
    new Vector2(-1,-1),
]

export const QUEEN_OFFSETS: Array<Vector2> = [
    new Vector2(0,-1),
    new Vector2(1,-1),
    new Vector2(1, 0),
    new Vector2(1,1),
    new Vector2(0,1),
    new Vector2(-1,1),
    new Vector2(-1,0),
    new Vector2(-1,-1),
]

export const ROOK_OFFSETS: Array<Vector2> = [
    new Vector2(0,-1),
    new Vector2(1, 0),
    new Vector2(0,1),
    new Vector2(-1,0),
]

export const BISHOP_OFFSETS: Array<Vector2> = [
    new Vector2(1,-1),
    new Vector2(1,1),
    new Vector2(-1,1),
    new Vector2(-1,-1),
]