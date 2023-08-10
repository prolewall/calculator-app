import { render, screen } from "@testing-library/react";
import "jest-canvas-mock";

import { CalculatorOperation, MathematicalOperation } from "domain/types";

import Display, { DisplayProps } from "./display";

describe("Display", () => {
  const renderComponent = (props: DisplayProps) => {
    render(<Display {...props} />);
  };

  it("should correctly display formatted current input", () => {
    renderComponent({
      currentOutput: "10000345.23455",
      lastInput: "5",
      calculation: {},
    });

    const currentInput = screen.getByTestId("Display-current-input");

    expect(currentInput).toHaveTextContent("10,000,345.23455");
  });

  it("should correctly display calculation", () => {
    renderComponent({
      currentOutput: "0",
      lastInput: MathematicalOperation.Add,
      calculation: {
        leftOperand: "12.34",
        operator: MathematicalOperation.Add,
      },
    });

    const calculation = screen.getByTestId("Display-calculation");
    expect(calculation).toHaveTextContent("12.34 +");
  });

  it("should correctly display calculation after calculate operation", () => {
    renderComponent({
      currentOutput: "0",
      lastInput: CalculatorOperation.Calculate,
      calculation: {
        leftOperand: "12.34",
        operator: MathematicalOperation.Multiply,
        rightOperand: "3",
      },
    });

    const calculation = screen.getByTestId("Display-calculation");
    expect(calculation).toHaveTextContent("12.34 x 3 =");
  });

  it("should display error message when output not a number", () => {
    renderComponent({
      lastInput: new Error("Can't divide by 0"),
      currentOutput: "",
      calculation: {},
    });

    const currentInput = screen.getByTestId("Display-current-input");

    expect(currentInput).toHaveTextContent("Can't divide by 0");
  });
});
