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
  UsersMainPage,
  NotFound,
  DashOverviewPage,
  ClientsPage,
  InvoicesPage,
  RegionsPage,
  SettingsPage,
  LoginPage,
  RegisterPage,
  UserAdd,
  UserProfile,
} from "src/pages";

//TODO: fix imports
import { ProductAdd } from "src/pages/products/ProductAdd";
import { ProductDetails } from "src/pages/products/ProductDetails";
import { ProductsMainPage } from "src/pages/products/ProductsMain";
import { ProductsOrderPage } from "src/pages/products/ProductsOrder";

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
        loader: LoginRedirect,
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
            Component: UsersMainPage,
          },
          {
            path: "users/:id",
            Component: UserProfile,
          },
          {
            path: "users/add",
            Component: UserAdd,
          },
          {
            path: "products",
            Component: ProductsMainPage,
          },
          {
            path: "products/:id",
            Component: ProductDetails,
          },
          {
            path: "products/add",
            Component: ProductAdd,
          },
          {
            path: "products/order",
            Component: ProductsOrderPage,
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
async function PrivateRoute({ request }: LoaderFunctionArgs) {
  const session = await getCurrentSession();

  if (!session) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/auth/login?" + params.toString());
  }

  return null;
}

async function LoginRedirect({ params }: LoaderFunctionArgs) {
  const session = await getCurrentSession();

  if (session) {
    const to = params?.from || "/";

    return redirect(to);
  }

  return null;
}
//TODO: to be refactored
async function getCurrentSession() {
  var interval: NodeJS.Timer;
  let count = 10; //check for 0.5 second

  return new Promise((resolve) => {
    store.subscribe(() => {
      const { session, loading, success, errors } = store.getState().global;

      if (success) resolve(session);
      if (errors) resolve(null);
    });

    interval = setInterval(() => {
      const { session, loading, success, errors } = store.getState().global;

      if (session) {
        clearInterval(interval);
        resolve(session);
      }

      if (count <= 0) {
        clearInterval(interval);
        resolve(null);
      }

      count--;
    }, 50);
  });
}
