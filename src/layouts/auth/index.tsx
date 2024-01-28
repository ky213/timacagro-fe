import * as React from "react";
import { Outlet, NavLink } from "react-router-dom";

import { Box, Typography, Grid, LinearProgress, Alert, RenderIf } from "src/components";
import { useAppSelector } from "src/data/store";

export const AuthLayout = (props: any) => {
  const { errors, loading } = useAppSelector((state) => state.global);

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flex: "1 1 auto",
        height: "100vh",
      }}
    >
      <Grid container sx={{ flex: "1 1 auto" }}>
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: "background.paper",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: "fixed",
              top: 0,
              width: "100%",
            }}
          >
            <Box
              component={NavLink}
              to="/"
              sx={{
                display: "inline-flex",
                height: 32,
                width: 32,
              }}
            ></Box>
          </Box>
          <RenderIf isTrue={loading} component={<LinearProgress />} />
          <Box pt={5} px={5} justifyContent={"center"}>
            {errors && (
              <Alert variant="filled" severity="error">
                {errors?.map((error) => (
                  <Typography key={error}>{error}.</Typography>
                ))}
              </Alert>
            )}
          </Box>

          <Outlet />
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: "center",
            background: "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            "& img": {
              maxWidth: "100%",
            },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: "24px",
                lineHeight: "32px",
                mb: 1,
              }}
              variant="h1"
            >
              Welcome to{" "}
              <Box component="a" sx={{ color: "#15B79E" }} target="_blank">
                Timacagro Algérie
              </Box>
            </Typography>
            <Typography align="center" sx={{ mb: 3 }} variant="subtitle1">
              An intuitive dashboard to manage ATCs and products in real time.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
