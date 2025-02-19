export interface IEntity {
    get id(): number
    get x(): number
    get y(): number
    get width(): number
    get height(): number
    get tint(): number

    set x(v)
    set y(v)
    set tint(v)

    IsColliding(o: IEntity): boolean
}