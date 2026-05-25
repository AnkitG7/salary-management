import { Alert, Button, Card, Col, Row, Space, Typography } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import EmployeeTable from "../components/employees/EmployeeTable";
import { getEmployees } from "../api/employees";
import EmployeeSearch from "../components/employees/EmployeeSearch";
import EmployeeFilters from "../components/employees/EmployeeFilters";
import CreateEmployeeModal from "../components/employees/CreateEmployeeModal";

const { Title, Text } = Typography;

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
  const debounceTimeout = useRef(null);

  async function loadEmployees() {
    try {
      setLoading(true);
      const response = await getEmployees(queryParams);
      setEmployees(response.items || []);
      setTotal(response.total || 0);
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

  useEffect(() => {
    clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      loadEmployees();
    }, 300);

    return () => {
      clearTimeout(debounceTimeout.current);
    };
  }, [queryParams]);

  return (
    <div
      style={{
        padding: 24,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{
          marginBottom: 24,
        }}
      >
        <Col>
          <Title
            level={2}
            style={{
              marginBottom: 4,
            }}
          >
            Employees
          </Title>

          <Text
            type="secondary"
            style={{
              fontSize: 16,
            }}
          >
            Manage and view all employees in your organization.
          </Text>
        </Col>

        <Col>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add Employee
          </Button>
        </Col>
      </Row>

      {error && (
        <Alert
          type="error"
          message={error}
          style={{
            marginBottom: 16,
          }}
        />
      )}

      <Card
        bordered={false}
        style={{
          borderRadius: 20,
          marginBottom: 24,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <Space
          direction="vertical"
          size={20}
          style={{
            width: "100%",
          }}
        >
          <EmployeeSearch
            queryParams={queryParams}
            setQueryParams={setQueryParams}
          />

          {/* Adjusted row layout using align="end" to lock components down against the bottom axis margin */}
          <Row justify="space-between" align="end" gutter={[16, 16]}>
            <Col flex="auto">
              <EmployeeFilters
                queryParams={queryParams}
                setQueryParams={setQueryParams}
              />
            </Col>

            <Col style={{ display: "flex", flexDirection: "column" }}>
              {/* Invisible placeholder matching the font height of the select labels above */}
              <span
                style={{ marginBottom: 8, visibility: "hidden", height: 22 }}
                aria-hidden="true"
              >
                Spacer
              </span>
              <Button
                icon={<ReloadOutlined style={{ marginRight: 4 }} />}
                onClick={handleResetFilters}
                danger
                type="dashed"
                style={{
                  borderRadius: 8,
                  height: 32, // Forces absolute match to standard dropdown input sizing blocks
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 500,
                }}
              >
                Reset Filters
              </Button>
            </Col>
          </Row>
        </Space>
      </Card>

      <EmployeeTable
        loading={loading}
        employees={employees}
        total={total}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
      />

      <CreateEmployeeModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false);
          loadEmployees();
        }}
      />
    </div>
  );
}
