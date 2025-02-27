export class Vector2 {
    static get zero()       {return new Vector2(0, 0)};
    static get minus()      {return new Vector2(-1, -1)};

    private _x: number;
    private _y: number;

    get x()                 {return this._x}
    get y()                 {return this._y}

    set x(v)                {this._x = v}
    set y(v)                {this._y = v}

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    Clone = () => new Vector2(this.x, this.y);

    /**
     * Mutable
     */
    Add = (...vectors: Vector2[]) => {
        this.x = vectors.reduce((prev, { x }) => prev + x, this.x);
        this.y = vectors.reduce((prev, { y }) => prev + y, this.y);
    }

    Sum = (...vectors: Vector2[]): Vector2 => new Vector2(
        vectors.reduce((prev, { x }) => prev + x, this.x),
        vectors.reduce((prev, { y }) => prev + y, this.y),
    );

    Sub = (...vectors: Vector2[]): Vector2 => new Vector2(
        vectors.reduce((prev, { x }) => prev - x, this.x),
        vectors.reduce((prev, { y }) => prev - y, this.y),
    );

    Mult = (v: number): Vector2 => new Vector2(this.x * v, this.y * v);

    Magnitude = (): number => Math.sqrt(this.x * this.x + this.y * this.y);

    Normalize = (): Vector2 => {
        const magnitude = this.Magnitude();
        if (magnitude === 0) return Vector2.zero;
        return new Vector2(this.x / magnitude, this.y / magnitude);
    }
}