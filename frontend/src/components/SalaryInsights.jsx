import { Card, Col, Row, Statistic } from "antd";

import formatSalary from "../utils/formatSalary";

export default function SalaryInsights({ insights }) {
  return (
    <Row
      gutter={[16, 16]}
      style={{
        marginBottom: 24,
      }}
    >
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Average Salary"
            value={formatSalary(insights.average_salary, insights.currency)}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Minimum Salary"
            value={formatSalary(insights.minimum_salary, insights.currency)}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Maximum Salary"
            value={formatSalary(insights.maximum_salary, insights.currency)}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic title="Total Employees" value={insights.total_employees} />
        </Card>
      </Col>
    </Row>
  );
}
