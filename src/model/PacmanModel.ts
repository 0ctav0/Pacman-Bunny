import { BoundsF, V2, Vector2 } from '../utils/utils';
import { Entity } from './Entity';
import { IBounds } from './IBounds';
import { IEntity } from './IEntity';
import { ILevel } from './ILevel';
import { IModel } from './IModel';
import { Level } from './Level';

export const BUNNY_WIDTH = 26;
export const BUNNY_HEIGHT = 37;
export const PLAYER_SPEED = 3;

export class PacmanModel implements IModel {
  private _player: IEntity;
  private _level: ILevel;
  
  private _playerLastPosition: Vector2 = [0,0];
  private _currentDirection: Vector2 = [0,0];
  private _desiredDirection: Vector2 = [0,0];

  get player()    {return this._player}
  get level()     {return this._level}

  constructor() {
    this._player = new Entity(20, 20, BUNNY_WIDTH, BUNNY_HEIGHT);
    this._level = new Level;
  }

  StartGame() {}

  /**
   * 
   * @param deltaTime It is need to run independently on computers with different CPU speed, frequency
   */
  Update(deltaTime: number) {
    this.CheckIfPlayerCanChangeDirection(deltaTime);
    this.player.x += PLAYER_SPEED * this._currentDirection[0] * deltaTime;
    this.player.y += PLAYER_SPEED * this._currentDirection[1] * deltaTime;
    this.CheckPlayerCollidesWalls();
    this._playerLastPosition = [this.player.x, this.player.y];
  }

  OnMove(direction: Vector2) {
    this._desiredDirection = direction;
  }

  private CheckPlayerCollidesWalls() {
    const collider = this.level.walls.find(wall => (this.player.IsColliding(wall.bounds)));
    if (collider) {
      // snap to the wall
      this.SnapToCollider(collider);
    }
  }

  private SnapToCollider(collider: IBounds) {
    const [dirX, dirY] = this._currentDirection;
    if (dirY === -1) {
      this.player.x = this._playerLastPosition[0];
      this.player.y = collider.y + collider.height;
    } else if (dirY === 1) {
      this.player.x = this._playerLastPosition[0];
      this.player.y = collider.y - BUNNY_HEIGHT;
    } else if (dirX === -1) {
      this.player.x = collider.x + collider.width;
      this.player.y = this._playerLastPosition[1];
    } else if (dirX === 1) {
      this.player.x = collider.x - BUNNY_WIDTH;
      this.player.y = this._playerLastPosition[1];
    }
  }

  private CheckIfPlayerCanChangeDirection(deltaTime: number) {
    const direction = V2.Mult(this._desiredDirection, PLAYER_SPEED * deltaTime);
    const collides = this.level.walls.some(wall => wall.IsColliding(BoundsF.Add(this.player.bounds, direction)));
    if (!collides) { // if there's no wall, we can change direction immediately
      this._currentDirection = this._desiredDirection;
    }
  }
}
