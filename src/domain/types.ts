export enum MathematicalOperation {
  Add = "+",
  Subtract = "-",
  Multiply = "x",
  Divide = "/",
}

export const isMathematicalOperation = (
  value: any
): value is MathematicalOperation =>
  Object.values(MathematicalOperation).includes(value);

export enum CalculatorOperation {
  Delete = "DEL",
  Reset = "RESET",
  Calculate = "=",
}

export const isCalculatorOperation = (
  value: any
): value is CalculatorOperation =>
  Object.values(CalculatorOperation).includes(value);

const numberInputs = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  ".",
] as const;
export type NumberInput = (typeof numberInputs)[number];
export const isNumberInput = (value: any): value is NumberInput =>
  numberInputs.includes(value);

export type CalculatorInput =
  | MathematicalOperation
  | CalculatorOperation
  | NumberInput
  | Error;

export interface Calculation {
  leftOperand?: string;
  operator?: MathematicalOperation;
  rightOperand?: string;
}
