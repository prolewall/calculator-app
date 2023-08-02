import React, { useState } from 'react';

import './calculator.scss';
import Display from 'components/Display';
import Keypad from 'components/Keypad';
import { CalculatorOperation, MathematicalOperation } from 'constants/operationConstants';



const Calculator: React.FC = () => {
  const MAX_DIGITS = 15;

  const [currentInput, setCurrentInput] = useState("0");
  const [previousResult, setPreviousResult] = useState<string | undefined>(undefined);
  const [previousInput, setPreviousInput] = useState<string | undefined>(undefined);
  const [currentOperation, setCurrentOperation] = useState<MathematicalOperation | undefined>(undefined);
  const [justCalculated, setJustCalculated] = useState(false);

  const inputNumber = (value: string) => {
    if (currentInput.length >= MAX_DIGITS) {
      return;
    }
    if (justCalculated) {
      if (previousInput !== undefined) {
        setPreviousResult(currentInput);
        setPreviousInput(undefined);
        setCurrentOperation(undefined);
      }

      if (value === ".") {
        setCurrentInput("0.");
      } else {
        setCurrentInput(value);
      }
      setJustCalculated(false);
      return;
    } 
    

    if (value === ".") {
      if (!currentInput.includes(".")) {
        setCurrentInput(currentInput + value);
      }
    } else if (value === "0") {
      if (currentInput !== "0" && currentInput !== "-") {
        setCurrentInput(currentInput + value);
      }
    } else {
      if (currentInput === "0") {
        setCurrentInput(value);
      } else {
        setCurrentInput(currentInput + value);
      }
    }
      
    setJustCalculated(false);
    
  }

  const deleteLastCharacter = () => {
    if (!justCalculated) {
      if (currentInput.length === 1) {
        setCurrentInput("0");
      } else {
        setCurrentInput(currentInput.slice(0, -1));
      }
    }
  }
  
  const reset = () => {
    setCurrentInput("0");
    setPreviousInput(undefined);
    setPreviousResult(undefined);
    setCurrentOperation(undefined);
    setJustCalculated(false);
  }

  const calculateValue = (number1: string, operation: MathematicalOperation, number2: string): number => {
    const value1 = parseFloat(number1);
    const value2 = parseFloat(number2);
    switch(operation) {
      case MathematicalOperation.Add: return value1 + value2;
      case MathematicalOperation.Subtract: return value1 - value2;
      case MathematicalOperation.Multiply: return value1 * value2;
      case MathematicalOperation.Divide: return value1 / value2;
    }
  }

  const handleCalculateOperation = () => {
    if (currentOperation === undefined || previousResult === undefined) {
      setPreviousInput(currentInput);
      return;
    }

    const newValue = previousInput !== undefined 
      ? calculateValue(currentInput, currentOperation, previousInput) 
      : calculateValue(previousResult, currentOperation, currentInput);

    if (previousInput === undefined) {
      setPreviousInput(currentInput);
    } else {
      setPreviousResult(currentInput);
    }
    setCurrentInput(newValue.toString());
    setJustCalculated(true);
  }

  const inputMathematicalOperation = (operation: MathematicalOperation) => {
    if (previousInput !== undefined) {
      setPreviousInput(undefined);
      setPreviousResult(currentInput); 
    }


    if (previousResult === undefined) {
      setPreviousResult(currentInput);   
      setCurrentOperation(operation); 
      setJustCalculated(true);
      return;
    } else if (currentOperation === undefined) {
      setCurrentOperation(operation); 
      return;
    }

    if (!justCalculated && currentOperation) {

      const newValue = calculateValue(previousResult, currentOperation, currentInput);

      setPreviousResult(newValue.toString());
      
      setCurrentInput(newValue.toString());
      setJustCalculated(true);
    }
    setCurrentOperation(operation);
  }

  const inputCalculatorOperation = (operation: CalculatorOperation) => {
    switch(operation) {
      case CalculatorOperation.Delete: deleteLastCharacter(); break;
      case CalculatorOperation.Reset: reset(); break;
      case CalculatorOperation.Calculate: handleCalculateOperation(); break;
    }
  }

  return (
    <div className="Calculator">
      <Display 
          currentInput={currentInput} previousResult={previousResult} previousInput={previousInput} operation={currentOperation}
        />
      <Keypad numberInputCallback={inputNumber} calculatorOperationCallback={inputCalculatorOperation} mathematicalOperationCallback={inputMathematicalOperation}/>
    </div>
  );
}

export default Calculator;