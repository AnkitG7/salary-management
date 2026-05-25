import { Card, Typography } from "antd";

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

export default function EmployeeCountByCountryChart({ data }) {
  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 20,

        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",

        height: "100%",
      }}
    >
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <Text type="secondary">Workforce Distribution</Text>

        <div
          style={{
            fontSize: 20,

            fontWeight: 700,

            marginTop: 4,
          }}
        >
          Employees By Country
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="country" tickFormatter={formatLabel} />

          <YAxis />

          <Tooltip />

          <Bar dataKey="count" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
