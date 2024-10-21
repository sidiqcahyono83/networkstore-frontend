import {
	ActionFunctionArgs,
	Form,
	type LoaderFunctionArgs,
	redirect,
	useLoaderData,
} from "react-router-dom";

import type { Product } from "../types/product";
import { Button } from "flowbite-react";
import { authCookie } from "../modules/auth";
import { useState } from "react";
import { Input } from "@headlessui/react";

export async function loader({ params }: LoaderFunctionArgs) {
	const productId = String(params.productId);

	try {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_API_URL}/products/${productId}`
		);
		const responseJSON = await response.json();

		const product: Product = responseJSON.data;

		console.log(product);
		return { product };
	} catch (error) {
		return { product: null };
	}
}

export function ProductRoute() {
	const { product } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
	const [quantity, setQuantity] = useState<number>(1);

	if (!product) {
		return "Product not found";
	}

	const handlePlus = () => {
		setQuantity((quantity) => quantity + 1);
	};

	const handleMinus = () => {
		setQuantity((quantity) => quantity - 1);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuantity(parseInt(e.target.value));
	};
	const handleBlur = () => {
		if (!quantity) {
			setQuantity(1);
		} else if (quantity > product.stock) {
			setQuantity(product.stock);
		}
	};

	return (
		<div>
			<div>
				<Form method="post">
					<section className="mt-10">
						<p>{product.name}</p>
						<img src={product.imageUrl}></img>
						<p>{product.description}</p>
						<p className="md:text-lg font-poppins uppercase">
							Quantity
						</p>
						<div className="mt-4 flex w-1/2 items-center space-x-2">
							<Button
								type="button"
								onClick={handleMinus}
								disabled={quantity === 1}
							>
								-
							</Button>
							<Input
								id="quantity"
								name="quantity"
								className="text-center"
								type="number"
								min={1}
								max={product?.stock}
								value={quantity}
								onChange={handleChange}
								onBlur={handleBlur}
								required
							/>
							<Button
								type="button"
								onClick={handlePlus}
								disabled={quantity === product?.stock}
							>
								+
							</Button>
						</div>
						<input
							type="text"
							id="productId"
							name="productId"
							defaultValue={product.id}
							readOnly
							className="hidden"
						/>
						<Button
							type="submit"
							className="mt-8 rounded-none h-12 w-full uppercase bg-b-pink-dark hover:bg-b-pink-light"
						>
							Add to cart
						</Button>
					</section>
					<section className="mt-10"></section>
					{/* <input
					type="hidden"
					name="productId"
					defaultValue={product.id}
				/>
				<input type="number" name="quantity" defaultValue={1} /> */}

					<Button type="submit">Add to Cart</Button>
				</Form>
			</div>
		</div>
	);
}

export async function action({ request }: ActionFunctionArgs) {
	const token = authCookie.get("token");
	const formData = await request.formData();

	const addToCartData = {
		productId: formData.get("productId")?.toString(),
		quantity: Number(formData.get("quantity")),
	};

	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_API_URL}/cart/items`,
		{
			method: "POST",
			body: JSON.stringify(addToCartData),
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}
	);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const addToCartResponse: any = await response.json();

	if (!addToCartResponse) {
		return null;
	}

	return redirect(`/cart`);
}
