import {
  LoaderFunctionArgs,
  useLoaderData,
  redirect,
  Form,
  Link,
} from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { getUsersById, updateUserById } from "../lib/actionusers";

export async function loader({ params }: LoaderFunctionArgs) {
  const userId = String(params.id);
  const user = await getUsersById(userId);
  return user;
}

export async function action({ request, params }: LoaderFunctionArgs) {
  const userId = String(params.id);
  const formData = await request.formData();

  const updatedUser = {
    username: formData.get("username"),
    fullname: formData.get("fullname"),
    ontName: Number(formData.get("ontName")),
    redamanOlt: Number(formData.get("redamanOlt")),
    address: formData.get("address"),
    phoneNumber: formData.get("phoneNumber"),
    paketId: formData.get("paket"),
    diskon: Number(formData.get("diskon")),
    areaId: formData.get("area"),
    odpId: formData.get("odp"),
    modem: formData.get("modem"),
    pembayaranId: formData.getAll("pembayaran"),
  };

  await updateUserById(userId, updatedUser);
  return redirect(`/jobs/`);
}

export function UpdateUserById() {
  const { user } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="mx-auto items-center">
      <div className="mx-auto justify-center">
        <h1 className="text-4xl font-bold mb-4 text-center">Update User</h1>
        <div className="flex flex-1 justify-center md:min-w-full">
          <Form
            method="post"
            className="flex flex-col max-w-lg gap-2 justify-center"
          >
            {/* User ID (Hidden Field) */}
            <TextInput type="hidden" name="id" defaultValue={user.id} />

            {/* Form Fields */}
            {[
              {
                id: "username",
                label: "Username",
                defaultValue: user.username,
              },
              {
                id: "fullname",
                label: "Fullname",
                defaultValue: user.fullname,
              },
              { id: "ontName", label: "ONT Name", defaultValue: user.ontName },
              {
                id: "redamanOlt",
                label: "Redaman OLT",
                defaultValue: user.redamanOlt,
              },
              { id: "address", label: "Address", defaultValue: user.address },
              {
                id: "phoneNumber",
                label: "Phone Number",
                defaultValue: user.phoneNumber,
              },
              { id: "paketId", label: "Paket", defaultValue: user.paket?.name },
              { id: "diskon", label: "Diskon", defaultValue: user.diskon },
              { id: "areaId", label: "Area", defaultValue: user.Area?.name },
              { id: "odpId", label: "ODP", defaultValue: user.Odp?.name },
              { id: "modem", label: "Modem", defaultValue: user.modem?.name },
            ].map(({ id, label, defaultValue }) => (
              <div className="flex flex-col mb-2" key={id}>
                <Label htmlFor={id} value={label} />
                <TextInput
                  id={id}
                  type="text"
                  name={id}
                  defaultValue={defaultValue}
                  required
                />
              </div>
            ))}

            {/* Pembayaran */}
            <div className="flex flex-col mb-2">
              <Label htmlFor="pembayaran" value="Pembayaran History" />
              <TextInput type="text" name="pembayaran" disabled />
            </div>

            {/* Submit Button */}
            <div className="flex gap-2 justify-between">
              <Button type="submit">Update</Button>
              <Button color="warning" as={Link} to="/users">
                Back
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
