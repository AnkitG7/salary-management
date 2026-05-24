import { useEffect, useState } from "react";

import { Input } from "antd";

export default function EmployeeSearch({ setQueryParams }) {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setQueryParams((previous) => ({
        ...previous,

        search: searchInput,

        offset: 0,
      }));
    }, 400);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInput, setQueryParams]);

  return (
    <Input.Search
      placeholder={"Search by name or email"}
      allowClear
      size="large"
      value={searchInput}
      onChange={(event) => {
        setSearchInput(event.target.value);
      }}
      style={{
        width: 350,
        marginBottom: 16,
      }}
    />
  );
}
