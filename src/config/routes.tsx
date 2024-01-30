import * as React from "react";
import {
  LoaderFunctionArgs,
  Outlet,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

import { ErrorBoundary } from "src/components";
import { store } from "src/data/store";
import { MainLayout, AuthLayout, DashboardLayout } from "src/layouts";
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
  LoginPage,
  RegisterPage,
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
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: LoginPage,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "register",
        Component: RegisterPage,
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
    loader: PrivateRoute,
    errorElement: <ErrorBoundary />,
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

//TODO: set RBAC
function PrivateRoute({ request }: LoaderFunctionArgs) {
  const { session } = store.getState().global;

  if (!session) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/auth/login?" + params.toString());
  }

  return null;
}
