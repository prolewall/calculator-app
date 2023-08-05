import "jest-canvas-mock";
import { render, screen } from "@testing-library/react";

import Display, { DisplayProps } from "./display";
import { MathematicalOperation } from "domain/types";

describe("Display", () => {
  const renderComponent = (props: DisplayProps) => {
    render(<Display {...props} />);
  };

  it("should correctly display formatted current input", () => {
    renderComponent({ currentInput: "10000345.23455" });

    const currentInput = screen.getByTestId("Display-current-input");

    expect(currentInput).toHaveTextContent("10,000,345.23455");
  });

  it("should correctly display calculation without previous input", () => {
    renderComponent({
      currentInput: "0",
      previousResult: "12.34",
      operation: MathematicalOperation.Add,
    });

    const calculation = screen.getByTestId("Display-calculation");
    expect(calculation).toHaveTextContent("12.34 +");
  });

  it("should correctly display calculation with previous input", () => {
    renderComponent({
      currentInput: "0",
      previousResult: "12.34",
      operation: MathematicalOperation.Multiply,
      previousInput: "3",
    });

    const calculation = screen.getByTestId("Display-calculation");
    expect(calculation).toHaveTextContent("12.34 x 3 =");
  });
});
