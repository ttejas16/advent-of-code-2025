import getFile from "../utils/getFile.js";
const input = getFile() || "";
const stringIds = input.split(",");
const numIds = stringIds.map(s => s.split("-").map(n => parseInt(n)));
function part1(ids) {
    let result = 0;
    for (const [lb, ub] of ids) {
        for (let i = lb; i <= ub; i++) {
            const numString = String(i);
            if ((numString.length % 2) != 0) {
                continue;
            }
            const left = numString.slice(0, Math.trunc(numString.length / 2));
            const right = numString.slice(Math.trunc(numString.length / 2));
            if (left == right) {
                result += i;
            }
        }
    }
    return result;
}
function generatePairs(numString, pairLength) {
    const result = [];
    for (let i = 0; i < numString.length; i += pairLength) {
        result.push(numString.slice(i, i + pairLength));
    }
    return result;
}
function isPrime(num) {
    for (let i = 2; i <= Math.trunc(num / 2); i++) {
        if ((num % i) == 0)
            return false;
    }
    return true;
}
function part2(ids) {
    let result = 0;
    for (const [lb, ub] of ids) {
        for (let i = lb; i <= ub; i++) {
            const numString = String(i);
            if (numString.length == 1)
                continue;
            if (isPrime(numString.length)) {
                if (new Set(numString.split("")).size == 1) {
                    result += i;
                }
            }
            else {
                for (let pairSize = 1; pairSize <= Math.trunc(numString.length / 2); pairSize++) {
                    const pairs = generatePairs(numString, pairSize);
                    if (new Set(pairs).size == 1) {
                        result += i;
                        break;
                    }
                }
            }
        }
    }
    return result;
}
console.time();
console.log(part2(numIds));
console.timeEnd();
