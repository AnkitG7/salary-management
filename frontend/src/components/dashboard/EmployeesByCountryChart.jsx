import { Card, Empty, Typography, theme } from "antd";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const { Title, Text } = Typography;

const BAR_GRADIENTS = [
  ["#2563eb", "#1d4ed8"],
  ["#3b82f6", "#2563eb"],
  ["#60a5fa", "#3b82f6"],
  ["#6366f1", "#4f46e5"],
  ["#818cf8", "#6366f1"],
];

function formatLabel(value = "") {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function EmployeesByCountryChart({ data = [] }) {
  const hasData = Array.isArray(data) && data.length > 0;
  const { token } = theme.useToken();
  return (
    <Card
      variant="borderless"
      style={{
        borderRadius: 32,

        background: token.colorBgContainer,

        border: `1px solid ${token.colorBorderSecondary}`,
        boxShadow: "0 10px 40px rgba(15,23,42,0.06)",
        overflow: "hidden",
        height: "100%",
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
          marginBottom: 32,
        }}
      >
        <Title
          level={3}
          style={{
            margin: 0,

            color: token.colorText,
            fontWeight: 700,
            letterSpacing: "-0.6px",
          }}
        >
          Employees By Country
        </Title>

        <Text
          style={{
            color: token.colorTextDescription,
            fontSize: 15,
            marginTop: 6,
            display: "block",
          }}
        >
          Workforce distribution across global regions and operational markets.
        </Text>
      </div>

      {!hasData ? (
        <Empty description="No country data available" />
      ) : (
        <div
          style={{
            width: "100%",
            height: 380,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 12,
                right: 12,
                left: -16,
                bottom: 18,
              }}
            >
              {/* Gradients */}
              <defs>
                {BAR_GRADIENTS.map((gradient, index) => (
                  <linearGradient
                    key={index}
                    id={`barGradient-${index}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={gradient[0]} stopOpacity={1} />

                    <stop
                      offset="100%"
                      stopColor={gradient[1]}
                      stopOpacity={0.92}
                    />
                  </linearGradient>
                ))}
              </defs>

              {/* Grid */}
              <CartesianGrid
                strokeDasharray="3 6"
                vertical={false}
                stroke={token.colorBorderSecondary}
              />

              {/* X Axis */}
              <XAxis
                dataKey="country"
                tickFormatter={formatLabel}
                tickLine={false}
                axisLine={false}
                interval={0}
                angle={-10}
                textAnchor="end"
                height={60}
                tick={{
                  fill: token.colorTextSecondary,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              />

              {/* Y Axis */}
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: token.colorTextSecondary,
                  fontSize: 12,
                }}
              />

              {/* Tooltip */}
              <Tooltip
                cursor={{
                  fill: "rgba(59,130,246,0.05)",
                }}
                formatter={(value) => [
                  `${value.toLocaleString()} Employees`,
                  "Workforce",
                ]}
                contentStyle={{
                  borderRadius: 20,

                  border: `1px solid ${token.colorBorderSecondary}`,
                  boxShadow: "0 12px 32px rgba(15,23,42,0.08)",
                  background: "#ffffff",
                  background: token.colorBgElevated,
                  padding: "14px 16px",
                }}
                labelStyle={{
                  color: token.colorText,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
                itemStyle={{
                  color: token.colorTextSecondary,
                  fontWeight: 500,
                }}
              />

              {/* Bars */}
              <Bar
                dataKey="count"
                radius={[16, 16, 0, 0]}
                barSize={50}
                animationDuration={1200}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.country}
                    fill={`url(#barGradient-${index % BAR_GRADIENTS.length})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
