import { Application } from 'pixi.js';
import { DesktopController } from './controller/DesktopController';
import { IController } from './controller/IController';
import { IModel } from './model/IModel';
import { PacmanModel } from './model/PacmanModel';
import { IView } from './view/IView';
import { PixiView } from './view/PixiView';
import { ResourceManager } from './resources/ResourceManager';

export class Pacman {
  private _app: Application;

  private _model: IModel;
  private _view?: IView;
  private _controller: IController;

  constructor() {
    this._app = new Application();
    this._model = new PacmanModel();
    this._controller = new DesktopController();
    this.Init();
  }
  private async Init() {
    const [background, bunny] = await ResourceManager.LoadResources();
    this._view = new PixiView(this._app, {background, bunny});

  }
}
