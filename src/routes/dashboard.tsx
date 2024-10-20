import { useEffect, useState } from "react";

export const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        if (!token) {
          throw new Error("No token found");
        }

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
        setAdminData(data);
      } catch (err) {
        setError("Login failed. Please try again.");
      }
    };

    fetchAdminData();
  }, [token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!adminData) {
    return <div>Loading...</div>; // Consider adding a spinner here
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <pre>{JSON.stringify(adminData, null, 2)}</pre>
      {/* You could format this to display user-friendly data */}
    </div>
  );
};
