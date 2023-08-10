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
  const MAX_DIGITS = 15;

  const [currentNumber, setCurrentNumber] = useState("0");
  const [previousResult, setPreviousResult] = useState<string | undefined>(
    undefined
  );
  const [previousNumber, setPreviousNumber] = useState<string | undefined>(
    undefined
  );
  const [currentOperation, setCurrentOperation] = useState<
    MathematicalOperation | undefined
  >(undefined);
  const [lastInput, setLastInput] = useState<CalculatorInput>("0");

  const handleNumberInput = (value: NumberInput) => {
    if (currentNumber.length >= MAX_DIGITS) {
      return;
    }

    if (lastInput === CalculatorOperation.Calculate) {
      setPreviousResult(undefined);
      setPreviousNumber(undefined);
      setCurrentOperation(undefined);

      setCurrentNumber(calculateUpdatedInput("0", value));
    } else if (isMathematicalOperation(lastInput)) {
      if (previousNumber !== undefined) {
        setPreviousResult(currentNumber);
        setPreviousNumber(undefined);
        setCurrentOperation(undefined);
      }

      setCurrentNumber(calculateUpdatedInput("0", value));
    } else {
      setCurrentNumber(calculateUpdatedInput(currentNumber, value));
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
      if (currentNumber.length === 1) {
        setCurrentNumber("0");
      } else {
        setCurrentNumber(currentNumber.slice(0, -1));
      }
      setLastInput(CalculatorOperation.Delete);
    }
  };

  const reset = () => {
    setCurrentNumber("0");
    setPreviousNumber(undefined);
    setPreviousResult(undefined);
    setCurrentOperation(undefined);
    setLastInput(CalculatorOperation.Reset);
  };

  const handleCalculateOperation = () => {
    setLastInput(CalculatorOperation.Calculate);
    if (currentOperation === undefined || previousResult === undefined) {
      setPreviousNumber(currentNumber);
      return;
    }

    const newValue =
      previousNumber !== undefined
        ? calculateResult(currentNumber, currentOperation, previousNumber)
        : calculateResult(previousResult, currentOperation, currentNumber);

    if (previousNumber === undefined) {
      setPreviousNumber(currentNumber);
    } else {
      setPreviousResult(currentNumber);
    }
    setCurrentNumber(newValue);
  };

  const handleMathematicalOperation = (operation: MathematicalOperation) => {
    if (
      isMathematicalOperation(lastInput) ||
      lastInput === CalculatorOperation.Calculate ||
      currentOperation === undefined
    ) {
      setPreviousResult(currentNumber);
      setPreviousNumber(undefined);
    } else {
      const newValue = calculateResult(
        previousResult ?? "0",
        currentOperation,
        currentNumber
      );

      setPreviousResult(newValue);
      setCurrentNumber(newValue);
    }
    setCurrentOperation(operation);
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

  const calculation: Calculation = {
    leftOperand: previousResult,
    operator: currentOperation,
    rightOperand: previousNumber,
  };

  return (
    <div className="Calculator">
      <Display
        currentOutput={currentNumber}
        calculation={calculation}
        lastInput={lastInput}
      />
      <Keypad inputCallback={handleInput} />
    </div>
  );
};

export default Calculator;
