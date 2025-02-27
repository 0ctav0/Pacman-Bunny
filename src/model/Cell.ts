import { ICell, Tile } from "./ICell";

export class Cell implements ICell {
    private _x: number;
    private _y: number;
    private _tile: Tile;
    private _pass: Tile = Tile.EMPTY;

    get x()         {return this._x}
    get y()         {return this._y}
    get tile()      {return this._tile}
    get pass()      {return this._pass}

    set tile(v)     {this._tile = v}
    set pass(v)     {this._pass = v}

    constructor(x: number, y: number, tile: Tile) {
        this._x = x;
        this._y = y;
        this._tile = tile;
    }
}