import { Grid, Node, aStar, createNode } from "../utils/path-finding";
import { Vector2 } from "../utils/Vector2";
import { IAIManager } from "./IAIManager";
import { Tile } from "./ICell";
import { IEntity } from "./IEntity";
import { IModel } from "./IModel";
import { WALL_THICKNESS } from "./Level";

const DECISION_DELAY_MS = 1000;
const CHASING_SPEED = 3;
const WANDERING_SPEED = 2;
const DISTANCE_STEP = WALL_THICKNESS / 2;

enum AIState { WANDERING, CHASING }

type AIConrol = {
    entity: IEntity,
    state: AIState,
    path: Node[] | null,
    currentIndexInPath: number,
}

export class AIManager implements IAIManager {
    private _model: IModel;
    private _aiControls: AIConrol[] = [];
    private _grid: Grid;

    constructor(model: IModel) {
        this._model = model;
        this._grid = this._model.level.cells.map(col => col.map(cell => cell.tile === Tile.AI_PASS ? 0 : 1));
        this.InitAIControls();
        this.AIDesicionMaker();
    }

    private InitAIControls() {
        this._aiControls = this._model.enemies.map(enemy =>
            ({ entity: enemy, state: AIState.CHASING, path: null, currentIndexInPath: 0 })
        )
    }

    Update(deltaTime: number) {
        this._aiControls.forEach(ai => {
            if (ai.state === AIState.CHASING) {
                this.MoveToPlayer(deltaTime, ai);
            }
        });
    }

    private MoveToPlayer(deltaTime: number, ai: AIConrol) {
        if (!ai.path) return;
        if (ai.currentIndexInPath >= ai.path?.length - 1) return;
        const target = ai.path[ai.currentIndexInPath];
        const targetPos = new Vector2(target.x * WALL_THICKNESS, target.y * WALL_THICKNESS)
        const { x: dx, y: dy } = targetPos.Sub(ai.entity.position);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const moveDistance = deltaTime * CHASING_SPEED;
        if (moveDistance >= distance) {
            ai.entity.position = targetPos.Clone();
            ai.currentIndexInPath++;
        } else {
            const ratio = moveDistance / distance;
            ai.entity.position.x += dx * ratio;
            ai.entity.position.y += dy * ratio;
        }
    }

    MakePath() {
        this._aiControls.forEach(ai => {
            this._model.level.cells.forEach(col => col.map(cell => cell.pass = Tile.EMPTY))
            const start = createNode(Math.floor(ai.entity.x / WALL_THICKNESS), Math.floor(ai.entity.y / WALL_THICKNESS));
            const end = createNode(Math.floor(this._model.player.center.x / WALL_THICKNESS), Math.floor(this._model.player.center.y / WALL_THICKNESS));
            const path = aStar(start, end, this._grid);
            path?.forEach(node => this._model.level.At(node.x, node.y).pass = Tile.AI_PASS)
            ai.path = path;
            ai.currentIndexInPath = 0;
        })
    }

    private AIDesicionMaker = () => {
        this.MakePath();
        setTimeout(this.AIDesicionMaker, DECISION_DELAY_MS);
    }
}