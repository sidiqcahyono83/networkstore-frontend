import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";

import "./index.css";
import { Layout } from "./routes/Layout";
import { App, loader as appLoader } from "./routes/App";
import { Products, loader as productsLoader } from "./routes/products";
import { ProductRoute, loader as productLoader } from "./routes/product";

import { Login, action as loginAction } from "./routes/login";
import { Cartitem, loader as cartLoader } from "./routes/cartitem";
import { Component } from "./routes/acordion";
import { Register, action as registerAction } from "./routes/register";

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
				path: "/register",
				element: <Register />,
				action: registerAction,
			},

			{
				path: "/login",
				element: <Login />,
				action: loginAction,
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
