import { render, screen, waitFor } from "@testing-library/react";
import "jest-canvas-mock";
import { act } from "react-dom/test-utils";

import Calculator from "./calculator";

describe("Calculator", () => {
  const renderComponent = () => {
    render(<Calculator />);
  };

  const testInputs = async (
    inputs: string[],
    expectedCurrentInput: string,
    expectedCalculation: string
  ) => {
    inputs.forEach((input) => {
      const keypadButton = screen.getByRole("button", { name: input });
      act(() => {
        keypadButton.click();
      });
    });

    await waitFor(() => {
      const displayedCurrentInput = screen.getByTestId("Display-current-input");
      expect(displayedCurrentInput).toHaveTextContent(expectedCurrentInput);
    });

    await waitFor(() => {
      const displayedCalculation = screen.getByTestId("Display-calculation");
      expect(displayedCalculation).toHaveTextContent(expectedCalculation);
    });
  };

  it.each([
    ["should display 0 without any inputs", [], "0", ""],
    ["should ignore 0 if current input is 0", ["0", "0"], "0", ""],
    ["should replace 0 with input", ["3"], "3", ""],
    ["should add decimal point to 0 instead of replacing it", ["."], "0.", ""],
    [
      "should correctly input multiple digits",
      ["1", "2", ".", "3", "5"],
      "12.35",
      "",
    ],
    [
      "should ignore new inputs when limit of 15 characters reached",
      [
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
      ],
      "111,111,111,111,111",
      "",
    ],
    [
      "should reset output after character limit was reached if new operation was provided",
      [
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "/",
        "3",
      ],
      "3",
      "111111111111111 /",
    ],
    [
      "should replace displayed result of operation with new input",
      ["4", "x", "9", "-", "5"],
      "5",
      "36 -",
    ],
    [
      "should replace displayed result of operation and reset displayed calculation when new input after calculate action",
      ["4", "x", "9", "=", "5"],
      "5",
      "",
    ],
    [
      "should show equal sign when calculate was called without chosen operation",
      ["1", "2", "="],
      "12",
      "12 =",
    ],
    [
      "should calculate result when calculate was called with chosen operation",
      ["6", "+", "1", "="],
      "7",
      "6 + 1 =",
    ],
    [
      "should repeat the same operation when calculate is called repeatadely",
      ["6", "+", "1", "=", "="],
      "8",
      "7 + 1 =",
    ],
    [
      "should only show current operation when first operation is chosen",
      ["1", "2", "+", "3"],
      "3",
      "12 +",
    ],
    [
      "should calculate when operation is chosen after new input",
      ["6", "+", "4", "x"],
      "10",
      "10 x",
    ],
    [
      "should only change current operation if new operation was chosen without new input",
      ["6", "+", "4", "x", "/"],
      "10",
      "10 /",
    ],
    [
      "should allow calculate after new operation was chosen without new input",
      ["6", "+", "4", "x", "/", "="],
      "1",
      "10 / 10 =",
    ],
    [
      "should only change current operation if new operation was chosen after calculate",
      ["6", "+", "4", "=", "/"],
      "10",
      "10 /",
    ],
    ["should add", ["6", "+", "4", "="], "10", "6 + 4 ="],
    ["should subtract", ["2", "-", "4", "="], "-2", "2 - 4 ="],
    ["should multiply", ["6", "x", "4", "="], "24", "6 x 4 ="],
    [
      "should multiply multiple times to high exponent",
      ["1", "0", "x"].concat(Array(30).fill("=")),
      "1e+31",
      "1e+30 x 10 =",
    ],
    ["should divide", ["6", "/", "4", "="], "1.5", "6 / 4 ="],
    [
      "should divide multiple times with many decimal places",
      ["1", "0", "/"].concat(Array(30).fill("=")),
      "1e-29",
      "1e-28 / 10 =",
    ],
    [
      "should display error after divide by 0",
      ["6", "/", "0", "="],
      "Can't divide by 0",
      "6 /",
    ],
    [
      "should input new number after error",
      ["6", "/", "0", "=", "3"],
      "3",
      "6 /",
    ],
    [
      "should delete last input when delete action called",
      ["1", "2", ".", "3", "5", "DEL"],
      "12.3",
      "",
    ],
    [
      "should reset to 0 if only one character when delete action called",
      ["1", "DEL"],
      "0",
      "",
    ],
    [
      "should not allow delete if no new input after calculation",
      ["6", "+", "4", "=", "DEL"],
      "10",
      "6 + 4 =",
    ],
    [
      "should revert to initial state after reset action called",
      ["1", "2", ".", "3", "-", "=", "RESET"],
      "0",
      "",
    ],
  ])(
    "%s",
    async (testName, inputs, expectedCurrentInput, expectedCalculation) => {
      renderComponent();

      await testInputs(inputs, expectedCurrentInput, expectedCalculation);
    }
  );
});
