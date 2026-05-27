import { Input, theme } from "antd";

import { SearchOutlined } from "@ant-design/icons";

export default function EmployeeSearch({ queryParams, setQueryParams }) {
  const { token } = theme.useToken();
  return (
    <div>
      <div
        style={{
          fontSize: 13,

          fontWeight: 600,

          marginBottom: 8,
          color: token.colorText,
        }}
      >
        Search
      </div>

      <Input
        allowClear
        size="large"
        placeholder="Search by employee name or email"
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextSecondary,
            }}
          />
        }
        value={queryParams.search}
        onChange={(event) => {
          setQueryParams((previous) => ({
            ...previous,

            offset: 0,

            search: event.target.value,
          }));
        }}
        style={{
          maxWidth: 420,

          borderRadius: 12,
          background: token.colorBgContainer,

          color: token.colorText,
        }}
      />
    </div>
  );
}
