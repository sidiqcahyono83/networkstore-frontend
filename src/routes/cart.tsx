import { redirect, useLoaderData } from "react-router-dom";
import { Cart } from "../types/product";
import { authCookie } from "../modules/auth";
import { formatIDR } from "../lib/formatCurency";

type ShoppingCartResponse = {
	message: string;
	cart: Cart;
};

export async function loader() {
	const token = authCookie.get("token");
	if (!token) return redirect("/login");

	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_API_URL}/cart`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	const shoppingCartResponse: ShoppingCartResponse = await response.json();

	return { cart: shoppingCartResponse.cart };
}

export function CartRoute() {
	const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;

	if (data instanceof Response) return null;

	const { cart } = data;

	// Menghitung total harga keseluruhan
	const totalPrice = cart.items.reduce((total, item) => {
		return total + item.quantity * item.product.price;
	}, 0);

	return (
		<div className="my-6 mx-6">
			{/* <pre>{JSON.stringify(cart && cart.items, null, 2)}</pre> */}
			<h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
				Shopping Cart
			</h2>

			{cart && cart.items && cart.items.length > 0 ? (
				<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
					<thead className="bg-gray-50 dark:bg-gray-700">
						<tr>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Product
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Quantity
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Unit Price
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Total Price
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
						{cart.items.map((item) => (
							<tr key={item.id}>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
									{item.product.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
									{item.quantity}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
									{formatIDR(item.product.price)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
									{formatIDR(
										item.quantity * item.product.price
									)}
								</td>
							</tr>
						))}
					</tbody>
					<tfoot className="bg-gray-50 dark:bg-gray-700">
						<tr>
							<td
								colSpan={3}
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Total
							</td>
							<td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								{formatIDR(totalPrice)}
							</td>
						</tr>
					</tfoot>
				</table>
			) : (
				<p className="text-sm text-gray-500 dark:text-gray-400">
					No items in the cart.
				</p>
			)}
		</div>
	);
}
