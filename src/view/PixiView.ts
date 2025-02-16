import "./style.css";
import { Application, Sprite, Texture } from 'pixi.js';
import { IView } from './IView';
import { IEntity } from '../model/IEntity';
import { IModel } from "../model/IModel";

type TexturesObj = {
  background: Texture,
  bunny: Texture,
}

export class PixiView implements IView {
  private _app: Application;
  private _textures: TexturesObj;
  private _sprites: Record<number,Sprite> = {};

  constructor(app: Application, tex: TexturesObj) {
    this._app = app;
    this._textures = tex;
  }

  async Init() {
    await this._app.init({ background: 'black', resizeTo: window, });
    document.body.appendChild(this._app.canvas);
    await this.LoadLevel();
  }

  private async LoadLevel() {
    const background = new Sprite(this._textures.background);
    background.zIndex = -10;
    this._app.stage.addChild(background);
  }

  InitSprite(entity: IEntity) {
    const entitySprite = new Sprite(this._textures.bunny);
    this._app.stage.addChild(entitySprite);
    // entitySprite.anchor.set(0.5);
    entitySprite.x = entity.x;
    entitySprite.y = entity.y;
    entitySprite.tint = entity.tint;
    this._sprites[entity.id] = entitySprite;
}

  Render(deltaTime: number, model: IModel) { 
    const playerSprite = this._sprites[model.player.id];
    playerSprite.x = model.player.x;
    playerSprite.y = model.player.y;
    playerSprite.tint = model.player.tint;
  }
}
