import { Alert, Card, Col, Empty, Row, Spin, Typography, theme } from "antd";
import { BarChartOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";

import {
  getEmployees,
  getFilterValues,
  getSalaryInsights,
  getJobTitleSalaryInsights,
  getEmployeeCountByCountry,
  getEmployeeCountByJobTitle,
  getEmploymentStatusDistribution,
} from "../api/employees";

import CountryAnalyticsSection from "../components/analytics/CountryAnalyticsSection";

import JobTitleAnalyticsSection from "../components/analytics/JobTitleAnalyticsSection";

import GlobalWorkforceAnalyticsSection from "../components/analytics/GlobalWorkforceAnalyticsSection";

const { Title, Text } = Typography;

export default function AnalyticsPage() {
  const { token } = theme.useToken();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [countries, setCountries] = useState([]);

  const [jobTitles, setJobTitles] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("India");

  const [salaryInsights, setSalaryInsights] = useState(null);

  const [mode, setMode] = useState("all");

  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const [allJobTitleInsights, setAllJobTitleInsights] = useState([]);

  const [singleJobTitleInsight, setSingleJobTitleInsight] = useState(null);

  const [employmentStatusData, setEmploymentStatusData] = useState([]);

  const [countryDistributionData, setCountryDistributionData] = useState([]);

  const [jobTitleDistributionData, setJobTitleDistributionData] = useState([]);

  async function loadFilters() {
    try {
      const [countryResponse, jobTitleResponse] = await Promise.all([
        getFilterValues("country"),

        getFilterValues("job_title"),
      ]);

      setCountries(countryResponse || []);

      setJobTitles(jobTitleResponse || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadCountryAnalytics() {
    if (!selectedCountry) {
      return;
    }

    try {
      setLoading(true);

      setError("");

      const response = await getSalaryInsights({
        country: selectedCountry,
      });

      setSalaryInsights(response);
    } catch (error) {
      console.error(error);

      setError("Failed to load country analytics");
    } finally {
      setLoading(false);
    }
  }

  async function loadAllJobTitleAnalytics() {
    try {
      const response = await getEmployees({
        limit: 100,
        offset: 0,
        country: selectedCountry,
      });

      const grouped = response.items.reduce((acc, employee) => {
        const key = employee.job_title;

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(Number(employee.salary));

        return acc;
      }, {});

      const formatted = Object.entries(grouped).map(([job_title, salaries]) => {
        const total = salaries.reduce((sum, salary) => sum + salary, 0);

        return {
          job_title,

          average_salary: total / salaries.length,

          currency: response.items[0]?.currency || "",
        };
      });

      setAllJobTitleInsights(formatted);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadSingleJobTitleAnalytics() {
    if (!selectedJobTitle) {
      return;
    }

    try {
      const response = await getJobTitleSalaryInsights({
        country: selectedCountry,

        job_title: selectedJobTitle,
      });

      setSingleJobTitleInsight(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadGlobalAnalytics() {
    try {
      const [employmentResponse, countryResponse, jobTitleResponse] =
        await Promise.all([
          getEmploymentStatusDistribution(),

          getEmployeeCountByCountry(),

          getEmployeeCountByJobTitle(),
        ]);

      const formattedEmployment = Object.entries(employmentResponse || {}).map(
        ([name, value]) => ({
          name,
          value,
        }),
      );

      setEmploymentStatusData(formattedEmployment);

      const formattedCountries = Object.entries(countryResponse || {}).map(
        ([country, count]) => ({
          country,
          count,
        }),
      );

      setCountryDistributionData(formattedCountries);

      const formattedJobTitles = Object.entries(jobTitleResponse || {}).map(
        ([job_title, count]) => ({
          job_title,
          count,
        }),
      );

      setJobTitleDistributionData(
        formattedJobTitles.sort((a, b) => b.count - a.count).slice(0, 8),
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadFilters();
  }, []);

  useEffect(() => {
    loadGlobalAnalytics();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      loadCountryAnalytics();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedCountry) {
      return;
    }

    if (mode === "all") {
      loadAllJobTitleAnalytics();
    }

    if (mode === "single" && selectedJobTitle) {
      loadSingleJobTitleAnalytics();
    }
  }, [mode, selectedCountry, selectedJobTitle]);

  return (
    <div
      style={{
        width: "100%",
        padding: 28,
        background: token.colorBgLayout,
        boxSizing: "border-box",
      }}
    >
      {/* HERO */}
      <Card
        variant="borderless"
        style={{
          marginBottom: 32,
          borderRadius: 36,
          overflow: "hidden",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",

          boxShadow: token.boxShadowSecondary,
        }}
        styles={{
          body: {
            padding: 40,
          },
        }}
      >
        <Row justify="space-between" align="middle" gutter={[32, 32]}>
          {/* LEFT */}
          <Col flex="auto">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 22,
              }}
            >
              {/* ICON */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 28,
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: 34,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.14)",
                }}
              >
                <BarChartOutlined />
              </div>

              {/* TEXT */}
              <div>
                <Title
                  level={1}
                  style={{
                    color: "#ffffff",
                    margin: 0,
                    fontWeight: 800,
                    letterSpacing: "-1.2px",
                  }}
                >
                  Analytics
                </Title>

                <Text
                  style={{
                    color: "rgba(255,255,255,0.78)",
                    fontSize: 16,
                    lineHeight: 1.7,
                    display: "block",
                    marginTop: 12,
                    maxWidth: 760,
                  }}
                >
                  Workforce salary benchmarking, compensation intelligence,
                  employee distribution, and organizational analytics across
                  global operations.
                </Text>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* ERROR */}
      {error && (
        <Alert
          type="error"
          message={error}
          style={{
            marginBottom: 24,
            borderRadius: 18,
          }}
        />
      )}

      {/* COUNTRY ANALYTICS */}
      <CountryAnalyticsSection
        countries={countries}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        salaryInsights={salaryInsights}
        loading={loading}
      />

      {/* EMPTY */}
      {!salaryInsights && !loading && (
        <Card
          variant="borderless"
          style={{
            borderRadius: 28,

            boxShadow: token.boxShadowSecondary,
            background: token.colorBgContainer,
          }}
        >
          <Empty
            description="No analytics available"
            style={{
              marginTop: 20,
            }}
          />
        </Card>
      )}

      {/* MAIN ANALYTICS */}
      {salaryInsights && (
        <Row
          gutter={[28, 28]}
          style={{
            marginTop: 28,
          }}
        >
          {/* JOB TITLE */}
          <Col xs={24}>
            <JobTitleAnalyticsSection
              mode={mode}
              setMode={setMode}
              selectedCountry={selectedCountry}
              selectedJobTitle={selectedJobTitle}
              setSelectedJobTitle={setSelectedJobTitle}
              jobTitles={jobTitles}
              allJobTitleInsights={allJobTitleInsights}
              singleJobTitleInsight={singleJobTitleInsight}
            />
          </Col>

          {/* GLOBAL */}
          <Col xs={24}>
            <GlobalWorkforceAnalyticsSection
              employmentStatusData={employmentStatusData}
              countryDistributionData={countryDistributionData}
              jobTitleDistributionData={jobTitleDistributionData}
            />
          </Col>
        </Row>
      )}

      {/* LOADING */}
      {loading && (
        <div
          style={{
            textAlign: "center",
            marginTop: 48,
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}
