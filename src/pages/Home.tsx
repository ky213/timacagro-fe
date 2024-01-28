import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Container, Stack, Button } from "@mui/material";

export interface IHomePageProps {}

export const HomePage = (props: IHomePageProps) => {
  const gotTo = useNavigate();

  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"start"}
        sx={{
          backgroundImage: "url(./homepage.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Grid item sx={{ mt: 22 }}>
          <Container
            maxWidth="sm"
            sx={{ backgroundColor: "rgb(0,0,0, 0.3)", padding: 5 }}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="white"
              gutterBottom
            >
              Easy & Reliable
            </Typography>
            <Typography variant="h5" align="center" color="white" paragraph>
              Manage your users in a modern and inuitive way.
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                color="success"
                onClick={() => gotTo("/dashboard")}
              >
                Go to dashboard
              </Button>
            </Stack>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};
