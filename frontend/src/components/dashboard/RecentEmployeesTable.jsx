import { Avatar, Card, Empty, Space, Table, Tag, Typography } from "antd";

import formatDate from "../../utils/formatDate";

import formatLabel from "../../utils/formatLabel";

const { Title, Text } = Typography;

const STATUS_COLORS = {
  FULL_TIME: "green",
  PART_TIME: "blue",
  CONTRACT: "orange",
  INTERN: "default",
};

function getInitials(name = "") {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function RecentEmployeesTable({ employees, loading }) {
  const columns = [
    {
      title: "Employee",
      key: "employee",
      render: (_, employee) => (
        <Space
          size={14}
          style={{
            alignItems: "center",
          }}
        >
          <Avatar
            size={46}
            style={{
              backgroundColor: "#eef2ff",
              color: "#4338ca",
              fontWeight: 700,
              fontSize: 15,
              border: "1px solid #c7d2fe",
              flexShrink: 0,
            }}
          >
            {getInitials(employee.full_name)}
          </Avatar>

          <div>
            <Text
              strong
              style={{
                display: "block",
                fontSize: 14,
                color: "#0f172a",
                marginBottom: 2,
              }}
            >
              {formatLabel(employee.full_name)}
            </Text>

            <Text
              type="secondary"
              style={{
                fontSize: 12,
              }}
            >
              {employee.email}
            </Text>
          </div>
        </Space>
      ),
    },

    {
      title: "Job Title",
      dataIndex: "job_title",
      key: "job_title",
      render: (value) => (
        <Text
          style={{
            fontSize: 13,
          }}
        >
          {formatLabel(value)}
        </Text>
      ),
    },

    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (value) => (
        <Text
          style={{
            fontSize: 13,
          }}
        >
          {formatLabel(value)}
        </Text>
      ),
    },

    {
      title: "Status",
      dataIndex: "employment_status",
      key: "employment_status",
      render: (status) => (
        <Tag
          color={STATUS_COLORS[status]}
          style={{
            borderRadius: 999,
            paddingInline: 12,
            paddingBlock: 2,
            fontWeight: 600,
            fontSize: 12,
            border: "none",
          }}
        >
          {formatLabel(status)}
        </Tag>
      ),
    },

    {
      title: "Date Joined",
      dataIndex: "date_of_joining",
      key: "date_of_joining",
      render: (value) => (
        <Text
          style={{
            fontSize: 13,
          }}
        >
          {formatDate(value)}
        </Text>
      ),
    },
  ];

  return (
    <Card
      variant="borderless"
      style={{
        borderRadius: 28,
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
      }}
      bodyStyle={{
        padding: "28px 28px 20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: 24,
        }}
      >
        <Title
          level={4}
          style={{
            margin: 0,
            marginBottom: 6,
            color: "#0f172a",
          }}
        >
          Recent Employee Activity
        </Title>

        <Text
          type="secondary"
          style={{
            fontSize: 14,
          }}
        >
          Latest workforce onboarding activity across the organization.
        </Text>
      </div>

      {/* Table */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={employees}
        loading={loading}
        pagination={false}
        size="middle"
        locale={{
          emptyText: (
            <Empty
              description="No recent employees found"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
        style={{
          marginTop: 4,
        }}
        rowClassName={() => "recent-employee-row"}
      />

      {/* Bottom Spacer */}
      <div
        style={{
          height: 6,
        }}
      />
    </Card>
  );
}
