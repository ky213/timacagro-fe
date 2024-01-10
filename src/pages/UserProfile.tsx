import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import ManIcon from "@mui/icons-material/Man4";
import WomanIcon from "@mui/icons-material/Woman2";
import LocationIcon from "@mui/icons-material/LocationOn";
import TimezoneIcon from "@mui/icons-material/Timelapse";

import { IRootState } from "src/data/store";

const UserProfile = () => {
  const { id } = useParams();
  const users = useSelector((state: IRootState) => state.users.list);
  const user = users.find((user) => user.id.value === id);

  return (
    <Box width={"90%"} mx={"auto"} pt={10}>
      <Card>
        <CardHeader
          title={`${user?.name?.first} ${user?.name?.last}`}
          subheader={user?.email}
          avatar={<Avatar alt={`${user?.name?.first} ${user?.name?.last}`} src={user?.picture?.large} />}
          sx={{ zoom: { xs: 1.2, sm: 2 }, display: "flex", flexDirection: { xs: "column", sm: "row" } }}
        />
        <CardContent sx={{ zoom: 1.2 }}>
          <Grid container justifyContent={"center"}>
            <Grid item flex={1}>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PhoneIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Phone" secondary={user?.phone} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <CakeIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Age" secondary={user?.dob?.age} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{user?.gender === "male" ? <ManIcon /> : <WomanIcon />}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Gender" secondary={user?.gender} />
                </ListItem>
              </List>
            </Grid>
            <Grid item flex={2}>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <LocationIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="From" secondary={`${user?.location?.city}, ${user?.location?.state} `} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <TimezoneIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Timezone" secondary={`${user?.location?.timezone?.offset}`} />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
