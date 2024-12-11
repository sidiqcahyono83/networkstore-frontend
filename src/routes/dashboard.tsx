import { useEffect, useState } from "react";
import { Card } from "flowbite-react";

// Define the type for admin data and user data
type AdminData = {
  id: string;
  username: string;
  fullName: string | null;
  level: string;
  Area: [];
  createdAt: string;
  updatedAt: string;
};

type UserData = {
  id: string;
  username: string;
  fullname: string;
  address: string;
  phoneNumber: string;
  area: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};

export const AdminDashboard = () => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [userCount, setUserCount] = useState<UserData[]>([]); // Initialize as an empty array
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
        if (!data) {
          setError("Login failed. Please try again.");
          return;
        }

        setAdminData(data.data);

        const { id, username } = data.data;
        localStorage.setItem("adminId", id);
        localStorage.setItem("username", username);
      } catch (err) {
        setError("Login failed. Please try again.");
      }
    };

    fetchAdminData();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      const username = localStorage.getItem("username");
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/users/users/${username}`,
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
        setUserCount(usersData.user || []); // Ensure usersData.user is an array
      } catch (err) {
        setError("Failed to fetch users data.");
      }
    };

    fetchUsers();
  }, [token]);

  // Group users by area and count them
  const groupedAreas = userCount?.length
    ? userCount.reduce((acc: Record<string, number>, user) => {
        const areaName = user.area.name;
        acc[areaName] = (acc[areaName] || 0) + 1;
        return acc;
      }, {})
    : {}; // Handle cases where userCount is empty

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  return (
    <div>
      <div className="p-4  mx-auto max-w-full">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          Admin Dashboard
        </h1>

        {adminData && (
          <Card className="max-w-full sm:max-w-lg mx-auto mb-4 p-4 sm:p-6 shadow-sm bg-transparent hover:bg-blue-300">
            <p className="text-center text-2xl font-bold text-blue-700 hover:text-white">
              {adminData.fullName || "Not available"}
            </p>
            <p>Username : {adminData.username || "Not available"}</p>
            <p>Level : {adminData.level || "Not available"}</p>
          </Card>
        )}

        <h5 className="text-lg font-bold mb-4 text-center">Area Information</h5>
        <div
          className={`grid gap-4 ${
            Object.keys(groupedAreas).length < 6 ? "justify-center" : ""
          } grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6`}
        >
          {Object.keys(groupedAreas).length > 0 ? (
            Object.entries(groupedAreas).map(([areaName, count]) => (
              <Card
                key={areaName}
                className="p-4 hover:bg-blue-700 hover:text-white"
              >
                <p className="text-cyan-950 font-semibold text-lg text-center">
                  {areaName}
                </p>
                <p className="text-center">Total Customers: {count}</p>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center">No user data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
