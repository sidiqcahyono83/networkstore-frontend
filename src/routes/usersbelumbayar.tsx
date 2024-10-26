import { useLoaderData, json, redirect } from "react-router-dom";
import type { User } from "../data/typedata"; // Pastikan tipe User ada di typedata
import { Table, Pagination } from "flowbite-react";
import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

type Pembayaran = {
  message: string;
  data: User[]; // Asumsi bahwa properti `data` adalah array dari `User`
};

// Loader function untuk fetching data
export const usersBelumbayarLoader = async () => {
  const token = localStorage.getItem("token");

  if (!token) return redirect("/login");

  // Mendapatkan nama bulan sekarang dengan format "MMMM" dan menggunakan locale Indonesia
  const currentMonth = format(new Date(), "MMMM", { locale: id });
  // console.log(currentMonth); // Menampilkan nama bulan untuk pengecekan

  const response = await fetch(
    `${
      import.meta.env.VITE_BACKEND_API_URL
    }/pembayaran/users/pembayaran/${currentMonth}`,
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

  const userBelumbayar: Pembayaran = await response.json(); // Berikan tipe Pembayaran

  return { userBelumbayar };
};

export function UsersBelumBayar() {
  // Mengambil data yang di-fetch oleh loader
  const { userBelumbayar } = useLoaderData() as {
    userBelumbayar: Pembayaran; // Tentukan tipe Pembayaran
  };

  // Menggunakan state untuk paginasi dan pencarian
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 15;

  // Total pengguna yang belum membayar
  // const totalUsers = userBelumbayar.data.length;

  // Menghitung total tagihan yang belum dibayar
  const totalBelumBayar = userBelumbayar.data.reduce((acc, user) => {
    return acc + user.paket.harga;
  }, 0);

  // Filter users berdasarkan search term
  const filteredUsers = userBelumbayar.data.filter((user) =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mengatur data untuk paginasi
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Mengubah halaman
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Daftar Pengguna Belum Bayar</h1>

      {/* Form pencarian */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari berdasarkan nama lengkap..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      {/* Menampilkan jumlah total pengguna dan total tagihan */}
      <div className="mb-4">
        <p>
          Total Pengguna yang Belum Bayar:{" "}
          <strong>{filteredUsers.length}</strong>
        </p>
        <p>
          Total Tagihan yang Belum Dibayar:{" "}
          <strong>Rp {totalBelumBayar.toLocaleString("id-ID")}</strong>
        </p>
      </div>

      {/* Tabel menggunakan Flowbite */}
      <Table striped={true}>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>

          <Table.HeadCell>Full Name</Table.HeadCell>
          <Table.HeadCell>Paket</Table.HeadCell>
          <Table.HeadCell>Area</Table.HeadCell>
          <Table.HeadCell>Bayar</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Bayar</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentUsers.map((user: User, index: number) => (
            <Table.Row
              key={user.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{indexOfFirstUser + index + 1}</Table.Cell>
              <Table.Cell>
                {user.fullname} -{user.username}
              </Table.Cell>
              <Table.Cell>
                {user.paket.name}-{user.paket.harga}
              </Table.Cell>
              <Table.Cell>{user.Area?.name}</Table.Cell>

              <Table.Cell>
                <a
                  href={`/users/${user.id}`}
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Bayar
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Komponen Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
        onPageChange={paginate}
      />
    </div>
  );
}
