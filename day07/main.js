import getFile from "../utils/getFile.js";
const input = getFile() || "";
const inputGrid = input.split("\n");
const startPosition = [1, inputGrid[0].indexOf("S")];
function part1(grid, start) {
    let queue = [start];
    const activatedSplitters = new Set();
    const beamStarts = new Set();
    while (queue.length > 0) {
        const beamsToAdd = [];
        const indicesToRemove = new Set();
        for (let i = 0; i < queue.length; i++) {
            const beam = queue[i];
            if (beam[0] >= grid.length) {
                indicesToRemove.add(i);
                continue;
            }
            if (grid[beam[0]][beam[1]] == '.') {
                beam[0] += 1;
            }
            else if (grid[beam[0]][beam[1]] == '^') {
                activatedSplitters.add(`${beam[0]},${beam[1]}`);
                // generate new beams and remove current one
                if (!beamStarts.has(`${beam[0]},${beam[1] + 1}`)) {
                    beamStarts.add(`${beam[0]},${beam[1] + 1}`);
                    beamsToAdd.push([beam[0], beam[1] + 1]);
                }
                if (!beamStarts.has(`${beam[0]},${beam[1] - 1}`)) {
                    beamStarts.add(`${beam[0]},${beam[1] - 1}`);
                    beamsToAdd.push([beam[0], beam[1] - 1]);
                }
                indicesToRemove.add(i);
            }
        }
        queue = queue.filter((_, i) => !indicesToRemove.has(i));
        for (const b of beamsToAdd) {
            queue.push(b);
        }
    }
    return activatedSplitters.size;
}
function constructTree(grid) {
    const result = new Map();
    let rowIndex = 0;
    for (const row of grid) {
        if (row.replaceAll(/[.S]/g, "").length == 0) {
            rowIndex++;
            continue;
        }
        for (let i = 0; i < row.length; i++) {
            if (row.charAt(i) == '.')
                continue;
            let left = i - 1, right = i + 1;
            let rowC = rowIndex;
            const children = [];
            while (rowC < grid.length) {
                if (grid[rowC][left] == '^') {
                    children.push(`${rowC},${left}`);
                    break;
                }
                rowC++;
            }
            if (rowC == grid.length) {
                children.push("");
            }
            rowC = rowIndex;
            while (rowC < grid.length) {
                if (grid[rowC][right] == '^') {
                    children.push(`${rowC},${right}`);
                    break;
                }
                rowC++;
            }
            if (rowC == grid.length) {
                children.push("");
            }
            result.set(`${rowIndex},${i}`, children);
        }
        rowIndex++;
    }
    return result;
}
const seen = new Map();
function dfs(nodeString, tree) {
    if (seen.has(nodeString))
        return seen.get(nodeString);
    if (nodeString == "") {
        seen.set(nodeString, 1);
        return 1;
    }
    const childs = tree.get(nodeString);
    const left = dfs(childs[0], tree);
    const right = dfs(childs[1], tree);
    seen.set(nodeString, left + right);
    return left + right;
}
function part2(grid) {
    const tree = constructTree(grid);
    // console.log(tree);
    const rootPosition = [2, grid[2].indexOf("^")];
    const result = dfs(`${rootPosition[0]},${rootPosition[1]}`, tree);
    return result;
}
console.time();
// console.log(part1(inputGrid, startPosition));
console.log(part2(inputGrid));
console.timeEnd();
