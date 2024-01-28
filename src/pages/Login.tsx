import * as React from "react";
import { Box, Link, Stack, Tab, Tabs, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export const LoginPage = () => {
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
      <Box
        sx={{
          maxWidth: 550,
          px: 3,
          py: "100px",
          width: "100%",
        }}
      >
        <h1>login</h1>
      </Box>
    </Box>
  );
};
