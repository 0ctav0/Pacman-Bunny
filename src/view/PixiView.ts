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
  private _model: IModel;
  private _textures: TexturesObj;
  private _sprites: Record<number,Sprite> = {};

  constructor(app: Application, model: IModel, tex: TexturesObj) {
    this._app = app;
    this._model = model;
    this._textures = tex;
  }

  async Init() {
    await this._app.init({ background: 'black', resizeTo: window, });
    document.body.appendChild(this._app.canvas);
    await this.LoadLevel();
  }

  private async LoadLevel() {
    const background = new Sprite(this._textures.background);
    this._app.stage.addChild(background);
    this._model.level.walls.map(wall => {
      const sprite = new Sprite(Texture.WHITE);
      sprite.x = wall.x;
      sprite.y = wall.y;
      sprite.width = wall.width;
      sprite.height = wall.height;
      sprite.tint = wall.tint;
      this._app.stage.addChild(sprite);
    })
  }

  InitBunny(entity: IEntity) {
    const entitySprite = new Sprite(this._textures.bunny);
    this._app.stage.addChild(entitySprite);
    // entitySprite.anchor.set(0.5);
    entitySprite.x = entity.x;
    entitySprite.y = entity.y;
    entitySprite.tint = entity.tint;
    this._sprites[entity.id] = entitySprite;
}

  Render(deltaTime: number) { 
    const playerSprite = this._sprites[this._model.player.id];
    playerSprite.x = this._model.player.x;
    playerSprite.y = this._model.player.y;
    playerSprite.tint = this._model.player.tint;
    this._model.enemies.map(enemy => {
      const sprite = this._sprites[enemy.id];
      sprite.x = enemy.x;
      sprite.y = enemy.y;
      sprite.rotation = enemy.rotation;
      sprite.tint = enemy.tint;
    })
  }
}
