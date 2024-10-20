import { json, useLoaderData } from "react-router-dom";
import type { Pembayaran } from "../data/typedata";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Loader function untuk fetching data
export const usersSudahbayarLoader = async () => {
  const token = localStorage.getItem("token");

  // Mendapatkan nama bulan sekarang dengan format "MMMM" dan menggunakan locale Indonesia
  const currentMonth = format(new Date(), "MMMM", { locale: id });
  console.log(currentMonth); // Menampilkan nama bulan untuk pengecekan

  const response = await fetch(
    `${
      import.meta.env.VITE_BACKEND_API_URL
    }/pembayaran/users/sudah/pembayaran/${currentMonth}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  // Periksa apakah respons sukses
  if (!response.ok) {
    throw json(
      { message: "Failed to fetch data" },
      { status: response.status }
    );
  }

  const userSudahbayar: Pembayaran = await response.json(); // Berikan tipe PembayaranResponse

  return { userSudahbayar };
};

export function UsersSudahBayar() {
  // Mengambil data yang di-fetch oleh loader
  const { userSudahbayar: userSudahbayar } = useLoaderData() as {
    userSudahbayar: Pembayaran; // Tentukan tipe PembayaranResponse
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Daftar Pengguna Sudah Bayar</h1>
      <pre>{JSON.stringify(userSudahbayar, null, 2)}</pre>
    </div>
  );
}
