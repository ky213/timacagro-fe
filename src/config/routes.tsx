import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

import { ErrorBoundary } from "src/components";
import { MainLayout, DashboardLayout } from "src/layouts";
import { HomePage, Dashboard, NotFound, UserProfile } from "src/pages";
import CreateUserPage from "src/pages/CreateUser";

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
        path: "/dashboard",
        Component: DashboardLayout,
        children: [
          {
            path: "/dashboard/",
            Component: Dashboard,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "/dashboard/new-user",
            Component: CreateUserPage,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "/dashboard/user/:id",
            Component: UserProfile,
            errorElement: <ErrorBoundary />,
          },
          {
            path: "*",
            Component: NotFound,
          },
        ],
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
