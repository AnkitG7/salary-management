import { Card, Col, Empty, Row, Typography } from "antd";

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const { Title, Text } = Typography;

const COLORS = [
  "#1677ff",
  "#52c41a",
  "#faad14",
  "#ff4d4f",
  "#722ed1",
  "#13c2c2",
  "#eb2f96",
  "#fa8c16",
];

function formatLabel(value = "") {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function GlobalWorkforceAnalyticsSection({
  employmentStatusData = [],
  countryDistributionData = [],
  jobTitleDistributionData = [],
}) {
  /*
    Empty State Protection
  */

  if (
    !employmentStatusData.length &&
    !countryDistributionData.length &&
    !jobTitleDistributionData.length
  ) {
    return (
      <Card
        bordered={false}
        style={{
          borderRadius: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <Empty description="No workforce analytics available" />
      </Card>
    );
  }

  const totalEmployees = jobTitleDistributionData.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 20,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: 32,
        }}
      >
        <Title
          level={3}
          style={{
            marginBottom: 4,
          }}
        >
          Global Workforce Analytics
        </Title>

        <Text type="secondary">
          Workforce distribution and organizational insights across all
          countries.
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* Employment Type Distribution */}
        <Col xs={24} xl={12}>
          <Card
            title="Employment Type Distribution"
            bordered={false}
            style={{
              borderRadius: 16,
              background: "#fafafa",
              height: "100%",
            }}
          >
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={employmentStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                >
                  {employmentStatusData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend formatter={(value) => formatLabel(value)} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Employees By Country */}
        <Col xs={24} xl={12}>
          <Card
            title="Employees By Country"
            bordered={false}
            style={{
              borderRadius: 16,
              background: "#fafafa",
              height: "100%",
            }}
          >
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={countryDistributionData}
                margin={{
                  top: 12,
                  right: 12,
                  left: 0,
                  bottom: 24,
                }}
              >
                <XAxis
                  dataKey="country"
                  tickFormatter={formatLabel}
                  angle={-15}
                  textAnchor="end"
                  interval={0}
                  height={60}
                />

                <YAxis />

                <Tooltip />

                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {countryDistributionData.map((entry, index) => (
                    <Cell
                      key={entry.country}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Job Title Analytics */}
        <Col xs={24}>
          <Row gutter={[24, 24]}>
            {/* Left Side */}
            <Col xs={24} xl={12}>
              <Card
                title="Employees By Job Title"
                bordered={false}
                style={{
                  borderRadius: 16,
                  background: "#fafafa",
                  height: "100%",
                }}
              >
                <ResponsiveContainer width="100%" height={420}>
                  <BarChart
                    layout="vertical"
                    data={jobTitleDistributionData}
                    margin={{
                      top: 8,
                      right: 24,
                      left: 64,
                      bottom: 8,
                    }}
                  >
                    <XAxis type="number" />

                    <YAxis
                      type="category"
                      dataKey="job_title"
                      width={180}
                      tickFormatter={formatLabel}
                    />

                    <Tooltip />

                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {jobTitleDistributionData.map((entry, index) => (
                        <Cell
                          key={entry.job_title}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            {/* Right Side */}
            <Col xs={24} xl={12}>
              <Card
                title="Job Title Distribution"
                bodyStyle={{
                  position: "relative",
                }}
                bordered={false}
                style={{
                  borderRadius: 16,
                  background: "#fafafa",
                  height: "100%",
                }}
              >
                <ResponsiveContainer width="100%" height={420}>
                  <PieChart>
                    <Pie
                      data={jobTitleDistributionData}
                      dataKey="count"
                      nameKey="job_title"
                      innerRadius={85}
                      outerRadius={130}
                      paddingAngle={3}
                    >
                      {jobTitleDistributionData.map((entry, index) => (
                        <Cell
                          key={entry.job_title}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      formatter={(value) => value.toLocaleString()}
                      labelFormatter={(label) => formatLabel(label)}
                    />

                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      iconType="circle"
                      iconSize={10}
                      formatter={(value, entry, index) => {
                        const current =
                          jobTitleDistributionData[index]?.count || 0;

                        const percentage = (
                          (current / totalEmployees) *
                          100
                        ).toFixed(1);

                        return `${formatLabel(value)} (${percentage}%)`;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Center Content */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "32%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    pointerEvents: "none",
                  }}
                >
                  <Text
                    type="secondary"
                    style={{
                      fontSize: 14,
                      display: "block",
                    }}
                  >
                    Total Employees
                  </Text>

                  <div
                    style={{
                      fontSize: 34,
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    {totalEmployees.toLocaleString()}
                  </div>
                </div>

                {/* Center Content
                <div
                  style={{
                    position: "relative",
                    marginTop: "-240px",
                    textAlign: "center",
                    pointerEvents: "none",
                  }}
                >
                  <Text
                    type="secondary"
                    style={{
                      fontSize: 14,
                    }}
                  >
                    Total Employees
                  </Text>

                  <div
                    style={{
                      fontSize: 34,
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    {totalEmployees.toLocaleString()}
                  </div>
                </div> */}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
