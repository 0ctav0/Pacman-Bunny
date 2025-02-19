import { IEntity } from "../model/IEntity";

export interface IView {
  Init: () => void,
  InitSprite: (entity: IEntity) => void,
  Render: (deltaTime: number) => void,
}
