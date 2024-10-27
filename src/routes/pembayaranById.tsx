import {
  ActionFunctionArgs,
  Form,
  type LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { Button } from "flowbite-react";
import type { Pembayaran } from "../data/typedata";

// Define the LoaderData type
type LoaderData = {
  pembayaranById: Pembayaran | null;
  adminId: string | null;
};

// Loader function to fetch user by ID
export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  const adminId = localStorage.getItem("adminId");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/users/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const responseJSON = await response.json();
    const pembayaranById: Pembayaran = responseJSON.data;

    return { pembayaranById, adminId };
  } catch (error) {
    return { pembayaranById: null, adminId: null };
  }
}

// Component to display and manage user pembayaran
export function PembayaranById() {
  const { pembayaranById, adminId } = useLoaderData() as LoaderData;

  if (!pembayaranById) {
    return <p>User not found</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">
        Pembayaran for {pembayaranById.user.fullname}
      </h2>
      {/* Pembayaran form */}
      <Form method="post">
        <input
          type="hidden"
          name="userId"
          defaultValue={pembayaranById.id ?? ""}
        />
        <input type="hidden" name="adminId" defaultValue={adminId ?? ""} />
        {/* ... rest of the form ... */}
        <Button type="submit">Add to Pembayaran</Button>
      </Form>
    </div>
  );
}

// Action function to handle form submission
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const token = localStorage.getItem("token");

  const harga = Number(formData.get("harga"));
  const diskon = Number(formData.get("diskon"));
  const totalHarga = harga - diskon;

  const addToPembayaranData = {
    userId: formData.get("userId")?.toString(),
    adminId: formData.get("adminId")?.toString(),
    metode: formData.get("metode")?.toString(),
    ppn: 0,
    totalBayar: totalHarga,
  };

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/pembayaran/`,
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
    console.error("Pembayaran failed:", await response.text());
    return { error: "Pembayaran failed" };
  }

  return redirect(`/usersBelumBayar`);
}
