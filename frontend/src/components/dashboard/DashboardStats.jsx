import { Card, Col, Row, Statistic, Typography, theme } from "antd";

import {
  TeamOutlined,
  UserOutlined,
  SolutionOutlined,
  AuditOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const CARD_CONFIGS = [
  {
    title: "Total Employees",
    key: "total",
    description: "Active workforce across all regions",
    icon: <TeamOutlined />,
    gradient: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
    background:
      "linear-gradient(135deg, rgba(37,99,235,0.10) 0%, rgba(59,130,246,0.06) 100%)",
    border: "1px solid rgba(191,219,254,0.8)",
  },

  {
    title: "Full Time",
    key: "FULL_TIME",
    description: "Permanent workforce employees",
    icon: <SolutionOutlined />,
    gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
    background:
      "linear-gradient(135deg, rgba(34,197,94,0.10) 0%, rgba(74,222,128,0.06) 100%)",
    border: "1px solid rgba(187,247,208,0.8)",
  },

  {
    title: "Part Time",
    key: "PART_TIME",
    description: "Flexible workforce employees",
    icon: <UserOutlined />,
    gradient: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
    background:
      "linear-gradient(135deg, rgba(245,158,11,0.10) 0%, rgba(251,191,36,0.06) 100%)",
    border: "1px solid rgba(253,230,138,0.8)",
  },

  {
    title: "Contract",
    key: "CONTRACT",
    description: "External contract workforce",
    icon: <AuditOutlined />,
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    background:
      "linear-gradient(135deg, rgba(139,92,246,0.10) 0%, rgba(167,139,250,0.06) 100%)",
    border: "1px solid rgba(221,214,254,0.8)",
  },

  {
    title: "Intern",
    key: "INTERN",
    description: "Internship and trainee workforce",
    icon: <IdcardOutlined />,
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    background:
      "linear-gradient(135deg, rgba(6,182,212,0.10) 0%, rgba(34,211,238,0.06) 100%)",
    border: "1px solid rgba(165,243,252,0.8)",
  },
];

export default function DashboardStats({
  totalEmployees,
  employmentStats = {},
}) {
  const { token } = theme.useToken();
  const cards = CARD_CONFIGS.map((config) => ({
    ...config,
    value:
      config.key === "total"
        ? totalEmployees || 0
        : employmentStats[config.key] || 0,
  }));

  return (
    <Row gutter={[20, 20]}>
      {cards.map((card) => (
        <Col
          xs={24}
          sm={12}
          lg={8}
          xl={4}
          key={card.title}
          style={{
            display: "flex",
          }}
        >
          <Card
            variant="borderless"
            style={{
              width: "100%",
              borderRadius: 28,
              background: card.background,
              border: card.border,

              boxShadow: token.boxShadowSecondary,
              overflow: "hidden",
            }}
            styles={{
              body: {
                padding: 28,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              },
            }}
          >
            {/* Top */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <div>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",

                    color: token.colorTextSecondary,
                  }}
                >
                  {card.title}
                </Text>

                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  <Text
                    style={{
                      color: token.colorTextDescription,
                      fontSize: 13,
                      lineHeight: 1.5,
                    }}
                  >
                    {card.description}
                  </Text>
                </div>
              </div>

              {/* Icon */}
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 20,
                  background: card.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: 24,
                  flexShrink: 0,
                  boxShadow: "0 10px 24px rgba(15,23,42,0.12)",
                }}
              >
                {card.icon}
              </div>
            </div>

            {/* Statistic */}
            <Statistic
              value={card.value}
              valueStyle={{
                fontSize: 38,
                fontWeight: 800,

                color: token.colorText,
                letterSpacing: "-1px",
                lineHeight: 1,
              }}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
