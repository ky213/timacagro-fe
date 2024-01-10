import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";

export default function DashboardLayout() {
  const goTo = useNavigate();

  return (
    <Grid container justifyContent={"flex-start"} sx={{ height: "100vh" }}>
      <Grid item xs={2} sx={{ height: "100%", borderRight: "1px solid lightgray" }}>
        <Box mt={8}>
          <List>
            <ListItem disablePadding onClick={() => goTo("/dashboard")}>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} sx={{ display: { xs: "none", md: "block" } }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => goTo("/dashboard/new-user")}>
              <ListItemButton>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary={"Add User"} sx={{ display: { xs: "none", md: "block" } }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Grid>
      <Grid item component="main" xs={10}>
        <Box justifyContent={"center"} alignItems={"Center"}>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
}
