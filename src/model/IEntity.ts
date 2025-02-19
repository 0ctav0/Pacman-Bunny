import { IBounds } from "./IBounds"

export interface IEntity extends IBounds {
    get id(): number

    get tint(): number

    set tint(v)
}