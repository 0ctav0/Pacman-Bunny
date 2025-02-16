import { Vector2 } from '../utils/utils';
import { Entity } from './Entity';
import { IEntity } from './IEntity';
import { IModel } from './IModel';

const BUNNY_WIDTH = 26;
const BUNNY_HEIGHT = 37;
const PLAYER_SPEED = 3;

export class PacmanModel implements IModel {
  private _player: IEntity;
  private _direction: Vector2 = [0,0];

  get player()   {return this._player}

  constructor() {
    this._player = new Entity(100, 100, BUNNY_WIDTH, BUNNY_HEIGHT);
  }

  StartGame() {}

  /**
   * 
   * @param deltaTime It is need to run independently on computers with different CPU speed, frequency
   */
  Update(deltaTime: number) {
    this.player.x += PLAYER_SPEED * this._direction[0] * deltaTime;
    this.player.y += PLAYER_SPEED * this._direction[1] * deltaTime;
  }

  OnMove(direction: Vector2) {
    this._direction = direction;
  }
}
