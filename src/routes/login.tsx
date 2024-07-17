import { Button, Label, TextInput } from "flowbite-react";

export function Login() {
  return (
    <div className="h-[1280px] mx-8 my-10 justify-center">
      <form className="flex justify-center max-w-md flex-col gap-4">
        <div className="justify-center">
          <div className="mb-2 block">
            <Label htmlFor="email2" value="Your email" />
          </div>
          <TextInput
            id="email2"
            type="email"
            placeholder="name@flowbite.com"
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Your password" />
          </div>
          <TextInput id="password2" type="password" required shadow />
        </div>

        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
