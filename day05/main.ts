import getFile from "../utils/getFile.js";

const input = getFile() || "";

const parts = input.split("\n\n");

const inputRanges = parts[0].split("\n").map(r => r.split("-").map(b => parseInt(b)));
const inputIngredients = parts[1].split("\n").map(n => parseInt(n));

inputRanges.sort((a, b) => {
    if (a[0] == b[0]) {
        return a[1] - b[1];
    }

    return a[0] - b[0];
})

function part1(sortedRanges: number[][], ingredients: number[]) {
    let result = 0;
    for (const ingredient of ingredients) {

        for (const range of sortedRanges) {
            if (ingredient >= range[0] && ingredient <= range[1]) {
                result++;
                break;
            }

            if (ingredient < range[0]) {
                break;
            }
        }
    }

    return result;
}

function part2(sortedRanges: number[][]) {
    let result = 0;

    const mergedRanges: number[][] = [sortedRanges[0]];
    let currentIndex = 0;

    for (let i = 1; i < sortedRanges.length; i++) {
        const previousRange = mergedRanges[currentIndex];
        const currentRange = sortedRanges[i];

        if (currentRange[0] <= previousRange[1] && currentRange[1] >= previousRange[1]) {
            previousRange[1] = currentRange[1];
        } else if (currentRange[0] > previousRange[1]) {
            mergedRanges.push([...currentRange]);
            currentIndex++;
        }
    }


    for (const range of mergedRanges) {
        result += range[1] - range[0] + 1;
    }

    return result;
}

console.time();

// console.log(part1(inputRanges, inputIngredients));
console.log(part2(inputRanges));

console.timeEnd();
