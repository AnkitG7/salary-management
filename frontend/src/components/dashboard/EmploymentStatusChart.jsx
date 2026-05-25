import { Card, Empty } from "antd";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = ["#1677ff", "#52c41a", "#faad14", "#ff4d4f"];

export default function EmploymentStatusChart({ employmentStats = {} }) {
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
      title="Employment Status Distribution"
      variant="borderless"
      style={{
        borderRadius: 20,

        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",

        height: "100%",
      }}
      styles={{
        body: {
          padding: 24,
        },
      }}
    >
      {totalEmployees === 0 ? (
        <Empty description="No employment data available" />
      ) : (
        <div
          style={{
            width: "100%",
            height: 360,
          }}
        >
          <ResponsiveContainer width="100%" height={360}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />

              <Legend verticalAlign="bottom" />

              <text
                x="50%"
                y="48%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: 28,

                  fontWeight: 700,

                  fill: "#111827",
                }}
              >
                {totalEmployees.toLocaleString()}
              </text>

              <text
                x="50%"
                y="57%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: 14,

                  fill: "#6b7280",
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
