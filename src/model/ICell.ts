export enum Tile { EMPTY = ' ', WALL = 'w', PLAYER = 'p', AI_PASS = 'p' }

export interface ICell {
    get x(): number
    get y(): number
    get tile(): Tile
    get pass(): Tile

    set tile(v)
    set pass(v)
}