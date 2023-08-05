import React, { useEffect, useMemo, useRef, useState } from "react";
import "./display.scss";
import { MathematicalOperation } from "constants/operationConstants";

export interface DisplayProps {
  currentInput: string;
  previousResult?: string;
  previousInput?: string;
  operation?: MathematicalOperation;
}

function getTextWidth(canvas: HTMLCanvasElement, text: string): number {
  const context = canvas.getContext("2d");
  if (!context) {
    return 0;
  }
  const metrics = context.measureText(text);
  return metrics.width;
}

function calculateFontSize(
  canvas: HTMLCanvasElement,
  containerWidth: number,
  text: string
): number {
  const textWidth = getTextWidth(canvas, text);
  return textWidth <= containerWidth ? 1 : containerWidth / textWidth;
}

function getInputWithCommas(currentInput: string): string {
  let integerPart, decimalPart;
  [integerPart, decimalPart] = currentInput.split(".");
  const integerNumberPart = parseInt(integerPart);

  let resultString = integerNumberPart.toLocaleString("en-US");
  if (decimalPart) {
    resultString = resultString.concat(".", decimalPart);
  }
  if (currentInput.endsWith(".")) {
    resultString = resultString.concat(".");
  }
  return resultString;
}

const Display: React.FC<DisplayProps> = ({
  currentInput,
  previousResult,
  previousInput,
  operation,
}) => {
  const calculationString = `${previousResult ?? ""} ${operation ?? ""}${
    previousInput !== undefined ? ` ${previousInput} =` : ""
  }`;
  const inputString = getInputWithCommas(currentInput);
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

  const inputFontSize = calculateFontSize(canvas, displayWidth, inputString);

  return (
    <div className="Display" ref={ref}>
      <p data-testid="Display-calculation" className="Display__calculation">
        {calculationString}
      </p>
      <p
        data-testid="Display-current-input"
        className="Display__currentInput"
        style={{ scale: `${inputFontSize}` }}
      >
        {inputString}
      </p>
    </div>
  );
};

export default Display;
