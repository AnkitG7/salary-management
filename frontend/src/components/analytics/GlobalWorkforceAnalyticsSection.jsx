import { Card, Col, Empty, Row, Typography, theme } from "antd";

import {
  Bar,
  BarChart,
  CartesianGrid,
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

const GRADIENTS = [
  ["#2563eb", "#1d4ed8"],
  ["#3b82f6", "#2563eb"],
  ["#60a5fa", "#3b82f6"],
  ["#6366f1", "#4f46e5"],
  ["#818cf8", "#6366f1"],
  ["#8b5cf6", "#7c3aed"],
  ["#a78bfa", "#8b5cf6"],
  ["#c4b5fd", "#a78bfa"],
];

// function formatLabel(value = "") {
//   return String(value)
//     .toLowerCase()
//     .split("_")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// }

function formatLabel(value = "") {
  return String(value)
    .toLowerCase()
    .split(/[_\s]+/) // Splits the string by spaces or underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function GlobalWorkforceAnalyticsSection({
  employmentStatusData = [],
  countryDistributionData = [],
  jobTitleDistributionData = [],
}) {
  const { token } = theme.useToken();
  const tooltipStyle = {
    borderRadius: 18,
    // border: "1px solid #e2e8f0",
    border: `1px solid ${token.colorBorderSecondary}`,
    // boxShadow: "0 12px 32px rgba(15,23,42,0.08)",
    boxShadow: token.boxShadowSecondary,
    // background: "#ffffff",
    background: token.colorBgElevated,
    color: token.colorText,
    padding: "12px 14px",
  };
  const hasData =
    employmentStatusData.length ||
    countryDistributionData.length ||
    jobTitleDistributionData.length;

  if (!hasData) {
    return (
      <Card
        variant="borderless"
        style={{
          borderRadius: 32,
          // background: "#ffffff",
          background: token.colorBgContainer,
          // background: token.colorBgContainer,
          // border: "1px solid rgba(226,232,240,0.8)",
          border: `1px solid ${token.colorBorderSecondary}`,
          // boxShadow: "0 10px 40px rgba(15,23,42,0.06)",
          boxShadow: token.boxShadowSecondary,
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
      variant="borderless"
      style={{
        borderRadius: 32,
        // background: "#ffffff",
        background: token.colorBgContainer,
        // border: "1px solid rgba(226,232,240,0.8)",
        border: `1px solid ${token.colorBorderSecondary}`,
        // border: `1px solid ${token.colorBorderSecondary}`,
        // boxShadow: "0 10px 40px rgba(15,23,42,0.06)",
        boxShadow: token.boxShadowSecondary,
        overflow: "hidden",
      }}
      styles={{
        body: {
          padding: 32,
        },
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: 36,
        }}
      >
        <Title
          level={2}
          style={{
            marginBottom: 8,
            // color: "#0f172a",
            color: token.colorText,
            fontWeight: 700,
            letterSpacing: "-0.8px",
          }}
        >
          Global Workforce Analytics
        </Title>

        <Text
          style={{
            // color: "#64748b",
            color: token.colorTextDescription,
            fontSize: 15,
          }}
        >
          Workforce distribution and organizational insights across all
          countries.
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} xl={12}>
          <Card
            title={
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  // color: "#0f172a",
                  color: token.colorText,
                  letterSpacing: "-0.3px",
                }}
              >
                Employment Type Distribution
              </span>
            }
            variant="borderless"
            style={{
              borderRadius: 24,
              // background: "#ffffff",
              background: token.colorBgContainer,
              // border: "1px solid rgba(226,232,240,0.7)",
              border: `1px solid ${token.colorBorderSecondary}`,
              // boxShadow: "0 8px 28px rgba(15,23,42,0.05)",
              boxShadow: token.boxShadowSecondary,
              height: "100%",
            }}
          >
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <defs>
                  {GRADIENTS.map((gradient, index) => (
                    <linearGradient
                      key={index}
                      id={`pieGradient-${index}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={gradient[0]} />

                      <stop offset="100%" stopColor={gradient[1]} />
                    </linearGradient>
                  ))}
                </defs>

                <Pie
                  data={employmentStatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={78}
                  outerRadius={118}
                  paddingAngle={4}
                  animationDuration={1000}
                >
                  {employmentStatusData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={`url(#pieGradient-${index % GRADIENTS.length})`}
                    />
                  ))}
                </Pie>

                {/* <Tooltip contentStyle={tooltipStyle} /> */}
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{
                    color: token.colorText,
                  }}
                  itemStyle={{
                    color: token.colorText,
                  }}
                  formatter={(value, name) => [
                    value.toLocaleString(),
                    formatLabel(name),
                  ]}
                />

                <Legend
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{
                    paddingTop: 16,
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                  formatter={(value) => formatLabel(value)}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Employees By Country */}
        <Col xs={24} xl={12}>
          <Card
            title={
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  // color: "#0f172a",
                  color: token.colorText,
                  letterSpacing: "-0.3px",
                }}
              >
                Employees By Country
              </span>
            }
            variant="borderless"
            style={{
              borderRadius: 24,
              // background: "#ffffff",
              background: token.colorBgContainer,
              // border: "1px solid rgba(226,232,240,0.7)",
              border: `1px solid ${token.colorBorderSecondary}`,
              // boxShadow: "0 8px 28px rgba(15,23,42,0.05)",
              boxShadow: token.boxShadowSecondary,
              height: "100%",
            }}
          >
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={countryDistributionData}
                margin={{
                  top: 12,
                  right: 12,
                  left: -12,
                  bottom: 24,
                }}
              >
                <defs>
                  {GRADIENTS.map((gradient, index) => (
                    <linearGradient
                      key={index}
                      id={`barGradient-${index}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={gradient[0]} />

                      <stop offset="100%" stopColor={gradient[1]} />
                    </linearGradient>
                  ))}
                </defs>

                <CartesianGrid
                  strokeDasharray="3 6"
                  vertical={false}
                  // stroke="#e2e8f0"
                  stroke={token.colorBorderSecondary}
                />

                <XAxis
                  dataKey="country"
                  tickFormatter={formatLabel}
                  angle={-12}
                  textAnchor="end"
                  interval={0}
                  height={60}
                  tick={{
                    // fill: "#64748b",
                    fill: token.colorTextSecondary,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tick={{
                    // fill: "#94a3b8",
                    fill: token.colorTextSecondary,
                    fontSize: 12,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{
                    color: token.colorText,
                  }}
                  itemStyle={{
                    color: token.colorText,
                  }}
                  labelFormatter={(label) => formatLabel(label)}
                  formatter={(value) => [
                    `${value.toLocaleString()} Employees`,
                    "Workforce",
                  ]}
                />

                <Bar
                  dataKey="count"
                  radius={[14, 14, 0, 0]}
                  barSize={46}
                  animationDuration={1000}
                >
                  {countryDistributionData.map((entry, index) => (
                    <Cell
                      key={entry.country}
                      fill={`url(#barGradient-${index % GRADIENTS.length})`}
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
            {/* Left */}
            <Col xs={24} xl={12}>
              <Card
                title={
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      // color: "#0f172a",
                      color: token.colorText,
                      letterSpacing: "-0.3px",
                    }}
                  >
                    Employees By Job Title
                  </span>
                }
                variant="borderless"
                style={{
                  borderRadius: 24,
                  // background: "#ffffff",
                  background: token.colorBgContainer,
                  // border: "1px solid rgba(226,232,240,0.7)",
                  border: `1px solid ${token.colorBorderSecondary}`,
                  // boxShadow: "0 8px 28px rgba(15,23,42,0.05)",
                  boxShadow: token.boxShadowSecondary,
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
                      left: 72,
                      bottom: 8,
                    }}
                  >
                    <defs>
                      {GRADIENTS.map((gradient, index) => (
                        <linearGradient
                          key={index}
                          id={`jobGradient-${index}`}
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop offset="0%" stopColor={gradient[0]} />

                          <stop offset="100%" stopColor={gradient[1]} />
                        </linearGradient>
                      ))}
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 6"
                      horizontal={false}
                      stroke={token.colorBorderSecondary}
                    />

                    <XAxis
                      type="number"
                      tick={{
                        // fill: "#94a3b8",
                        fill: token.colorTextSecondary,
                        fontSize: 12,
                      }}
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      type="category"
                      dataKey="job_title"
                      width={180}
                      tickFormatter={formatLabel}
                      tick={{
                        // fill: "#64748b",
                        fill: token.colorTextSecondary,
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                      tickLine={false}
                      axisLine={false}
                    />

                    {/* <Tooltip contentStyle={tooltipStyle} /> */}
                    <Tooltip
                      contentStyle={tooltipStyle}
                      labelStyle={{
                        color: token.colorText,
                      }}
                      itemStyle={{
                        color: token.colorText,
                      }}
                      labelFormatter={(label) => formatLabel(label)}
                    />

                    <Bar
                      dataKey="count"
                      radius={[0, 12, 12, 0]}
                      barSize={28}
                      animationDuration={1000}
                    >
                      {jobTitleDistributionData.map((entry, index) => (
                        <Cell
                          key={entry.job_title}
                          fill={`url(#jobGradient-${index % GRADIENTS.length})`}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            {/* Right */}
            <Col xs={24} xl={12}>
              <Card
                title={
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      // color: "#0f172a",
                      color: token.colorText,
                      letterSpacing: "-0.3px",
                    }}
                  >
                    Job Title Distribution
                  </span>
                }
                variant="borderless"
                styles={{
                  body: {
                    position: "relative",
                  },
                }}
                style={{
                  borderRadius: 24,
                  // background: "#ffffff",
                  background: token.colorBgContainer,
                  // border: "1px solid rgba(226,232,240,0.7)",
                  border: `1px solid ${token.colorBorderSecondary}`,
                  // boxShadow: "0 8px 28px rgba(15,23,42,0.05)",
                  boxShadow: token.boxShadowSecondary,
                  height: "100%",
                }}
              >
                <ResponsiveContainer width="100%" height={420}>
                  <PieChart>
                    <defs>
                      {GRADIENTS.map((gradient, index) => (
                        <linearGradient
                          key={index}
                          id={`distributionGradient-${index}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor={gradient[0]} />

                          <stop offset="100%" stopColor={gradient[1]} />
                        </linearGradient>
                      ))}
                    </defs>

                    <Pie
                      data={jobTitleDistributionData}
                      dataKey="count"
                      nameKey="job_title"
                      innerRadius={92}
                      outerRadius={138}
                      paddingAngle={3}
                      animationDuration={1000}
                    >
                      {jobTitleDistributionData.map((entry, index) => (
                        <Cell
                          key={entry.job_title}
                          fill={`url(#distributionGradient-${
                            index % GRADIENTS.length
                          })`}
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      contentStyle={tooltipStyle}
                      labelStyle={{
                        color: token.colorText,
                      }}
                      itemStyle={{
                        color: token.colorText,
                      }}
                      formatter={(value, name) => [
                        value.toLocaleString(),
                        formatLabel(name),
                      ]}
                    />

                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      iconType="circle"
                      iconSize={10}
                      wrapperStyle={{
                        paddingLeft: 24,
                        fontSize: 14,
                        fontWeight: 500,
                      }}
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

                {/* Center */}
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
                    style={{
                      fontSize: 13,
                      letterSpacing: "0.4px",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      // color: "#94a3b8",
                      color: token.colorTextSecondary,
                      display: "block",
                    }}
                  >
                    Total Employees
                  </Text>

                  <div
                    style={{
                      fontSize: 42,
                      fontWeight: 800,
                      lineHeight: 1.1,
                      letterSpacing: "-1px",
                      // color: "#0f172a",
                      color: token.colorText,
                    }}
                  >
                    {totalEmployees.toLocaleString()}
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
