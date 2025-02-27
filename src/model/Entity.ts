import { Pacman } from "../Pacman";
import { Vector2 } from "../utils/Vector2";
import { Bounds } from "../utils/utils";
import { IEntity } from "./IEntity";

export class Entity implements IEntity {
    private _id: number;
    private _position: Vector2;
    private _width: number;
    private _height: number;
    private _rotation: number;
    private _tint: number;

    get id()                        {return this._id}
    get x()                         {return this._position.x}
    get y()                         {return this._position.y}
    get position():     Vector2     {return this._position}
    get width()                     {return this._width}
    get height()                    {return this._height}
    get size():         Vector2     {return new Vector2(this._width, this._height)}
    get bounds():       Bounds      {return [this.position.x, this.position.y, this.size.x, this.size.y]}
    get center():       Vector2     {return new Vector2(this.x+this._width/2, this.y+this._height/2)}
    get rotation()                  {return this._rotation}
    get tint()                      {return this._tint}

    set id(v)           {this._id = v}
    set x(v)            {this._position.x = v}
    set y(v)            {this._position.y = v}
    set position(v)     {this._position = v}
    set width(v)        {this._width = v}
    set height(v)       {this._height = v}
    set rotation(v)     {this._rotation = v}
    set tint(v)         {this._tint = v}

    constructor(x: number, y: number, width: number, height: number) {
        this._id = Pacman.GenerateId();
        this._position = new Vector2(x,y);
        this._width = width;
        this._height = height;
        this._rotation = 0;
        this._tint = 0xFF_FF_FF;
    }

    IsColliding([x,y,width,height]: Bounds): boolean {
        return this.x < x + width
        && this.x + this.width > x
        && this.y < y + height
        && this.y + this.height > y;
    }

    IsCollidingPoint({x,y}: Vector2): boolean {
        return this.x < x
        && this.x + this.width > x
        && this.y < y
        && this.y + this.height > y;
    }
}