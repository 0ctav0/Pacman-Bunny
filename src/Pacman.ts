import { Application, Ticker, generateUID } from 'pixi.js';
import { DesktopController } from './controller/DesktopController';
import { IController } from './controller/IController';
import { IModel } from './model/IModel';
import { PacmanModel } from './model/PacmanModel';
import { IView } from './view/IView';
import { PixiView } from './view/PixiView';
import { ResourceManager } from './resources/ResourceManager';
import { Vector2 } from './utils/utils';

export class Pacman {
  private _app: Application;

  private _model: IModel;
  private _view?: IView;
  private _controller: IController;

  constructor() {
    this._app = new Application();
    this._model = new PacmanModel();
    this._controller = new DesktopController(this.OnMove);
    this.Init();
  }

  private OnMove = (direction: Vector2) => {
    this._model.OnMove(direction);
  }

  private async Init() {
    const [background, bunny] = await ResourceManager.LoadResources();
    this._view = new PixiView(this._app, {background, bunny});
    await this._view.Init();
    this._view.InitSprite(this._model.player);
    this._app.ticker.add(this.UpdateRenderLoop);
  }

  private UpdateRenderLoop = (ticker: Ticker) => {
    this._model.Update(ticker.deltaTime); // for logic, servers
    this._view?.Render(ticker.deltaTime, this._model); // for view, that player can see
  }

  static GenerateId() { return generateUID()}
}
