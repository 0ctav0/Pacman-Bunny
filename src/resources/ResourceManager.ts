import { Assets } from "pixi.js";

export class ResourceManager {
    static LoadResources = () => Promise.all([
        Assets.load('/space2.webp'),
        Assets.load('/bunny.png'),
    ])
}
