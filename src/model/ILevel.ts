import { ICell, Tile } from "./ICell";
import { IEntity } from "./IEntity";

export interface ILevel {
    get walls(): IEntity[]
    get cells(): ICell[][];
}