import { useLoaderData } from "react-router-dom";
import { type ShoppingCart } from "../types/cartitem";

export async function loader() {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_API_URL}/cart`
		);
		const responseJSON = await response.json();

		const shoppingCarts: ShoppingCart[] = responseJSON.data;

		// console.log(products);
		return { shoppingCarts };
	} catch (error) {
		return { shoppingCarts: [] };
	}
}

export const Cartitem = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { shoppingCarts } = useLoaderData() as Awaited<
		ReturnType<typeof loader>
	>;
	console.log(shoppingCarts);
	return (
		<div className=" my-6 mx-6">
			<div className="max-w-sm">
				<div className="mb-4 flex items-center justify-between">
					<h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
						Latest Cart
					</h5>
					<a
						href="#"
						className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
					>
						View all
					</a>
				</div>
				<div className="flow-root">
					{shoppingCarts.map((cartitem) => (
						<ul className="divide-y divide-gray-200 dark:divide-gray-700">
							<li className="py-3 sm:py-4" key={cartitem.id}>
								<div className="flex items-center space-x-4">
									<div className="shrink-0">
										<img
											alt={cartitem.userId}
											height="32"
											src="/CCR.png"
											width="32"
											className="rounded-full"
										/>
									</div>
									<div className="min-w-0 flex-1">
										<p className="truncate text-sm font-medium text-gray-900 dark:text-white">
											{cartitem.totalPrice}
										</p>
										<p className="truncate text-sm text-gray-500 dark:text-gray-400">
											===
										</p>
									</div>
									<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
										{cartitem.totalPrice}
									</div>
								</div>
							</li>
						</ul>
					))}
				</div>
			</div>
		</div>
	);
};
