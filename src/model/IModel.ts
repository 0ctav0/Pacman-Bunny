import { Vector2 } from "../utils/utils";
import { IEntity } from "./IEntity";

export interface IModel {
  get player(): IEntity

  StartGame: () => void;
  Update: (deltaTime: number) => void;

  OnMove: (direction: Vector2) => void;
}
