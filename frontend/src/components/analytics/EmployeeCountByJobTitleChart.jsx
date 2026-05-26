import { Card, Typography,theme } from "antd";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import formatLabel from "../../utils/formatLabel";

const { Text } = Typography;

export default function EmployeeCountByJobTitleChart({ data }) {
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
        <Text type="secondary">Hiring Composition</Text>

        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginTop: 4,
            color: token.colorText,
          }}
        >
          Employees By Job Title
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={token.colorBorderSecondary}
          />

          {/* <XAxis dataKey="job_title" tickFormatter={formatLabel} /> */}
          <XAxis
            dataKey="job_title"
            tickFormatter={formatLabel}
            tick={{
              fill: token.colorTextSecondary,
            }}
          />

          <YAxis
            tick={{
              fill: token.colorTextSecondary,
            }}
          />

          <Tooltip />

          <Bar dataKey="count" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
