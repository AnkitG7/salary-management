import { useEffect, useState } from "react";

import { Alert, Button, Space, Spin, Table, Typography } from "antd";

import { getEmployees } from "../api/employees";

import { PlusOutlined } from "@ant-design/icons";

import CreateEmployeeModal from "./CreateEmployeeModal";

const { Title } = Typography;

function formatText(value) {
  if (!value) {
    return "";
  }

  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [total, setTotal] = useState(0);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployees(pagination.pageSize, 0);
  }, []);

  async function refreshEmployees() {
    const offset = (pagination.current - 1) * pagination.pageSize;

    await fetchEmployees(pagination.pageSize, offset);
  }

  async function fetchEmployees(limit, offset) {
    try {
      setLoading(true);

      const data = await getEmployees(limit, offset);

      console.log("employees response:", data);

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

    const offset = (pageInfo.current - 1) * pageInfo.pageSize;

    await fetchEmployees(pageInfo.pageSize, offset);
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

      render: (value) => formatText(value),
    },

    {
      title: "Country",

      dataIndex: "country",

      key: "country",

      render: (value) => formatText(value),
    },

    {
      title: "Salary",

      dataIndex: "salary",

      key: "salary",

      render: (salary, record) => {
        return `${record.currency} ` + Number(salary).toLocaleString();
      },
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

      render: (value) => formatText(value),
    },

    {
      title: "Actions",

      key: "actions",

      render: () => {
        return (
          <Space>
            <Button type="link">Edit</Button>

            <Button danger type="link">
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Title level={2}>Employees</Title>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add Employee
        </Button>
      </div>

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
        <div
          style={{
            padding: 40,
            textAlign: "center",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Table
          bordered
          rowKey="id"
          dataSource={employees}
          columns={columns}
          pagination={{
            current: pagination.current,

            pageSize: pagination.pageSize,

            total,

            showSizeChanger: false,

            showTotal: (total) => `Total Employees: ${total}`,
          }}
          onChange={handleTableChange}
        />
      )}

      <CreateEmployeeModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={refreshEmployees}
      />
    </div>
  );
}

export default EmployeeList;
