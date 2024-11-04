import { useLoaderData, json, redirect } from "react-router-dom";
import type { User } from "../data/typedata"; // Pastikan tipe User ada di typedata
import { Table, Pagination, Button } from "flowbite-react";
import { useState } from "react";
import { currentMonth } from "../lib/formatBulanIdn";
// import { formatIDR } from "../lib/formatCurency";

type Pembayaran = {
  message: string;
  data: User[]; // Asumsi bahwa properti `data` adalah array dari `User`
};

// Loader function untuk fetching data
export const usersBelumbayarLoader = async () => {
  const token = localStorage.getItem("token");
  if (!token) return redirect("/login");

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
  // const totalBelumBayar = userBelumbayar.data.reduce((acc, user) => {
  //   return acc + (user.paket?.harga || 0);
  // }, 0);

  // Filter users berdasarkan search term
  const filteredUsers = userBelumbayar.data.filter((user) =>
    user.fullname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mengatur data untuk paginasi
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Mengubah halaman
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-2 sm:p-4 lg:p-4">
      <h1 className="text-xl font-bold mb-4 text-center sm:text-center">
        Daftar Pengguna Belum Bayar : <strong>{filteredUsers.length}</strong>
      </h1>

      {/* Form pencarian */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari berdasarkan nama lengkap..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 mt-4 p-2 border rounded-md w-full"
        />
      </div>

      {/* Menampilkan jumlah total pengguna dan total tagihan */}
      {/* <div className="mb-4 text-center sm:text-left">
          <p>
            Total Pengguna yang Belum Bayar:{" "}
            <strong>{filteredUsers.length}</strong>
          </p> */}
      {/* <p>
          Total Tagihan yang Belum Dibayar:{" "}
          <strong>{formatIDR(totalBelumBayar)}</strong>
        </p> */}
      {/* </div> */}

      {/* Tabel menggunakan Flowbite */}
      <div className="overflow-x-auto">
        <Table striped={true} className="min-w-min">
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
                <Table.Cell>{user.fullname}</Table.Cell>
                <Table.Cell>
                  {user.paket?.name}
                  <br />
                  {user.paket?.harga}
                </Table.Cell>
                <Table.Cell>
                  {user.area === null ? user.address : user.area?.name}
                </Table.Cell>

                <Table.Cell>
                  <Button color="success" href={`/users/${user.id}`}>
                    Bayar
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Komponen Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
          onPageChange={paginate}
        />
      </div>
    </div>
  );
}
