import { useEffect, useState } from "react";
import { getAllUsers } from "../lib/actionusers";
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
  const [adminData, setAdminData] = useState<AdminData | null>(null); // Apply the type here
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
          "https://teranet.cahyonomuslimsidiq.com/auth/me",
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
        setAdminData(data.data); // Update to access data under "data" in the response

        // Set adminId and level in local storage
        const { id, level } = data.data; // Destructure to get id and level
        localStorage.setItem("adminId", id);
        localStorage.setItem("level", level);
      } catch (err) {
        setError("Login failed. Please try again.");
      }
    };

    fetchAdminData();
  }, [token]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { users, error } = await getAllUsers();
      if (error) {
        setError(error);
        return;
      }

      if (users.length > 0) {
        setUserCount(users.length);
      }
    };

    fetchUsers();
  }, []);

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
      {/* Placeholder example if area data is added in the future */}
      <ul>
        <li>Area 1</li>
        <li>Area 2</li>
        {/* Modify or add area data as needed */}
      </ul>
    </div>
  );
};
