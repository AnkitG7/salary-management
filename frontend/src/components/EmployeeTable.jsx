import { Table } from "antd";

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
    },

    {
      title: "Date Of Joining",

      dataIndex: "date_of_joining",

      key: "date_of_joining",
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

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={employees}
      pagination={{
        current: queryParams.offset / queryParams.limit + 1,

        pageSize: queryParams.limit,

        total,

        showSizeChanger: true,

        pageSizeOptions: ["10", "20", "30", "50"],

        showTotal: (total) => `Total Employees: ${total}`,
      }}
      onChange={handleTableChange}
    />
  );
}
