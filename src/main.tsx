import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";

import "./index.css";
import { Layout } from "./routes/Layout";
import { App, loader as appLoader } from "./routes/App";
import { Products, loader as productsLoader } from "./routes/products";
import {
	ProductRoute,
	loader as productLoader,
	action as cartItemAction,
} from "./routes/product";

import { Login, action as loginAction } from "./routes/login";
import { CartRoute, loader as cartLoader } from "./routes/cart";
import { Component } from "./routes/acordion";
import { Register, action as registerAction } from "./routes/register";
import { Me } from "./routes/me";
import { ErrorPage } from "./routes/error";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <ErrorPage />,
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
				path: "/login/me",
				element: <Me />,
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
				action: cartItemAction,
			},
			{
				path: "/cart",
				element: <CartRoute />,
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
