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
  const id = params.id;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/pembayaran/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const responseJSON = await response.json();
    const pembayaranById: Pembayaran = responseJSON.data;
    console.log(pembayaranById);

    return { pembayaranById };
  } catch (error) {
    return { user: null }; // Return null if there is any error
  }
}

// Component to display and manage user pembayaran
export function PembayaranById() {
  const { pembayaranById } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const adminId = localStorage.getItem("adminId");

  // Check if user data was successfully loaded
  if (!pembayaranById) {
    return <p>User not found</p>;
  }

  // Display user information and form for pembayaran
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">
        Pembayaran for {pembayaranById.user.fullname}
      </h2>

      {/* Pembayaran form */}
      <Form method="patch">
        <input
          type="hidden"
          name="userId"
          defaultValue={pembayaranById.id ?? ""}
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
          defaultValue={pembayaranById.user.fullname}
        >
          <option value={pembayaranById.id}>
            {pembayaranById.user.fullname}
          </option>
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
          defaultValue={pembayaranById.totalBayar}
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
          defaultValue={pembayaranById.ppn}
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
          defaultValue={
            pembayaranById.totalBayar - (pembayaranById.user.diskon ?? 0)
          }
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

  const harga = Number(formData.get("harga"));
  const diskon = Number(formData.get("diskon"));
  const totalHarga = harga - diskon;

  const addToPembayaranData = {
    userId: formData.get("userId")?.toString(),
    adminId: localStorage.getItem("adminId"),
    periode: new Date().toISOString().split("T")[0],
    metode: formData.get("metode"),
    ppn: 0,
    totalBayar: totalHarga,
  };

  const id = params.id;

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/pembayaran/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(addToPembayaranData),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return { error: "Pembayaran failed" };
  }

  return redirect(`/usersBelumBayar`);
}
