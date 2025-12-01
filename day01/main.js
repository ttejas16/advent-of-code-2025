import getFile from "../utils/getFile.js";
const input = getFile() || "";
const entries = input.split("\n");
function part1(arr) {
    let pos = 50;
    let result = 0;
    for (const entry of arr) {
        const clicks = parseInt(entry.slice(1)) % 100;
        if (entry[0] == "R") {
            pos = (pos + clicks) % 100;
        }
        else {
            if (pos - clicks < 0) {
                pos = 100 - Math.abs(pos - clicks);
            }
            else {
                pos = pos - clicks;
            }
        }
        if (pos == 0)
            result++;
    }
    return result;
}
function part2(arr) {
    let pos = 50;
    let result = 0;
    for (const entry of arr) {
        let clicks = parseInt(entry.slice(1));
        result += (Math.trunc(clicks / 100));
        clicks = clicks % 100;
        if (entry[0] == "R") {
            if (pos != 0 && (pos + clicks) > 100) {
                result++;
            }
            pos = (pos + clicks) % 100;
        }
        else {
            if (pos != 0 && (pos - clicks) < 0) {
                result++;
            }
            if (pos - clicks < 0) {
                pos = 100 - Math.abs(pos - clicks);
            }
            else {
                pos = pos - clicks;
            }
        }
        if (pos == 0)
            result++;
    }
    return result;
}
console.log(part1(entries));
console.log(part2(entries));
