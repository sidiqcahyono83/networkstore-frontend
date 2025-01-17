import { redirect, useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import { formatIDR } from "../lib/formatCurency";
import { User } from "../data/typedata";
import { Button } from "flowbite-react";

type UserResponse = {
  message: string;
  user: User[];
};

export async function loader() {
  const token = localStorage.getItem("token");
  if (!token) return redirect("/login");

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/users`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    // Handle error response, such as 401, 500, etc.
    return redirect("/login");
  }

  const userResponse: UserResponse = await response.json();

  return { users: userResponse.user };
}

export function Users() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [currentPage, setCurrentPage] = useState(1); // State for pagination

  if (data instanceof Response) return null;

  const { users } = data;

  // Search and Filter logic
  const filteredUsers = users.filter((user) =>
    user.fullname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const usersPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (userId: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // alert("User deleted successfully");
      // // Arahkan atau perbarui tampilan
      redirect("/users"); // Contoh pengalihan ke halaman daftar pengguna
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="mx-auto">
      <div className=" flex items-center justify-center">
        <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Customer List
        </h2>
      </div>

      {/* Search input */}
      <div className="flex flex-row items-center">
        <Button
          color="green"
          className="bg-green-500 hover:bg-green-800 text-white"
          as={Link}
          to="/create/users"
        >
          Add
        </Button>
        <input
          type="text"
          placeholder="Search by Full Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mx-2 my-2 p-2 border border-gray-300 rounded-md justify-end"
        />
      </div>

      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              No
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Full Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Profile
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Disk
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Area
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Olt Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {/* <pre>{JSON.stringify(currentUsers, null, 2)}</pre> */}
          {currentUsers.map((user, index) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {(currentPage - 1) * usersPerPage + index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {user.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {user.fullname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {user.paket?.name}
                <br />
                {formatIDR(user.paket?.harga)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {formatIDR(user.diskon)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {user.area === null ? user.address : user.area?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {user.ontName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-4">
                <Button
                  type="submit"
                  href={`/update/users/${user.id}`}
                  className="bg-blue-700"
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-700"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <td
              colSpan={3}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Total
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {formatIDR(
                currentUsers.reduce(
                  (total, user) => total + (user.paket?.harga ?? 0),
                  0
                )
              )}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`mx-1 p-2 ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
