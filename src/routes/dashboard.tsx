import { useEffect, useState } from "react";
import { Card } from "flowbite-react";

// Define the type for admin data
type AdminData = {
  id: string;
  username: string;
  fullName: string | null;
  level: string;
  createdAt: string;
  updatedAt: string;
};

export const AdminDashboard = () => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [userCount, setUserCount] = useState(0);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch admin data");
        }

        const data = await response.json();
        setAdminData(data.data);

        const { id, level } = data.data;
        localStorage.setItem("adminId", id);
        localStorage.setItem("level", level);
      } catch (err) {
        setError("Login failed. Please try again.");
      }
    };

    fetchAdminData();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch users data");
        }

        const usersData = await response.json();
        setUserCount(usersData.user.length); // Assuming usersData.data is an array
      } catch (err) {
        setError("Failed to fetch users data.");
      }
    };

    fetchUsers();
  }, [token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {adminData && (
        <Card className="max-w-md mx-auto mb-4">
          <h5 className="text-lg font-bold">Admin Information</h5>
          <p>Username: {adminData.username || "Not available"}</p>
          <p>Level: {adminData.level || "Not available"}</p>
          <p>Created At: {new Date(adminData.createdAt).toLocaleString()}</p>
          <p>Updated At: {new Date(adminData.updatedAt).toLocaleString()}</p>
        </Card>
      )}

      <Card className="max-w-md mx-auto mb-4">
        <h5 className="text-lg font-bold">User Statistics</h5>
        <p>Total Users: {userCount}</p>
      </Card>

      <h2 className="text-xl font-bold mt-6">Areas</h2>
      <ul>
        <li>Area 1</li>
        <li>Area 2</li>
      </ul>
    </div>
  );
};
