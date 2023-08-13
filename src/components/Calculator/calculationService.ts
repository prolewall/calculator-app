import Big from "big.js";

import { Calculation, MathematicalOperation } from "domain/types";

function calculate(
  leftOperand: Big,
  operator: MathematicalOperation,
  rightOperand: Big
): Big {
  switch (operator) {
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
  leftOperand: Big,
  operator: MathematicalOperation,
  rightOperand: Big
): Calculation {
  const result = calculate(leftOperand, operator, rightOperand);
  return { leftOperand, operator, rightOperand, result };
}
