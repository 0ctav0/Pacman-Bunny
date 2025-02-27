export type Node = {
    x: number,
    y: number,
    g: number,
    h: number,
    f: number,
    parent: Node|null,
};

export const createNode = (x: number, y: number): Node => ({x,y,g:0,h:0,f:0,parent:null})

export type Grid = number[][];

const heuristic = (a: Node, b: Node) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

const getNeighbors = (node: Node, grid: Grid): Node[] => {
    const neighbors: Node[] = [];
    const {x,y} = node;

    if (x > 0 && grid[y][x-1] === 0) { // check left
        neighbors.push({x: x - 1, y, g: 0, h: 0, f: 0, parent: null});
    }
    if (x < grid[0].length - 1 && grid[y][x+1] === 0) { // check right
        neighbors.push({x: x + 1, y, g: 0, h: 0, f: 0, parent: null});
    }
    if (y > 0 && grid[y-1][x] === 0) { // check top
        neighbors.push({x, y: y - 1, g: 0, h: 0, f: 0, parent: null});
    }
    if (y < grid.length - 1 && grid[y+1][x] === 0) { // check bottom
        neighbors.push({x, y: y + 1, g: 0, h: 0, f: 0, parent: null});
    }
    return neighbors;
};

export const aStar = (start: Node, end: Node, grid: Grid): Node[] | null => {
    const openList: Node[] = [];
    const closedList: Node[] = [];

    start.g = 0;
    start.h = heuristic(start, end);
    start.f = start.g + start.h;

    openList.push(start);

    while (openList.length > 0) {
        // find the shortest node
        let current = openList[0];
        let currentIndex = 0;
        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < current.f) {
                current = openList[i];
                currentIndex = i;
            }
        }

        // if current is target, return path
        if (current.x === end.x && current.y === end.y) {
            const path: Node[] = [];
            let temp = current;
            while (temp.parent) {
                path.push(temp);
                temp = temp.parent;
            }
            return path.reverse();
        }

        openList.splice(currentIndex, 1);
        closedList.push(current);
        const neighbors = getNeighbors(current, grid);

        for (const neighbor of neighbors) {
            if (closedList.some(node => node.x === neighbor.x && node.y === neighbor.y))
                continue;
            const gScore = current.g + 1;

            // if neighbor is not in openList or new path is shorter
            let neighborInOpenList = openList.find(node => node.x === neighbor.x && node.y === neighbor.y);
            if (!neighborInOpenList || gScore < neighbor.g) {
                neighbor.g = gScore;
                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = current;

                if (!neighborInOpenList) {
                    openList.push(neighbor);
                }
            }
        }
    }
    return null;
};