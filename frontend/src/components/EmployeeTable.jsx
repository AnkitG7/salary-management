export default function EmployeeTable({ employees }) {
  return <pre>{JSON.stringify(employees, null, 2)}</pre>;
}
