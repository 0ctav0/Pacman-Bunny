import { IController } from './IController';

const PLAYER_CONTROL_UP = "ArrowUp";
const PLAYER_CONTROL_RIGHT = "ArrowRight";
const PLAYER_CONTROL_DOWN = "ArrowDown";
const PLAYER_CONTROL_LEFT = "ArrowLeft";

export class DesktopController implements IController {
    private _onMove?: (x:number,y:number) => void;
    private _onClick?: (x:number,y:number) => void;

    constructor({onMove, onClick}:{onMove?: DesktopController["_onMove"], onClick?: DesktopController["_onClick"]}) {
        this._onMove = onMove;
        this._onClick = onClick;
        this.Init();
    }

    private Init(){
        addEventListener("keydown", (e) => {
            switch (e.key) {
                case PLAYER_CONTROL_UP:
                    this._onMove?.(0, -1);
                    break;
                case PLAYER_CONTROL_RIGHT:
                    this._onMove?.(1, 0);
                    break;
                case PLAYER_CONTROL_DOWN:
                    this._onMove?.(0, 1);
                    break;
                case PLAYER_CONTROL_LEFT:
                    this._onMove?.(-1, 0);
                    break;
            }
        });
        addEventListener("pointerdown", (e) => this._onClick?.(e.x, e.y));
    }
}
