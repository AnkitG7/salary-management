import { useEffect, useState } from "react";

import { Alert, Spin, Table, Typography } from "antd";

import { getEmployees } from "../api/employees";

const { Title } = Typography;

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [total, setTotal] = useState(0);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    fetchEmployees(
      pagination.pageSize,
      (pagination.current - 1) * pagination.pageSize,
    );
  }, []);

  async function fetchEmployees(limit, offset) {
    try {
      setLoading(true);

      const data = await getEmployees(limit, offset);

      setEmployees(Array.isArray(data.items) ? data.items : []);

      setTotal(data.total || 0);

      setError("");
    } catch (err) {
      console.error(err);

      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  }

  async function handleTableChange(pageInfo) {
    setPagination(pageInfo);

    await fetchEmployees(
      pageInfo.pageSize,
      (pageInfo.current - 1) * pageInfo.pageSize,
    );
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Job Title",
      dataIndex: "job_title",
      key: "job_title",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Status",
      dataIndex: "employment_status",
      key: "employment_status",
    },
  ];

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
        <Table
          rowKey="id"
          dataSource={employees}
          columns={columns}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total,
          }}
          onChange={handleTableChange}
        />
      )}
    </div>
  );
}

export default EmployeeList;
