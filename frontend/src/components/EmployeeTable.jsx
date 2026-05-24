import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { deleteEmployee } from "../api/employees";

const STATUS_COLORS = {
  FULL_TIME: "green",

  PART_TIME: "blue",

  CONTRACT: "orange",

  INTERN: "default",
};

export default function EmployeeTable({
  employees,
  total,
  queryParams,
  setQueryParams,
}) {
  const columns = [
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Job Title",
      dataIndex: "job_title",
      key: "job_title",
    },

    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },

    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      render: (salary, record) => `${salary} ${record.currency}`,
    },

    {
      title: "Status",

      dataIndex: "employment_status",

      key: "employment_status",

      render: (status) => <Tag color={STATUS_COLORS[status]}>{status}</Tag>,
    },

    {
      title: "Date Of Joining",

      dataIndex: "date_of_joining",

      key: "date_of_joining",
    },

    {
      title: "Actions",

      key: "actions",

      render: (_, employee) => (
        <Space>
          <Popconfirm
            title={`Delete "${employee.full_name}"?`}
            description={"This action cannot be undone."}
            okText="Delete"
            cancelText="Cancel"
            onConfirm={() => handleDelete(employee.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  function handleTableChange(pagination, filters, sorter) {
    const limit = pagination.pageSize;

    const currentPage = pagination.current;

    const offset = (currentPage - 1) * limit;

    let order = "desc";

    if (sorter.order === "ascend") {
      order = "asc";
    }

    setQueryParams((previous) => ({
      ...previous,

      limit,

      offset,

      sort_by: sorter.field || "id",

      order,
    }));
  }
  async function handleDelete(employeeId) {
    await deleteEmployee(employeeId);

    setQueryParams((previous) => ({
      ...previous,
    }));
  }

  return (
    <Table
      rowKey="id"
      scroll={{
        x: "max-content",
      }}
      bordered
      columns={columns}
      dataSource={employees}
      pagination={{
        current: queryParams.offset / queryParams.limit + 1,
        pageSize: queryParams.limit,
        total,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30", "50"],
        showQuickJumper: true,
        position: ["bottomCenter"],
        showTotal: (total, range) =>
          `Showing ${range[0]}-${range[1]} of ${total} employees`,
      }}
      onChange={handleTableChange}
    />
  );
}
