import {
  Button,
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
} from "antd";

import dayjs from "dayjs";

import { useState } from "react";

import { createEmployee } from "../../api/employees";

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

export default function CreateEmployeeModal({ open, onClose, onSuccess }) {
  const [form] = Form.useForm();

  const [submitting, setSubmitting] = useState(false);

  const selectedCurrency = Form.useWatch("currency", form);

  const activeSymbol =
    CURRENCY_OPTIONS.find((currency) => currency.value === selectedCurrency)
      ?.symbol || "";

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

        country: normalizeText(values.country),

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
      title={
        <div
          style={{
            paddingBottom: 2,
          }}
        >
          Add New Employee
        </div>
      }
      open={open}
      onCancel={handleCancel}
      destroyOnHidden
      maskClosable={!submitting}
      keyboard={!submitting}
      width={900}
      footer={[
        <Button key="cancel" onClick={handleCancel} disabled={submitting}>
          Cancel
        </Button>,

        <Button
          key="submit"
          type="primary"
          loading={submitting}
          disabled={submitting}
          onClick={() => form.submit()}
        >
          Create Employee
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
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        preserve={false}
        initialValues={{
          currency: "USD",
        }}
      >
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

                {
                  whitespace: true,
                  message: "Name cannot be empty",
                },

                {
                  min: 2,
                  message: "Name must be at least 2 characters",
                },

                {
                  max: 100,
                  message: "Name too long",
                },
              ]}
            >
              <Input placeholder="John Doe" maxLength={100} />
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

                {
                  max: 255,
                  message: "Email too long",
                },
              ]}
            >
              <Input placeholder="johndoe@company.com" maxLength={255} />
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

                {
                  max: 100,
                  message: "Job title too long",
                },
              ]}
            >
              <Input placeholder="Software Engineer" maxLength={100} />
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

                {
                  max: 100,
                  message: "Country name too long",
                },
              ]}
            >
              <Input placeholder="United States" maxLength={100} />
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
                  validator(_, value) {
                    if (value === undefined || value === null || value === "") {
                      return Promise.reject(new Error("Please enter salary"));
                    }

                    const numericValue = Number(value);

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
              <InputNumber
                style={{
                  width: "100%",
                }}
                controls={false}
                min={0}
                precision={2}
                placeholder="50,000"
                prefix={activeSymbol}
                formatter={(value) =>
                  value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""
                }
                parser={(value) => {
                  const parsed = value.replace(/[^\d.-]/g, "");

                  return parsed ? Number(parsed) : null;
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
  );
}
