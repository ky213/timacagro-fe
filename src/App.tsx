import React from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "src/config/routes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
