import { ICell, Tile } from "./ICell";

export class Cell implements ICell {
    private _x: number;
    private _y: number;
    private _tile: Tile;

    get x()         {return this._x}
    get y()         {return this._y}
    get tile()      {return this._tile}

    set tile(v)     {this._tile = v}

    constructor(x: number, y: number, tile: number) {
        this._x = x;
        this._y = y;
        this._tile = tile;
    }
}