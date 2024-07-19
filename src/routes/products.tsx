import { Card } from "flowbite-react";
import type { Product } from "../types/product";
import { useLoaderData } from "react-router-dom";
import { formatIDR } from "../lib/formatCurency";

export async function loader() {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_API_URL}/products`
		);
		const responseJSON = await response.json();

		const products: Product[] = responseJSON.data;

		// console.log(products);
		return { products };
	} catch (error) {
		return { products: [] };
	}
}

export function Products() {
	const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

	return (
		<div className="mx-auto">
			<div className=" items-center justify-center grid sm:grid-cols-3 md:grid-cols-2 gap-4 my-4">
				{products.map((product) => {
					return (
						<div className="grid grid-flow-col">
							<Card
								key={product.id}
								href={`/products/${product.id}`}
								className="w-[303px] h-[404px] bg-transparent mx-auto"
							>
								<div className="max-h-[200px] max-w-[150px]  mx-auto">
									<img
										src={product.imageUrl}
										alt={product.name}
									/>
								</div>
								<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									{product.name}
								</h5>
								<p className="font-normal text-gray-700 dark:text-gray-400">
									{product.description}
								</p>
								<p className="text-center font-bold">
									{formatIDR(product.price)}
								</p>
							</Card>
						</div>
					);
				})}
			</div>
		</div>
	);
}
