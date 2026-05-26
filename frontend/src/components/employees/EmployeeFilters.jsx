import { Col, Row, Select, theme } from "antd";

import { useEffect, useState } from "react";

import formatLabel from "../../utils/formatLabel";

import { getFilterValues } from "../../api/employees";

export default function EmployeeFilters({ queryParams, setQueryParams, filtersRefreshKey, }) {
  const { token } = theme.useToken();

  const [countries, setCountries] = useState([]);

  const [jobTitles, setJobTitles] = useState([]);

  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    async function loadFilters() {
      try {
        const [countryValues, jobTitleValues, currencyValues] =
          await Promise.all([
            getFilterValues("country"),

            getFilterValues("job_title"),

            getFilterValues("currency"),
          ]);

        setCountries(countryValues || []);
        if (
          queryParams.country &&
          !countryValues.includes(queryParams.country)
        ) {
          updateFilter("country", "");
        }

        setJobTitles(jobTitleValues || []);

        setCurrencies(currencyValues || []);
      } catch (error) {
        console.error("Failed to load filters:", error);
      }
    }

    loadFilters();
  }, [filtersRefreshKey]);

  function updateFilter(field, value) {
    setQueryParams((previous) => ({
      ...previous,

      offset: 0,

      [field]: value,
    }));
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={6}>
        <div
          style={{
            fontSize: 13,

            fontWeight: 600,

            marginBottom: 8,
            color: token.colorText,
          }}
        >
          Country
        </div>

        <Select
          size="large"
          allowClear
          placeholder="All Countries"
          value={queryParams.country || undefined}
          onChange={(value) => updateFilter("country", value || "")}
          options={countries.map((country) => ({
            label: formatLabel(country),

            value: country,
          }))}
          style={{
            width: "100%",

          }}
        />
      </Col>

      <Col xs={24} sm={12} md={6}>
        <div
          style={{
            fontSize: 13,

            fontWeight: 600,

            marginBottom: 8,
            color: token.colorText,
          }}
        >
          Job Title
        </div>

        <Select
          size="large"
          allowClear
          placeholder="All Job Titles"
          value={queryParams.job_title || undefined}
          onChange={(value) => updateFilter("job_title", value || "")}
          options={jobTitles.map((jobTitle) => ({
            label: formatLabel(jobTitle),

            value: jobTitle,
          }))}
          style={{
            width: "100%",

          }}
        />
      </Col>

      <Col xs={24} sm={12} md={6}>
        <div
          style={{
            fontSize: 13,

            fontWeight: 600,

            marginBottom: 8,
            color: token.colorText,
          }}
        >
          Employment Status
        </div>

        <Select
          size="large"
          allowClear
          placeholder="All Statuses"
          value={queryParams.employment_status || undefined}
          onChange={(value) => updateFilter("employment_status", value || "")}
          options={[
            {
              label: "Full Time",

              value: "FULL_TIME",
            },

            {
              label: "Part Time",

              value: "PART_TIME",
            },

            {
              label: "Contract",

              value: "CONTRACT",
            },

            {
              label: "Intern",

              value: "INTERN",
            },
          ]}
          style={{
            width: "100%",
            
          }}
        />
      </Col>

      <Col xs={24} sm={12} md={6}>
        <div
          style={{
            fontSize: 13,

            fontWeight: 600,

            marginBottom: 8,
            color: token.colorText,
          }}
        >
          Currency
        </div>

        <Select
          size="large"
          allowClear
          placeholder="All Currencies"
          value={queryParams.currency || undefined}
          onChange={(value) => updateFilter("currency", value || "")}
          options={currencies.map((currency) => ({
            label: currency,

            value: currency,
          }))}
          style={{
            width: "100%",

          }}
        />
      </Col>
    </Row>
  );
}
