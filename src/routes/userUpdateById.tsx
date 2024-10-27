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
    id: formData.get("id"),
    username: formData.get("username"),
    fullname: formData.get("fullname"),
    ontName: formData.get("ontName"),
    redamanOlt: formData.get("redamanOlt"),
    address: formData.get("address"),
    phoneNumber: formData.get("phoneNumber"),
    paketId: formData.get("paketId"),
  };

  await updateUserById(userId, updatedUser);
  return redirect(`/users/update/${userId}`);
}

export function UpdateUserById() {
  const { user } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="flex justify-center   min-h-screen py-2 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-2 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-center">Update User</h1>
        <Form method="post" className="flex flex-col gap-4">
          {/* User ID (Hidden Field) */}
          <TextInput type="hidden" name="id" defaultValue={user.id} />

          {/* Form Fields */}
          {[
            { id: "username", label: "Username", defaultValue: user.username },
            { id: "fullname", label: "Fullname", defaultValue: user.fullname },
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
            { id: "paketId", label: "Paket ID", defaultValue: user.paket?.id },
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

          {/* Submit Button */}
          <div className="flex gap-2 justify-between mt-4">
            <Button type="submit">Update</Button>
            <Button color="warning" as={Link} to="/users">
              Back
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
