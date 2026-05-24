import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { deleteEmployee } from "../api/employees";
import formatSalary from "../utils/formatSalary";
import formatLabel from "../utils/formatLabel";
import formatDate from "../utils/formatDate";

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

      sorter: true,

      sortOrder:
        queryParams.sort_by === "full_name"
          ? queryParams.order === "asc"
            ? "ascend"
            : "descend"
          : null,

      render: (name) => formatLabel(name),
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
      sorter: true,
      sortOrder:
        queryParams.sort_by === "job_title"
          ? queryParams.order === "asc"
            ? "ascend"
            : "descend"
          : null,

      render: (jobTitle) => formatLabel(jobTitle),
    },

    {
      title: "Country",

      dataIndex: "country",

      key: "country",
      sorter: true,
      sortOrder:
        queryParams.sort_by === "country"
          ? queryParams.order === "asc"
            ? "ascend"
            : "descend"
          : null,

      render: (country) => formatLabel(country),
    },

    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      //   render: (salary, record) => `${salary} ${record.currency}`,
      render: (salary, record) => formatSalary(salary, record.currency),
    },

    {
      title: "Status",

      dataIndex: "employment_status",

      key: "employment_status",

      sorter: true,
      sortOrder:
        queryParams.sort_by === "employment_status"
          ? queryParams.order === "asc"
            ? "ascend"
            : "descend"
          : null,

      render: (status) => (
        <Tag color={STATUS_COLORS[status]}>{formatLabel(status)}</Tag>
      ),
    },

    {
      title: "Date Of Joining",

      dataIndex: "date_of_joining",

      key: "date_of_joining",
      sorter: true,
      sortOrder:
        queryParams.sort_by === "date_of_joining"
          ? queryParams.order === "asc"
            ? "ascend"
            : "descend"
          : null,

      render: (date) => formatDate(date),
    },

    ,
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

    let sortBy = "id";

    let order = "desc";



    if (sorter.field) {
      sortBy = sorter.field;

      order = sorter.order === "ascend" ? "asc" : "desc";
    }

    setQueryParams((previous) => ({
      ...previous,

      limit,

      offset,

      sort_by: sortBy,

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
