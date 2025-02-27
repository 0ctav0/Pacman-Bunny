import { Vector2 } from "../utils/Vector2";
import { Bounds } from "../utils/utils";

export interface IBounds {
    get x(): number
    get y(): number
    get position(): Vector2
    get width(): number
    get height(): number
    get size(): Vector2
    get center(): Vector2
    get bounds(): Bounds
    get rotation(): number

    set x(v)
    set y(v)
    set position(v)
    set rotation(v)

    IsColliding(o: Bounds): boolean
    IsCollidingPoint(p: Vector2): boolean
}