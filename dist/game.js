(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./offsets":3,"./utils":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chess_1 = require("./chess");
const game = new chess_1.Chess(8, 8);
let socket = io();
let userhashmap = {};
let socketid;
//socket.io
socket.on('userhashmap', function (msg) {
    userhashmap = msg; //put the other player's info into userhashmap
});
socket.on('connect', function () {
    console.log("hello " + socket.id);
    socketid = socket.id; //store socket.id for use in the game
    setInterval(function () {
        //if-else if for only sending data if the character has moved
        if (!(socket.id in userhashmap)) {
            socket.emit('clientinfo', ["abc"]);
        }
    }, 100); //every 100 ms
});

},{"./chess":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BISHOP_OFFSETS = exports.ROOK_OFFSETS = exports.QUEEN_OFFSETS = exports.KING_OFFSETS = exports.KNIGHT_OFFSETS = void 0;
const utils_1 = require("./utils");
exports.KNIGHT_OFFSETS = [
    new utils_1.Vector2(1, -2),
    new utils_1.Vector2(-1, -2),
    new utils_1.Vector2(1, 2),
    new utils_1.Vector2(-1, 2),
    new utils_1.Vector2(2, -1),
    new utils_1.Vector2(2, 1),
    new utils_1.Vector2(-2, -1),
    new utils_1.Vector2(-2, 1),
];
exports.KING_OFFSETS = [
    new utils_1.Vector2(0, -1),
    new utils_1.Vector2(1, -1),
    new utils_1.Vector2(1, 0),
    new utils_1.Vector2(1, 1),
    new utils_1.Vector2(0, 1),
    new utils_1.Vector2(-1, 1),
    new utils_1.Vector2(-1, 0),
    new utils_1.Vector2(-1, -1),
];
exports.QUEEN_OFFSETS = [
    new utils_1.Vector2(0, -1),
    new utils_1.Vector2(1, -1),
    new utils_1.Vector2(1, 0),
    new utils_1.Vector2(1, 1),
    new utils_1.Vector2(0, 1),
    new utils_1.Vector2(-1, 1),
    new utils_1.Vector2(-1, 0),
    new utils_1.Vector2(-1, -1),
];
exports.ROOK_OFFSETS = [
    new utils_1.Vector2(0, -1),
    new utils_1.Vector2(1, 0),
    new utils_1.Vector2(0, 1),
    new utils_1.Vector2(-1, 0),
];
exports.BISHOP_OFFSETS = [
    new utils_1.Vector2(1, -1),
    new utils_1.Vector2(1, 1),
    new utils_1.Vector2(-1, 1),
    new utils_1.Vector2(-1, -1),
];

},{"./utils":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static add(a, b) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }
    static multiply(vector, mult) {
        return new Vector2(vector.x * mult, vector.y * mult);
    }
}
exports.Vector2 = Vector2;

},{}]},{},[2]);
