import { Table, TextInput, Button } from "flowbite-react";
import { useEffect, useState } from "react";

const PppoeNonactive = () => {
  const [pppoeNonActive, setPppoeNonActive] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchNonActivePPPoE = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/nonactive`
        );
        const data = await response.json();
        setPppoeNonActive(data.data.inactive_ppp);
      } catch (error) {
        console.error("Error fetching non-active PPPoE data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNonActivePPPoE();
  }, []);

  // Filter data berdasarkan search term (nama pengguna)
  const filteredData = pppoeNonActive.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Menghitung jumlah halaman
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Mendapatkan data untuk halaman saat ini
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-xlg mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex gap-4 mb-4">
        {/* Baris pertama: Input pencarian dan info jumlah pengguna */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <TextInput
            id="search"
            type="text"
            placeholder="Cari nama pengguna"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-96"
          />
          <p className="text-lg font-semibold">
            Non Active: {filteredData.length}
          </p>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 flex-wrap">
            <Button
              color="light"
              href="/pppoesecret"
              className="w-full sm:w-auto bg-blue-700"
            >
              PPPoE Secret
            </Button>
            <Button
              color="light"
              href="/nonactive"
              className="w-full sm:w-auto bg-red-700"
            >
              PPPoE Nonactive
            </Button>
            <Button
              color="light"
              href="/pppoe"
              className="w-full sm:w-auto bg-green-600"
            >
              Back to PPPoE
            </Button>
          </div>
        </div>

        {/* Baris kedua: Tombol-tombol tindakan */}
      </div>

      <Table striped>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Nama Pengguna</Table.HeadCell>
          <Table.HeadCell>Paket</Table.HeadCell>
          <Table.HeadCell>Periode</Table.HeadCell>
          <Table.HeadCell>Total Bayar</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentData.map((user, index) => (
            <Table.Row
              key={user[".id"]}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell
                className={user.disabled === "true" ? "text-red-500" : ""}
              >
                {index + 1}
              </Table.Cell>
              <Table.Cell
                className={user.disabled === "true" ? "text-red-500" : ""}
              >
                {user.name}
              </Table.Cell>
              <Table.Cell
                className={user.disabled === "true" ? "text-red-500" : ""}
              >
                {user.service}
              </Table.Cell>
              <Table.Cell
                className={user.disabled === "true" ? "text-red-500" : ""}
              >
                {user.profile}
              </Table.Cell>
              <Table.Cell
                className={user.disabled === "true" ? "text-red-500" : ""}
              >
                {user["last-logged-out"]}
              </Table.Cell>
              <Table.Cell
                className={user.disabled === "true" ? "text-red-500" : ""}
              >
                {user["last-caller-id"]}
              </Table.Cell>
              <Table.Cell
                className={user.disabled === "true" ? "text-red-500" : ""}
              >
                {user["last-disconnect-reason"]}
              </Table.Cell>
              <Table.Cell
                className={user.disabled === "true" ? "text-red-500" : ""}
              >
                {user.disabled === "true" ? "Yes" : "No"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Paginasi */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 mx-1 border ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PppoeNonactive;
