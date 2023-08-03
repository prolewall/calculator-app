import { render, screen } from "@testing-library/react";
import ThemeToggle from "./themeToggle";

describe("ThemeToggle", () => {
  const mockCallback = jest.fn();

  const renderComponent = (inititalTheme: string) => {
    render(
      <ThemeToggle
        currentTheme={inititalTheme}
        themeChangeCallback={mockCallback}
      />,
    );
  };

  it("should trigger change for theme", () => {
    renderComponent("theme-1");

    const themeInput = screen.getAllByRole("radio").at(1);

    expect(themeInput).not.toBeChecked();
    themeInput?.click();
    expect(themeInput).toBeChecked();
    expect(mockCallback).toHaveBeenCalledWith("theme-2");
  });

  it("should not trigger change for theme if theme already selected", () => {
    renderComponent("theme-1");

    const themeInput = screen.getAllByRole("radio").at(0);

    expect(themeInput).toBeChecked();
    themeInput?.click();
    expect(themeInput).toBeChecked();
    expect(mockCallback).not.toHaveBeenCalled();
  });
});
