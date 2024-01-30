import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "src/config/routes";
import { useGetSessionQuery } from "./data/api/graphql/queries.generated";

function App() {
  const data = useGetSessionQuery();

  return <RouterProvider router={router} />;
}

export default App;
