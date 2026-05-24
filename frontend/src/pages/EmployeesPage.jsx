import { useEffect } from "react";

import { useState } from "react";

import { Alert, Spin, Typography } from "antd";

import EmployeeTable from "../components/EmployeeTable";

import { getEmployees } from "../api/employees";

const { Title } = Typography;

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);

  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [queryParams, setQueryParams] = useState({
    limit: 10,
    offset: 0,
    search: "",
    country: "",
    job_title: "",
    employment_status: "",
    currency: "",
    sort_by: "id",
    order: "desc",
  });

  async function loadEmployees() {
    try {
      setLoading(true);

      setError("");

      const response = await getEmployees(queryParams);

      setEmployees(response.items);

      setTotal(response.total);
    } catch (err) {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, [queryParams]);

  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Title level={2}>Employees</Title>

      {error && (
        <Alert
          type="error"
          message={error}
          style={{
            marginBottom: 16,
          }}
        />
      )}

      {loading ? (
        <Spin size="large" />
      ) : (
        <EmployeeTable
          employees={employees}
          total={total}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
      )}
    </div>
  );
}
