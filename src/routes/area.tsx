import { redirect, useLoaderData } from "react-router-dom";
import { getaAreas } from "../lib/area";
import { Area } from "../data/typedata";
import { Button, Table } from "flowbite-react"; // Mengimpor Tabel Flowbite

// Mendefinisikan tipe data yang diharapkan untuk loader
interface LoaderData {
  area: Area[];
}

export async function loader(): Promise<LoaderData | Response> {
  const token = localStorage.getItem("token");
  if (!token) return redirect("/login");

  const area: Area[] = await getaAreas();

  return { area }; // Mengembalikan objek dengan properti area
}

export function AreaList() {
  const { area } = useLoaderData() as LoaderData; // Menggunakan tipe LoaderData untuk pengetikan

  return (
    <div className="my-4 mx-4">
      <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white mb-4">
        Daftar Area
      </h2>
      <Table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <Table.Head>
          <Table.HeadCell>Area ID</Table.HeadCell>
          <Table.HeadCell>Nama Area</Table.HeadCell>
          <Table.HeadCell>Jmlah Customers</Table.HeadCell>
          <Table.HeadCell className="text-center">Tindakan</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {area.map((item) => (
            <Table.Row
              key={item.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <Table.Cell className="px-2 py-2">{item.id}</Table.Cell>
              <Table.Cell className="px-2 py-2">{item.name}</Table.Cell>
              <Table.Cell className="px-2 py-2">
                {item.user?.length || 0}
              </Table.Cell>
              <Table.Cell className="px-2 py-2">
                <div className="flex justify-center gap-2">
                  <Button className="bg-blue-600">Edit</Button>
                  <Button className="bg-red-600 hover:underline">Hapus</Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
