export class Vector2{
    x: number
    y: number

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }

    static add(a: Vector2, b: Vector2): Vector2{
        return new Vector2(a.x + b.x, a.y + b.y);
    }
    static multiply(vector: Vector2, mult: number): Vector2{
        return new Vector2(vector.x * mult, vector.y * mult);
    }
}