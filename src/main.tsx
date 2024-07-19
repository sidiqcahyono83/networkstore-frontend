import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";

import "./index.css";
import { Layout } from "./routes/Layout";
import { App, loader as appLoader } from "./routes/App";
import { Products, loader as productsLoader } from "./routes/products";
import { Product, loader as productLoader } from "./routes/product";
import { Cart, loader as cartLoader } from "./routes/cart";

import { Register } from "./routes/register";
import { Login } from "./routes/login";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <App />,
				loader: appLoader,
			},
			{
				path: "/products",
				element: <Products />,
				loader: productsLoader,
			},
			{
				path: "/products/:productId",
				element: <Product />,
				loader: productLoader,
			},

			{
				path: "/cart/:productId",
				element: <Cart />,
				loader: cartLoader,
			},
			{
				path: "/daftar",
				element: <Register />,
			},
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
