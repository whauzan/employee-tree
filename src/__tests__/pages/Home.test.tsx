import "@testing-library/jest-dom";
import Home from "@/app/(home)/page";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";

describe("Pages: Home", () => {
  it("renders the page", () => {
    render(<Home />);
    const test = screen.getByText(/Employee/i);
    expect(test).toMatchSnapshot();
  });
});
