import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { SideNav } from "./SideNav";
import { TopNav } from "./TopNav";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Link,
  RenderIf,
  Stack,
  Typography,
} from "src/components";
import { useAppSelector } from "src/data/store";
import { useGetSessionQuery } from "src/data/api/graphql/queries.generated";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  padding: "1px 5px",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export const DashboardLayout = (props: any) => {
  const { errors, loading } = useAppSelector((state) => state.global);
  const { isLoading, isError } = useGetSessionQuery();

  const { pathname } = useLocation();
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(() => {
    handlePathnameChange();
  }, [pathname]);

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

  if (isError)
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"90vh"}
      >
        <Stack>
          <Typography ml={-2} mt={3} variant="h5">
            Error initializing!
          </Typography>

          <Link component={Button} variant="body2" href="/">
            Go Back
          </Link>
        </Stack>
      </Box>
    );

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>
          <RenderIf isTrue={loading} component={<LinearProgress />} />
          <Box pt={5} px={5} justifyContent={"center"}>
            <RenderIf
              isTrue={Boolean(errors)}
              component={
                <Alert variant="filled" severity="error">
                  {errors?.map((error) => (
                    <Typography key={error}>{error}.</Typography>
                  ))}
                </Alert>
              }
            />
          </Box>
          <Outlet />
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
};
