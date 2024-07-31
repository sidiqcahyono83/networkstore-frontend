import { useLoaderData } from "react-router-dom";
import { Cart } from "../types/product";
import { authCookie } from "../modules/auth";

type CartResponse = {
	message: string;
	cart: Cart;
};

export async function loader() {
	const token = authCookie.get("token");

	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_API_URL}/cart`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	const cartResponse: CartResponse = await response.json();

	console.log({ cartResponse });

	return { cart: cartResponse.cart };
}

export const Cartitem = () => {
	const { cart } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

	return (
		<>
			<h2>Shopping Cart</h2>
			<pre>{JSON.stringify(cart, null, 2)}</pre>
		</>
	);
};
