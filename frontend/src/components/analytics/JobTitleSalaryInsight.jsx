import { Card, Statistic, Tag, Typography } from "antd";

import { RiseOutlined } from "@ant-design/icons";

import formatLabel from "../../utils/formatLabel";

import formatSalary from "../../utils/formatSalary";

const { Title, Text } = Typography;

export default function JobTitleSalaryInsight({ data }) {
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
          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          marginBottom: 20,
        }}
      >
        <div>
          <Text type="secondary">Average Salary For Job Title</Text>

          <Title
            level={4}
            style={{
              marginTop: 6,

              marginBottom: 0,
            }}
          >
            {formatLabel(data.job_title)}
          </Title>
        </div>

        <Tag
          color="blue"
          bordered={false}
          style={{
            paddingInline: 12,

            borderRadius: 999,
          }}
        >
          {formatLabel(data.country)}
        </Tag>
      </div>

      <Statistic
        title="Average Compensation"
        value={Number(data.average_salary || 0).toFixed(2)}
        formatter={(value) => formatSalary(value, data.currency)}
        prefix={<RiseOutlined />}
        valueStyle={{
          fontSize: 32,

          fontWeight: 700,
        }}
      />
    </Card>
  );
}
