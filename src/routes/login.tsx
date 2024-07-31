import { Button, Label, TextInput } from "flowbite-react";
import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import { authCookie } from "../modules/auth";

type LoginResponse = {
	message: string;
	token: string;
};

// Fungsi untuk menangani aksi form submission
export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();

	const userData = {
		username: formData.get("username")?.toString(),
		password: formData.get("password")?.toString(),
	};

	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_API_URL}/auth/login`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		}
	);
	console.log(userData);
	const loginResponse: LoginResponse = await response.json();

	if (!loginResponse) {
		return null;
	}

	//mengambil token
	const token = loginResponse.token;

	//Set token di cookie
	authCookie.set("token", token);

	return redirect("/products");
}

export function Login() {
	return (
		<div className="h-[1280px] mx-8 my-10 justify-center">
			<Form
				method="post"
				className="flex justify-center max-w-md flex-col gap-4"
			>
				<div className="justify-center">
					<div className="mb-2 block">
						<Label htmlFor="username" value="username" />
					</div>
					<TextInput
						id="username"
						type="username"
						name="username"
						placeholder="username"
						required
						shadow
					/>
				</div>

				<div className="justify-center">
					<div className="mb-2 block">
						<Label htmlFor="password" value="password" />
					</div>
					<TextInput
						id="password"
						type="password"
						name="password"
						placeholder="password"
						required
						shadow
					/>
				</div>

				<Button type="submit">Login</Button>
			</Form>
		</div>
	);
}
