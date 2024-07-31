import { Button, Label, TextInput } from "flowbite-react";
import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import { User } from "../types/product";

type RegisterResponse = {
	message: string;
	newUser: Pick<User, "username">;
};

// Fungsi untuk menangani aksi form submission
export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const userData = {
		username: formData.get("username"),
		email: formData.get("email"),
		password: formData.get("password"),
	};

	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_API_URL}/auth/register`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		}
	);
	console.log(userData);
	const registerResponse: RegisterResponse = await response.json();

	if (!registerResponse) {
		return null;
	}

	// Alihkan pengguna ke halaman login setelah registrasi berhasil
	return redirect(`/login`);
}

// Komponen Register untuk menampilkan form registrasi
export function Register() {
	return (
		<div className="h-[1280px] mx-8 my-10 justify-center">
			<Form method="post" className="flex justify-center flex-col gap-4">
				<div className="justify-center">
					<div className="mb-2 block">
						<Label htmlFor="username" value="Your username" />
					</div>
					<TextInput
						id="username"
						name="username"
						type="text"
						required
						shadow
					/>
				</div>
				<div className="justify-center">
					<div className="mb-2 block">
						<Label htmlFor="email2" value="Your email" />
					</div>
					<TextInput
						id="email"
						name="email"
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
					<TextInput
						id="password"
						name="password"
						type="password"
						required
						shadow
					/>
				</div>

				<div className="flex items-center gap-2"></div>
				<Button type="submit">Register new account</Button>
			</Form>
		</div>
	);
}
