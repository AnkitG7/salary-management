import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Typography,
  theme,
} from "antd";

import { PlusOutlined, ReloadOutlined, TeamOutlined } from "@ant-design/icons";

import { useEffect, useRef, useState } from "react";

import EmployeeTable from "../components/employees/EmployeeTable";

import { getEmployees } from "../api/employees";

import EmployeeSearch from "../components/employees/EmployeeSearch";

import EmployeeFilters from "../components/employees/EmployeeFilters";

import CreateEmployeeModal from "../components/employees/CreateEmployeeModal";

const { Title, Text } = Typography;

export default function EmployeesPage() {
  const { token } = theme.useToken();

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

  const [filtersRefreshKey, setFiltersRefreshKey] = useState(0);

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
        width: "100%",
        padding: 36,
        boxSizing: "border-box",
      }}
    >
      {/* HERO */}
      <Card
        variant="borderless"
        style={{
          marginBottom: 36,
          borderRadius: 40,
          overflow: "hidden",
          position: "relative",
          background:
            "linear-gradient(135deg, #2563eb 0%, #1d4ed8 45%, #4338ca 100%)",
          boxShadow: "0 24px 80px rgba(37,99,235,0.22)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        styles={{
          body: {
            padding: 48,
          },
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -120,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            filter: "blur(18px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -100,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            filter: "blur(14px)",
          }}
        />

        <Row
          justify="space-between"
          align="middle"
          gutter={[32, 32]}
          style={{
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* LEFT */}
          <Col flex="auto">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
              }}
            >
              {/* ICON */}
              <div
                style={{
                  width: 94,
                  height: 94,
                  borderRadius: 34,
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(16px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: 40,
                  flexShrink: 0,
                  border: "1px solid rgba(255,255,255,0.18)",
                  boxShadow: "0 18px 42px rgba(0,0,0,0.14)",
                }}
              >
                <TeamOutlined />
              </div>

              {/* TEXT */}
              <div>
                <Title
                  level={1}
                  style={{
                    color: "#ffffff",
                    margin: 0,
                    fontWeight: 800,
                    letterSpacing: "-1.8px",
                    lineHeight: 1,
                  }}
                >
                  Employees
                </Title>

                <Text
                  style={{
                    color: "rgba(255,255,255,0.82)",
                    fontSize: 17,
                    display: "block",
                    marginTop: 16,
                    lineHeight: 1.9,
                    maxWidth: 780,
                  }}
                >
                  Manage workforce operations, employee lifecycle, compensation
                  intelligence, organizational records, and enterprise staffing
                  analytics from a centralized workforce management platform.
                </Text>
              </div>
            </div>
          </Col>

          {/* BUTTON */}
          <Col>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => setIsCreateModalOpen(true)}
              style={{
                height: 60,
                paddingInline: 34,
                borderRadius: 20,
                background: "#ffffff",

                color: "#2563eb",
                border: "none",
                fontWeight: 700,
                fontSize: 15,
                boxShadow: "0 16px 36px rgba(0,0,0,0.18)",
              }}
            >
              Add Employee
            </Button>
          </Col>
        </Row>
      </Card>

      {/* ERROR */}
      {error && (
        <Alert
          type="error"
          message={error}
          style={{
            marginBottom: 28,
            borderRadius: 18,
          }}
        />
      )}

      {/* FILTERS */}
      <Card
        variant="borderless"
        style={{
          borderRadius: 34,
          marginBottom: 36,

          background: token.colorBgContainer,
          backdropFilter: "blur(16px)",

          border: `1px solid ${token.colorBorderSecondary}`,

          boxShadow: token.boxShadowSecondary,
          overflow: "hidden",
        }}
        styles={{
          body: {
            padding: 36,
          },
        }}
      >
        <Space
          direction="vertical"
          size={32}
          style={{
            width: "100%",
          }}
        >
          {/* HEADER */}
          <div>
            <Title
              level={4}
              style={{
                margin: 0,

                color: token.colorText,
                fontWeight: 700,
                letterSpacing: "-0.6px",
              }}
            >
              Employee Filters
            </Title>

            <Text
              style={{
                color: token.colorTextDescription,
                fontSize: 14,
                display: "block",
                marginTop: 10,
                lineHeight: 1.8,
                maxWidth: 760,
              }}
            >
              Search and filter workforce records across departments, countries,
              employment types, compensation structures, and organizational
              operations.
            </Text>
          </div>

          <Divider
            style={{
              margin: 0,

              borderColor: token.colorBorderSecondary,
            }}
          />

          {/* SEARCH */}
          <EmployeeSearch
            queryParams={queryParams}
            setQueryParams={setQueryParams}
          />

          {/* FILTER ROW */}
          <Row justify="space-between" align="end" gutter={[28, 28]}>
            <Col flex="auto">
              <EmployeeFilters
                queryParams={queryParams}
                setQueryParams={setQueryParams}
                filtersRefreshKey={filtersRefreshKey}
              />
            </Col>

            {/* RESET */}
            <Col>
              <Button
                icon={<ReloadOutlined />}
                onClick={handleResetFilters}
                size="large"
                style={{
                  height: 52,
                  borderRadius: 18,
                  paddingInline: 28,
                  fontWeight: 700,

                  border: `1px solid ${token.colorBorderSecondary}`,

                  background: token.colorBgElevated,

                  color: token.colorText,

                  boxShadow: token.boxShadowSecondary,
                }}
              >
                Reset Filters
              </Button>
            </Col>
          </Row>
        </Space>
      </Card>

      {/* TABLE SECTION */}
      <Card
        variant="borderless"
        style={{
          borderRadius: 34,

          background: token.colorBgContainer,

          border: `1px solid ${token.colorBorderSecondary}`,

          boxShadow: token.boxShadowSecondary,
          overflow: "hidden",
        }}
        styles={{
          body: {
            padding: 30,
          },
        }}
      >
        <EmployeeTable
          loading={loading}
          employees={employees}
          total={total}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
          onEmployeeDeleted={() => {
            loadEmployees();

            setFiltersRefreshKey((previous) => previous + 1);
          }}
        />
      </Card>

      {/* CREATE MODAL */}
      <CreateEmployeeModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          setIsCreateModalOpen(false);

          loadEmployees();

          setFiltersRefreshKey((previous) => previous + 1);
        }}
      />
    </div>
  );
}
