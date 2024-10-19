// src/index.tsx

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";

import "./index.css";
import { Layout } from "./routes/Layout";
import { App, loader as appLoader } from "./routes/App";
// import { Products, loader as productsLoader } from "./routes/products";
// import {
//   ProductRoute,
//   loader as productLoader,
//   action as cartItemAction,
// } from "./routes/product";

import { CartRoute, loader as cartLoader } from "./routes/cart";
import { Component } from "./routes/acordion";
import { Register, action as registerAction } from "./routes/register";
import { Users, loader as userLoader } from "./routes/users";
import { Login } from "./routes/login";
import {
  PembayaranList,
  loader as pembayaranLoader,
} from "./routes/pembayaran";
import { PembayaranFilter } from "./routes/filterPembayaran";

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
      },
      {
        path: "/pembayaran",
        element: <PembayaranList />,
        loader: pembayaranLoader,
      },
      {
        path: "/users",
        element: <Users />,
        loader: userLoader,
      },
      {
        path: "/filterpembayaran",
        element: <PembayaranFilter />,
        // loader: productLoader,
        // action: cartItemAction,
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
