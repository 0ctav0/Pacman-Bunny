import { Grid, Node, aStar, createNode } from "../utils/path-finding";
import { V2 } from "../utils/utils";
import { IAIManager } from "./IAIManager";
import { Tile } from "./ICell";
import { IEntity } from "./IEntity";
import { IModel } from "./IModel";
import { WALL_THICKNESS } from "./Level";

const DECISION_DELAY_MS = 1000;
const CHASING_SPEED = 1;
const WANDERING_SPEED = 2;

enum AIState { WANDERING, CHASING }

type AIConrol = {
    entity: IEntity,
    state: AIState,
}

export class AIManager implements IAIManager {
    private _model: IModel;
    // private _aiControls: Record<string,AIConrol> = {};
    private _aiControls: AIConrol[] = [];
    private _grid: Grid;

    constructor(model: IModel) {
        this._model = model;
        this._grid = this._model.level.cells.map(col => col.map(cell => cell.tile === Tile.AI_PASS ? 0 : 1));
        console.log(this._grid)
        this.InitAIControls();
        this.AIDesicionMaker();
    }

    private InitAIControls() {
        this._aiControls = this._model.enemies.map(enemy => 
            // this._aiControls[enemy.id] = {entity: enemy, state: AIState.WANDERING}
            ({entity: enemy, state: AIState.WANDERING})
        )
    }

    Update(deltaTime: number) {
        this._aiControls.forEach(ai => {
            if (ai.state === AIState.CHASING) {
                this.ForwardMoving(deltaTime, ai);
            }
        });
    }

    private ForwardMoving(deltaTime: number, ai: AIConrol) {
        const direction = V2.Normalize(V2.Sub(this._model.player.position,ai.entity.position))
        ai.entity.x += CHASING_SPEED * deltaTime * direction[0];
        ai.entity.y += CHASING_SPEED * deltaTime * direction[1]; 
    }

    MakePath() {
        this._aiControls.forEach(ai => {
            this._model.level.cells.forEach(col => col.map(cell => cell.pass = Tile.EMPTY))
            const start = createNode(Math.floor(ai.entity.x/WALL_THICKNESS), Math.floor(ai.entity.y/WALL_THICKNESS));
            const end = createNode(Math.floor(this._model.player.center[0]/WALL_THICKNESS), Math.floor(this._model.player.center[1]/WALL_THICKNESS));
            const path = aStar(start, end, this._grid);
            console.log(`GRID`, this._grid);
            console.log(path)
            path?.forEach(node => this._model.level.At(node.x,node.y).pass = Tile.AI_PASS)
            console.log(this._model.level.cells.map(col=>col.map(c=>c.pass)))
        })
    }

    private AIDesicionMaker = () => {
        // this.MoveEnemyToPlayer();
        console.log(this._aiControls)
        this.MakePath();
        // aStar()
        setTimeout(this.AIDesicionMaker, DECISION_DELAY_MS);
    }

    private MoveEnemyToPlayer() {
        // all enemies chase the player
        // Object.entries(this._aiControls).map(([, ai]) => {
        //     ai.state = AIState.CHASING
        // })
        this._aiControls.forEach(ai => ai.state = AIState.CHASING);
    }
}