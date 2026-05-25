import { Card, Col, Row, Statistic, Typography, theme } from "antd";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function DashboardStats({
  totalEmployees,
  employmentStats = {},
}) {
  const { token } = theme.useToken();

  const cards = [
    {
      title: "Total Employees",
      value: totalEmployees || 0,
      description: "Active workforce",
      icon: <TeamOutlined style={{ color: token.colorPrimary }} />,
    },
    {
      title: "Full Time Employees",
      value: employmentStats?.FULL_TIME || 0,
      description: "Full time workforce",
      icon: <UserOutlined />,
    },
    {
      title: "Part Time Employees",
      value: employmentStats?.PART_TIME || 0,
      description: "Part time workforce",
      icon: <UserOutlined />,
    },
    {
      title: "Contract Employees",
      value: employmentStats?.CONTRACT || 0,
      description: "Contract workforce",
      icon: <UserOutlined />,
    },
    {
      title: "Intern Employees",
      value: employmentStats?.INTERN || 0,
      description: "Intern workforce",
      icon: <UserOutlined />,
    },
  ];

  return (
    <Row gutter={[16, 16]} justify="center">
      {cards.map((card) => (
        <Col
          xs={24}
          sm={12}
          lg={8}
          xl={4}
          key={card.title}
          style={{ display: "flex" }} // Forces equal heights on grid columns
        >
          <Card
            bordered={false}
            style={{
              borderRadius: 20,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              width: "100%", // Ensures card stretches to column width
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // Pushes description to bottom
            }}
            bodyStyle={{
              padding: 24,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 16,
                }}
              >
                <Text
                  type="secondary"
                  style={{
                    fontSize: 14,
                  }}
                >
                  {card.title}
                </Text>

                <div
                  style={{
                    fontSize: 20,
                    color: token.colorTextDescription,
                  }}
                >
                  {card.icon}
                </div>
              </div>

              <Statistic
                value={card.value}
                valueStyle={{
                  fontSize: 30,
                  fontWeight: 700,
                }}
              />
            </div>

            <Text
              type="secondary"
              style={{
                fontSize: 13,
                marginTop: 12, // Spaces out the description cleanly
              }}
            >
              {card.description}
            </Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
