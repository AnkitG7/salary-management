import { render, screen } from "@testing-library/react";

import App from "../App";

test("renders application title", () => {
  render(<App />);

  expect(screen.getByText(/salary management system/i)).toBeInTheDocument();
});
