import { Table, TextInput, Button } from "flowbite-react";
import { useEffect, useState } from "react";

// Define an interface for the structure of each PPPoE user
interface PPPoEUser {
  id: string; // Adjusted to match the key name in your JSON data
  name: string;
  service: string;
  profile: string;
  "last-logged-out": string;
  "last-caller-id": string;
  "last-disconnect-reason": string;
  disabled: boolean; // Changed to boolean
}

// Define an interface for the response structure from the API
interface ApiResponse {
  data: {
    inactive_ppp: PPPoEUser[]; // Use the PPPoEUser interface here
  };
}

const PppoeNonactive = () => {
  const [pppoeNonActive, setPppoeNonActive] = useState<PPPoEUser[]>([]);
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

        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json(); // Specify the type here

        // Ensure the structure is as expected
        if (data.data && Array.isArray(data.data.inactive_ppp)) {
          const users: PPPoEUser[] = data.data.inactive_ppp.map((user) => ({
            ...user,
            disabled: user.disabled === "true", // Convert to boolean
          }));
          setPppoeNonActive(users);
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching non-active PPPoE data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNonActivePPPoE();
  }, []);

  const filteredData = pppoeNonActive.filter((user) =>
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
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
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
        <div className="flex flex-wrap gap-4">
          <Button color="light" href="/pppoe" className="bg-green-600">
            Back to PPPoE
          </Button>
        </div>
      </div>

      <Table striped>
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Nama Pengguna</Table.HeadCell>
          <Table.HeadCell>Service</Table.HeadCell>
          <Table.HeadCell>Profile</Table.HeadCell>
          <Table.HeadCell>Logout</Table.HeadCell>
          <Table.HeadCell>Mac</Table.HeadCell>
          <Table.HeadCell>Reason</Table.HeadCell>
          <Table.HeadCell>Disabled</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentData.map((user, index) => (
            <Table.Row
              key={index}
              className={`bg-white dark:border-gray-700 dark:bg-gray-800 ${
                user.disabled ? "bg-red-100" : ""
              }`} // Highlight disabled users
            >
              <Table.Cell>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </Table.Cell>
              <Table.Cell className={user.disabled ? "text-red-500" : ""}>
                {user.name}
              </Table.Cell>
              <Table.Cell className={user.disabled ? "text-red-500" : ""}>
                {user.service}
              </Table.Cell>
              <Table.Cell className={user.disabled ? "text-red-500" : ""}>
                {user.profile}
              </Table.Cell>
              <Table.Cell className={user.disabled ? "text-red-500" : ""}>
                {user["last-logged-out"]}
              </Table.Cell>
              <Table.Cell className={user.disabled ? "text-red-500" : ""}>
                {user["last-caller-id"]}
              </Table.Cell>
              <Table.Cell className={user.disabled ? "text-red-500" : ""}>
                {user["last-disconnect-reason"]}
              </Table.Cell>
              <Table.Cell>{user.disabled ? "Yes" : "No"}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

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
