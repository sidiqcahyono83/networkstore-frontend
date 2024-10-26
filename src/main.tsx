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
import {
  UsersBelumBayar,
  usersBelumbayarLoader,
} from "./routes/usersbelumbayar";
<<<<<<< HEAD
// import {
//   UsersSudahBayar,
//   usersSudahbayarLoader,
// } from "./routes/usersSudahBayar";
=======

import PppActive from "./routes/pppoe";
import PppoeNonactive from "./routes/pppNonactive";
>>>>>>> e456fe0be430d401cfc93c9f57a06232ad53ad81

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
<<<<<<< HEAD
      // {
      //   path: "/usersSudahBayar",
      //   element: <UsersSudahBayar />,
      //   loader: usersSudahbayarLoader,
      // },
=======
      {
        path: "/pppoe",
        element: <PppActive />,
      },
      {
        path: "/nonactive",
        element: <PppoeNonactive />,
      },
>>>>>>> e456fe0be430d401cfc93c9f57a06232ad53ad81
      {
        path: "/UsersBelumBayar",
        element: <UsersBelumBayar />,
        loader: usersBelumbayarLoader,
      },
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
