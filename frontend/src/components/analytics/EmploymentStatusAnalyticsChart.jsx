import { Card, Typography,theme } from "antd";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import formatLabel from "../../utils/formatLabel";

const { Text } = Typography;

const COLORS = ["#1677ff", "#52c41a", "#faad14", "#ff4d4f"];

export default function EmploymentStatusAnalyticsChart({ data }) {
  const { token } = theme.useToken();
  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 20,
        // boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        boxShadow: token.boxShadowSecondary,
        height: "100%",
      }}
    >
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Text type="secondary">Workforce Structure</Text>

        <div
          style={{
            fontSize: 20,

            fontWeight: 700,

            marginTop: 4,
            color: token.colorText,
          }}
        >
          Employment Distribution
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          {/* <Tooltip formatter={(value, name) => [value, formatLabel(name)]} /> */}
          <Tooltip
            formatter={(value, name) => [value, formatLabel(name)]}
            contentStyle={{
              background: token.colorBgElevated,

              border: `1px solid ${token.colorBorderSecondary}`,
            }}
          />

          <Legend
            wrapperStyle={{
              color: token.colorTextSecondary,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
