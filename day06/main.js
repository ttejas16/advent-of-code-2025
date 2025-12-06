import getFile from "../utils/getFile.js";
const input = getFile() || "";
const lines = input.split("\n");
const parsedOperands = lines.slice(0, lines.length - 1).map(line => line.split(" ").filter(n => n.length > 0).map(s => parseInt(s)));
const parsedOperators = lines[lines.length - 1].split(" ").filter(n => n.length > 0);
function part1(operands, operators) {
    let colIndex = 0;
    let result = 0;
    while (colIndex < operators.length) {
        const operator = operators[colIndex];
        let currentResult = operator == '+' ? 0 : 1;
        for (let i = 0; i < operands.length; i++) {
            if (operator == '+') {
                currentResult = currentResult + operands[i][colIndex];
            }
            else {
                currentResult = currentResult * operands[i][colIndex];
            }
        }
        colIndex++;
        result += currentResult;
    }
    return result;
}
console.time();
console.log(part1(parsedOperands, parsedOperators));
console.timeEnd();
