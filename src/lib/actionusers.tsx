import { User } from "../data/typedata";

type UserResponse = {
  message: string;
  user: User[];
};

export async function getAllUsers() {
  const token = localStorage.getItem("token");
  if (!token) {
    // Return error if no token found
    return { error: "No token, please login", users: [] };
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

    const userResponse: UserResponse = await response.json();
    return { users: userResponse.user, error: null };
  } catch (err) {
    // Handle network errors or unexpected issues
    return { error: "Failed to fetch users, network error", users: [] };
  }
}
