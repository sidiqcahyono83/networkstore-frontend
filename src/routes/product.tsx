import { Form, type LoaderFunctionArgs, useLoaderData } from "react-router-dom";

import type { Product } from "../types/product";
import { Button } from "flowbite-react";
import { formatIDR } from "../lib/formatCurency";
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
		<div className="mx-auto ">
			<div className="items-center justify-center mx-auto">
				<Form>
					<div
						key={product.id}
						className="max-w-2lg bg-transparent mx-auto"
					>
						<div>
							<img src={product.imageUrl} alt={product.name} />
						</div>
						<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mx-6">
							{product.name}
						</h5>

						<p className="font-normal text-gray-700 dark:text-gray-400 mx-6">
							{product.description}
						</p>
						<p className="text-center font-bold mt-6">
							{formatIDR(product.price)}
						</p>
						<div className="flex flex-wrap gap-2 m-6">
							<div className="mt-4 flex w-full items-center space-x-2 justify-center">
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
								<Button type="button" onClick={handlePlus}>
									+
								</Button>
							</div>
							<Button
								type="submit"
								className="mt-8 rounded-md h-12 w-full uppercase items-center "
							>
								Add to cart
							</Button>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}
