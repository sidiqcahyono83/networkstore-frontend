import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";

import "./index.css";
import { Layout } from "./routes/Layout";
import { App, loader as appLoader } from "./routes/App";

// import { Component } from "./routes/acordion";
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
  action as PembayaranByUserIdAction,
} from "./routes/userById";
import { AdminDashboard } from "./routes/dashboard";
import {
  UsersBelumBayar,
  usersBelumbayarLoader,
} from "./routes/usersbelumbayar";

import PppActive from "./routes/pppoe";
import PppoeNonactive from "./routes/pppNonactive";
import {
  PembayaranByBulanIni,
  loader as pembayaranBulanIniLoader,
} from "./routes/pembayaranByMonth";
import {
  PembayaranById,
  loader as pembayaranByIdLoader,
  action as PembayaranByIdAction,
} from "./routes/pembayaranById";

import { CreateUser, loader as createUserLoader } from "./routes/createUser";
import {
  UpdateUserById,
  loader as updateLoaderUserById,
} from "./routes/userUpdateById";
import { AreaList, loader as areaLoader } from "./routes/area";
import { OdpList, loader as odpLoader } from "./routes/odpList";

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
        path: "/users",
        element: <Users />,
        loader: userLoader,
      },
      {
        path: "/create/users",
        element: <CreateUser />,
        loader: createUserLoader,
      },
      {
        path: "/update/users/:userId",
        element: <UpdateUserById />,
        loader: updateLoaderUserById,
      },
      {
        path: "/pembayaran",
        element: <PembayaranList />,
        loader: pembayaranLoader,
      },
      {
        path: "/filterpembayaran",
        element: <PembayaranFilter />,
        // loader: productLoader,
        // action: cartItemAction,
      },
      {
        path: "/pembayaran/:id",
        element: <PembayaranById />,
        loader: pembayaranByIdLoader,
        action: PembayaranByIdAction,
      },
      {
        path: "/pembayaranBulanIni",
        element: <PembayaranByBulanIni />,
        loader: pembayaranBulanIniLoader,
      },
      {
        path: "/pppoe",
        element: <PppActive />,
      },
      {
        path: "/nonactive",
        element: <PppoeNonactive />,
      },
      {
        path: "/UsersBelumBayar",
        element: <UsersBelumBayar />,
        loader: usersBelumbayarLoader,
      },
      {
        path: "/users/:id",
        element: <PembayaranByUserId />,
        loader: pembayaranByUserIdLoader,
        action: PembayaranByUserIdAction,
      },
      {
        path: "/area",
        element: <AreaList />,
        loader: areaLoader,
      },
      {
        path: "/odp",
        element: <OdpList />,
        loader: odpLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
