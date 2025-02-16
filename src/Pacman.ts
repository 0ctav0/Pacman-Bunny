import { DesktopController } from './controller/DesktopController';
import { PacmanModel } from './model/PacmanModel';
import { PixiView } from './view/PixiView';

export class Pacman {
  private _controller: IController;
  private _model: IModel;
  private _view: IView;

  constructor() {
    this._controller = new DesktopController();
    this._model = new PacmanModel();
    this._view = new PixiView();
    this.Init();
  }
  private Init() {}
}
