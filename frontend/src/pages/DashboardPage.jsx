import { Typography, Row, Col, Spin } from "antd";
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
  const [loading, setLoading] = useState(true); // Default to true to prevent layout shift

  const [employmentStats, setEmploymentStats] = useState({
    FULL_TIME: 0,
    PART_TIME: 0,
    CONTRACT: 0,
    INTERN: 0,
  });
  const [employeeCountryData, setEmployeeCountryData] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [recentEmployees, setRecentEmployees] = useState([]);

  // Wrapped in a single orchestrator function using Promise.all
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
          getEmploymentStatusDistribution().catch((err) => {
            console.error(err);
            return {};
          }),
          getEmployeeCountByCountry().catch((err) => {
            console.error(err);
            return {};
          }),
        ]);

      // 1. Process Employee & Table Data
      if (employeesResponse) {
        setTotalEmployees(employeesResponse.total || 0);
        setRecentEmployees(employeesResponse.items || []);
      }

      // 2. Process Employment Stats Distribution
      setEmploymentStats({
        FULL_TIME: statsResponse?.FULL_TIME || 0,
        PART_TIME: statsResponse?.PART_TIME || 0,
        CONTRACT: statsResponse?.CONTRACT || 0,
        INTERN: statsResponse?.INTERN || 0,
      });

      // 3. Process Country Metrics
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

  if (loading) {
    return (
      <div style={{ padding: "80px 0", textAlign: "center" }}>
        <Spin size="large" tip="Loading workforce diagnostics..." />
      </div>
    );
  }

  return (
    <div style={{ padding: 16 }}>
      {/* Header View Row */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2} style={{ marginBottom: 4 }}>
            Workforce Dashboard
          </Title>
          <Text type="secondary" style={{ fontSize: 16 }}>
            Workforce overview and employee analytics
          </Text>
        </Col>
      </Row>

      {/* Main Metric Cards Component */}
      <DashboardStats
        totalEmployees={totalEmployees}
        employmentStats={employmentStats}
      />

      {/* Analytics Charts Sub-Grid */}
      <Row gutter={[16, 16]} style={{ marginTop: 24, marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <EmployeesByCountryChart data={employeeCountryData} />
        </Col>
        <Col xs={24} lg={12}>
          <EmploymentStatusChart employmentStats={employmentStats} />
        </Col>
      </Row>

      {/* Recent Activity Table Sub-Grid */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <RecentEmployeesTable employees={recentEmployees} loading={loading} />
        </Col>
      </Row>
    </div>
  );
}
