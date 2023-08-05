import React, { useState } from "react";

import "./calculator.scss";
import Display from "components/Display";
import Keypad from "components/Keypad";
import {
  CalculatorOperation,
  MathematicalOperation,
  CalculatorInput,
  NumberInput,
  isNumberInput,
  isMathematicalOperation,
  isCalculatorOperation,
} from "domain/types";

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
  const [lastInput, setLastInput] = useState<CalculatorInput | undefined>(
    undefined
  );

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
    setLastInput(undefined);
  };

  const calculateValue = (
    number1: string,
    operation: MathematicalOperation,
    number2: string
  ): number => {
    const value1 = parseFloat(number1);
    const value2 = parseFloat(number2);
    switch (operation) {
      case MathematicalOperation.Add:
        return value1 + value2;
      case MathematicalOperation.Subtract:
        return value1 - value2;
      case MathematicalOperation.Multiply:
        return value1 * value2;
      case MathematicalOperation.Divide:
        return value1 / value2;
    }
  };

  const handleCalculateOperation = () => {
    if (currentOperation === undefined || previousResult === undefined) {
      setPreviousNumber(currentNumber);
      return;
    }

    const newValue =
      previousNumber !== undefined
        ? calculateValue(currentNumber, currentOperation, previousNumber)
        : calculateValue(previousResult, currentOperation, currentNumber);

    if (previousNumber === undefined) {
      setPreviousNumber(currentNumber);
    } else {
      setPreviousResult(currentNumber);
    }
    setCurrentNumber(newValue.toString());
    setLastInput(CalculatorOperation.Calculate);
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
      const newValue = calculateValue(
        previousResult ?? "0",
        currentOperation,
        currentNumber
      );

      setPreviousResult(newValue.toString());
      setCurrentNumber(newValue.toString());
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
    if (isNumberInput(input)) {
      handleNumberInput(input);
    } else if (isMathematicalOperation(input)) {
      handleMathematicalOperation(input);
    } else if (isCalculatorOperation(input)) {
      handleCalculatorOperation(input);
    } else {
      throw Error("Invalid input");
    }
  };

  return (
    <div className="Calculator">
      <Display
        currentInput={currentNumber}
        previousResult={previousResult}
        previousInput={previousNumber}
        operation={currentOperation}
      />
      <Keypad inputCallback={handleInput} />
    </div>
  );
};

export default Calculator;
