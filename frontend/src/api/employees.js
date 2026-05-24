import client from "./client";

export async function getEmployees(limit = 10, offset = 0) {
  const response = await client.get("/employees", {
    params: {
      limit,
      offset,
    },
  });

  return response.data;
}

export async function createEmployee(payload) {
  const response = await client.post("/employees", payload);

  return response.data;
}
