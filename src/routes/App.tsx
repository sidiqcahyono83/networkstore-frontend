import { useLoaderData } from "react-router-dom";
import type { Product } from "../types/product";
import { Card, Carousel } from "flowbite-react";
import { formatIDR } from "../lib/formatCurency";
// import { formatIDR } from "../lib/formatCurency";

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
export function App() {
	const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
	return (
		<div>
			<div>
				<div className="h-56 sm:h-64 xl:h-80 2xl:h-96 bg-slate-100 mt-2">
					<Carousel>
						<img src="/CCR.png" alt="CCR" />
						<img src="/4011.png" alt="4011" />
						<img src="/3010.png" alt="3010" />
						<img src="/2024.png" alt="2024" />
						<img src="/CRS206.png" alt="CRS206" />
						<img src="/CRS301.png" alt="CRS301" />
						<img src="/gr3.png" alt="gr3" />
					</Carousel>
				</div>
			</div>
			<div className="grid sm:grid-cols-3 gap-4 m-4">
				{products.map((product) => {
					return (
						<Card
							key={product.id}
							href={`/products/${product.id}`}
							className="w-[303px] h-[404px] bg-transparent mx-auto"
						>
							<div className="max-h-[200px] max-w-[150px] mx-auto">
								<img
									src={product.imageUrl}
									alt={product.name}
								/>
							</div>
							<h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
								{product.name}
							</h5>
							<p className="font-normal text-gray-700 dark:text-gray-400">
								{product.description}
							</p>
							<p className="text-center font-bold">
								{formatIDR(product.price)}
							</p>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
