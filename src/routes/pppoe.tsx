import { Button, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { PPPoE } from "../data/typedata";

export function PppActive() {
  const [pppoe, setPppoe] = useState<PPPoE[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchNonActivePPPoE = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/ppp/active`
        );
        const data = await response.json();
        setPppoe(data.active_ppp);
      } catch (error) {
        console.error("Error fetching non-active PPPoE data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNonActivePPPoE();
  }, []);

  const filteredData = pppoe.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = filteredData.length
    ? Math.ceil(filteredData.length / itemsPerPage)
    : 1;

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-4 lg:px-4 py-4">
      <div className="flex gap-4 mb-4">
        {/* Baris pertama: Input pencarian dan info jumlah pengguna */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-lg font-semibold">
            Pengguna Non-Aktif: {filteredData.length}
          </p>
          <TextInput
            id="search"
            type="text"
            placeholder="Cari nama pengguna"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-96"
          />
          <div className="flex justify-center sm:justify-between items-center gap-4 flex-wrap">
            <Button
              color="light"
              onClick={() => (window.location.href = "/nonactive")}
              className="w-full sm:w-auto bg-red-500 text-white hover:bg-red-600"
            >
              PPPoE Nonactive
            </Button>
            <Button
              color="light"
              onClick={() => (window.location.href = "/pppoe")}
              className="w-full sm:w-auto bg-green-600 text-slate-50 hover:bg-green-700"
            >
              Back to PPPoE
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-6">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Service</Table.HeadCell>
            <Table.HeadCell>Address</Table.HeadCell>
            <Table.HeadCell>Uptime</Table.HeadCell>
            <Table.HeadCell>Caller_Id</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {currentData.map((user, index) => (
              <Table.Row
                key={user[".id"]}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.service}</Table.Cell>
                <Table.Cell>{user.address}</Table.Cell>
                <Table.Cell>{user.uptime}</Table.Cell>
                <Table.Cell>{user["caller-id"]}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

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
}
