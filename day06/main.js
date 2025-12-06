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
function part2(inputLines) {
    const operators = inputLines[inputLines.length - 1].split(" ").filter(n => n.length > 0);
    const calculationStrings = inputLines
        .slice(0, inputLines.length - 1)
        .map(s => s.concat(" ")); // add one traling space to end of each line
    let result = 0;
    let currentOperatorIndex = 0;
    let arr = [];
    for (let i = 0; i < calculationStrings[0].length; i++) {
        let columnarString = '';
        for (let j = 0; j < calculationStrings.length; j++) {
            columnarString = columnarString.concat(calculationStrings[j].charAt(i));
        }
        columnarString = columnarString.replaceAll(" ", "");
        if (columnarString.length == 0) {
            const currentOperator = operators[currentOperatorIndex];
            const currentResult = arr.reduce((acc, c) => {
                if (currentOperator == '+') {
                    return acc + c;
                }
                return acc * c;
            }, currentOperator == '+' ? 0 : 1);
            result += currentResult;
            arr = [];
            currentOperatorIndex++;
        }
        else {
            arr.push(parseInt(columnarString));
        }
    }
    return result;
}
console.time();
// console.log(part1(parsedOperands, parsedOperators));
console.log(part2(lines));
console.timeEnd();
