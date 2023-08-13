import Big from "big.js";
import React, { useState } from "react";

import Display from "components/Display";
import Keypad from "components/Keypad";

import {
  Calculation,
  CalculatorInput,
  CalculatorOperation,
  MathematicalOperation,
  NumberInput,
  isCalculatorOperation,
  isMathematicalOperation,
  isNumberInput,
} from "domain/types";

import { calculateResult } from "./calculationService";
import "./calculator.scss";

function calculateUpdatedInput(
  currentInput: string,
  newInputValue: NumberInput
): string {
  if (newInputValue === ".") {
    if (!currentInput.includes(".")) {
      return currentInput.concat(newInputValue);
    } else {
      return currentInput;
    }
  } else {
    if (currentInput === "0") {
      return newInputValue;
    } else {
      return currentInput.concat(newInputValue);
    }
  }
}

const Calculator: React.FC = () => {
  Big.NE = -15;
  Big.DP = 1e6;
  const MAX_DIGITS = 15;

  const [currentInput, setCurrentInput] = useState("0");
  const [calculation, setCalculation] = useState<Calculation>({});
  const [lastInput, setLastInput] = useState<CalculatorInput | Error>("0");

  const handleNumberInput = (value: NumberInput) => {
    if (lastInput === CalculatorOperation.Calculate) {
      setCalculation({});

      setCurrentInput(calculateUpdatedInput("0", value));
    } else if (isMathematicalOperation(lastInput)) {
      if (calculation.rightOperand !== undefined) {
        setCalculation({ leftOperand: Big(currentInput) });
      }

      setCurrentInput(calculateUpdatedInput("0", value));
    } else {
      if (currentInput.length < MAX_DIGITS) {
        setCurrentInput(calculateUpdatedInput(currentInput, value));
      }
    }

    setLastInput(value);
  };

  const deleteLastCharacter = () => {
    if (
      !(
        isMathematicalOperation(lastInput) ||
        lastInput === CalculatorOperation.Calculate
      )
    ) {
      if (currentInput.length === 1) {
        setCurrentInput("0");
      } else {
        setCurrentInput(currentInput.slice(0, -1));
      }
      setLastInput(CalculatorOperation.Delete);
    }
  };

  const reset = () => {
    setCurrentInput("0");
    setCalculation({});
    setLastInput(CalculatorOperation.Reset);
  };

  const handleCalculateOperation = () => {
    setLastInput(CalculatorOperation.Calculate);
    if (
      calculation.operator === undefined ||
      calculation.leftOperand === undefined
    ) {
      setCalculation({
        rightOperand: Big(currentInput),
        result: Big(currentInput),
      });
      return;
    }

    if (lastInput === CalculatorOperation.Calculate) {
      const resultCalculation = calculateResult(
        calculation.result ?? Big(0),
        calculation.operator,
        calculation.rightOperand ?? Big(0)
      );
      setCalculation(resultCalculation);
      setCurrentInput(resultCalculation.result?.toString() ?? "");
    } else {
      const resultCalculation = calculateResult(
        calculation.leftOperand ?? Big(0),
        calculation.operator,
        Big(currentInput)
      );
      setCalculation(resultCalculation);
      setCurrentInput(resultCalculation.result?.toString() ?? "");
    }
  };

  const handleMathematicalOperation = (operation: MathematicalOperation) => {
    if (
      isMathematicalOperation(lastInput) ||
      lastInput === CalculatorOperation.Calculate ||
      calculation.operator === undefined
    ) {
      setCalculation({
        leftOperand: Big(currentInput),
        operator: operation,
        result: Big(currentInput),
      });
    } else {
      const resultCalculation = calculateResult(
        calculation.leftOperand ?? Big(0),
        calculation.operator,
        Big(currentInput)
      );
      setCalculation({
        leftOperand: resultCalculation.result,
        operator: operation,
        result: resultCalculation.result,
      });
      setCurrentInput(resultCalculation.result?.toString() ?? "");
    }
    setLastInput(operation);
  };

  const handleCalculatorOperation = (operation: CalculatorOperation) => {
    switch (operation) {
      case CalculatorOperation.Delete:
        deleteLastCharacter();
        break;
      case CalculatorOperation.Reset:
        reset();
        break;
      case CalculatorOperation.Calculate:
        handleCalculateOperation();
        break;
    }
  };

  const handleInput = (input: CalculatorInput) => {
    try {
      if (isNumberInput(input)) {
        handleNumberInput(input);
      } else if (isMathematicalOperation(input)) {
        handleMathematicalOperation(input);
      } else if (isCalculatorOperation(input)) {
        handleCalculatorOperation(input);
      } else {
        throw Error("Invalid input");
      }
    } catch (error) {
      if (error instanceof Error) {
        setLastInput(error);
      } else {
        setLastInput(new Error("Something went wrong"));
      }
    }
  };

  return (
    <div className="Calculator">
      <Display
        currentInput={currentInput}
        calculation={calculation}
        lastInput={lastInput}
      />
      <Keypad inputCallback={handleInput} />
    </div>
  );
};

export default Calculator;
