import { useEffect, useState } from "react";
import { getAllUsers } from "../lib/actionusers"; // Import function

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
      <p>Total Users: {userCount}</p>
      <p>Nama : </p>

      <h2>Areas</h2>
      <ul></ul>
    </div>
  );
};
