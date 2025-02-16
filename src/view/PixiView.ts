import { Application } from 'pixi.js';
import { IView } from './IView';

export class PixiView implements IView {
  private _app: Application;
  constructor(app: Application) {
    this._app = app;
    this.Init();
  }
  private async Init() {
    await this._app.init({ background: 'black', resizeTo: window, });
    document.body.appendChild(this._app.canvas);
  }
  Render(deltaTime: number) { }
}
