import { Card, Empty, Typography, theme } from "antd";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const { Title, Text } = Typography;

const GRADIENTS = [
  ["#2563eb", "#1d4ed8"],
  ["#22c55e", "#16a34a"],
  ["#f59e0b", "#ea580c"],
  ["#ef4444", "#dc2626"],
];

const STATUS_LABELS = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  CONTRACT: "Contract",
  INTERN: "Intern",
};

export default function EmploymentStatusChart({ employmentStats = {} }) {
  const { token } = theme.useToken();

  const data = [
    {
      name: "Full Time",
      value: employmentStats.FULL_TIME || 0,
    },

    {
      name: "Part Time",
      value: employmentStats.PART_TIME || 0,
    },

    {
      name: "Contract",
      value: employmentStats.CONTRACT || 0,
    },

    {
      name: "Intern",
      value: employmentStats.INTERN || 0,
    },
  ];

  const totalEmployees = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card
      variant="borderless"
      style={{
        borderRadius: 32,
        background: token.colorBgContainer,

        border: `1px solid ${token.colorBorderSecondary}`,

        boxShadow: token.boxShadowSecondary,
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
          marginBottom: 28,
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
          Employment Status Distribution
        </Title>

        <Text
          style={{
            color: token.colorTextDescription,
            fontSize: 15,
            marginTop: 6,
            display: "block",
          }}
        >
          Workforce composition across employment categories.
        </Text>
      </div>

      {totalEmployees === 0 ? (
        <Empty description="No employment data available" />
      ) : (
        <div
          style={{
            width: "100%",
            height: 380,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* Gradients */}
              <defs>
                {GRADIENTS.map((gradient, index) => (
                  <linearGradient
                    key={index}
                    id={`employmentGradient-${index}`}
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

              {/* Donut Chart */}
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={88}
                outerRadius={132}
                paddingAngle={4}
                animationDuration={1200}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={`url(#employmentGradient-${
                      index % GRADIENTS.length
                    })`}
                  />
                ))}
              </Pie>

              {/* Tooltip */}
              <Tooltip
                formatter={(value) => [
                  `${value.toLocaleString()} Employees`,
                  "Count",
                ]}
                contentStyle={{
                  borderRadius: 20,

                  border: `1px solid ${token.colorBorderSecondary}`,
                  boxShadow: "0 12px 32px rgba(15,23,42,0.08)",

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

              {/* Legend */}
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={10}
                wrapperStyle={{
                  paddingTop: 16,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              />

              {/* Center Number */}
              <text
                x="50%"
                y="47%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: 42,
                  fontWeight: 800,

                  fill: token.colorText,
                  letterSpacing: "-1px",
                }}
              >
                {totalEmployees.toLocaleString()}
              </text>

              {/* Center Label */}
              <text
                x="50%"
                y="57%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: 13,

                  fill: token.colorTextSecondary,
                  letterSpacing: "0.4px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Employees
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
