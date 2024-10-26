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
  const token = localStorage.getItem("token");
  const userId = params.id;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/users/${userId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const responseJSON = await response.json();
    const user: User = responseJSON.user; // Assuming 'User' matches your data structure

    // Fetch admin data from auth/me
    const responseAdmin = await fetch(
      "https://teranet.cahyonomuslimsidiq.com/auth/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!responseAdmin.ok) {
      throw new Error("Failed to fetch admin data");
    }

    const adminResponseJSON = await responseAdmin.json();
    const adminId = adminResponseJSON.user.id; // Get admin ID

    // Store adminId in localStorage for later use in form submission
    localStorage.setItem("adminId", adminId);

    return { user, adminId };
  } catch (error) {
    return { user: null }; // Return null if there is any error
  }
}

// Component to display and manage user pembayaran
export function PembayaranByUserId() {
  const { user } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  // Check if user data was successfully loaded
  if (!user) {
    return <p>User not found</p>;
  }

  const adminId = localStorage.getItem("adminId");

  // Display user information and form for pembayaran
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">Pembayaran for {user.fullname}</h2>

      {/* Pembayaran form */}
      <Form method="post">
        <input type="hidden" name="userId" defaultValue={user.id ?? ""} />
        {/* Hidden input for adminId */}
        <input type="hidden" name="adminId" defaultValue={adminId ?? ""} />{" "}
        {/* Use adminId if available */}
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
          defaultValue={user.paket?.harga ?? 0} // Set default to user's paket harga
          className="mb-4 p-2 border rounded-md"
          required
        />
        <label
          htmlFor="harga"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Diskon
        </label>
        <input
          type="number"
          name="diskon"
          id="diskon"
          defaultValue={user.diskon} // Set default to user's paket harga
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
          htmlFor="harga"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Harga
        </label>
        <input
          type="number"
          name="harga"
          id="harga"
          defaultValue={user.paket?.harga ?? 0} // Set default to user's paket harga
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
  const token = localStorage.getItem("token");
  const formData = await request.formData();

  const harga = Number(formData.get("harga")); // Get the harga from the form
  const diskon = Number(formData.get("diskon")); // Get the discount from the form
  const totalHarga = harga - diskon; // Calculate the total price after discount

  const addToPembayaranData = {
    userId: formData.get("userId")?.toString(),
    adminId: localStorage.getItem("adminId"), // Ensure adminId is retrieved properly
    periode: new Date().toISOString().split("T")[0], // Set to today's date (YYYY-MM-DD)
    metode: formData.get("metode"),
    ppn: 0, // Set PPN to 0
    totalBayar: totalHarga, // Use the calculated total price
  };

  // Send the data to your backend
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

  const addToPembayaranResponse = await response.json();

  if (!addToPembayaranResponse || !response.ok) {
    return { error: "Pembayaran failed" };
  }

  return redirect(`/pembayaran`);
}
