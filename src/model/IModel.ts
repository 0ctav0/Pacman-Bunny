import { Vector2 } from "../utils/utils";
import { IEntity } from "./IEntity";
import { ILevel } from "./ILevel";

export interface IModel {
  get player(): IEntity
  get level(): ILevel

  StartGame: () => void;
  Update: (deltaTime: number) => void;

  OnMove: (direction: Vector2) => void;
}
