import { useEffect, useState } from "react";
import { getAllUsers } from "../lib/actionusers";
import { Card } from "flowbite-react";

export const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const { users, error } = await getAllUsers();
      if (error) {
        setError(error); // Set error if there's an issue with fetching
        return { error };
      }

      if (users.length > 0) {
        setUserCount(users.length); // Set total number of users
      }
    };

    fetchUsers(); // Fetch users when component mounts
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Handle error
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
      <p>Total Users: {userCount}</p>
      <p>Nama : </p>

      <h2>Areas</h2>
      <ul></ul>
    </div>
  );
};
