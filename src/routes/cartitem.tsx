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
				<div className="w-full">
					<ul className="divide-y divide-gray-200 dark:divide-gray-700">
						<li className="py-3 sm:py-4">
							<div className="flex items-center space-x-4">
								<div className="shrink-0">
									<img
										alt="CCR"
										height="95"
										src=""
										width="95"
										className="rounded-full"
									/>
								</div>
								<pre>{JSON.stringify(cart, null, 2)}</pre>

								<div className="min-w-0 flex-1">
									<p className="truncate text-sm font-medium text-gray-900 dark:text-white"></p>

									<p className="truncate text-sm text-gray-500 dark:text-gray-400"></p>
								</div>
								<div className="min-w-0 flex-1">
									<p className="truncate text-sm text-gray-500 dark:text-gray-400"></p>
								</div>
								<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"></div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
