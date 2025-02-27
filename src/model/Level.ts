import { Pacman } from "../Pacman";
import { Bounds } from "../utils/utils";
import { Cell } from "./Cell";
import { Entity } from "./Entity";
import { ICell, Tile } from "./ICell";
import { IEntity } from "./IEntity";
import { ILevel } from "./ILevel";
import { BUNNY_HEIGHT, BUNNY_WIDTH } from "./constants";

export const WALL_THICKNESS = 20;
const SPAWN_SIZE = 190;
const SIDE_GAP = BUNNY_HEIGHT;
export const LEVEL_X = 48;
export const LEVEL_Y = 27;

export class Level implements ILevel {

    private _walls: IEntity[] = [];
    private _cells: Cell[][] = [];

    get walls()     {return this._walls}
    get cells()     {return this._cells}

    constructor() {


        this.BuildSquare(0,0,Pacman.WIDTH,Pacman.HEIGHT, {sideHoles:true}); // outer walls

        const horizontalOffst = WALL_THICKNESS + BUNNY_WIDTH;
        const verticalOffset = WALL_THICKNESS + BUNNY_HEIGHT;

        this._walls.push(new Entity(horizontalOffst, verticalOffset, Pacman.WIDTH-horizontalOffst*2, WALL_THICKNESS));
        this._walls.push(new Entity(horizontalOffst, verticalOffset*2+1, Pacman.WIDTH-horizontalOffst*2, WALL_THICKNESS));
    
        this._walls.push(new Entity(horizontalOffst, Pacman.HEIGHT-WALL_THICKNESS-verticalOffset*2-1, Pacman.WIDTH-horizontalOffst*2, WALL_THICKNESS));
        this._walls.push(new Entity(horizontalOffst, Pacman.HEIGHT-WALL_THICKNESS-verticalOffset, Pacman.WIDTH-horizontalOffst*2, WALL_THICKNESS));

        
        this.BuildSquare(Pacman.WIDTH/2-SPAWN_SIZE/2, Pacman.HEIGHT/2-SPAWN_SIZE/2, SPAWN_SIZE, SPAWN_SIZE) // enemy's spawn
        this.InitLevel();
    
    }

    private InitLevel() {
        for (let y = 0; y < LEVEL_Y; y++) {
            const col: Cell[] = [];
            for (let x = 0; x < LEVEL_X; x++) {
                // const tile = Math.random() < .5 ? Tile.EMPTY : Tile.WALL;
                let tile = Tile.EMPTY;
                const bounds: Bounds = [x*WALL_THICKNESS, y*WALL_THICKNESS, WALL_THICKNESS, WALL_THICKNESS]
                if (!this.walls.some(wall => wall.IsColliding(bounds))) {
                    tile = Tile.AI_PASS;
                    // console.log(bounds);
                }
                // if (x === 0 || y === 0 || x === LEVEL_X-1 || y === LEVEL_Y-1) tile = Tile.WALL;
                // else if (y === 6 && x > 1) tile = Tile.WALL;
                // if (x === 0 && y === Math.floor(LEVEL_Y/2)) tile = Tile.EMPTY;
                col.push(new Cell(x,y,tile));
            }
            this._cells.push(col);
        }
    }

    private BuildSquare(startX: number, startY: number, width: number, height: number, 
        options?: {sideHoles: boolean}
    ) {
        const topWall = new Entity(startX, startY, width, WALL_THICKNESS);
        this._walls.push(topWall);

        if (options?.sideHoles) {
            const halfHeight = height/2;
            const halfGap = SIDE_GAP/2;
            const topHalfHeight = halfHeight - halfGap-1;
            const bottomHalfOffsetY = startY + halfHeight + halfGap+2;
            const throatLength = WALL_THICKNESS*3;
            this._walls.push(new Entity(startX, startY, WALL_THICKNESS, topHalfHeight));
            this._walls.push(new Entity(startX, bottomHalfOffsetY, WALL_THICKNESS, halfHeight - halfGap-2));
            this._walls.push(new Entity(startX+WALL_THICKNESS, startY+topHalfHeight-WALL_THICKNESS, throatLength, WALL_THICKNESS));
            this._walls.push(new Entity(startX+WALL_THICKNESS, bottomHalfOffsetY, throatLength, WALL_THICKNESS));

            const rightOffsetX = startX + width - WALL_THICKNESS
            this.walls.push(new Entity(rightOffsetX, startY, WALL_THICKNESS, topHalfHeight));
            this.walls.push(new Entity(rightOffsetX, startY + halfHeight + halfGap+2, WALL_THICKNESS, halfHeight - halfGap-2));
            this._walls.push(new Entity(rightOffsetX-throatLength, startY+topHalfHeight-WALL_THICKNESS, throatLength, WALL_THICKNESS));
            this._walls.push(new Entity(rightOffsetX-throatLength, bottomHalfOffsetY, throatLength, WALL_THICKNESS));

        } else {
            const leftWall = new Entity(startX, startY, WALL_THICKNESS, height);
            this._walls.push(leftWall);

            const rightWall = new Entity(startX + width - WALL_THICKNESS, startY, WALL_THICKNESS, height);
            this._walls.push(rightWall);
        }
    
    
        const bottomWall = new Entity(startX, startY + height - WALL_THICKNESS, width, WALL_THICKNESS);
        this._walls.push(bottomWall);
    }

    ///// public

    At(x: number, y: number) {
        return this._cells[y][x];
    }

    ForEach(callback: (cell: ICell) => void) {
        for (let y = 0; y < LEVEL_Y; y++) {
            for (let x = 0; x < LEVEL_X; x++) {
                const cell = this.At(x,y);
                callback(cell);
            }
        }
    }
}