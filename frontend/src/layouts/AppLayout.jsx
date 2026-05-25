import { Layout, Menu, Typography } from "antd";

import {
  DashboardOutlined,
  TeamOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

const { Title } = Typography;

export default function AppLayout() {
  const navigate = useNavigate();

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
          background: "#ffffff",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #f0f0f0",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Title
          level={3}
          style={{
            margin: 0,
          }}
        >
          SalaryManage
        </Title>

        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{
            borderBottom: "none",
            minWidth: 320,
            justifyContent: "flex-end",
          }}
          items={[
            {
              key: "/dashboard",

              icon: <DashboardOutlined />,

              label: "Dashboard",

              onClick: () => navigate("/dashboard"),
            },

            {
              key: "/employees",

              icon: <TeamOutlined />,

              label: "Employees",

              onClick: () => navigate("/employees"),
            },

            // {
            //   key: "/analytics",

            //   icon: <BarChartOutlined />,

            //   label: "Analytics",

            //   onClick: () => navigate("/analytics"),
            // },
          ]}
        />
      </Header>

      <Content
        style={{
          padding: 24,
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
