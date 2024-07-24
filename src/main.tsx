import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";

import "./index.css";
import { Layout } from "./routes/Layout";
import { App, loader as appLoader } from "./routes/App";
import { Products, loader as productsLoader } from "./routes/products";
import { ProductRoute, loader as productLoader } from "./routes/product";

import { Register, action as addUserAction } from "./routes/register";
import { Login } from "./routes/login";
import { Cartitem, loader as cartLoader } from "./routes/cartitem";
import { Component } from "./routes/acordion";

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
				element: <ProductRoute />,
				loader: productLoader,
			},
			{
				path: "/cart",
				element: <Cartitem />,
				loader: cartLoader,
			},
			{
				path: "/register",
				element: <Register />,
				action: addUserAction,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/component",
				element: <Component />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
