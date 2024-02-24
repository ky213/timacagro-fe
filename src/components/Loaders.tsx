import React from "react";
import { Box, Button, CircularProgress, Link, Stack, Typography } from ".";

export const LoadingProgress = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"90vh"}>
      <Stack>
        <CircularProgress color="primary" size="50px" />

        <Typography ml={-2} mt={3} variant="h5">
          loading...
        </Typography>
      </Stack>
    </Box>
  );
};

export const LoadingFailed = () => (
  <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"90vh"}>
    <Stack>
      <Typography ml={-2} mt={3} variant="h5">
        Error happend!
      </Typography>

      <Link component={Button} variant="body2" href="/">
        Go Back
      </Link>
    </Stack>
  </Box>
);
