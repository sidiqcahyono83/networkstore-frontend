import { redirect } from "react-router-dom";
import { User } from "../data/typedata";

export async function getAllUsers() {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/users`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized, return a specific message
        return { error: "Unauthorized access, please login again", users: [] };
      }
      // Handle other error codes like 500
      return { error: "Failed to fetch users, server error", users: [] };
    }

    const userResponse: User = await response.json();

    return { users: userResponse };
  } catch (err) {
    // Handle network errors or unexpected issues
    return { error: "Failed to fetch users, network error", users: [] };
  }
}

//Get User By Id
export async function getUsersById(id: string) {
  const token = localStorage.getItem("token");

  // Cek token dan params.id
  if (!token) {
    return redirect("/login");
  }
  if (!id) {
    return { error: "User ID is missing" };
  }
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/users/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized, return a specific message
        return { error: "Unauthorized access, please login again" };
      }
      // Handle other error codes like 500
      return { error: "Failed to fetch users, server error", users: [] };
    }

    const userResponse = await response.json();
    const user = userResponse;
    // console.log(userResponse);

    return user;
  } catch (err) {
    return { error: "Failed to fetch users, network error" };
  }
}

//Update User By Id
export async function updateUserById(id: string, updates: User) {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/users/${id}`,
    {
      method: "PUT", // Gunakan PUT atau PATCH sesuai kebutuhan
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  const updatedUser: User = await response.json();
  return updatedUser;
}
