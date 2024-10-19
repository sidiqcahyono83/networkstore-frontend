import { redirect, useLoaderData } from "react-router-dom";
import { Pembayaran } from "../data/typedata";
import { formatIDR } from "../lib/formatCurency";

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

  // Cek apakah data valid
  if (data instanceof Response) return null; // Menangani kesalahan jika data adalah Response

  const { pembayaran } = data;

  // Pastikan ada pembayaran untuk ditampilkan
  if (!pembayaran || pembayaran.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No items in the pembayaran.
      </p>
    );
  }

  // Menghitung total harga keseluruhan
  const totalPrice = pembayaran.reduce((total, item) => {
    return total + item.totalBayar; // Jumlahkan totalBayar dari setiap item
  }, 0);

  return (
    <div className="my-6 mx-6">
      <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
        Pembayaran
      </h2>

      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
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
          {pembayaran.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {item.user.fullname}-({item.user.username})
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
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
              colSpan={4}
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
    </div>
  );
}
