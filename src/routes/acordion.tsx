import { Accordion } from "flowbite-react";
import { useLoaderData } from "react-router-dom";
import { User } from "../data/typedata";

// Loader untuk mengambil data
export async function loader() {
  const baseUrl = "http://localhost:3000";
  const response = await fetch(`${baseUrl}/users`);

  if (!response.ok) {
    throw new Response("Failed to fetch data", { status: response.status });
  }

  const users = await response.json();
  // console.log(users);
  return { user: users.user };
}

// Komponen untuk menampilkan data
export function Component() {
  const { user } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <Accordion>
      <Accordion.Panel>
        <Accordion.Title>Daftar Pengguna</Accordion.Title>
        <Accordion.Content>
          {/* <p>Jumlah Pengguna: {users.length}</p> */}
          <table className="min-w-full bg-white border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID Pengguna</th>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Nama Lengkap</th>
                <th className="py-2 px-4 border-b">Harga Paket</th>
              </tr>
            </thead>
            <tbody>
              {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
              {user.map((items: User, index: number) => (
                <tr key={items.id} className="text-center">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{items.username}</td>
                  <td className="py-2 px-4 border-b">{items.fullname}</td>
                  <td className="py-2 px-4 border-b">{items.paket?.harga}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
}
