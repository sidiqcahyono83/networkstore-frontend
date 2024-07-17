import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";

import "./index.css";
import { Layout } from "./routes/Layout";
import { App, loader as appLoader } from "./routes/App";
import { Products, loader as productLoader } from "./components/product";
import { Cart } from "./components/chart";
import { Daftar } from "./components/daftar";
import { Login } from "./components/login";

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
        loader: productLoader,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/daftar",
        element: <Daftar />,
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
