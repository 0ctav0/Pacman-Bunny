import { IEntity } from "../model/IEntity";
import { IModel } from "../model/IModel";

export interface IView {
  Init: () => void,
  InitSprite: (entity: IEntity) => void,
  Render: (deltaTime: number, model: IModel) => void,
}
