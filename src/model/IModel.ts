import { Vector2 } from "../utils/utils";
import { IEntity } from "./IEntity";
import { ILevel } from "./ILevel";

export enum GameState { PLAY, PAUSED, WIN, DEFEAT }

export interface IModel {
  get state(): GameState;
  get player(): IEntity;
  get level(): ILevel;
  get enemies(): IEntity[];

  StartGame: () => void;
  SlowUpdate: (deltaTime: number) => void;
  Update: (deltaTime: number) => void;

  OnMove: (direction: Vector2) => void;
}
