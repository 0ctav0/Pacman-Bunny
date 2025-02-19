import { IEntity } from "../model/IEntity";

export interface IView {
  Init: () => void,
  InitBunny: (entity: IEntity) => void,
  Render: (deltaTime: number) => void,
}
