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
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="my-4 mx-4">
      <div className=" flex items-center justify-center">
        <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Customer List
        </h2>
      </div>

      {/* Search input */}
      <div className="flex flex-row items-center">
        <Button color="warning" as={Link} to="/create/users">
          Add
        </Button>
        <input
          type="text"
          placeholder="Search by Full Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mx-2 my-2 p-2 border border-gray-300 rounded-full justify-end"
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
                {user.paket?.harga}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {formatIDR(user.diskon)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {user.Area === null ? user.address : user.Area?.name}
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
                  Edt
                </Button>
                <Button type="submit" href={`/users/${user.id}`}>
                  BAYAR
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
                  (total, user) => total + user.paket?.harga,
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
