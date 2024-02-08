import React, { FC, PropsWithChildren } from "react";
import { Outlet, useNavigate, Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Link, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

export interface IMainLAyoutProps extends PropsWithChildren {}

export const MainLayout: FC<IMainLAyoutProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const gotTo = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const gotToDashboard = () => {
    handleClose();
    gotTo("/dashboard");
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#1976d269",
          borderBottom: "2px solid white",
        }}
      >
        <Toolbar>
          <Link component={RouterLink} to="/" color="inherit" underline="none">
            <Stack direction="row" spacing={1} alignItems="center">
              <img
                src={"./timacagro_logo.svg"}
                alt="logo"
                style={{
                  width: "174px",
                  height: "height",
                  filter: "brightness(0) invert(1)",
                }}
              />
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                component="div"
              ></Typography>
            </Stack>
          </Link>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClick={() => gotTo("/dashboard")}
          >
            <MenuItem onClick={gotToDashboard}>Dashboard</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};
