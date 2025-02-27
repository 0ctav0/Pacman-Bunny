import { describe, it } from "node:test";
import assert from "node:assert";
import { Grid, Node, aStar } from "../src/utils/path-finding";

describe("Path finding", () => {
    it("Path finding should work fine", () => {
        const grid: Grid = [
            [1,1,1,1,1,1,1],
            [1,0,0,0,0,0,1],
            [1,0,1,1,1,1,1],
            [1,0,0,0,0,0,1],
            [1,1,1,1,1,0,1],
            [1,0,0,0,0,0,1],
            [1,1,1,1,1,1,1],
        ];
        const start: Node = {x: 5, y: 1, g: 0, h: 0, f: 0, parent: null};
        const end: Node = {x: 5, y: 5, g: 0, h: 0, f: 0, parent: null};
        const path = aStar(start, end, grid);
        // console.log(path);
        assert.notEqual(path, null);
        assert(path);
        assert.equal(path[0].x, 4);
        assert.equal(path[0].y, 1);
        assert.equal(path[1].x, 3);
        assert.equal(path[1].y, 1);
        assert.equal(path[2].x, 2);
        assert.equal(path[2].y, 1);
        assert.equal(path[3].x, 1);
        assert.equal(path[3].y, 1);
        assert.equal(path[11].x, 5);
        assert.equal(path[11].y, 5);

    })
});