import {
  ActionFunctionArgs,
  Form,
  type LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { Button } from "flowbite-react";
import type { User } from "../data/typedata";

// Loader function to fetch user by ID
export async function loader({ params }: LoaderFunctionArgs) {
  const userId = params.id;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/users/${userId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const responseJSON = await response.json();
    const user: User = responseJSON.user;

    return { user };
  } catch (error) {
    return { user: null }; // Return null if there is any error
  }
}

// Component to display and manage user pembayaran
export function PembayaranByUserId() {
  const { user } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const adminId = localStorage.getItem("adminId");

  // Check if user data was successfully loaded
  if (!user) {
    return <p>User not found</p>;
  }

  // Display user information and form for pembayaran
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">Pembayaran for {user.fullname}</h2>

      {/* Pembayaran form */}
      <Form method="post">
        <input type="hidden" name="userId" defaultValue={user.id ?? ""} />
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
          defaultValue={user.fullname}
        >
          <option value={user.id}>{user.fullname}</option>
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
          defaultValue={user.paket?.harga ?? 0}
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
          defaultValue={user.diskon ?? 0}
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
          defaultValue={user.paket?.harga - (user.diskon ?? 0)}
          className="mb-4 p-2 border rounded-md"
          required
        />

        {/* Submit button */}
        <Button type="submit">Add to Pembayaran</Button>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const token = localStorage.getItem("token");
  if (!token) {
    // Handle missing token gracefully
    return redirect("/login"); // Redirect to login or show an error message
  }

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

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/pembayaran`,
    {
      method: "POST",
      body: JSON.stringify(addToPembayaranData),
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
