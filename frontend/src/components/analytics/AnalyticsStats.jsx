import { Card, Col, Row, Statistic, Typography ,theme} from "antd";

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
} from "@ant-design/icons";

import formatSalary from "../../utils/formatSalary";

const { Text } = Typography;

export default function AnalyticsStats({ insights }) {
  const { token } = theme.useToken();
  const cards = [
    {
      title: "Average Salary",

      value: insights.average_salary,

      icon: <DollarOutlined />,
    },

    {
      title: "Minimum Salary",

      value: insights.minimum_salary,

      icon: <ArrowDownOutlined />,
    },

    {
      title: "Maximum Salary",

      value: insights.maximum_salary,

      icon: <ArrowUpOutlined />,
    },
  ];

  return (
    <Row
      gutter={[16, 16]}
      style={{
        marginBottom: 24,
      }}
    >
      {cards.map((card) => (
        <Col xs={24} sm={12} lg={8} key={card.title}>
          <Card
            bordered={false}
            style={{
              borderRadius: 20,

              // boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              boxShadow: token.boxShadowSecondary,
            }}
          >
            <div
              style={{
                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: token.colorTextSecondary,
                }}
              >
                {card.title}
              </Text>

              <div
                style={{
                  fontSize: 18,
                  color: token.colorPrimary,
                }}
              >
                {card.icon}
              </div>
            </div>

            <Statistic
              value={Number(card.value || 0).toFixed(2)}
              formatter={(value) => formatSalary(value, insights.currency)}
              valueStyle={{
                fontSize: 28,
                fontWeight: 700,
                color: token.colorText,
              }}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
