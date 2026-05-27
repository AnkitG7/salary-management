import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
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
  CloseOutlined,
  GlobalOutlined,
  WalletOutlined,
  CalendarOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";

import { useEffect, useState } from "react";

import { createEmployee, getCountryCurrencyMapping } from "../../api/employees";

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
  return value?.trim();
}

function formatCountryLabel(value = "") {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function CreateEmployeeModal({ open, onClose, onSuccess }) {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const [submitting, setSubmitting] = useState(false);

  const [countryCurrencyData, setCountryCurrencyData] = useState([]);

  async function loadCountryCurrencyData() {
    try {
      const response = await getCountryCurrencyMapping();

      setCountryCurrencyData(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadCountryCurrencyData();
  }, []);

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
    if (submitting) {
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        ...values,

        salary: Number(values.salary),

        full_name: normalizeText(values.full_name),

        email: values.email?.trim().toLowerCase(),

        job_title: normalizeText(values.job_title),

        country: values.country,

        date_of_joining: values.date_of_joining.format("YYYY-MM-DD"),
      };

      await createEmployee(payload);

      message.success("Employee profile created successfully");

      form.resetFields();

      onSuccess();

      onClose();
    } catch (error) {
      console.error(error);

      const backendMessage =
        error?.response?.data?.detail || error?.response?.data?.message;

      message.error(backendMessage || "Failed to create employee profile");
    } finally {
      setSubmitting(false);
    }
  }

  function handleCancel() {
    if (submitting) {
      return;
    }

    form.resetFields();

    onClose();
  }

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      destroyOnHidden
      maskClosable={!submitting}
      keyboard={!submitting}
      width={980}
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
      styles={{
        content: {
          borderRadius: 32,
          overflow: "hidden",
          padding: 0,

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
            "linear-gradient(135deg, #2563eb 0%, #1d4ed8 45%, #4338ca 100%)",

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
          <Title
            level={2}
            style={{
              color: "#ffffff",
              margin: 0,
              fontWeight: 800,
              letterSpacing: "-1px",
            }}
          >
            Add New Employee
          </Title>

          <Text
            style={{
              color: "rgba(255,255,255,0.82)",
              fontSize: 15,
              display: "block",
              marginTop: 10,
              lineHeight: 1.8,
              maxWidth: 680,
            }}
          >
            Create a new employee profile with workforce, compensation, and
            organizational information.
          </Text>
        </div>
      </div>

      {/* FORM */}
      <div
        style={{
          padding: 36,
        }}
      >
        <Form
          form={form}
          layout="vertical"
          preserve={false}
          onFinish={handleSubmit}
        >
          {/* PERSONAL */}
          <Card
            variant="borderless"
            style={{
              borderRadius: 28,
              marginBottom: 28,

              background: token.colorBgContainer,

              border: `1px solid ${token.colorBorderSecondary}`,

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
                    }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Email Address"
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

              background: token.colorBgContainer,

              border: `1px solid ${token.colorBorderSecondary}`,

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

              background: token.colorBgContainer,

              border: `1px solid ${token.colorBorderSecondary}`,

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
                        if (
                          value === undefined ||
                          value === null ||
                          value === ""
                        ) {
                          return Promise.reject(
                            new Error("Please enter salary"),
                          );
                        }

                        const valueAsString = String(value).trim();

                        /*
          STRICT VALIDATION

          VALID:
          100
          100.50
          99999

          INVALID:
          abc
          12abc
          10ooo
          1,2a
        */

                        const numericRegex = /^-?\d+(\.\d{1,2})?$/;

                        if (!numericRegex.test(valueAsString)) {
                          return Promise.reject(
                            new Error(
                              "Salary must contain only numeric values",
                            ),
                          );
                        }

                        const numericValue = Number(valueAsString);

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
                    placeholder="50000"
                    inputMode="decimal"
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
              disabled={submitting}
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
              loading={submitting}
              disabled={submitting}
              onClick={() => form.submit()}
              style={{
                height: 52,
                paddingInline: 30,
                borderRadius: 16,
                fontWeight: 700,
                boxShadow: "0 12px 28px rgba(37,99,235,0.22)",
              }}
            >
              Create Employee
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
}
