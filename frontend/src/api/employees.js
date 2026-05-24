import client from "./client";

export async function getEmployees({
  limit = 10,
  offset = 0,
  search = "",
  country = "",
  job_title = "",
  employment_status = "",
  currency = "",
  sort_by = "id",
  order = "desc",
} = {}) {
  const response = await client.get("/employees", {
    params: {
      limit,
      offset,
      search,
      country,
      job_title,
      employment_status,
      currency,
      sort_by,
      order,
    },
  });

  return response.data;
}

export async function createEmployee(payload) {
  const response = await client.post("/employees", payload);

  return response.data;
}

export async function deleteEmployee(employeeId) {
  await client.delete(`/employees/${employeeId}`);
}

export async function getFilterValues(field) {
  const response = await client.get("/salary-insights/filter-values", {
    params: {
      field,
    },
  });

  return response.data;
}
