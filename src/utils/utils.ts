import { Color } from "pixi.js";
import { Vector2 } from "./Vector2";

export type Bounds = [number,number,number,number]; //x,y,width,height

export const getRandomChannel = () => 255 * Math.random();
export const getRandomColor = () => new Color({r: getRandomChannel(), g: getRandomChannel(), b: getRandomChannel()})
export const generateId = () => Math.random().toString().slice(2);


export class BoundsF {
    static Add = ([x,y,width,height]: Bounds, ...vectors: Vector2[]): Bounds => [
        x + vectors.reduce((prev,{x}) => prev + x, 0),
        y + vectors.reduce((prev,{y}) => prev + y, 0),
        width,
        height,
    ];
}