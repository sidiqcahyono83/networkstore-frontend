import {
  createCustomerSchema,
  UpdateCustomerSchema,
} from "../data/customerSchema";

const baseURL = `${import.meta.env.VITE_API_URL}`;

//Create Customer
export const createCustomer = async (userData: createCustomerSchema) => {
  try {
    const response = await fetch(`${baseURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      // Handle errors
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { error: err instanceof Error ? err.message : "Unknown error" };
  }
};

//GEt Customer By Id
export const getCustomerById = async (userId: string) => {
  const response = await fetch(`${baseURL}/users/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }
  return response.json();
};

//Update Customer By Id
export const updateCustomer = async (
  id: string,
  values: UpdateCustomerSchema,
  token: string
) => {
  const response = await fetch(`${baseURL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...values,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Terjadi kesalahan.");
  }

  return response.json();
};
