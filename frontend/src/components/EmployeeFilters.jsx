import { useEffect } from "react";

import { useState } from "react";

import { Row, Col, Select } from "antd";

import { getFilterValues } from "../api/employees";

export default function EmployeeFilters({ queryParams, setQueryParams }) {
  const [countries, setCountries] = useState([]);

  const [jobTitles, setJobTitles] = useState([]);

  const [employmentStatuses, setEmploymentStatuses] = useState([]);

  const [currencies, setCurrencies] = useState([]);

  async function loadFilters() {
    const [
      countriesData,
      jobTitlesData,
      employmentStatusesData,
      currenciesData,
    ] = await Promise.all([
      getFilterValues("country"),

      getFilterValues("job_title"),

      getFilterValues("employment_status"),

      getFilterValues("currency"),
    ]);

    setCountries(countriesData);

    setJobTitles(jobTitlesData);

    setEmploymentStatuses(employmentStatusesData);

    setCurrencies(currenciesData);
  }

  useEffect(() => {
    loadFilters();
  }, []);

  function updateFilter(field, value) {
    setQueryParams((previous) => ({
      ...previous,

      [field]: value || "",

      offset: 0,
    }));
  }

  return (
    <Row
      gutter={16}
      style={{
        marginBottom: 16,
      }}
    >
      <Col>
        <Select
          placeholder="Country"
          allowClear
          style={{
            width: 180,
          }}
          value={queryParams.country || undefined}
          onChange={(value) => updateFilter("country", value)}
          options={countries.map((country) => ({
            label: country,
            value: country,
          }))}
        />
      </Col>

      <Col>
        <Select
          placeholder="Job Title"
          allowClear
          style={{
            width: 220,
          }}
          value={queryParams.job_title || undefined}
          onChange={(value) => updateFilter("job_title", value)}
          options={jobTitles.map((jobTitle) => ({
            label: jobTitle,
            value: jobTitle,
          }))}
        />
      </Col>

      <Col>
        <Select
          placeholder="Status"
          allowClear
          style={{
            width: 180,
          }}
          value={queryParams.employment_status || undefined}
          onChange={(value) => updateFilter("employment_status", value)}
          options={employmentStatuses.map((status) => ({
            label: status,
            value: status,
          }))}
        />
      </Col>

      <Col>
        <Select
          placeholder="Currency"
          allowClear
          style={{
            width: 150,
          }}
          value={queryParams.currency || undefined}
          onChange={(value) => updateFilter("currency", value)}
          options={currencies.map((currency) => ({
            label: currency,
            value: currency,
          }))}
        />
      </Col>
    </Row>
  );
}
