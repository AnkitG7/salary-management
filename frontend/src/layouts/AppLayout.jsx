import { Layout, Menu, Typography, Button, Tooltip, theme } from "antd";

import {
  DashboardOutlined,
  TeamOutlined,
  BarChartOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";

import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Content } = Layout;

const { Text } = Typography;

export default function AppLayout({ isDarkMode, setIsDarkMode }) {
  const location = useLocation();

  const { token } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",

        background: token.colorBgLayout,
      }}
    >
      {/* HEADER */}

      <Header
        style={{
          background: "transparent",

          padding: "24px 28px 0",

          height: "auto",

          lineHeight: "normal",
        }}
      >
        <div
          style={{
            background: token.colorBgContainer,

            backdropFilter: "blur(18px)",

            borderRadius: 30,

            padding: "22px 30px",

            display: "flex",

            alignItems: "center",

            justifyContent: "space-between",

            gap: 24,

            border: `1px solid ${token.colorBorderSecondary}`,

            boxShadow: token.boxShadowSecondary,
          }}
        >
          {/* LEFT SIDE */}
          <Link
            to="/dashboard" // This makes the whole area clickable and routes to the dashboard
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              minWidth: 0,
              textDecoration: "none", // Prevents default link underlines
            }}
          >
            {/* LOGO */}
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 20,
                background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: 28,
                fontWeight: 800,
                flexShrink: 0,
                boxShadow: "0 14px 30px rgba(37,99,235,0.30)",
              }}
            >
              S
            </div>

            {/* BRAND */}
            <div style={{ minWidth: 0 }}>
              {" "}
              {/* Wrapper needs to allow shrinking */}
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: token.colorText,
                  lineHeight: 1.2,
                  paddingBottom: 2,
                  letterSpacing: "-1px",
                  whiteSpace: "nowrap",
                  overflow: "hidden", // Hides text that overflows
                  textOverflow: "ellipsis", // Adds "..." when cramped
                }}
              >
                SalaryManage
              </div>
              <Text
                style={{
                  marginTop: 6,
                  display: "block",
                  fontSize: 13,
                  color: token.colorTextSecondary,
                  fontWeight: 500,
                  letterSpacing: "0.2px",
                }}
              >
                Workforce Intelligence Platform
              </Text>
            </div>
          </Link>{" "}
          {/* RIGHT SIDE */}
          <div
            style={{
              display: "flex",

              alignItems: "center",

              gap: 18,
              flex: 1,
              justifyContent: "flex-end",
              minWidth: 0,
            }}
          >
            {/* NAVIGATION */}

            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              style={{
                border: "none",

                background: "transparent",

                fontSize: 15,

                fontWeight: 600,
                flex: 1,
                minWidth: 0,
                justifyContent: "flex-end",
              }}
              items={[
                {
                  key: "/dashboard",

                  icon: <DashboardOutlined />,

                  label: <Link to="/dashboard">Dashboard</Link>,
                },

                {
                  key: "/employees",

                  icon: <TeamOutlined />,

                  label: <Link to="/employees">Employees</Link>,
                },

                {
                  key: "/analytics",

                  icon: <BarChartOutlined />,

                  label: <Link to="/analytics">Analytics</Link>,
                },
              ]}
            />

            {/* THEME TOGGLE */}

            <Tooltip
              title={
                isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              <Button
                type="text"
                onClick={() => setIsDarkMode(!isDarkMode)}
                icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                style={{
                  width: 48,

                  height: 48,

                  borderRadius: 16,

                  fontSize: 18,

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  background: token.colorBgElevated,

                  border: `1px solid ${token.colorBorderSecondary}`,
                }}
              />
            </Tooltip>
          </div>
        </div>
      </Header>

      {/* CONTENT */}

      <Content
        style={{
          padding: "32px 28px 40px",

          background: token.colorBgLayout,
        }}
      >
        <div
          style={{
            maxWidth: 1600,

            margin: "0 auto",

            width: "100%",
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
