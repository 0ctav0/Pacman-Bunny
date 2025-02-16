import { Pacman } from "../Pacman";
import { IEntity } from "./IEntity";

export class Entity implements IEntity {
    private _id: number;
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;
    private _tint: number;

    get id()            {return this._id}
    get x()             {return this._x}
    get y()             {return this._y}
    get width()         {return this._width}
    get height()        {return this._height}
    get tint()          {return this._tint}

    set id(v)            {this._id = v}
    set x(v)            {this._x = v}
    set y(v)            {this._y = v}
    set width(v)        {this._width = v}
    set height(v)       {this._height = v}
    set tint(v)         {this._tint = v}

    constructor(x: number, y: number, width: number, height: number) {
        this._id = Pacman.GenerateId();
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._tint = 0xFF_FF_FF;
    }
}