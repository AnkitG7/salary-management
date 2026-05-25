import { Avatar, Card, Space, Table, Tag, Typography } from "antd";

import formatDate from "../../utils/formatDate";

import formatLabel from "../../utils/formatLabel";

const { Text } = Typography;

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

export default function RecentEmployeesTable({
  employees,

  loading,
}) {
  const columns = [
    {
      title: "Employee",

      key: "employee",

      render: (_, employee) => (
        <Space size={12}>
          <Avatar
            style={{
              backgroundColor: "#1677ff",

              fontWeight: 600,
            }}
          >
            {getInitials(employee.full_name)}
          </Avatar>

          <div>
            <Text
              strong
              style={{
                display: "block",
              }}
            >
              {formatLabel(employee.full_name)}
            </Text>

            <Text type="secondary">{employee.email}</Text>
          </div>
        </Space>
      ),
    },

    {
      title: "Job Title",

      dataIndex: "job_title",

      key: "job_title",

      render: (value) => formatLabel(value),
    },

    {
      title: "Country",

      dataIndex: "country",

      key: "country",

      render: (value) => formatLabel(value),
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

            paddingInline: 10,
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

      render: (value) => formatDate(value),
    },
  ];

  return (
    <Card
      title="Recent Employee Activity"
      variant="borderless"
      style={{
        borderRadius: 20,

        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={employees}
        loading={loading}
        pagination={false}
        size="middle"
      />
    </Card>
  );
}
