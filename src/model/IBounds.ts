import { Bounds, Vector2 } from "../utils/utils";

export interface IBounds {
    get x(): number
    get y(): number
    get position(): Vector2
    get width(): number
    get height(): number
    get size(): Vector2
    get bounds(): Bounds

    set x(v)
    set y(v)

    IsColliding(o: Bounds): boolean
    IsCollidingPoint(p: Vector2): boolean
}