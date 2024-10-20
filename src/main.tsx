import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";

import "./index.css";
import { Layout } from "./routes/Layout";
import { App, loader as appLoader } from "./routes/App";

import { Component } from "./routes/acordion";
import { Register, action as registerAction } from "./routes/register";
import { Users, loader as userLoader } from "./routes/users";
import { Login } from "./routes/login";
import {
  PembayaranList,
  loader as pembayaranLoader,
} from "./routes/pembayaran";
import { PembayaranFilter } from "./routes/filterPembayaran";
import {
  PembayaranByUserId,
  loader as pembayaranByUserIdLoader,
  action as pembayaranAction,
} from "./routes/userById";
import { AdminDashboard } from "./routes/dashboard";
import { UsersBelumBayar } from "./routes/usersbelumbayar";

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
        path: "/adminDashboard",
        element: <AdminDashboard />,
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
        path: "/UsersBelumBayar/:bulan",
        element: <UsersBelumBayar />,},
      {
        path: "/users/:id",
        element: <PembayaranByUserId />,
        loader: pembayaranByUserIdLoader,
        action: pembayaranAction,
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
