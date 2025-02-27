import { Application, Ticker, generateUID } from 'pixi.js';
import { DesktopController } from './controller/DesktopController';
import { IController } from './controller/IController';
import { IModel } from './model/IModel';
import { PacmanModel } from './model/PacmanModel';
import { IView } from './view/IView';
import { PixiView } from './view/PixiView';
import { ResourceManager } from './resources/ResourceManager';
import { Vector2 } from './utils/utils';

const SLOW_UPDATE_MS = 300;

export class Pacman {
  private _app: Application;

  private _model: IModel;
  private _view?: IView;
  private _controller: IController;

  private _slowDelta = 0;

  static WIDTH = 1920/2;
  static HEIGHT = 1080/2;

  constructor() {
    this._app = new Application();
    this._model = new PacmanModel();
    this._controller = new DesktopController({onMove: this.OnMove, onClick: this.OnClick});
    this.Init();
  }

  private OnMove = (direction: Vector2) => {
    this._model.OnMove(direction);
  }

  private OnClick = (x: number, y: number) => {
    this._model.player.x = x;
    this._model.player.y = y;
    this._model.aiManager.MakePath();
    console.log("On click collides with walls", this._model.level.walls.some(w => w.IsCollidingPoint([x,y])))
  }

  private async Init() {
    const [background, bunny] = await ResourceManager.LoadResources();
    this._view = new PixiView(this._app, this._model, {background, bunny});
    await this._view.Init();
    this._view.InitBunny(this._model.player);
    this._model.enemies.map(enemy => this._view?.InitBunny(enemy));
    this.SlowUpdateLoop();
    this._app.ticker.add(this.UpdateRenderLoop);
  }

  private SlowUpdateLoop = () => {
    const deltaTimeS = (performance.now() - this._slowDelta) / 1000;
    this._model.SlowUpdate(deltaTimeS);
    this._slowDelta = performance.now();
    setTimeout(this.SlowUpdateLoop, SLOW_UPDATE_MS);
  }

  private UpdateRenderLoop = (ticker: Ticker) => {
    this._model.Update(ticker.deltaTime); // for logic, servers
    this._view?.Render(ticker.deltaTime); // for view, that player can see
  }

  static GenerateId() { return generateUID()}
}
