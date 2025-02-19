import { Pacman } from '../Pacman';
import { BoundsF, V2, Vector2, getRandomColor } from '../utils/utils';
import { Entity } from './Entity';
import { IBounds } from './IBounds';
import { IEntity } from './IEntity';
import { ILevel } from './ILevel';
import { IModel } from './IModel';
import { Level } from './Level';
import { BUNNY_HEIGHT, BUNNY_WIDTH } from './constants';


const PLAYER_SPEED = 3;
const ENEMY_NUMBER = 60;
const ENEMY_OFFSET_X = 200;
const ENEMY_OFFSET_Y = 100;
const ENEMY_GAP = 50;
const COLUMNS = 10;

export class PacmanModel implements IModel {
  private _player: IEntity;
  private _level: ILevel;
  private _enemies: IEntity[] = [];
  
  private _playerLastPosition: Vector2 = [0,0];
  private _currentDirection: Vector2 = [0,0];
  private _desiredDirection: Vector2 = [0,0];

  get player()    {return this._player}
  get level()     {return this._level}
  get enemies()   {return this._enemies}

  constructor() {
    this._player = new Entity(20, 20, BUNNY_WIDTH, BUNNY_HEIGHT);
    this._level = new Level;
    this.InitEnemies();
  }

  private InitEnemies() {
    for (let i = 0; i < ENEMY_NUMBER; i++) {
      const even = i % 2;
      let x, y
      

        x = ENEMY_OFFSET_X + (i % COLUMNS) * ENEMY_GAP;
        y = ENEMY_OFFSET_Y + Math.floor(i / COLUMNS) * ENEMY_GAP;
     
      const enemy = new Entity(x, y, BUNNY_WIDTH, BUNNY_HEIGHT);
      enemy.tint = getRandomColor().toNumber();
      this._enemies.push(enemy);
    }
  }

  StartGame() {}

  SlowUpdate(deltaTime: number) {
    this._enemies.map(enemy => {
      enemy.tint = getRandomColor().toNumber();
    })
  }

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
    this.CheckTeleport();
    this.UpdateEnemies(deltaTime);
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

  private CheckTeleport() {
    if (this.player.x < 0) {
      this.player.x = Pacman.WIDTH;
    } else if (this.player.x > Pacman.WIDTH) {
      this.player.x = 0;
    }
  }

  private UpdateEnemies(deltaTime: number) {
    this._enemies.map((enemy,i) => {
      const direction = Math.random() > .5 ? 1 : -1;
      const even = i % 2
      const random = Math.random() > .5
      // enemy.x += Math.random()*deltaTime*direction;
      // enemy.y += Math.random()*deltaTime*direction;
      if (random ) {
        
        // enemy.x += Math.cos(performance.now()/1000)*2*deltaTime
        // enemy.y += Math.sin(performance.now()/1000)*2*deltaTime
      }
      // enemy.rotation += deltaTime * 1 * even;
    })
  }
}
