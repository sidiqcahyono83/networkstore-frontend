import {
  LoaderFunctionArgs,
  useLoaderData,
  redirect,
  Form,
  ActionFunctionArgs,
} from "react-router-dom";
import { Button } from "flowbite-react";
import { Area, Modem, Odp, Paket } from "../data/typedata";

export async function GetPaketOdpAreaModem() {
  const token = localStorage.getItem("token");
  try {
    if (!token) throw new Error("Authorization token is missing");

    const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const [paketResponse, odpResponse, areaResponse, modemResponse] =
      await Promise.all([
        fetch(`${apiUrl}/paket`, { method: "GET", headers }),
        fetch(`${apiUrl}/odp`, { method: "GET", headers }),
        fetch(`${apiUrl}/area`, { method: "GET", headers }),
        fetch(`${apiUrl}/modem`, { method: "GET", headers }),
      ]);

    if (!paketResponse.ok) throw new Error("Failed to fetch paket data");
    if (!odpResponse.ok) throw new Error("Failed to fetch odp data");
    if (!areaResponse.ok) throw new Error("Failed to fetch area data");
    if (!modemResponse.ok) throw new Error("Failed to fetch modem data");

    const paket = (await paketResponse.json()).paket || [];
    const odp = (await odpResponse.json()).odp || [];
    const area = (await areaResponse.json()).area || [];
    const modem = (await modemResponse.json()).modem || [];

    return { paket, odp, area, modem };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { paket: [], odp: [], area: [], modem: [] };
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  const userId = params.id;
  if (!userId) return { error: "User ID tidak ditemukan" };

  const token = localStorage.getItem("token");
  if (!token) return { error: "Token tidak ditemukan" };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/users/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Gagal mengambil data user");
    const data = await response.json();
    const { paket, odp, area, modem } = await GetPaketOdpAreaModem();

    return { user: data.user, paket, odp, area, modem };
  } catch (error) {
    console.error("Error saat mengambil user:", error);
    return { user: null, error: "Gagal mengambil data user" };
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const token = localStorage.getItem("token");
  if (!token) {
    // Handle missing token gracefully
    return redirect("/login"); // Redirect to login or show an error message
  }

  const userId = formData.get("userId");

  const updatedUserInput = {
    username: formData.get("username"),
    fullname: formData.get("fullname"),
    ontName: formData.get("ontName"),
    redamanOlt: formData.get("redamanOlt"),
    address: formData.get("address"),
    phoneNumber: formData.get("phoneNumber"),
    paketId: formData.get("paketId"),
    diskon: Number(formData.get("diskon")),
    areaId: formData.get("areaId"),
    odpId: formData.get("odpId"),
    modem: formData.get("modemId"),
  };
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/users/${userId}`,
    {
      method: "PUT",
      body: JSON.stringify(updatedUserInput),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  // console.log(response);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Pembayaran failed"); // Improved error handling
  }

  return redirect(`/users`);
}

export function UpdateUserById() {
  const { user, paket, odp, area, modem } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  // console.log(user);
  const adminId = localStorage.getItem("adminId");

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="flex justify-center w-full py-8 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md w-full max-w-5xl p-6">
        <h2 className="text-lg font-semibold mb-4">Update: {user.fullname}</h2>

        {/* Pembayaran form */}
        <Form method="post">
          <input type="hidden" name="userId" defaultValue={user.id ?? ""} />
          <input type="hidden" name="adminId" defaultValue={adminId ?? ""} />

          <label
            htmlFor="fullname"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            defaultValue={user.fullname}
            className="w-full mb-4 p-3 border rounded-md"
            required
          />

          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            defaultValue={user.username}
            className="w-full mb-4 p-3 border rounded-md"
            required
          />

          <label
            htmlFor="ontName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            ontName
          </label>
          <input
            type="text"
            name="ontName"
            id="ontName"
            defaultValue={user.ontName}
            className="w-full mb-4 p-3 border rounded-md"
            required
          />

          <label
            htmlFor="redamanOlt"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            redamanOlt
          </label>
          <input
            type="text"
            name="redamanOlt"
            id="redamanOlt"
            defaultValue={user.redamanOlt}
            className="min-w-full mb-4 p-3 border rounded-md"
            required
          />

          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            defaultValue={user.address}
            className="w-full mb-4 p-3 border rounded-md"
            required
          />

          <label
            htmlFor="phoneNumber"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            defaultValue={user.phoneNumber}
            className="w-full mb-4 p-3 border rounded-md"
            required
          />

          <label
            htmlFor="paketId"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Paket
          </label>
          <select name="paketId" className="w-full mb-4 p-3 border rounded-md">
            <option value={user.paket.id}>
              {user.paket.name}-{user.paket.harga}
            </option>
            {paket.map((item: Paket) => (
              <option key={item.id} value={item.id}>
                {item.name} - {item.harga}
              </option>
            ))}
          </select>

          <label
            htmlFor="diskon"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Diskon
          </label>
          <input
            type="number"
            name="diskon"
            id="diskon"
            defaultValue={user.diskon ?? 0}
            className="w-full mb-4 p-3 border rounded-md"
            required
          />

          <label
            htmlFor="areaId"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Area
          </label>
          <select name="areaId" className="w-full mb-4 p-3 border rounded-md">
            <option value={user.area.id}>{user.area.name}</option>
            {area.map((item: Area) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <label
            htmlFor="odpId"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            ODP
          </label>
          <select name="odpId" className="w-full mb-4 p-3 border rounded-md">
            <option value={user.odp.id}>{user.odp.name}</option>
            {odp.map((item: Odp) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <label
            htmlFor="modem"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Modem
          </label>
          <select name="modemId" className="w-full mb-4 p-3 border rounded-md">
            <option value={user.modem.id}>{user.modem.name} </option>
            {modem.map((item: Modem) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            Update Customer
          </Button>
        </Form>
      </div>
    </div>
  );
}
