import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
} from "antd";

import dayjs from "dayjs";

import { useEffect } from "react";

import { updateEmployee } from "../api/employees";

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

export default function EditEmployeeModal({
  employee,
  open,
  onClose,
  onSuccess,
}) {
  const [form] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!employee) {
      return;
    }

    form.setFieldsValue({
      ...employee,

      date_of_joining: dayjs(employee.date_of_joining),
    });
  }, [employee, form]);

  async function handleSubmit(values) {
    try {
      await updateEmployee(employee.id, {
        ...values,

        date_of_joining: values.date_of_joining.format("YYYY-MM-DD"),
      });

      messageApi.success("Employee updated successfully");

      onSuccess();

      onClose();
    } catch (error) {
      console.error(error);

      messageApi.error("Failed to update employee");
    }
  }

  return (
    <>
      {contextHolder}

      <Modal
        title="Edit Employee"
        open={open}
        onCancel={onClose}
        footer={null}
        destroyOnHidden
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Full Name"
            name="full_name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Job Title"
            name="job_title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Salary"
            name="salary"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Currency"
            name="currency"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Employment Status"
            name="employment_status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select options={EMPLOYMENT_OPTIONS} />
          </Form.Item>

          <Form.Item
            label="Date Of Joining"
            name="date_of_joining"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Save Changes
          </Button>
        </Form>
      </Modal>
    </>
  );
}
