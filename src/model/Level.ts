import { Pacman } from "../Pacman";
import { Entity } from "./Entity";
import { IEntity } from "./IEntity";
import { ILevel } from "./ILevel";
import { BUNNY_HEIGHT, BUNNY_WIDTH } from "./PacmanModel";

const WALL_THICKNESS = 20;
const SPAWN_SIZE = 200;

export class Level implements ILevel {
    private _walls: IEntity[] = [];

    get walls()     {return this._walls}

    constructor() {

        this.BuildSquare(0,0,Pacman.WIDTH,Pacman.HEIGHT); // outer walls

        const horizontalOffst = WALL_THICKNESS + BUNNY_WIDTH + 2;
        const verticalOffset = WALL_THICKNESS + BUNNY_HEIGHT + 2;

        this._walls.push(new Entity(horizontalOffst, verticalOffset, Pacman.WIDTH-horizontalOffst*2, WALL_THICKNESS));
        this._walls.push(new Entity(horizontalOffst, verticalOffset*2, Pacman.WIDTH-horizontalOffst*2, WALL_THICKNESS));
    
        this._walls.push(new Entity(horizontalOffst, Pacman.HEIGHT-WALL_THICKNESS-120, Pacman.WIDTH-horizontalOffst*2, WALL_THICKNESS));
        this._walls.push(new Entity(horizontalOffst, Pacman.HEIGHT-WALL_THICKNESS-60, Pacman.WIDTH-horizontalOffst*2, WALL_THICKNESS));

        
        this.BuildSquare(Pacman.WIDTH/2-SPAWN_SIZE/2, Pacman.HEIGHT/2-SPAWN_SIZE/2, SPAWN_SIZE, SPAWN_SIZE) // enemy's spawn
    }

    private BuildSquare(startX: number, startY: number, width: number, height: number) {
        const topWall = new Entity(startX, startY, width, WALL_THICKNESS);
        this._walls.push(topWall);

        const leftWall = new Entity(startX, startY, WALL_THICKNESS, height);
        this._walls.push(leftWall);
    
        const rightWall = new Entity(startX + width - WALL_THICKNESS, startY, WALL_THICKNESS, height);
        this._walls.push(rightWall);
    
        const bottomWall = new Entity(startX, startY + height - WALL_THICKNESS, width, WALL_THICKNESS);
        this._walls.push(bottomWall);
    }
}