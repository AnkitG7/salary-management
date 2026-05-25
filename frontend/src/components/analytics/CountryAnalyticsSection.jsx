import { Card, Col, Row, Select, Skeleton, Statistic, Typography } from "antd";

import {
  FallOutlined,
  GlobalOutlined,
  RiseOutlined,
  WalletOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

function formatCountryLabel(value = "") {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function CountryAnalyticsSection({
  countries = [],
  selectedCountry,
  setSelectedCountry,
  salaryInsights,
  loading,
}) {
  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 20,
        marginBottom: 24,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: 24,
        }}
      >
        <Text
          strong
          style={{
            fontSize: 20,
          }}
        >
          Country Based Analytics
        </Text>

        <div>
          <Text type="secondary">
            Salary analytics generated for the selected country.
          </Text>
        </div>
      </div>

      {/* Country Selector */}
      <Row
        gutter={[16, 16]}
        style={{
          marginBottom: 24,
        }}
      >
        <Col xs={24}>
          <Select
            placeholder="Select Country"
            value={selectedCountry}
            onChange={setSelectedCountry}
            style={{
              width: "100%",
            }}
            size="large"
            suffixIcon={<GlobalOutlined />}
            options={countries.map((country) => ({
              label: formatCountryLabel(country),

              value: country,
            }))}
          />
        </Col>
      </Row>

      {/* Loading Skeletons */}
      {loading ? (
        <Row gutter={[16, 16]}>
          {[1, 2, 3].map((item) => (
            <Col xs={24} md={8} key={item}>
              <Card
                bordered={false}
                style={{
                  borderRadius: 16,
                }}
              >
                <Skeleton active />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row gutter={[16, 16]}>
          {/* Average Salary */}
          <Col xs={24} md={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                background: "#f6ffed",
                height: "100%",
              }}
            >
              <Statistic
                title={`Average Salary (${formatCountryLabel(
                  selectedCountry || "-",
                )})`}
                value={salaryInsights?.average_salary || 0}
                precision={2}
                prefix={<WalletOutlined />}
                suffix={salaryInsights?.currency || ""}
              />
            </Card>
          </Col>

          {/* Minimum Salary */}
          <Col xs={24} md={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                background: "#fff7e6",
                height: "100%",
              }}
            >
              <Statistic
                title={`Minimum Salary (${formatCountryLabel(
                  selectedCountry || "-",
                )})`}
                value={salaryInsights?.minimum_salary || 0}
                prefix={<FallOutlined />}
                suffix={salaryInsights?.currency || ""}
              />
            </Card>
          </Col>

          {/* Maximum Salary */}
          <Col xs={24} md={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                background: "#f9f0ff",
                height: "100%",
              }}
            >
              <Statistic
                title={`Maximum Salary (${formatCountryLabel(
                  selectedCountry || "-",
                )})`}
                value={salaryInsights?.maximum_salary || 0}
                prefix={<RiseOutlined />}
                suffix={salaryInsights?.currency || ""}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Footer */}
      <div
        style={{
          marginTop: 20,
        }}
      >
        <Text type="secondary">
          These statistics are calculated only for the selected country.
        </Text>
      </div>
    </Card>
  );
}
