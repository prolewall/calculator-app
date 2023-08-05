import { render, screen, waitFor } from "@testing-library/react";

import KeypadButton, { ButtonType } from ".";

describe("KeypadButton", () => {
  const mockCallback = jest.fn();

  const renderButton = (buttonType: ButtonType) => {
    render(
      <KeypadButton
        value={"7"}
        type={buttonType}
        onClickCallback={mockCallback}
      />
    );
  };

  it.each([
    [ButtonType.Standard, "KeypadButton__standard"],
    [ButtonType.Equals, "KeypadButton__equals"],
    [ButtonType.Special, "KeypadButton__special"],
  ])(
    "should render button with correct class for type %s",
    (buttonType, expectedClass) => {
      renderButton(buttonType);

      expect(screen.getByRole("button")).toHaveClass(
        `KeypadButton ${expectedClass}`
      );
    }
  );

  it("should call callback function when clicked", async () => {
    renderButton(ButtonType.Standard);
    const button = screen.getByRole("button");

    button.click();
    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalled();
    });
  });
});
