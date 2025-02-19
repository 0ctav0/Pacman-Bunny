import { Vector2 } from '../utils/utils';
import { Entity } from './Entity';
import { IEntity } from './IEntity';
import { ILevel } from './ILevel';
import { IModel } from './IModel';
import { Level } from './Level';

const BUNNY_WIDTH = 26;
const BUNNY_HEIGHT = 37;
const PLAYER_SPEED = 3;

export class PacmanModel implements IModel {
  private _player: IEntity;
  private _direction: Vector2 = [0,0];
  private _level: ILevel;

  private _playerLastPosition: Vector2 = [0,0];

  get player()    {return this._player}
  get level()     {return this._level}

  constructor() {
    this._player = new Entity(100, 100, BUNNY_WIDTH, BUNNY_HEIGHT);
    this._level = new Level;
  }

  StartGame() {}

  /**
   * 
   * @param deltaTime It is need to run independently on computers with different CPU speed, frequency
   */
  Update(deltaTime: number) {
    this.player.x += PLAYER_SPEED * this._direction[0] * deltaTime;
    this.player.y += PLAYER_SPEED * this._direction[1] * deltaTime;
    this.CheckPlayerCollidesWalls();
    this._playerLastPosition = [this.player.x, this.player.y];
  }

  OnMove(direction: Vector2) {
    this._direction = direction;
  }

  private CheckPlayerCollidesWalls() {
    if (this.level.walls.some(wall => this.player.IsColliding(wall))) {
      this.player.x = this._playerLastPosition[0];
      this.player.y = this._playerLastPosition[1];
    }
  }
}
