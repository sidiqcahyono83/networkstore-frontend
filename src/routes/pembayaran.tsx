import { redirect, useLoaderData } from "react-router-dom";
import { Pembayaran } from "../data/typedata";
import { formatIDR } from "../lib/formatCurency";
import { useState } from "react";
import { Button } from "flowbite-react";

// Mendefinisikan tipe untuk respons pembayaran
type PembayaranResponse = {
  message: string;
  data: Pembayaran[]; // Sesuaikan dengan tipe data
};

// Loader untuk mengambil data pembayaran
export async function loader() {
  const token = localStorage.getItem("token");
  if (!token) return redirect("/login");

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/pembayaran`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  // Cek jika respons tidak ok
  if (!response.ok) {
    throw new Response("Failed to fetch pembayaran data", {
      status: response.status,
    });
  }

  // Ambil data pembayaran
  const pembayaranResponse: PembayaranResponse = await response.json();
  return { pembayaran: pembayaranResponse.data }; // Mengambil data dari response
}

// Komponen PembayaranForm
export function PembayaranList() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const [searchUser, setSearchUser] = useState("");

  // Cek apakah data valid
  if (data instanceof Response) return null;

  const { pembayaran } = data;

  // Filter data berdasarkan nama pengguna yang sesuai dengan pencarian
  const filteredPembayaran = pembayaran.filter((item) =>
    item.user.fullname?.toLowerCase().includes(searchUser.toLowerCase())
  );

  // Pastikan ada pembayaran untuk ditampilkan
  if (filteredPembayaran.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No items in the pembayaran.
      </p>
    );
  }

  // Menghitung total harga keseluruhan untuk hasil filter
  const totalPrice = filteredPembayaran.reduce((total, item) => {
    return total + item.totalBayar;
  }, 0);
  return (
    <div className="mx-auto">
      <h2 className="text-xl text-center font-bold leading-none text-gray-900 dark:text-white">
        Pembayaran : <strong>{filteredPembayaran.length}</strong>
      </h2>

      {/* Input pencarian */}
      <input
        type="text"
        placeholder="Cari user..."
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        className="mb-4 mt-4 p-2 border rounded-md w-full"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 rounded-md text-gray-700 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-4 text-left text-xs uppercase  tracking-wider">
                No
              </th>
              <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="hidden md:table-cell px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Admin
              </th>
              <th className="hidden md:table-cell px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Periode
              </th>
              <th className="hidden md:table-cell px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Metode
              </th>
              <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Bayar
              </th>
              <th className="px-4 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {filteredPembayaran.map((item, index) => (
              <tr key={item.id}>
                <td className="px-4 py-1 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </td>
                <td className="px-1 py-1 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {item.user.fullname}
                </td>
                <td className="hidden md:table-cell px-4 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {item.admin.username}
                </td>
                <td className="hidden md:table-cell px-1 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {new Date(item.periode).toLocaleDateString()}
                </td>
                <td className="hidden md:table-cell px-1 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {item.metode}
                </td>
                <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatIDR(item.totalBayar)}
                </td>
                <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <Button
                    type="submit"
                    className="btn"
                    href={`/pembayaran/${item.id}`}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <td
                colSpan={5}
                className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </td>
              <td className="px-1 py-1 text-left text-sm items-center font-medium text-gray-500 uppercase tracking-wider">
                {formatIDR(totalPrice)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
