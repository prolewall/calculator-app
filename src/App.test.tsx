import "jest-canvas-mock";
import { render, screen } from "@testing-library/react";
import App from "App";

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should set initial theme from local storage if set", () => {
    localStorage.setItem("theme", "theme-3");
    render(<App />);

    const appComponent = screen.getByTestId("App");
    expect(appComponent).toHaveClass("App theme-3");
  });
});
