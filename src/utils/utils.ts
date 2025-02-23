import { Color } from "pixi.js";

export type Vector2 = [number, number];
export type Vector3 = [number, number, number];
export type Bounds = [number,number,number,number]; //x,y,width,height

export const getRandomChannel = () => 255 * Math.random();
export const getRandomColor = () => new Color({r: getRandomChannel(), g: getRandomChannel(), b: getRandomChannel()})
export const generateId = () => Math.random().toString().slice(2);


export class V2 {
    static zero: Vector2 = [0,0];
    static minus: Vector2 = [-1,-1];

    static Add = (...vectors: Vector2[]): Vector2 => [
        vectors.reduce((prev,[x]) => prev + x, 0),
        vectors.reduce((prev,[,y]) => prev + y, 0),
    ];
    
    static Sub = (...vectors: Vector2[]): Vector2 => [
        vectors.map(_ => _[0]).reduce((a,b) => a-b),
        vectors.map(_ => _[1]).reduce((a,b) => a-b),
    ];

    static Mult = ([x,y]: Vector2, v: number): Vector2 => [x * v, y * v];

    static Magnitude = ([x,y]: Vector2): number => Math.sqrt(x * x + y * y);

    static Normalize = (v: Vector2): Vector2 => {
        const magnitude = this.Magnitude(v);
        if (magnitude === 0) return V2.zero;
        return [v[0]/magnitude, v[1]/magnitude];
    }
}

export class BoundsF {
    static Add = ([x,y,width,height]: Bounds, ...vectors: Vector2[]): Bounds => [
        x + vectors.reduce((prev,[x]) => prev + x, 0),
        y + vectors.reduce((prev,[,y]) => prev + y, 0),
        width,
        height,
    ];
}