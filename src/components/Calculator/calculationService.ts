import Big from "big.js";

import { MathematicalOperation } from "domain/types";

function calculate(
  leftOperand: Big,
  operation: MathematicalOperation,
  rightOperand: Big
): Big {
  switch (operation) {
    case MathematicalOperation.Add:
      return leftOperand.plus(rightOperand);
    case MathematicalOperation.Subtract:
      return leftOperand.minus(rightOperand);
    case MathematicalOperation.Multiply:
      return leftOperand.times(rightOperand);
    case MathematicalOperation.Divide:
      if (rightOperand.eq(0)) {
        throw Error("Can't divide by 0");
      }
      return leftOperand.div(rightOperand);
  }
}

export function calculateResult(
  number1: string,
  operation: MathematicalOperation,
  number2: string
): string {
  const leftOperand = Big(number1);
  const rightOperand = Big(number2);
  return parseFloat(
    calculate(leftOperand, operation, rightOperand).toFixed(15)
  ).toString();
}
