export enum Tile { EMPTY, WALL, PLAYER, AI_PASS }

export interface ICell {
    get x(): number
    get y(): number
    get tile(): Tile

    set tile(v)
}