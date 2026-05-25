import { Alert, Col, Empty, Row, Spin, Typography } from "antd";

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

        /*
              IMPORTANT:
              Check your backend field name here.

              If salary becomes NaN,
              replace employee.salary
              with the actual field.

              Example:
              employee.salary_in_usd
              employee.salary_amount
            */

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

      /*
      Employment Distribution
    */

      const formattedEmployment = Object.entries(employmentResponse || {}).map(
        ([name, value]) => ({
          name,
          value,
        }),
      );

      setEmploymentStatusData(formattedEmployment);

      /*
      Country Distribution
    */

      const formattedCountries = Object.entries(countryResponse || {}).map(
        ([country, count]) => ({
          country,
          count,
        }),
      );

      setCountryDistributionData(formattedCountries);

      /*
      Job Title Distribution
    */

      const formattedJobTitles = Object.entries(jobTitleResponse || {}).map(
        ([job_title, count]) => ({
          job_title,
          count,
        }),
      );

    //   setJobTitleDistributionData(formattedJobTitles);
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
        padding: 24,
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: 32,
        }}
      >
        <Title
          level={2}
          style={{
            marginBottom: 4,
          }}
        >
          Analytics Dashboard
        </Title>

        <Text
          type="secondary"
          style={{
            fontSize: 16,
          }}
        >
          Workforce salary insights, compensation benchmarking, and employee
          distribution analytics.
        </Text>
      </div>

      {/* Error State */}
      {error && (
        <Alert
          type="error"
          message={error}
          style={{
            marginBottom: 24,
          }}
        />
      )}

      {/* Country Analytics */}
      <CountryAnalyticsSection
        countries={countries}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        salaryInsights={salaryInsights}
        loading={loading}
      />

      {/* Empty State */}
      {!salaryInsights && !loading && (
        <Empty
          description="No analytics available"
          style={{
            marginTop: 48,
          }}
        />
      )}

      {/* Analytics Sections */}
      {salaryInsights && (
        <Row
          gutter={[24, 24]}
          style={{
            marginTop: 24,
          }}
        >
          {/* Job Title Analytics */}
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

          {/* Global Analytics Placeholder */}
          <Col xs={24}>
            <GlobalWorkforceAnalyticsSection
              employmentStatusData={employmentStatusData}
              countryDistributionData={countryDistributionData}
              jobTitleDistributionData={jobTitleDistributionData}
            />
          </Col>
        </Row>
      )}

      {/* Loading */}
      {loading && (
        <div
          style={{
            textAlign: "center",
            marginTop: 32,
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </div>
  );
}
