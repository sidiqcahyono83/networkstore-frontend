import { useEffect, useState } from "react";
import { Card } from "flowbite-react";

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

      {/* Menampilkan data admin dalam format JSON */}
      {/* <pre>{JSON.stringify(adminData, null, 2)}</pre> */}

      <Card href="/pppoe" className="max-w-sm">
        {/* Menampilkan username dan fullname langsung dari adminData */}
        <div>
          <h5>{adminData?.user?.username}</h5>
          <p>{adminData?.user?.fullName}</p>
        </div>
      </Card>
    </div>
  );
};
