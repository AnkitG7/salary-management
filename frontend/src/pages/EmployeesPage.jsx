import { useEffect } from "react";

import { useState } from "react";

import { Alert, Button, Typography } from "antd";

import EmployeeTable from "../components/EmployeeTable";

import { getEmployees } from "../api/employees";

import EmployeeSearch from "../components/EmployeeSearch";

import EmployeeFilters from "../components/EmployeeFilters";

const { Title } = Typography;

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);

  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const DEFAULT_QUERY_PARAMS = {
    limit: 10,

    offset: 0,

    search: "",

    country: "",

    job_title: "",

    employment_status: "",

    currency: "",

    sort_by: "id",

    order: "desc",
  };

  const [queryParams, setQueryParams] = useState(DEFAULT_QUERY_PARAMS);

  async function loadEmployees() {
    try {
      setLoading(true);

      const response = await getEmployees(queryParams);

      setEmployees(response.items);

      setTotal(response.total);

      setError("");
    } catch (error) {
      console.error(error);

      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  }

  function handleResetFilters() {
    setQueryParams(DEFAULT_QUERY_PARAMS);
  }

  //   useEffect(() => {
  //     // clearTimeout(debounceTimeout.current);

  //     // debounceTimeout.current = setTimeout(() => {
  //     //   loadEmployees();
  //     // }, 300);

  //     return () => {
  //       clearTimeout(debounceTimeout.current);
  //     };
  //   }, [queryParams]);
  useEffect(() => {
    loadEmployees();
  }, [queryParams]);

  return (
    <div
      style={{
        padding: 24,

        width: "100%",

        overflowX: "auto",

        boxSizing: "border-box",
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
      <EmployeeSearch
        queryParams={queryParams}
        setQueryParams={setQueryParams}
      />
      <EmployeeFilters
        queryParams={queryParams}
        setQueryParams={setQueryParams}
      />
      <Button
        onClick={handleResetFilters}
        style={{
          marginBottom: 16,
        }}
      >
        Reset Filters
      </Button>

      <EmployeeTable
        loading={loading}
        employees={employees}
        total={total}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
      />
    </div>
  );
}
