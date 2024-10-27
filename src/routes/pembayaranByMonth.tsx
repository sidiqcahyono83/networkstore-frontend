import { redirect, useLoaderData } from "react-router-dom";
import { Pembayaran } from "../data/typedata";
import { formatIDR } from "../lib/formatCurency";
import { useState } from "react";
import { currentMonth } from "../lib/formatBulanIdn";

type PembayaranResponse = {
  message: string;
  data: Pembayaran[];
};

// Loader for fetching payment data
export async function loader() {
  const token = localStorage.getItem("token");
  if (!token) return redirect("/login");

  const response = await fetch(
    `${
      import.meta.env.VITE_BACKEND_API_URL
    }/pembayaran/pembayaran/${currentMonth}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new Response("Failed to fetch pembayaran data", {
      status: response.status,
    });
  }

  const pembayaranResponse: PembayaranResponse = await response.json();
  return { pembayaranByMonth: pembayaranResponse.data };
}

// Main component
export function PembayaranByBulanIni() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const [searchUser, setSearchUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  if (data instanceof Response) return null;

  const { pembayaranByMonth: pembayaran } = data;
  const validPembayaran = Array.isArray(pembayaran) ? pembayaran : [];

  // Filter and paginate data
  const filteredPembayaran = validPembayaran.filter((item) =>
    item.user.fullname.toLowerCase().includes(searchUser.toLowerCase())
  );

  const totalItems = filteredPembayaran.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedPembayaran = filteredPembayaran.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPrice = paginatedPembayaran.reduce((total, item) => {
    return total + item.totalBayar;
  }, 0);

  return (
    <div className="my-6 mx-6">
      <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
        Pembayaran
      </h2>

      <input
        type="text"
        placeholder="Cari user..."
        value={searchUser}
        onChange={(e) => {
          setSearchUser(e.target.value);
          setCurrentPage(1); // Reset to the first page on search
        }}
        className="mb-4 p-2 border rounded-md w-full"
      />

      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Admin
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Periode
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Metode
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Bayar
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {paginatedPembayaran.map((item, index) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {item.user.fullname}-({item.user.username})
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {item.admin.username}-({item.admin.level})
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {new Date(item.periode).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {item.metode}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {formatIDR(item.totalBayar)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <td
              colSpan={5}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Total
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {formatIDR(totalPrice)}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
