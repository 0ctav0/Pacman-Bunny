import { V2 } from "../utils/utils";
import { IAIManager } from "./IAIManager";
import { IEntity } from "./IEntity";
import { IModel } from "./IModel";

const DESICION_DELAY_MS = 1000;
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

    constructor(model: IModel) {
        this._model = model;
        this.InitAIControls();
        this.AIDesicionMaker();
    }

    private InitAIControls() {
        this._model.enemies.map(enemy => {
            // this._aiControls[enemy.id] = {entity: enemy, state: AIState.WANDERING}
            this._aiControls.push({entity: enemy, state: AIState.WANDERING});
        })
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

    private AIDesicionMaker() {
        this.MoveEnemyToPlayer();
        setTimeout(this.AIDesicionMaker, DESICION_DELAY_MS);
    }

    private MoveEnemyToPlayer() {
        // all enemies chase the player
        // Object.entries(this._aiControls).map(([, ai]) => {
        //     ai.state = AIState.CHASING
        // })
        this._aiControls.forEach(ai => ai.state = AIState.CHASING);
    }
}