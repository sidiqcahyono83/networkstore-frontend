import {
  ActionFunctionArgs,
  Form,
  type LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { Button } from "flowbite-react";
import type { Pembayaran } from "../data/typedata";

// Loader function to fetch user by ID
export async function loader({ params }: LoaderFunctionArgs) {
  const pembayaranId = params.id;
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/pembayaran/${pembayaranId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const responseJSON = await response.json();
    const pembayaran: Pembayaran = responseJSON.data;

    return { pembayaran: pembayaran };
  } catch (error) {
    return { pembayaran: null }; // Return null if there is any error
  }
}

// Component to display and manage user pembayaran
export function PembayaranById() {
  const { pembayaran } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const adminId = localStorage.getItem("adminId");

  // Check if user data was successfully loaded
  if (!pembayaran) {
    return <p>User not found</p>;
  }

  // Display user information and form for pembayaran
  return (
    <div className="p-2 grid justify-center ">
      <h2 className="text-lg font-semibold">
        Pembayaran for {pembayaran.user.fullname}
      </h2>

      {/* Pembayaran form */}
      <Form method="post" className="flex-col-1 items-center justify-center">
        <input
          type="hidden"
          name="userId"
          defaultValue={pembayaran.user.id ?? ""}
        />
        <input type="hidden" name="adminId" defaultValue={adminId ?? ""} />

        <label
          htmlFor="metode"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Customer
        </label>
        <select
          id="metode-select"
          className="mb-4 p-2 border rounded-md"
          defaultValue={pembayaran.user.fullname}
        >
          <option value={pembayaran.user.id}>{pembayaran.user.fullname}</option>
        </select>

        <label
          htmlFor="harga"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Harga
        </label>
        <input
          type="number"
          name="harga"
          id="harga"
          defaultValue={pembayaran.totalBayar}
          className="mb-4 p-2 border rounded-md"
          required
        />

        <label
          htmlFor="diskon"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Diskon
        </label>
        <input
          type="number"
          name="diskon"
          id="diskon"
          defaultValue={pembayaran.user.diskon ?? 0}
          className="mb-4 p-2 border rounded-md"
          required
        />

        <label
          htmlFor="metode"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Metode
        </label>
        <select
          name="metode"
          id="metode-select"
          className="mb-4 p-2 border rounded-md"
          defaultValue={"Cash"}
        >
          <option value={"Cash"}>Cash</option>
          <option value={"Transfer BRI"}>Transfer BRI</option>
          <option value={"Transfer BNI"}>Transfer BNI</option>
        </select>

        <label
          htmlFor="totalBayar"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Total Bayar
        </label>
        <input
          type="number"
          name="totalBayar"
          id="totalBayar"
          defaultValue={pembayaran.totalBayar - (pembayaran.user.diskon ?? 0)}
          className="mb-4 p-2 border rounded-md"
          required
        />

        {/* Submit button */}
        <Button type="submit">Add to Pembayaran</Button>
      </Form>
    </div>
  );
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const token = localStorage.getItem("token");
  if (!token) {
    // Handle missing token gracefully
    return redirect("/login"); // Redirect to login or show an error message
  }

  const id = params.id;

  const harga = Number(formData.get("harga"));
  const diskon = Number(formData.get("diskon"));
  const totalHarga = harga - diskon;

  const UpdatToPembayaranData = {
    userId: formData.get("userId")?.toString(),
    adminId: localStorage.getItem("adminId"),
    metode: formData.get("metode"),
    ppn: 0,
    totalBayar: totalHarga,
  };
  console.log(UpdatToPembayaranData);

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/pembayaran/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(UpdatToPembayaranData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Pembayaran failed"); // Improved error handling
  }

  return redirect(`/usersBelumBayar`);
}
