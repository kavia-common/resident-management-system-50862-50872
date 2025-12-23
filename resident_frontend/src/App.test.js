import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders resident directory header", () => {
  render(<App />);
  const heading = screen.getByRole("heading", { name: /resident directory/i });
  expect(heading).toBeInTheDocument();
});
