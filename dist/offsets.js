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
