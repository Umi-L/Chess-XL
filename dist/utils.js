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
