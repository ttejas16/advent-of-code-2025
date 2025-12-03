import getFile from "../utils/getFile.js";
const input = getFile() || "";
const lines = input.split("\n");
function part1(banks) {
    let result = 0;
    for (const bank of banks) {
        let left = 0, right = 1;
        let maxJoltage = 0;
        while (right < bank.length) {
            const leftChar = bank.charAt(left);
            const rightChar = bank.charAt(right);
            const joltage = parseInt(leftChar.concat(rightChar));
            if (joltage > maxJoltage) {
                maxJoltage = joltage;
            }
            if (parseInt(rightChar) > parseInt(leftChar)) {
                left = right;
            }
            right++;
        }
        result += maxJoltage;
    }
    return result;
}
function part2(banks) {
    let result = 0;
    for (const bank of banks) {
        let digitString = "";
        let startIndex = 0;
        while (digitString.length < 12 && startIndex < bank.length) {
            const slice = bank.slice(startIndex, bank.length - 11 + digitString.length);
            const maxNum = Math.max(...slice.split("").map(n => parseInt(n)));
            const maxNumFirstIndex = slice.indexOf(maxNum + "") + startIndex;
            digitString = digitString.concat(maxNum + "");
            startIndex = maxNumFirstIndex + 1;
        }
        result += parseInt(digitString);
    }
    return result;
}
console.time();
console.log(part2(lines));
console.timeEnd();
