import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  Calculation,
  CalculatorInput,
  CalculatorOperation,
} from "domain/types";

import "./display.scss";

export interface DisplayProps {
  currentOutput: string;
  calculation: Calculation;
  lastInput: CalculatorInput;
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

function formatNumber(number: string): string {
  let integerPart, decimalPart;
  [integerPart, decimalPart] = number.split(".");
  const integerNumberPart = parseInt(integerPart);

  let result = integerNumberPart.toLocaleString("en-US");
  if (decimalPart) {
    result = result.concat(".", decimalPart);
  }
  if (number.endsWith(".")) {
    result = result.concat(".");
  }
  return result;
}

function formatOutput(
  currentOutput: string,
  lastInput: CalculatorInput
): string {
  if (lastInput instanceof Error) {
    return lastInput.message;
  } else {
    return formatNumber(currentOutput);
  }
}

function formatCalculation(
  calculation: Calculation,
  lastInput: CalculatorInput
) {
  return `${calculation.leftOperand ?? ""} ${calculation.operator ?? ""}${
    lastInput === CalculatorOperation.Calculate
      ? ` ${calculation.rightOperand} =`
      : ""
  }`;
}

const Display: React.FC<DisplayProps> = ({
  currentOutput,
  calculation,
  lastInput,
}) => {
  const calculationString = formatCalculation(calculation, lastInput);
  const inputString = formatOutput(currentOutput, lastInput);
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
