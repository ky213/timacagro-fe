import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { default as Grid } from "@mui/material/Unstable_Grid2";

import { Region, Role } from "src/data/types/generated";
import { useAppSelector } from "src/data/store";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Avatar,
  Typography,
  Container,
  Stack,
  LinearProgress,
  FormLabel,
} from "src/components";
import { useGetUserQuery } from "src/data/api/graphql/queries.generated";

export const UserProfile = () => {
  const params = useParams();

  useGetUserQuery({ getUserId: `${params.id}` });

  const { currentUser: user } = useAppSelector((state) => state.users);
  const progress = (
    ((user?.currentPoints || 0) / (user?.targetPoints || 1)) *
    100
  ).toFixed(1);

  const handleChange = useCallback((evenst: any) => {}, []);

  const handleSubmit = useCallback((event: { preventDefault: () => void }) => {
    event.preventDefault();
  }, []);

  return (
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <div>
          <Typography variant="h4">Account</Typography>
        </div>
        <div>
          <Grid container spacing={3}>
            <Grid xs={12} md={6} lg={4}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Avatar
                      src={"/default-man-avatar.png"}
                      sx={{
                        height: 80,
                        mb: 2,
                        width: 80,
                      }}
                    />
                    <Typography gutterBottom variant="h5">
                      {user?.firstName + " " + user?.lastName}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {"Algiers"} {"Algeria"}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {"GMT+1"}
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button fullWidth variant="text">
                    Upload picture
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid xs={12} md={6} lg={8}>
              <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Card>
                  <CardHeader subheader="The information can be edited" title="Profile" />
                  <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5 }}>
                      <Grid container spacing={3}>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            helperText="Please specify the first name"
                            label="First name"
                            name="firstName"
                            onChange={handleChange}
                            required
                            defaultValue={user?.firstName}
                          />
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Last name"
                            name="lastName"
                            onChange={handleChange}
                            required
                            defaultValue={user?.lastName}
                          />
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            onChange={handleChange}
                            required
                            defaultValue={user?.email}
                          />
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            select
                            fullWidth
                            required
                            label="Region"
                            name="region"
                            onChange={handleChange}
                            SelectProps={{ native: true }}
                            defaultValue={user?.region}
                          >
                            {Object.values(Region).map((region) => (
                              <option key={region} value={region}>
                                {region}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Role"
                            name="role"
                            onChange={handleChange}
                            required
                            select
                            SelectProps={{ native: true }}
                            defaultValue={user?.role}
                          >
                            {Object.values(Role).map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <FormLabel>Progress</FormLabel>
                          <br />
                          {progress} %
                          <LinearProgress
                            variant="determinate"
                            value={Number(progress)}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button variant="contained">Save details</Button>
                    <Button variant="outlined" color="error">
                      Delete user
                    </Button>
                  </CardActions>
                </Card>
              </form>
            </Grid>
          </Grid>
        </div>
      </Stack>
    </Container>
  );
};
