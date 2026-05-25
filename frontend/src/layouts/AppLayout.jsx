import { Layout, Menu } from "antd";

import {
  DashboardOutlined,
  TeamOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Content } = Layout;

export default function AppLayout() {
  const location = useLocation();

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <Header
        style={{
          background: "transparent",
          padding: "20px 24px 0",
          height: "auto",
          lineHeight: "normal",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: 24,
            padding: "18px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 6px 24px rgba(15, 23, 42, 0.06)",
            border: "1px solid rgba(226,232,240,0.9)",
          }}
        >
          {/* Left Side */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            {/* Logo */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                background: "linear-gradient(135deg, #1677ff 0%, #6941c6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: 22,
                fontWeight: 700,
                boxShadow: "0 10px 24px rgba(22,119,255,0.25)",
              }}
            >
              S
            </div>

            {/* Brand */}
            <div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#0f172a",
                  lineHeight: 1,
                  letterSpacing: "-0.6px",
                }}
              >
                SalaryManage
              </div>

              <div
                style={{
                  marginTop: 4,
                  fontSize: 13,
                  color: "#64748b",
                  fontWeight: 500,
                }}
              >
                Workforce Intelligence Platform
              </div>
            </div>
          </div>

          {/* Navigation */}
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            style={{
              border: "none",
              background: "transparent",
              minWidth: 420,
              display: "flex",
              justifyContent: "flex-end",
              fontSize: 15,
              fontWeight: 600,
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
        </div>
      </Header>

      <Content
        style={{
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
