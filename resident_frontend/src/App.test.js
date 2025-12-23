import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders resident directory header", () => {
  render(<App />);
  const heading = screen.getByRole("heading", { name: /resident directory/i });
  expect(heading).toBeInTheDocument();
});

test("renders theme toggle in header", () => {
  render(<App />);
  const toggle = screen.getByRole("button", { name: /switch to (light|dark) theme/i });
  expect(toggle).toBeInTheDocument();
});
