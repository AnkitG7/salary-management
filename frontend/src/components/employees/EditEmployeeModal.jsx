import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Typography,
  theme,
} from "antd";

import {
  UserOutlined,
  MailOutlined,
  GlobalOutlined,
  WalletOutlined,
  CalendarOutlined,
  CloseOutlined,
  IdcardOutlined,
  EditOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";

import { useEffect, useState } from "react";

import { updateEmployee, getCountryCurrencyMapping } from "../../api/employees";

const { Title, Text } = Typography;

const EMPLOYMENT_OPTIONS = [
  {
    label: "Full Time",
    value: "FULL_TIME",
  },

  {
    label: "Part Time",
    value: "PART_TIME",
  },

  {
    label: "Contract",
    value: "CONTRACT",
  },

  {
    label: "Intern",
    value: "INTERN",
  },
];

function normalizeText(value) {
  return value?.trim().replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatCountryLabel(value = "") {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function EditEmployeeModal({
  employee,
  open,
  onClose,
  onSuccess,
}) {
  const { token } = theme.useToken();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const [countryCurrencyData, setCountryCurrencyData] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  async function loadCountryCurrencyData() {
    try {
      const response = await getCountryCurrencyMapping();

      setCountryCurrencyData(response || []);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadCountryCurrencyData();
  }, []);

  /*
    IMPORTANT

    Wait for:
    - employee
    - metadata

    before setting form
  */

  useEffect(() => {
    if (!employee || countryCurrencyData.length === 0) {
      return;
    }

    const selectedCountry = countryCurrencyData.find(
      (item) => item.country === employee.country,
    );

    form.setFieldsValue({
      ...employee,

      salary:
        employee.salary !== undefined
          ? Number(employee.salary).toLocaleString()
          : "",

      currency: selectedCountry?.currency || employee.currency,

      date_of_joining: employee.date_of_joining
        ? dayjs(employee.date_of_joining)
        : null,
    });
  }, [employee, form, countryCurrencyData, open]);

  const countryOptions = countryCurrencyData.map((item) => ({
    label: formatCountryLabel(item.country),

    value: item.country,
  }));

  function handleCountryChange(country) {
    const selectedCountry = countryCurrencyData.find(
      (item) => item.country === country,
    );

    form.setFieldsValue({
      country,

      currency: selectedCountry?.currency || "",
    });
  }

  async function handleSubmit(values) {
    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const normalizedSalary = Number(String(values.salary).replace(/,/g, ""));

      const payload = {
        ...values,

        salary: normalizedSalary,

        full_name: normalizeText(values.full_name),

        email: values.email?.trim().toLowerCase(),

        job_title: normalizeText(values.job_title),

        country: normalizeText(values.country),

        date_of_joining: values.date_of_joining.format("YYYY-MM-DD"),
      };

      await updateEmployee(employee.id, payload);

      messageApi.success("Employee updated successfully");

      onSuccess();

      onClose();
    } catch (error) {
      console.error(error);

      const backendMessage =
        error?.response?.data?.detail || error?.response?.data?.message;

      messageApi.error(backendMessage || "Failed to update employee");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    if (loading) {
      return;
    }

    form.resetFields();

    onClose();
  }

  return (
    <>
      {contextHolder}

      <Modal
        open={open}
        onCancel={handleCancel}
        destroyOnHidden
        maskClosable={!loading}
        keyboard={!loading}
        centered
        footer={null}
        closeIcon={
          <CloseOutlined
            style={{
              color: token.colorIcon, // Automatically adapts to light/dark mode
              fontSize: 18,
              fontWeight: 700,
            }}
          />
        }
        width={980}
        styles={{
          content: {
            borderRadius: 32,
            overflow: "hidden",
            padding: 0,
            // background: "#f8fafc",
            background: token.colorBgLayout,
          },

          body: {
            padding: 0,
          },
        }}
      >
        {/* HERO */}

        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderTopLeftRadius: 32,

            borderTopRightRadius: 32,
            background:
              "linear-gradient(135deg, #7c3aed 0%, #6366f1 45%, #2563eb 100%)",
            padding: "36px 40px",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              top: -100,
              right: -80,
              filter: "blur(12px)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(12px)",
                }}
              >
                <EditOutlined
                  style={{
                    color: "#ffffff",
                    fontSize: 24,
                  }}
                />
              </div>

              <div>
                <Title
                  level={2}
                  style={{
                    color: "#ffffff",
                    margin: 0,
                    fontWeight: 800,
                    letterSpacing: "-1px",
                  }}
                >
                  Edit Employee
                </Title>

                <Text
                  style={{
                    color: "rgba(255,255,255,0.82)",
                    fontSize: 14,
                  }}
                >
                  Update employee profile and workforce information
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}

        <div
          style={{
            padding: 36,
          }}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {/* PERSONAL */}

            <Card
              variant="borderless"
              style={{
                borderRadius: 28,
                marginBottom: 28,
                // background: "#ffffff",
                background: token.colorBgContainer,
                // border: "1px solid rgba(226,232,240,0.8)",
                border: `1px solid ${token.colorBorderSecondary}`,
                // boxShadow: "0 12px 36px rgba(15,23,42,0.05)",
                boxShadow: token.boxShadowSecondary,
              }}
              styles={{
                body: {
                  padding: 28,
                },
              }}
            >
              <Title
                level={4}
                style={{
                  marginTop: 0,
                  marginBottom: 24,
                  color: token.colorText,
                }}
              >
                Personal Information
              </Title>

              <Row gutter={[20, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Full Name"
                    name="full_name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter full name",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={<UserOutlined />}
                      placeholder="John Doe"
                      style={{
                        borderRadius: 16,
                        height: 52,
                        background: token.colorBgContainer,

                        color: token.colorText,
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter email",
                      },

                      {
                        type: "email",
                        message: "Please enter valid email",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={<MailOutlined />}
                      placeholder="johndoe@company.com"
                      style={{
                        borderRadius: 16,
                        height: 52,
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* EMPLOYMENT */}

            <Card
              variant="borderless"
              style={{
                borderRadius: 28,
                marginBottom: 28,
                // background: "#ffffff",
                background: token.colorBgContainer,
                // background: token.colorBgContainer,
                // border: "1px solid rgba(226,232,240,0.8)",
                border: `1px solid ${token.colorBorderSecondary}`,
                // boxShadow: "0 12px 36px rgba(15,23,42,0.05)",
                boxShadow: token.boxShadowSecondary,
              }}
              styles={{
                body: {
                  padding: 28,
                },
              }}
            >
              <Title
                level={4}
                style={{
                  marginTop: 0,
                  marginBottom: 24,
                  color: token.colorText,
                }}
              >
                Employment Details
              </Title>

              <Row gutter={[20, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Job Title"
                    name="job_title"
                    rules={[
                      {
                        required: true,
                        message: "Please enter job title",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={<IdcardOutlined />}
                      placeholder="Software Engineer"
                      style={{
                        borderRadius: 16,
                        height: 52,
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Country"
                    name="country"
                    rules={[
                      {
                        required: true,
                        message: "Please select country",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      showSearch
                      placeholder="Select country"
                      options={countryOptions}
                      optionFilterProp="label"
                      onChange={handleCountryChange}
                      suffixIcon={<GlobalOutlined />}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[20, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Employment Status"
                    name="employment_status"
                    rules={[
                      {
                        required: true,
                        message: "Please select employment status",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      placeholder="Select employment status"
                      options={EMPLOYMENT_OPTIONS}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Date Of Joining"
                    name="date_of_joining"
                    rules={[
                      {
                        required: true,
                        message: "Please select joining date",
                      },
                    ]}
                  >
                    <DatePicker
                      size="large"
                      style={{
                        width: "100%",
                        background: token.colorBgContainer,

                        color: token.colorText,
                      }}
                      suffixIcon={<CalendarOutlined />}
                      disabledDate={(current) =>
                        current && current > dayjs().endOf("day")
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* COMPENSATION */}

            <Card
              variant="borderless"
              style={{
                borderRadius: 28,
                // background: "#ffffff",
                background: token.colorBgContainer,
                // background: token.colorBgContainer,
                // border: "1px solid rgba(226,232,240,0.8)",
                border: `1px solid ${token.colorBorderSecondary}`,
                // boxShadow: "0 12px 36px rgba(15,23,42,0.05)",
                boxShadow: token.boxShadowSecondary,
              }}
              styles={{
                body: {
                  padding: 28,
                },
              }}
            >
              <Title
                level={4}
                style={{
                  marginTop: 0,
                  marginBottom: 24,
                  color: token.colorText,
                }}
              >
                Compensation
              </Title>

              <Row gutter={[20, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Salary"
                    name="salary"
                    rules={[
                      {
                        validator(_, value) {
                          if (!value) {
                            return Promise.reject(
                              new Error("Please enter salary"),
                            );
                          }

                          const cleanedValue = String(value).replace(/,/g, "");

                          const numericRegex = /^-?\d+(\.\d{1,2})?$/;

                          if (!numericRegex.test(cleanedValue)) {
                            return Promise.reject(
                              new Error(
                                "Salary must contain only numeric values",
                              ),
                            );
                          }

                          const numericValue = Number(cleanedValue);

                          if (Number.isNaN(numericValue)) {
                            return Promise.reject(
                              new Error("Salary must be a valid number"),
                            );
                          }

                          if (numericValue <= 0) {
                            return Promise.reject(
                              new Error("Salary must be greater than 0"),
                            );
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={<WalletOutlined />}
                      placeholder="50,000"
                      style={{
                        borderRadius: 16,
                        height: 52,
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Currency"
                    name="currency"
                    rules={[
                      {
                        required: true,
                        message: "Currency is required",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      disabled
                      style={{
                        borderRadius: 16,
                        height: 52,
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            {/* FOOTER */}

            <div
              style={{
                marginTop: 34,
                display: "flex",
                justifyContent: "flex-end",
                gap: 14,
              }}
            >
              <Button
                size="large"
                onClick={handleCancel}
                disabled={loading}
                style={{
                  height: 52,
                  paddingInline: 28,
                  borderRadius: 16,
                  fontWeight: 600,
                }}
              >
                Cancel
              </Button>

              <Button
                type="primary"
                size="large"
                loading={loading}
                disabled={loading}
                onClick={() => form.submit()}
                style={{
                  height: 52,
                  paddingInline: 30,
                  borderRadius: 16,
                  fontWeight: 700,
                  boxShadow: "0 12px 28px rgba(37,99,235,0.22)",
                }}
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
}
