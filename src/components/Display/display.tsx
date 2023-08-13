import Big from "big.js";
import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  Calculation,
  CalculatorInput,
  CalculatorOperation,
  isMathematicalOperation,
} from "domain/types";

import "./display.scss";

export interface DisplayProps {
  currentInput: string;
  calculation: Calculation;
  lastInput: CalculatorInput | Error;
}

function getTextWidth(canvas: HTMLCanvasElement, text: string): number {
  const context = canvas.getContext("2d");
  if (!context) {
    return 0;
  }
  const metrics = context.measureText(text);
  return metrics.width;
}

function calculateOutputScale(
  canvas: HTMLCanvasElement,
  containerWidth: number,
  text: string
): number {
  const textWidth = getTextWidth(canvas, text);
  return textWidth <= containerWidth ? 1 : containerWidth / textWidth;
}

function formatNumber(number: string) {
  const regexMatch = number.match(/^([-]?\d+)([^\d].*)?$/);
  const integerPart = parseInt(regexMatch?.at(1) ?? "0").toLocaleString(
    "en-US"
  );
  const otherPart = regexMatch?.at(2) ?? "";

  return integerPart.concat(otherPart);
}

function formatResult(result: Big) {
  return formatNumber(Big(result.toPrecision(15)).toString());
}

function formatOutput(
  currentInput: string,
  calculation: Calculation,
  lastInput: CalculatorInput | Error
): string {
  if (lastInput instanceof Error) {
    return lastInput.message;
  } else if (
    isMathematicalOperation(lastInput) ||
    lastInput === CalculatorOperation.Calculate
  ) {
    return formatResult(calculation.result ?? Big(0));
  } else {
    return formatNumber(currentInput);
  }
}

function formatCalculation(
  calculation: Calculation,
  lastInput: CalculatorInput | Error
) {
  return `${calculation.leftOperand ?? ""} ${calculation.operator ?? ""}${
    lastInput === CalculatorOperation.Calculate
      ? ` ${calculation.rightOperand} =`
      : ""
  }`;
}

const Display: React.FC<DisplayProps> = ({
  currentInput,
  calculation,
  lastInput,
}) => {
  const calculationString = formatCalculation(calculation, lastInput);
  const inputString = formatOutput(currentInput, calculation, lastInput);
  const canvas = useMemo(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      context.font = "bold 50px League Spartan";
    }
    return canvas;
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const [displayWidth, setDisplayWidth] = useState(0);
  useEffect(() => {
    const element = ref.current ?? new HTMLDivElement();
    const totalWidth = element.offsetWidth;
    const style = getComputedStyle(element);
    setDisplayWidth(
      totalWidth -
        parseFloat(style.paddingRight) -
        parseFloat(style.paddingLeft)
    );
  }, [displayWidth]);

  const outputScale = calculateOutputScale(canvas, displayWidth, inputString);

  return (
    <div className="Display" ref={ref}>
      <p data-testid="Display-calculation" className="Display__calculation">
        {calculationString}
      </p>
      <p
        data-testid="Display-current-input"
        className="Display__currentInput"
        style={{ scale: `${outputScale}` }}
      >
        {inputString}
      </p>
    </div>
  );
};

export default Display;
