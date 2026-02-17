import React from "react";
import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner", () => {
  it("renders with data-testid loading-spinner", () => {
    render(<Spinner />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders as a span with the spinner class", () => {
    render(<Spinner />);
    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner.tagName).toBe("SPAN");
  });
});
