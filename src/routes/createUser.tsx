import { Form, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { Area, Modem, Odp, Paket } from "../data/typedata";
import { useState } from "react";

// Define a structure for the loader return type
interface LoaderData {
  paket: Paket[];
  odp: Odp[];
  area: Area[];
  modem: Modem[];
}

// loader
export async function loader(): Promise<LoaderData> {
  try {
    const [paketResponse, odpResponse, areaResponse, modemResponse] =
      await Promise.all([
        fetch(`${import.meta.env.VITE_BACKEND_API_URL}/paket`),
        fetch(`${import.meta.env.VITE_BACKEND_API_URL}/odp`),
        fetch(`${import.meta.env.VITE_BACKEND_API_URL}/area`),
        fetch(`${import.meta.env.VITE_BACKEND_API_URL}/modem`),
      ]);

    // Check for successful responses
    if (!paketResponse.ok) throw new Error("Failed to fetch paket data");
    if (!odpResponse.ok) throw new Error("Failed to fetch odp data");
    if (!areaResponse.ok) throw new Error("Failed to fetch area data");
    if (!modemResponse.ok) throw new Error("Failed to fetch modem data");

    // Assuming the data is structured as expected
    const responseJSON = await paketResponse.json();
    const responseJSONOdp = await odpResponse.json();
    const responseJSONArea = await areaResponse.json();
    const responseJSONModem = await modemResponse.json();

    // Log the data to debug
    // console.log("Paket Response:", responseJSON);
    // console.log("ODP Response:", responseJSONOdp);
    // console.log("Area Response:", responseJSONArea);
    // console.log("Modem Response:", responseJSONModem);

    const paket: Paket[] = responseJSON.paket || [];
    const odp: Odp[] = responseJSONOdp.odp || [];
    const area: Area[] = responseJSONArea.area || [];
    const modem: Modem[] = responseJSONModem.modem || [];

    return { paket, odp, area, modem };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { paket: [], odp: [], area: [], modem: [] };
  }
}

export function CreateUser() {
  const { paket, odp, area, modem } = useLoaderData() as LoaderData;
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      username: formData.get("username") as string,
      fullname: formData.get("fullname") as string,
      ontName: formData.get("ontName") as string,
      redamanOlt: formData.get("redamanOlt") as string,
      address: formData.get("address") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      paketId: formData.get("paketId") as string,
      diskon: parseFloat(formData.get("diskon") as string) || 0,
      odpId: formData.get("odpId") as string,
      areaId: formData.get("areaId") as string,
      modemId: formData.get("modemId") as string,
    };

    try {
      const result = await createUser(data); // Ensure createUser is defined
      console.log("User created:", result);
      navigate("/users");
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="flex justify-center min-h-screen py-2 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-2 max-w-xl w-full px-8">
        <h1 className="text-xl font-bold mb-2 text-center">Create User</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <Label
              htmlFor="username"
              className="font-normal"
              value="Username"
            />
            <TextInput id="username" type="text" name="username" required />
          </div>
          <div className="flex flex-col">
            <Label
              htmlFor="fullname"
              className="font-normal"
              value="Fullname"
            />
            <TextInput id="fullname" type="text" name="fullname" />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="ontName" className="font-normal" value="Nama Olt" />
            <TextInput id="ontName" type="text" name="ontName" />
          </div>
          <div className="flex flex-col">
            <Label
              htmlFor="redamanOlt"
              className="font-normal"
              value="Redaman Olt"
            />
            <TextInput id="redamanOlt" type="text" name="redamanOlt" />
          </div>
          <div className="flex flex-col">
            <Label
              htmlFor="address"
              className="font-normal"
              value="Alamat Lengkap"
            />
            <TextInput id="address" type="text" name="address" />
          </div>
          <div className="flex flex-col">
            <Label
              htmlFor="phoneNumber"
              className="font-normal"
              value="No Handphone"
            />
            <TextInput
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              placeholder="+6285678910"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="paketId" className="font-normal" value="Paket" />
            <select
              name="paketId"
              id="paketId-select"
              className="mb-4 p-2 border rounded-md"
              required
            >
              {paket.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name} - Rp. {item.harga}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="diskon" className="font-normal" value="Diskon" />
            <TextInput
              id="diskon"
              type="number"
              name="diskon"
              placeholder="10000"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="odpId" className="font-normal" value="ODP" />
            <select
              name="odpId"
              id="odpId-select"
              className="mb-4 p-2 border rounded-md"
              required
            >
              {odp.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="areaId" className="font-normal" value="Area" />
            <select
              name="areaId"
              id="areaId-select"
              className="mb-4 p-2 border rounded-md"
              required
            >
              {area.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="modemId" className="font-normal" value="Modem" />
            <select
              name="modemId"
              id="modemId-select"
              className="mb-4 p-2 border rounded-md"
              required
            >
              {modem.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-between mt-2">
            <Button color="warning" as={Link} to="/users">
              Back
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

// Define createUser function
async function createUser(data: {
  username: string;
  fullname: string;
  ontName: string;
  redamanOlt: string;
  address: string;
  phoneNumber: string;
  paketId: string;
  diskon: number;
  odpId: string;
  areaId: string;
  modemId: string;
}) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/users`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return await response.json();
}
