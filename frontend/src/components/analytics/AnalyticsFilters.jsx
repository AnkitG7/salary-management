import { Button, Card, Col, Row, Select } from "antd";

import { useEffect, useState } from "react";

import { getFilterValues } from "../../api/employees";

export default function AnalyticsFilters({
  selectedCountry,
  setSelectedCountry,
  selectedJobTitle,
  setSelectedJobTitle,
}) {
  const [countries, setCountries] = useState([]);

  const [jobTitles, setJobTitles] = useState([]);

  async function loadFilters() {
    try {
      const [countryValues, jobTitleValues] = await Promise.all([
        getFilterValues("country"),

        getFilterValues("job_title"),
      ]);

      setCountries(countryValues || []);

      setJobTitles(jobTitleValues || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadFilters();
  }, []);

  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 20,

        marginBottom: 24,

        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} md={10}>
          <div
            style={{
              fontSize: 13,

              fontWeight: 600,

              marginBottom: 8,
            }}
          >
            Country
          </div>

          <Select
            size="large"
            allowClear
            placeholder="Select Country"
            value={selectedCountry || undefined}
            onChange={(value) => setSelectedCountry(value || "")}
            options={countries.map((country) => ({
              label: country,

              value: country,
            }))}
            style={{
              width: "100%",
            }}
          />
        </Col>

        <Col xs={24} md={10}>
          <div
            style={{
              fontSize: 13,

              fontWeight: 600,

              marginBottom: 8,
            }}
          >
            Job Title
          </div>

          <Select
            size="large"
            allowClear
            placeholder="Select Job Title"
            value={selectedJobTitle || undefined}
            onChange={(value) => setSelectedJobTitle(value || "")}
            options={jobTitles.map((jobTitle) => ({
              label: jobTitle,

              value: jobTitle,
            }))}
            style={{
              width: "100%",
            }}
          />
        </Col>

        <Col
          xs={24}
          md={4}
          style={{
            display: "flex",

            alignItems: "end",
          }}
        >
          <Button size="large" block>
            Load Analytics
          </Button>
        </Col>
      </Row>
    </Card>
  );
}
