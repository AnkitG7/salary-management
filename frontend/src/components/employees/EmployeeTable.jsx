import {
  Avatar,
  Button,
  Card,
  message,
  Modal,
  Space,
  Table,
  Tag,Empty,
  Tooltip,
  Typography,
  theme
} from "antd";

import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { deleteEmployee } from "../../api/employees";

import formatSalary from "../../utils/formatSalary";

import formatLabel from "../../utils/formatLabel";

import formatDate from "../../utils/formatDate";

import EditEmployeeModal from "./EditEmployeeModal";

const { Text } = Typography;

const STATUS_COLORS = {
  FULL_TIME: "green",

  PART_TIME: "blue",

  CONTRACT: "orange",

  INTERN: "default",
};

export default function EmployeeTable({
  loading,
  employees,
  total,
  queryParams,
  setQueryParams,
  onEmployeeDeleted,
}) {
  const { token } = theme.useToken();

  const navigate = useNavigate();

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const columns = [
    {
      title: "Employee",

      dataIndex: "full_name",

      width: 320,

      key: "full_name",

      sorter: true,

      sortOrder:
        queryParams.sort_by === "full_name"
          ? queryParams.order === "asc"
            ? "ascend"
            : "descend"
          : null,

      render: (_, employee) => (
        <div
          style={{
            display: "flex",

            alignItems: "center",

            gap: 12,
          }}
        >
          <Avatar
            size={42}
            style={{
              // backgroundColor: "#f0f5ff",
              backgroundColor: token.colorBgElevated,
              // color: "#1d39c4",
              color: token.colorPrimary,
              fontWeight: 700,
              fontSize: 16,
              // border: "1px solid #d6e4ff",
              border: `1px solid ${token.colorBorderSecondary}`,
              flexShrink: 0,
            }}
          >
            {employee.full_name
              ?.trim()
              .split(" ")
              .filter(Boolean)
              .map((name) => name[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </Avatar>

          <div>
            <div
              style={{
                fontWeight: 600,

                marginBottom: 2,
                color: token.colorText,
              }}
            >
              {formatLabel(employee.full_name)}
            </div>

            <Text
              type="secondary"
              style={{
                fontSize: 13,
              }}
            >
              {employee.email}
            </Text>
          </div>
        </div>
      ),
    },

    {
      title: "Job Title",

      dataIndex: "job_title",

      width: 220,

      ellipsis: true,

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

      width: 160,

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

      width: 160,

      key: "salary",

      render: (salary, record) => formatSalary(salary, record.currency),
    },

    {
      title: "Status",

      dataIndex: "employment_status",

      key: "employment_status",

      width: 140,

      sorter: true,

      sortOrder:
        queryParams.sort_by === "employment_status"
          ? queryParams.order === "asc"
            ? "ascend"
            : "descend"
          : null,

      render: (status) => (
        <Tag
          color={STATUS_COLORS[status]}
          bordered={false}
          style={{
            paddingInline: 12,

            borderRadius: 999,
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

      width: 160,

      sorter: true,

      sortOrder:
        queryParams.sort_by === "date_of_joining"
          ? queryParams.order === "asc"
            ? "ascend"
            : "descend"
          : null,

      render: (date) => formatDate(date),
    },

    {
      title: "Actions",

      key: "actions",

      width: 120,

      render: (_, employee) => (
        <Space>
          <Tooltip title="Edit Employee">
            <Button
              type="text"
              shape="circle"
              icon={<EditOutlined />}
              onClick={(event) => {
                event.stopPropagation();

                setSelectedEmployee(employee);

                setIsEditModalOpen(true);
              }}
            />
          </Tooltip>

          <Tooltip title="Delete Employee">
            <Button
              danger
              type="text"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={(event) => {
                event.stopPropagation();

                Modal.confirm({
                  title: "Delete Employee",

                  content: `Are you sure you want to delete "${employee.full_name}"?`,

                  okText: "Delete",

                  cancelText: "Cancel",

                  okButtonProps: {
                    danger: true,
                  },

                  async onOk() {
                    await handleDelete(employee.id);
                  },
                });
              }}
            />
          </Tooltip>
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
    try {
      await deleteEmployee(employeeId);

      message.success("Employee deleted successfully");

      onEmployeeDeleted?.();

      setQueryParams((previous) => ({
        ...previous,
      }));
    } catch (error) {
      console.error(error);

      message.error("Failed to delete employee");
    }
  }

  return (
    <>
      <Card
        bordered={false}
        style={{
          borderRadius: 20,

          // boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          boxShadow: token.boxShadowSecondary,
        }}
      >
        <Table
          size="large"
          onRow={(record) => ({
            onClick: () => navigate(`/employees/${record.id}`),

            style: {
              cursor: "pointer",
            },
          })}
          locale={{
            emptyText: (
              <div
                style={{
                  padding: 24,
                }}
              >
                {/* <div>No employees found</div> */}
                <Empty description="No employees found" />

                <div
                  style={{
                    marginTop: 8,

                    // color: "#888",
                    color: token.colorTextSecondary,
                  }}
                >
                  Try adjusting search or filters
                </div>
              </div>
            ),
          }}
          loading={loading}
          tableLayout="fixed"
          showSorterTooltip={false}
          rowKey="id"
          bordered={false}
          scroll={{
            x: "max-content",
          }}
          rowClassName={() => "employee-table-row"}
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
      </Card>

      <EditEmployeeModal
        employee={selectedEmployee}
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
        }}
        onSuccess={() => {
          setQueryParams((previous) => ({
            ...previous,
          }));
        }}
      />
    </>
  );
}
