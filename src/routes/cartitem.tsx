import { useLoaderData } from "react-router-dom";
<<<<<<< HEAD
import { Cart } from "../types/product";
import { formatIDR } from "../lib/formatCurency";
=======
import { type ShoppingCart } from "../types/cartitem";
>>>>>>> 4490607e99b405046de700a7de091ff6582ea760

export async function loader() {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_API_URL}/cart`
		);
		const responseJSON = await response.json();

<<<<<<< HEAD
		const carts: Cart[] = responseJSON.data;

		// console.log(products);
		return { carts };
	} catch (error) {
		return { carts: [] };
=======
		const shoppingCarts: ShoppingCart[] = responseJSON.data;

		// console.log(products);
		return { shoppingCarts };
	} catch (error) {
		return { shoppingCarts: [] };
>>>>>>> 4490607e99b405046de700a7de091ff6582ea760
	}
}

export const Cartitem = () => {
<<<<<<< HEAD
	const { carts } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

=======
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { shoppingCarts } = useLoaderData() as Awaited<
		ReturnType<typeof loader>
	>;
	console.log(shoppingCarts);
>>>>>>> 4490607e99b405046de700a7de091ff6582ea760
	return (
		<div className="w-full my-6 mx-auto">
			<div className="w-100%">
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
<<<<<<< HEAD
				<div className="w-full">
					{carts.map((cart) => {
						return (
							<ul className="divide-y divide-gray-200 dark:divide-gray-700">
								<li className="py-3 sm:py-4" key={cart.id}>
									<div className="flex items-center space-x-4">
										<div className="shrink-0">
											{cart.items.map((item) => (
												<img
													alt="CCR"
													height="95"
													src={item.product.imageUrl}
													width="95"
													className="rounded-full"
												/>
											))}
										</div>
										<div className="min-w-0 flex-1">
											<p className="truncate text-sm font-medium text-gray-900 dark:text-white">
												{cart.user}
											</p>
											{cart.items.map((item) => (
												<p className="truncate text-sm text-gray-500 dark:text-gray-400">
													{item.product.name}
												</p>
											))}
										</div>
										<div className="min-w-0 flex-1">
											{cart.items.map((item) => (
												<p className="truncate text-sm text-gray-500 dark:text-gray-400">
													{item.quantity}
												</p>
											))}
										</div>
										<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
											{formatIDR(cart.totalPrice)}
										</div>
									</div>
								</li>
							</ul>
						);
					})}
=======
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
>>>>>>> 4490607e99b405046de700a7de091ff6582ea760
				</div>
			</div>
		</div>
	);
};
