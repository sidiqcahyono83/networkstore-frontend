import { Form, Link, useLoaderData } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { Area, Modem, Odp, Paket } from "../data/typedata";

// loader
export async function loader() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/paket`
    );
    const responseJSON = await response.json();

    const responseOdp = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/odp`
    );
    const responseJSONOdp = await responseOdp.json();

    const responseArea = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/area`
    );
    const responseJSONArea = await responseArea.json();

    const responseModem = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/modem`
    );
    const responseJSONModem = await responseModem.json();

    const paket: Paket[] = responseJSON.data;
    const odp: Odp[] = responseJSONOdp.Odp;
    const area: Area[] = responseJSONArea.area;
    const modem: Modem[] = responseJSONModem.modem;

    return { paket: paket, odp: odp, area: area, modem: modem };
  } catch (error) {
    return { paket: [] };
  }
}

export function CreateUser() {
  const { paket, odp, area, modem } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  // console.log(odp);

  return (
    <div className="flex justify-center min-h-screen py-2 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-2 max-w-xl w-full px-8">
        <h1 className="text-xl font-bold mb-2 text-center">Update</h1>
        {/* <pre>{JSON.stringify(odp, null, 2)}</pre> */}
        <Form method="post" className="flex flex-col gap-4">
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
            <Label htmlFor="paketId" className="font-normal" value="Paket" />
            <select
              name="paketId"
              id="paketId-select"
              className="mb-4 p-2 border rounded-md"
              required
            >
              {odp?.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="paketId" className="font-normal" value="Paket" />
            <select
              name="paketId"
              id="paketId-select"
              className="mb-4 p-2 border rounded-md"
              required
            >
              {area?.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="paketId" className="font-normal" value="Paket" />
            <select
              name="paketId"
              id="paketId-select"
              className="mb-4 p-2 border rounded-md"
              required
            >
              {modem?.map((item) => (
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
