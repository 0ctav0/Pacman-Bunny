import { Pacman } from "../Pacman";
import { Entity } from "./Entity";
import { IEntity } from "./IEntity";
import { ILevel } from "./ILevel";

const WALL_THICKNESS = 20;

export class Level implements ILevel {
    private _walls: IEntity[] = [];

    get walls()     {return this._walls}

    constructor() {
        const topWall = new Entity(0, 0, Pacman.WIDTH, WALL_THICKNESS); // width, heigt
        this._walls.push(topWall);
    
        const leftWall = new Entity(0,0, WALL_THICKNESS, Pacman.HEIGHT);
        this._walls.push(leftWall);
    
        const rightWall = new Entity(Pacman.WIDTH-WALL_THICKNESS, 0, WALL_THICKNESS, Pacman.HEIGHT);
        this._walls.push(rightWall);
    
        const bottomWall = new Entity(0, Pacman.HEIGHT-WALL_THICKNESS, Pacman.WIDTH, WALL_THICKNESS);
        this._walls.push(bottomWall);
    }
}