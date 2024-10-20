import { Accordion } from "flowbite-react";
import { useLoaderData } from "react-router-dom";

// Definisikan tipe User dan Paket
interface Paket {
  harga: number;
}

interface UserDetail {
  username: string;
  fullname: string;
  paket: Paket;
}

interface User {
  userId: string;
  user: UserDetail;
}

// Loader untuk mengambil data
export async function loader() {
  // Ambil bulan sekarang dalam format panjang (contoh: "Oktober")
  const bulan = new Date().toLocaleString("id-ID", { month: "long" });

  const response = await fetch(
    `https://teranet.cahyonomuslimsidiq.com/pembayaran/users/sudah/pembayaran/${bulan}`
  );

  if (!response.ok) {
    // Tangani error seperti 401, 500, dll.
    throw new Response("Failed to fetch data", { status: response.status });
  }

  const userSudahBayar = await response.json();

  return userSudahBayar.data as User[]; // Cast data ke tipe User[]
}

// Komponen untuk menampilkan data
export function Component() {
  const users = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <Accordion>
      <Accordion.Panel>
        <Accordion.Title>
          Daftar Pengguna yang Sudah Bayar Bulan Ini
        </Accordion.Title>
        <Accordion.Content>
          <ul>
            {users && users.length > 0 ? (
              users.map((user: User, index: number) => (
                <li key={index}>
                  <strong>Nama:</strong> {user.user.fullname} <br />
                  <strong>Username:</strong> {user.user.username} <br />
                  <strong>Harga Paket:</strong> Rp
                  {user.user.paket.harga.toLocaleString("id-ID")}
                </li>
              ))
            ) : (
              <li>Tidak ada pengguna yang sudah membayar bulan ini.</li>
            )}
          </ul>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
}
