import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Typography } from "@mui/material";

import { router } from "src/config/routes";
import { useGetSessionQuery } from "./data/api/graphql/queries.generated";
import { useAppSelector } from "./data/store";

function App() {
  const { isLoading } = useGetSessionQuery();

  if (isLoading) return <Typography variant="h3">loading...</Typography>;

  return <RouterProvider router={router} />;
}

export default App;
