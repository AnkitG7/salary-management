import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";

import dayjs from "dayjs";

import { useEffect, useState } from "react";

import { updateEmployee } from "../../api/employees";

const { Title } = Typography;

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

const CURRENCY_OPTIONS = [
  {
    value: "USD",
    label: "USD ($)",
    symbol: "$",
  },

  {
    value: "EUR",
    label: "EUR (€)",
    symbol: "€",
  },

  {
    value: "GBP",
    label: "GBP (£)",
    symbol: "£",
  },

  {
    value: "INR",
    label: "INR (₹)",
    symbol: "₹",
  },

  {
    value: "CAD",
    label: "CAD (C$)",
    symbol: "C$",
  },

  {
    value: "AUD",
    label: "AUD (A$)",
    symbol: "A$",
  },

  {
    value: "JPY",
    label: "JPY (¥)",
    symbol: "¥",
  },

  {
    value: "CNY",
    label: "CNY (¥)",
    symbol: "¥",
  },

  {
    value: "CHF",
    label: "CHF (Fr)",
    symbol: "Fr",
  },

  {
    value: "AED",
    label: "AED (د.إ)",
    symbol: "د.إ",
  },

  {
    value: "SGD",
    label: "SGD (S$)",
    symbol: "S$",
  },
];

function normalizeText(value) {
  return value?.trim().replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function EditEmployeeModal({
  employee,
  open,
  onClose,
  onSuccess,
}) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const selectedCurrency = Form.useWatch("currency", form);

  const activeSymbol =
    CURRENCY_OPTIONS.find((currency) => currency.value === selectedCurrency)
      ?.symbol || "";

  useEffect(() => {
    if (!employee) {
      return;
    }

    form.setFieldsValue({
      ...employee,

      salary:
        employee.salary !== undefined
          ? Number(employee.salary).toLocaleString()
          : "",

      currency: employee.currency || "USD",

      date_of_joining: employee.date_of_joining
        ? dayjs(employee.date_of_joining)
        : null,
    });
  }, [employee, form]);

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
        title={
          <div
            style={{
              paddingBottom: 2,
            }}
          >
            Edit Employee
          </div>
        }
        open={open}
        onCancel={handleCancel}
        destroyOnHidden
        maskClosable={!loading}
        keyboard={!loading}
        width={900}
        footer={[
          <Button key="cancel" onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>,

          <Button
            key="submit"
            type="primary"
            loading={loading}
            disabled={loading}
            onClick={() => form.submit()}
          >
            Save Changes
          </Button>,
        ]}
        styles={{
          body: {
            paddingTop: 12,
            paddingBottom: 0,
            paddingInline: 28,
          },

          footer: {
            paddingTop: 14,
            paddingBottom: 18,
            paddingInline: 28,
            borderTop: "1px solid #f0f0f0",
          },
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* PERSONAL INFORMATION */}
          <Title
            level={5}
            style={{
              marginBottom: 12,
            }}
          >
            Personal Information
          </Title>

          <Row gutter={[16, 0]}>
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
                <Input placeholder="Enter full name" />
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
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
          </Row>

          {/* EMPLOYMENT */}
          <Title
            level={5}
            style={{
              marginTop: 8,
              marginBottom: 12,
            }}
          >
            Employment
          </Title>

          <Row gutter={[16, 0]}>
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
                <Input placeholder="Enter job title" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  {
                    required: true,
                    message: "Please enter country",
                  },
                ]}
              >
                <Input placeholder="Enter country" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
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
                  options={EMPLOYMENT_OPTIONS}
                  placeholder="Select employment status"
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
                  style={{
                    width: "100%",
                  }}
                  disabledDate={(current) =>
                    current && current > dayjs().endOf("day")
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          {/* COMPENSATION */}
          <Title
            level={5}
            style={{
              marginTop: 8,
              marginBottom: 12,
            }}
          >
            Compensation
          </Title>

          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Salary"
                name="salary"
                rules={[
                  {
                    required: true,
                    message: "Please enter salary",
                  },

                  {
                    validator(_, value) {
                      if (!value) {
                        return Promise.reject(new Error("Please enter salary"));
                      }

                      const cleanedValue = String(value).replace(/,/g, "");

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
                  prefix={activeSymbol}
                  placeholder="50,000"
                  onChange={(event) => {
                    const rawValue = event.target.value;

                    if (rawValue.includes("-")) {
                      return;
                    }

                    const numericValue = rawValue.replace(/[^\d]/g, "");

                    const formattedValue = numericValue.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ",",
                    );

                    form.setFieldValue("salary", formattedValue);
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
                    message: "Please select currency",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select currency"
                  options={CURRENCY_OPTIONS}
                  optionFilterProp="label"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
