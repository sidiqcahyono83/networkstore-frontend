import { redirect } from "react-router-dom";
import { Pembayaran } from "../data/typedata";

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
  return { pembayaran: pembayaranResponse.data };
}
