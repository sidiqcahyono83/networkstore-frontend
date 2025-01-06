import { useEffect, useState } from "react";
import { Card } from "flowbite-react";

type AdminData = {
  id: string;
  username: string;
  fullname: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
  Area?: {
    id: string;
    name: string;
    _count: { customer: number };
  }[];
  _count?: { Area: number };
};

export const AdminDashboard = () => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/auth/login/me`,
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
        setAdminData(data.user);
      } catch (err) {
        setError("Failed to fetch admin data. Please try again.");
      }
    };

    fetchAdminData();
  }, [token]);

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  return (
    <div>
      <div className="p-4 mx-auto max-w-full">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          Admin Dashboard
        </h1>
        {adminData && (
          <Card className="max-w-full sm:max-w-lg mx-auto mb-4 p-4 sm:p-6 shadow-sm bg-transparent hover:bg-blue-300">
            <p className="text-center text-2xl font-bold text-blue-700 hover:text-white">
              {adminData.fullname || "Not available"}
            </p>
            <p>Username: {adminData.username || "Not available"}</p>
            <p>Nama: {adminData.fullname || "Not available"}</p>
            <p>Area Coverage: {adminData._count?.Area || "Not available"}</p>
          </Card>
        )}

        <h5 className="text-lg font-bold mb-4 text-center">Area Information</h5>
        <div
          className={`grid gap-4 ${
            adminData?.Area?.length && adminData.Area.length < 6
              ? "justify-center"
              : ""
          } grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6`}
        >
          {adminData?.Area && adminData.Area.length > 0 ? (
            adminData.Area.map((area) => (
              <Card
                key={area.id}
                className="p-4 hover:bg-blue-700 hover:text-white"
              >
                <p className="text-cyan-950 font-semibold text-lg text-center">
                  {area.name}
                </p>
                <p className="text-center">
                  Total Customers: {area._count.customer || 0}
                </p>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center">No area data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
