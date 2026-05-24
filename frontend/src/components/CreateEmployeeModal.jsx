import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";

import dayjs from "dayjs";

import { createEmployee } from "../api/employees";

function CreateEmployeeModal({ open, onClose, onSuccess }) {
  const [form] = Form.useForm();

  async function handleSubmit(values) {
    try {
      const payload = {
        ...values,

        date_of_joining: values.date_of_joining.format("YYYY-MM-DD"),
      };

      await createEmployee(payload);

      form.resetFields();

      onSuccess();

      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal
      title="Create Employee"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
          <Select
            options={[
              {
                value: "FULL_TIME",
                label: "Full Time",
              },
              {
                value: "PART_TIME",
                label: "Part Time",
              },
              {
                value: "CONTRACT",
                label: "Contract",
              },
              {
                value: "INTERN",
                label: "Intern",
              },
            ]}
          />
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
          Create Employee
        </Button>
      </Form>
    </Modal>
  );
}

export default CreateEmployeeModal;
