import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { Pembayaran } from "../data/typedata";
import { formatIDR } from "../lib/formatCurency";

// Mendefinisikan tipe untuk respons pembayaran
type PembayaranResponse = {
  message: string;
  data: Pembayaran[];
};

const months = [
  { value: "Januari", label: "Januari" },
  { value: "Februari", label: "Februari" },
  { value: "Maret", label: "Maret" },
  { value: "April", label: "April" },
  { value: "Mei", label: "Mei" },
  { value: "Juni", label: "Juni" },
  { value: "Juli", label: "Juli" },
  { value: "Agustus", label: "Agustus" },
  { value: "September", label: "September" },
  { value: "Oktober", label: "Oktober" },
  { value: "November", label: "November" },
  { value: "Desember", label: "Desember" },
];

const formatDateIndonesian = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };

  return new Intl.DateTimeFormat("id-ID", options).format(new Date(dateString));
};

// Komponen PembayaranForm
export function PembayaranFilter() {
  const [month, setMonth] = useState<string>("");
  const [metode, setMetode] = useState<string>("");
  const [adminUsername, setAdminUsername] = useState<string>("");
  const [date, setDate] = useState<string>(""); // New state for date
  const [, setPembayaran] = useState<Pembayaran[]>([]);
  const [filteredData, setFilteredData] = useState<Pembayaran[]>([]);
  const [metodeOptions, setMetodeOptions] = useState<string[]>([]);
  const [adminOptions, setAdminOptions] = useState<string[]>([]);

  // Fetch data pembayaran dan set metode serta admin username
  const fetchPembayaran = async () => {
    const token = localStorage.getItem("token");
    if (!token) return redirect("/login");

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/pembayaran`,
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
    setPembayaran(pembayaranResponse.data);

    // Mengambil metode pembayaran dan admin username dari data
    const uniqueMetode = Array.from(
      new Set(pembayaranResponse.data.map((p) => p.metode))
    );
    const uniqueAdmin = Array.from(
      new Set(pembayaranResponse.data.map((p) => p.admin.username))
    );

    setMetodeOptions(uniqueMetode);
    setAdminOptions(uniqueAdmin);
  };

  // Fetch data berdasarkan filter
  const fetchFilteredPembayaran = async () => {
    const token = localStorage.getItem("token");
    if (!token) return redirect("/login");

    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_API_URL
      }/pembayaran/users/pembayaran/${month}/${metode}/${adminUsername}/${date}`, // Include date in the API call
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      throw new Response("Failed to fetch filtered pembayaran data", {
        status: response.status,
      });
    }

    const pembayaranResponse: PembayaranResponse = await response.json();
    setFilteredData(pembayaranResponse.data);
  };

  useEffect(() => {
    // Fetch semua pembayaran dan set opsi metode serta admin username
    fetchPembayaran();
  }, []);

  const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchFilteredPembayaran();
  };

  // Menghitung total harga keseluruhan
  const totalPrice = filteredData.reduce((total, item) => {
    return total + item.totalBayar; // Jumlahkan totalBayar dari setiap item
  }, 0);

  return (
    <div className="my-6 mx-6">
      <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
        Shopping pembayaran
      </h2>

      <form onSubmit={handleFilter}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Bulan:
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Pilih Bulan</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Metode:
          </label>
          <select
            value={metode}
            onChange={(e) => setMetode(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Pilih Metode Pembayaran</option>
            {metodeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Admin Username:
          </label>
          <select
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Pilih Admin Username</option>
            {adminOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tanggal:
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Filter
        </button>
      </form>

      {filteredData.length > 0 ? (
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
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {item.user.fullname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {item.admin.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDateIndonesian(item.periode)}
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
        </table>
      ) : (
        <div className="mt-4 text-gray-500 dark:text-gray-400">
          No data found
        </div>
      )}

      <div className="mt-4">
        <strong>Total Harga Keseluruhan: {formatIDR(totalPrice)}</strong>
      </div>
    </div>
  );
}
