import { Card, Empty } from "antd";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function EmployeesByCountryChart({ data = [] }) {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <Card
      title="Employees By Country"
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
      {!hasData ? (
        <Empty description="No country data available" />
      ) : (
        <div
          style={{
            width: "100%",
            height: 360,
          }}
        >
          <ResponsiveContainer width="100%" height={360}>
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="country"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>
                  value
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
                }
              />

              <YAxis tickLine={false} axisLine={false} />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#1677ff"
                radius={[8, 8, 0, 0]}
                barSize={42}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
