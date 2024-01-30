import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { Box, CircularProgress, Stack, Typography } from "src/components";
import { router } from "src/config/routes";
import { useGetSessionQuery } from "./data/api/graphql/queries.generated";

function App() {
  const { isLoading } = useGetSessionQuery();

  if (isLoading)
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"90vh"}
      >
        <Stack>
          <CircularProgress color="primary" size="50px" />

          <Typography ml={-2} mt={3} variant="h5">
            loading...
          </Typography>
        </Stack>
      </Box>
    );

  return <RouterProvider router={router} />;
}

export default App;
