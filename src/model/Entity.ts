import { Pacman } from "../Pacman";
import { Bounds, Vector2 } from "../utils/utils";
import { IEntity } from "./IEntity";

export class Entity implements IEntity {
    private _id: number;
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;
    private _tint: number;

    get id()                        {return this._id}
    get x()                         {return this._x}
    get y()                         {return this._y}
    get position():     Vector2     {return [this._x, this._y]}
    get width()                     {return this._width}
    get height()                    {return this._height}
    get size():         Vector2     {return [this._width, this._height]}
    get bounds():       Bounds      {return [...this.position,...this.size]}
    get tint()                      {return this._tint}

    set id(v)           {this._id = v}
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

    IsColliding([x,y,width,height]: Bounds): boolean {
        return this.x < x + width
        && this.x + this.width > x
        && this.y < y + height
        && this.y + this.height > y;
    }

    IsCollidingPoint([x,y]: Vector2): boolean {
        return this.x < x
        && this.x + this.width > x
        && this.y < y
        && this.y + this.height > y;
    }
}