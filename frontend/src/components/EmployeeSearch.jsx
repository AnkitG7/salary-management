import { Input } from "antd";

export default function EmployeeSearch({ queryParams, setQueryParams }) {
  function handleSearch(event) {
    const value = event.target.value;

    setQueryParams((previous) => ({
      ...previous,

      search: value,

      offset: 0,
    }));
  }

  return (
    <Input.Search
      placeholder={"Search by name or email"}
      allowClear
      size="large"
      value={queryParams.search}
      onChange={handleSearch}
      style={{
        width: 350,
        marginBottom: 16,
      }}
    />
  );
}
