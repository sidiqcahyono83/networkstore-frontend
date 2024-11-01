import { Table, TextInput, Button } from "flowbite-react";
import { useEffect, useState } from "react";

const PppActive = () => {
  const [pppoe, setPppoe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchActivePPPoE = async () => {
      try {
        const response = await fetch(
          "https://teranet.cahyonomuslimsidiq.com/pppactive"
        );
        const data = await response.json();
        setPppoe(data.data.active_ppp);
      } catch (error) {
        console.error("Error fetching active PPPoE data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivePPPoE();
  }, []);

  const filteredData = pppoe.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
            Total Pengguna Aktif: {filteredData.length}
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
              href="/active"
              className="w-full sm:w-auto bg-green-600"
            >
              Back to PPPoE
            </Button>
          </div>
        </div>

        {/* Baris kedua: Tombol-tombol tindakan */}
      </div>
      <div className="overflow-x-auto mt-6">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Nama Pengguna</Table.HeadCell>
            <Table.HeadCell>Service</Table.HeadCell>
            <Table.HeadCell>Caller ID</Table.HeadCell>
            <Table.HeadCell>Alamat IP</Table.HeadCell>
            <Table.HeadCell>Uptime</Table.HeadCell>
            <Table.HeadCell>Session ID</Table.HeadCell>
            <Table.HeadCell>Disabled</Table.HeadCell>
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
                <Table.Cell>{user["caller-id"]}</Table.Cell>
                <Table.Cell>{user.address}</Table.Cell>
                <Table.Cell>{user.uptime}</Table.Cell>
                <Table.Cell>{user["session-id"]}</Table.Cell>
                <Table.Cell
                  className={user.disabled === "true" ? "text-red-500" : ""}
                >
                  {user.disabled === "true" ? "Yes" : "No"}
                </Table.Cell>
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
};

export default PppActive;
