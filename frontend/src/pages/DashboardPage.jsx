import { Typography, Row, Col, Spin,Card, theme} from "antd";

import { DashboardOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";

import DashboardStats from "../components/dashboard/DashboardStats";

import {
  getEmployees,
  getEmploymentStatusDistribution,
  getEmployeeCountByCountry,
} from "../api/employees";

import EmploymentStatusChart from "../components/dashboard/EmploymentStatusChart";

import EmployeesByCountryChart from "../components/dashboard/EmployeesByCountryChart";

import RecentEmployeesTable from "../components/dashboard/RecentEmployeesTable";

const { Title, Text } = Typography;

export default function DashboardPage() {
  const { token } = theme.useToken();

  const [loading, setLoading] = useState(true);

  const [employmentStats, setEmploymentStats] = useState({
    FULL_TIME: 0,
    PART_TIME: 0,
    CONTRACT: 0,
    INTERN: 0,
  });

  const [employeeCountryData, setEmployeeCountryData] = useState([]);

  const [totalEmployees, setTotalEmployees] = useState(0);

  const [recentEmployees, setRecentEmployees] = useState([]);

  async function loadDashboardData() {
    try {
      setLoading(true);

      const [employeesResponse, statsResponse, countryResponse] =
        await Promise.all([
          getEmployees({
            limit: 5,
            offset: 0,
            sort_by: "date_of_joining",
            order: "desc",
          }),

          getEmploymentStatusDistribution().catch((error) => {
            console.error(error);

            return {};
          }),

          getEmployeeCountByCountry().catch((error) => {
            console.error(error);

            return {};
          }),
        ]);

      /* EMPLOYEE TABLE */
      if (employeesResponse) {
        setTotalEmployees(employeesResponse.total || 0);

        setRecentEmployees(employeesResponse.items || []);
      }

      /* EMPLOYMENT STATS */
      setEmploymentStats({
        FULL_TIME: statsResponse?.FULL_TIME || 0,

        PART_TIME: statsResponse?.PART_TIME || 0,

        CONTRACT: statsResponse?.CONTRACT || 0,

        INTERN: statsResponse?.INTERN || 0,
      });

      /* COUNTRY CHART */
      const formattedData = Object.entries(countryResponse || {}).map(
        ([country, count]) => ({
          country,
          count,
        }),
      );

      setEmployeeCountryData(formattedData);
    } catch (error) {
      console.error("Dashboard failed to initialize:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  /* LOADING */
  if (loading) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          variant="borderless"
          style={{
            borderRadius: 28,
            padding: "20px 28px",
            // boxShadow: "0 16px 40px rgba(15,23,42,0.08)",
            boxShadow: token.boxShadowSecondary,
            // border: "1px solid rgba(226,232,240,0.8)",
            border: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <Spin size="large" tip="Loading workforce diagnostics..." />
        </Card>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        padding: 32,
        background: token.colorBgLayout,
        boxSizing: "border-box",
      }}
    >
      {/* HERO SECTION */}
      <Card
        variant="borderless"
        style={{
          marginBottom: 32,
          borderRadius: 36,
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #334155 100%)",
          boxShadow: "0 20px 60px rgba(15,23,42,0.18)",
          border: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
        }}
        styles={{
          body: {
            padding: 42,
          },
        }}
      >
        {/* BACKGROUND GLOW */}
        <div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            top: -120,
            right: -100,
            filter: "blur(12px)",
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
                gap: 24,
              }}
            >
              {/* ICON */}
              <div
                style={{
                  width: 86,
                  height: 86,
                  borderRadius: 30,
                  background: "rgba(255,255,255,0.10)",
                  backdropFilter: "blur(14px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: 36,
                  flexShrink: 0,
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 16px 36px rgba(0,0,0,0.14)",
                }}
              >
                <DashboardOutlined />
              </div>

              {/* TEXT */}
              <div>
                <Title
                  level={1}
                  style={{
                    color: "#ffffff",
                    margin: 0,
                    fontWeight: 800,
                    letterSpacing: "-1.5px",
                    lineHeight: 1,
                  }}
                >
                  Workforce Dashboard
                </Title>

                <Text
                  style={{
                    color: "rgba(255,255,255,0.78)",
                    fontSize: 16,
                    display: "block",
                    marginTop: 14,
                    lineHeight: 1.8,
                    maxWidth: 760,
                  }}
                >
                  Monitor workforce operations, organizational distribution,
                  employment trends, and employee intelligence from a
                  centralized enterprise analytics dashboard.
                </Text>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* STATS */}
      <div
        style={{
          marginBottom: 32,
        }}
      >
        <DashboardStats
          totalEmployees={totalEmployees}
          employmentStats={employmentStats}
        />
      </div>

      {/* CHARTS */}
      <Row
        gutter={[28, 28]}
        style={{
          marginBottom: 32,
        }}
      >
        <Col xs={24} lg={12}>
          <EmployeesByCountryChart data={employeeCountryData} />
        </Col>

        <Col xs={24} lg={12}>
          <EmploymentStatusChart employmentStats={employmentStats} />
        </Col>
      </Row>

      {/* RECENT EMPLOYEES */}
      <Card
        variant="borderless"
        style={{
          borderRadius: 32,
          background: "#ffffff",
          background: token.colorBgContainer,
          // border: "1px solid rgba(226,232,240,0.8)",
          border: `1px solid ${token.colorBorderSecondary}`,
          // boxShadow: "0 14px 42px rgba(15,23,42,0.06)",
          boxShadow: token.boxShadowSecondary,
          overflow: "hidden",
        }}
        styles={{
          body: {
            padding: 28,
          },
        }}
      >
        <RecentEmployeesTable employees={recentEmployees} loading={loading} />
      </Card>
    </div>
  );
}
