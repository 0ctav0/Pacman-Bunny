import { Application, Sprite, Texture } from 'pixi.js';
import { IView } from './IView';

type TexturesObj = {
  background: Texture,
  bunny: Texture,
}

export class PixiView implements IView {
  private _app: Application;
  private _textures: TexturesObj

  constructor(app: Application, tex: TexturesObj) {
    this._app = app;
    this._textures = tex;
    this.Init();
  }

  private async Init() {
    await this._app.init({ background: 'black', resizeTo: window, });
    document.body.appendChild(this._app.canvas);
    await this.LoadLevel();
  }

  private async LoadLevel() {
    const background = new Sprite(this._textures.background);
    background.zIndex = -10;
    this._app.stage.addChild(background);
  }

  Render(deltaTime: number) { }
}
