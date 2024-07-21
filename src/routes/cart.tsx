import { type LoaderFunctionArgs, useLoaderData } from "react-router-dom";

import type { Product } from "../types/product";
import { Button } from "flowbite-react";
import { formatIDR } from "../lib/formatCurency";
import { HiShoppingCart } from "react-icons/hi";

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

export function Cart() {
	const { product } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
	if (!product) {
		return "Product not found";
	}

	return (
		<div className="mx-auto">
			<div className="items-center justify-center mx-auto">
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
					<div className="justify-center items-center mx-6">
						<button className="">1</button>
						<input type="button" value="" className="" />
						<button>+</button>
					</div>
					<p className="font-normal text-gray-700 dark:text-gray-400 mx-6">
						{product.description}
					</p>
					<p className="text-center font-bold">
						{formatIDR(product.price)}
					</p>
					<div className="flex flex-wrap gap-2 m-6">
						<Button>
							<HiShoppingCart className="mr-2 h-5 w-5" />
							Buy now
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
