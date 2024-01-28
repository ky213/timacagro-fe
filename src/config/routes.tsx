import * as React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";

import { ErrorBoundary } from "src/components";
import { MainLayout } from "src/layouts";
import { Layout as DashboardLayout } from "src/layouts/dashboard/Layout";
import {
  HomePage,
  UsersPage,
  NotFound,
  DashOverviewPage,
  ProductsPage,
  ClientsPage,
  InvoicesPage,
  RegionsPage,
  SettingsPage,
} from "src/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: HomePage,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "",
        element: <Outlet />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: "overview",
            Component: DashOverviewPage,
          },
          {
            path: "users",
            Component: UsersPage,
          },
          {
            path: "products",
            Component: ProductsPage,
          },
          {
            path: "clients",
            Component: ClientsPage,
          },
          {
            path: "invoices",
            Component: InvoicesPage,
          },
          {
            path: "regions",
            Component: RegionsPage,
          },
          {
            path: "settings",
            Component: SettingsPage,
          },
          {
            path: "*",
            Component: NotFound,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
