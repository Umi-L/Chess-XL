"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chess = void 0;
const utils_1 = require("./utils");
const offsets_1 = require("./offsets");
var Peices;
(function (Peices) {
    Peices[Peices["Pawn"] = 0] = "Pawn";
    Peices[Peices["Knight"] = 1] = "Knight";
    Peices[Peices["bishop"] = 2] = "bishop";
    Peices[Peices["Rook"] = 3] = "Rook";
    Peices[Peices["Queen"] = 4] = "Queen";
    Peices[Peices["King"] = 5] = "King";
})(Peices || (Peices = {}));
var Color;
(function (Color) {
    Color[Color["White"] = 0] = "White";
    Color[Color["black"] = 1] = "black";
})(Color || (Color = {}));
class Chess {
    constructor(width, height) {
        this.board = {
            peices: new Array,
            width: width,
            height: height
        };
        this.turn = Color.White;
    }
    move(p1, p2) {
        let peice = this.getPeiceAtPos(p1);
        if (!peice)
            return;
        let possibleMoves = this.getMoves(peice);
        for (const move of possibleMoves) {
            if (move == p2) {
                //get rid of peice at pos
                let peiceToDelete = this.getPeiceIndexAtPos(move);
                if (peiceToDelete) {
                    this.board.peices.splice(peiceToDelete, 1);
                }
                peice.pos = p2;
            }
        }
    }
    getMoves(peice) {
        let posibleMoves = [];
        switch (peice.type) {
            case Peices.Pawn:
                break;
            case Peices.King:
                posibleMoves = this.getJumpingPeiceMoves(peice.pos, offsets_1.KING_OFFSETS);
                break;
            case Peices.Knight:
                posibleMoves = this.getJumpingPeiceMoves(peice.pos, offsets_1.KNIGHT_OFFSETS);
                break;
            case Peices.Queen:
                posibleMoves = this.getSlidingPeiceMoves(peice.pos, offsets_1.QUEEN_OFFSETS);
                break;
            case Peices.Rook:
                posibleMoves = this.getSlidingPeiceMoves(peice.pos, offsets_1.ROOK_OFFSETS);
                break;
            case Peices.bishop:
                posibleMoves = this.getSlidingPeiceMoves(peice.pos, offsets_1.BISHOP_OFFSETS);
                break;
        }
        return posibleMoves;
    }
    getSlidingPeiceMoves(pos, offsets) {
        let positions = [];
        for (const offset of offsets) {
            let multiplyer = 1;
            //while in board
            let checking = utils_1.Vector2.add(pos, utils_1.Vector2.multiply(offset, multiplyer));
            while (this.pointInBoard(checking)) {
                checking = utils_1.Vector2.add(pos, utils_1.Vector2.multiply(offset, multiplyer));
                let peice = this.getPeiceAtPos(checking);
                if (peice) {
                    if (peice.color != this.turn) {
                        positions.push(checking);
                    }
                    break;
                }
                multiplyer++;
            }
        }
        return positions;
    }
    getJumpingPeiceMoves(pos, offsets) {
        let positions = [];
        for (const offset of offsets) {
            let checking = utils_1.Vector2.add(pos, offset);
            if (!this.pointInBoard(checking))
                continue;
            let peice = this.getPeiceAtPos(checking);
            if (peice) {
                if (peice.color == this.turn) {
                    continue;
                }
            }
            positions.push(checking);
        }
        return positions;
    }
    pointInBoard(pos) {
        if (pos.x < this.board.width && pos.x > 0 && pos.y < this.board.height && pos.y > 0) {
            return true;
        }
        return false;
    }
    getPeiceAtPos(pos) {
        for (const peice of this.board.peices) {
            if (peice.pos == pos) {
                return peice;
            }
        }
        return null;
    }
    getPeiceIndexAtPos(pos) {
        for (let i = 0; i < this.board.peices.length; i++) {
            let peice = this.board.peices[i];
            if (peice.pos == pos) {
                return i;
            }
        }
        return null;
    }
}
exports.Chess = Chess;
