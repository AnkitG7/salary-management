import { render, screen } from "@testing-library/react";

import EmployeeList from "../components/EmployeeList";

test("renders employee table title", () => {
  render(<EmployeeList />);

  expect(screen.getByText(/employees/i)).toBeInTheDocument();
});
