import { Card, Statistic, Tag, Typography, theme } from "antd";

import { RiseOutlined } from "@ant-design/icons";

import formatLabel from "../../utils/formatLabel";

import formatSalary from "../../utils/formatSalary";

const { Title, Text } = Typography;

export default function JobTitleSalaryInsight({ data }) {
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
              color: token.colorText,
              marginBottom: 0,
            }}
          >
            {formatLabel(data.job_title)}
          </Title>
        </div>

        <Tag
          bordered={false}
          style={{
            paddingInline: 12,

            borderRadius: 999,

            background: token.colorPrimaryBg,

            color: token.colorPrimary,
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
          color: token.colorText,
          fontWeight: 700,
        }}
      />
    </Card>
  );
}
