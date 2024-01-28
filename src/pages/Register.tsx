import * as React from "react";
import { Box, Typography } from "@mui/material";

export const RegisterPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        flex: "1 1 auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" textAlign={"center"}>
        Please contact your admin for registration.
      </Typography>
    </Box>
  );
};
