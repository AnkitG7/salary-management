import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Modal,
  Row,
  Space,
  Spin,
  Tag,
  Typography,
  message,
} from "antd";

import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  MailOutlined,
  IdcardOutlined,
  CalendarOutlined,
  DollarOutlined,
  BankOutlined,
} from "@ant-design/icons";

import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { deleteEmployee, getEmployeeById } from "../api/employees";

import EditEmployeeModal from "../components/employees/EditEmployeeModal";

import formatDate from "../utils/formatDate";
import formatLabel from "../utils/formatLabel";
import formatSalary from "../utils/formatSalary";

const { Title, Text } = Typography;

const STATUS_COLORS = {
  FULL_TIME: "success",
  PART_TIME: "processing",
  CONTRACT: "warning",
  INTERN: "default",
};

export default function EmployeeDetailsPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [employee, setEmployee] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  async function loadEmployee() {
    try {
      setLoading(true);

      const response = await getEmployeeById(id);

      setEmployee(response);
    } catch (error) {
      console.error("Failed to load employee:", error);

      message.error("Failed to load employee profile data");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      await deleteEmployee(employee.id);

      message.success("Employee profile deleted successfully");

      navigate("/employees");
    } catch (error) {
      console.error(error);

      message.error("Failed to delete employee profile");
    }
  }

  useEffect(() => {
    loadEmployee();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          padding: "120px 0",
          textAlign: "center",
        }}
      >
        <Spin size="large" tip="Fetching employee record..." />
      </div>
    );
  }

  if (!employee) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
        }}
      >
        <Title level={4}>Employee Record Not Found</Title>

        <Button type="primary" onClick={() => navigate("/employees")}>
          Return to Directory
        </Button>
      </div>
    );
  }

  const infoItems = [
    {
      label: "Full Name",
      children: formatLabel(employee.full_name),
    },

    {
      label: "Email",
      children: employee.email,
    },

    {
      label: "Employee ID",
      children: employee.id,
    },

    {
      label: "Job Title",
      children: formatLabel(employee.job_title),
    },

    {
      label: "Country",
      children: formatLabel(employee.country),
    },

    {
      label: "Employment Status",

      children: (
        <Tag
          color={STATUS_COLORS[employee.employment_status]}
          style={{
            fontWeight: 600,
          }}
        >
          {formatLabel(employee.employment_status)}
        </Tag>
      ),
    },

    {
      label: "Date of Joining",

      children: formatDate(employee.date_of_joining),
    },
  ];

  return (
    <>
      <div
        style={{
          padding: "32px",
          background: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        {/* HEADER */}
        <Row
          justify="space-between"
          align="middle"
          style={{
            marginBottom: 24,
          }}
        >
          <Col>
            <Space direction="vertical" size={6}>
              <Breadcrumb
                items={[
                  {
                    title: <Link to="/employees">Employees</Link>,
                  },

                  {
                    title: "Employee Details",
                  },
                ]}
              />

              <div>
                <Title
                  level={2}
                  style={{
                    margin: 0,
                  }}
                >
                  Employee Details
                </Title>

                <Text type="secondary">
                  View employee information and manage details.
                </Text>
              </div>
            </Space>
          </Col>

          <Col>
            <Space size="middle">
              <Button
                type="primary"
                ghost
                icon={<EditOutlined />}
                onClick={() => setIsEditModalOpen(true)}
                style={{
                  borderRadius: 8,
                }}
              >
                Edit Employee
              </Button>

              <Button
                danger
                icon={<DeleteOutlined />}
                style={{
                  borderRadius: 8,
                }}
                onClick={() => {
                  Modal.confirm({
                    title: "Delete Employee Record",

                    content: `Are you sure you want to remove "${employee.full_name}" from organization records? This action cannot be reversed.`,

                    okText: "Delete Profile",

                    cancelText: "Cancel",

                    okButtonProps: {
                      danger: true,
                    },

                    async onOk() {
                      await handleDelete();
                    },
                  });
                }}
              >
                Delete Employee
              </Button>
            </Space>
          </Col>
        </Row>

        {/* HERO PROFILE CARD */}
        <Card
          bordered={false}
          style={{
            borderRadius: 20,
            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            marginBottom: 24,
            padding: "8px 12px",
          }}
        >
          <Row align="middle" justify="space-between" gutter={[16, 16]}>
            <Col xs={24} md={16}>
              <Space size={24} align="center" wrap>
                <Avatar
                  size={84}
                  src={employee.avatar_url || null}
                  style={{
                    backgroundColor: "#f0f5ff",
                    color: "#1d39c4",
                    fontSize: 28,
                    fontWeight: 700,
                    border: "2px solid #d6e4ff",
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

                <Space direction="vertical" size={4}>
                  <Title
                    level={3}
                    style={{
                      margin: 0,
                      fontWeight: 700,
                    }}
                  >
                    {formatLabel(employee.full_name)}
                  </Title>

                  <Text
                    style={{
                      fontSize: 16,
                      color: "#595959",
                      fontWeight: 500,
                    }}
                  >
                    {formatLabel(employee.job_title)}
                  </Text>

                  <Space
                    size="large"
                    style={{
                      marginTop: 8,
                    }}
                    wrap
                  >
                    <Text
                      type="secondary"
                      style={{
                        fontSize: 13,
                      }}
                    >
                      <MailOutlined
                        style={{
                          marginRight: 6,
                        }}
                      />

                      {employee.email}
                    </Text>

                    <Text
                      type="secondary"
                      style={{
                        fontSize: 13,
                      }}
                    >
                      <IdcardOutlined
                        style={{
                          marginRight: 6,
                        }}
                      />
                      ID: {employee.id}
                    </Text>

                    <Text
                      type="secondary"
                      style={{
                        fontSize: 13,
                      }}
                    >
                      <CalendarOutlined
                        style={{
                          marginRight: 6,
                        }}
                      />
                      Joined {formatDate(employee.date_of_joining)}
                    </Text>
                  </Space>
                </Space>
              </Space>
            </Col>

            <Col
              xs={24}
              md={8}
              style={{
                textAlign: "right",
              }}
            >
              <Tag
                color={STATUS_COLORS[employee.employment_status]}
                style={{
                  fontSize: 14,
                  padding: "4px 12px",
                  borderRadius: 6,
                  fontWeight: 600,
                }}
              >
                {formatLabel(employee.employment_status)}
              </Tag>
            </Col>
          </Row>
        </Card>

        {/* MAIN CONTENT GRID */}
        <Row
          gutter={[24, 24]}
          style={{
            marginTop: 8,
          }}
        >
          {/* LEFT PANEL */}
          <Col xs={24} lg={14}>
            <Card
              title={
                <Space>
                  <IdcardOutlined
                    style={{
                      color: "#1677ff",
                    }}
                  />

                  <span>Employee Information</span>
                </Space>
              }
              bordered={false}
              style={{
                borderRadius: 20,
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                height: "100%",
              }}
            >
              <Descriptions
                column={1}
                items={infoItems}
                labelStyle={{
                  color: "#8c8c8c",
                  fontWeight: 500,
                  width: "35%",
                  paddingBottom: 16,
                }}
                contentStyle={{
                  color: "#262626",
                  fontWeight: 600,
                  paddingBottom: 16,
                }}
              />
            </Card>
          </Col>

          {/* RIGHT PANEL */}
          <Col xs={24} lg={10}>
            <Space
              direction="vertical"
              size={24}
              style={{
                width: "100%",
              }}
            >
              {/* COMPENSATION CARD */}
              <Card
                title={
                  <Space>
                    <DollarOutlined
                      style={{
                        color: "#52c41a",
                      }}
                    />

                    <span>Compensation Summary</span>
                  </Space>
                }
                bordered={false}
                style={{
                  borderRadius: 20,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                }}
              >
                <Row
                  justify="space-between"
                  style={{
                    paddingBottom: 12,
                  }}
                >
                  <Col>
                    <Text type="secondary">Salary</Text>
                  </Col>

                  <Col>
                    <Text
                      strong
                      style={{
                        fontSize: 16,
                      }}
                    >
                      {formatSalary(employee.salary, employee.currency)}
                    </Text>
                  </Col>
                </Row>

                <Row
                  justify="space-between"
                  style={{
                    paddingBottom: 16,
                    borderBottom: "1px dashed #f0f0f0",
                  }}
                >
                  <Col>
                    <Text type="secondary">Currency</Text>
                  </Col>

                  <Col>
                    <Text strong>{employee.currency || "USD"}</Text>
                  </Col>
                </Row>

                <Row
                  justify="space-between"
                  align="middle"
                  style={{
                    marginTop: 16,
                  }}
                >
                  <Col>
                    <Text
                      strong
                      style={{
                        fontSize: 14,
                      }}
                    >
                      Annual Salary ({employee.currency || "USD"})
                    </Text>
                  </Col>

                  <Col>
                    <Text
                      strong
                      style={{
                        fontSize: 20,
                        color: "#2f54eb",
                      }}
                    >
                      {formatSalary(employee.salary, employee.currency)}
                    </Text>
                  </Col>
                </Row>
              </Card>

              {/* JOB INFORMATION */}
              <Card
                title={
                  <Space>
                    <BankOutlined
                      style={{
                        color: "#722ed1",
                      }}
                    />

                    <span>Job Information</span>
                  </Space>
                }
                bordered={false}
                style={{
                  borderRadius: 20,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                }}
              >
                <Descriptions
                  column={1}
                  labelStyle={{
                    color: "#8c8c8c",
                    fontWeight: 500,
                    paddingBottom: 12,
                  }}
                  contentStyle={{
                    color: "#262626",
                    fontWeight: 600,
                    textAlign: "right",
                    paddingBottom: 12,
                  }}
                  items={[
                    {
                      label: "Job Title",

                      children: formatLabel(employee.job_title),
                    },

                    {
                      label: "Employment Status",

                      children: (
                        <Tag
                          color={STATUS_COLORS[employee.employment_status]}
                          style={{
                            margin: 0,
                          }}
                        >
                          {formatLabel(employee.employment_status)}
                        </Tag>
                      ),
                    },

                    {
                      label: "Country",

                      children: formatLabel(employee.country),
                    },
                  ]}
                />
              </Card>

              {/* BACK BUTTON */}
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate("/employees")}
                style={{
                  marginTop: 8,
                  borderRadius: 10,
                  fontWeight: 500,
                  height: 42,
                  paddingInline: 18,
                  alignSelf: "flex-start",
                }}
              >
                Back to Employees
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      {/* EDIT MODAL */}
      <EditEmployeeModal
        employee={employee}
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={() => {
          setIsEditModalOpen(false);

          loadEmployee();
        }}
      />
    </>
  );
}
