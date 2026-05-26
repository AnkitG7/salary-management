import { Card, Col, Row, Statistic,theme } from "antd";

import formatSalary from "../../utils/formatSalary";

export default function SalaryInsights({ insights }) {
  const { token } = theme.useToken();
  return (
    <Row
      gutter={[16, 16]}
      style={{
        marginBottom: 24,
      }}
    >
      <Col xs={24} sm={12} lg={6}>
        <Card
          bordered={false}
          style={{
            borderRadius: 20,

            background: token.colorBgContainer,

            boxShadow: token.boxShadowSecondary,
          }}
        >
          <Statistic
            title="Average Salary"
            valueStyle={{
              color: token.colorText,
            }}
            value={formatSalary(insights.average_salary, insights.currency)}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card
          bordered={false}
          style={{
            borderRadius: 20,

            background: token.colorBgContainer,

            boxShadow: token.boxShadowSecondary,
          }}
        >
          <Statistic
            title="Minimum Salary"
            valueStyle={{
              color: token.colorText,
            }}
            value={formatSalary(insights.minimum_salary, insights.currency)}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card
          bordered={false}
          style={{
            borderRadius: 20,

            background: token.colorBgContainer,

            boxShadow: token.boxShadowSecondary,
          }}
        >
          <Statistic
            title="Maximum Salary"
            valueStyle={{
              color: token.colorText,
            }}
            value={formatSalary(insights.maximum_salary, insights.currency)}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card
          bordered={false}
          style={{
            borderRadius: 20,

            background: token.colorBgContainer,

            boxShadow: token.boxShadowSecondary,
          }}
        >
          <Statistic
            title="Total Employees"
            valueStyle={{
              color: token.colorText,
            }}
            value={insights.total_employees}
          />
        </Card>
      </Col>
    </Row>
  );
}
