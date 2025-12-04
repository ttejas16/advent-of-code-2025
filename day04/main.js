import getFile from "../utils/getFile.js";
const input = getFile() || "";
const inputGrid = input.split("\n").map(line => line.split(""));
function getChildren(i, j, grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];
    const result = [];
    for (const [dr, dc] of directions) {
        const r = i + dr;
        const c = j + dc;
        if (r > -1 && r < rows && c > -1 && c < cols) {
            result.push(grid[r][c]);
        }
    }
    return result;
}
function part1(grid) {
    let result = 0;
    const rows = grid.length;
    const cols = grid[0].length;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] == '.')
                continue;
            const children = getChildren(i, j, grid);
            // console.log(i,j, children);
            const paperChildrenCount = children.reduce((acc, c) => {
                return acc + (c == '@' ? 1 : 0);
            }, 0);
            if (paperChildrenCount < 4) {
                result++;
                // console.log(i,j);
            }
        }
    }
    return result;
}
function part2(grid) {
    let result = [];
    const rows = grid.length;
    const cols = grid[0].length;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] == '.')
                continue;
            const children = getChildren(i, j, grid);
            // console.log(i,j, children);
            const paperChildrenCount = children.reduce((acc, c) => {
                return acc + (c == '@' ? 1 : 0);
            }, 0);
            if (paperChildrenCount < 4) {
                result.push([i, j]);
                // console.log(i,j);
            }
        }
    }
    return result;
}
// console.log(part1(inputGrid));
console.time();
let result = 0;
while (true) {
    const placesToRemove = part2(inputGrid);
    if (placesToRemove.length == 0)
        break;
    result += placesToRemove.length;
    for (const [i, j] of placesToRemove) {
        inputGrid[i][j] = '.';
    }
}
console.timeEnd();
console.log(result);
