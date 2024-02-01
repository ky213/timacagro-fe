import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useCallback,
  useState,
} from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Avatar,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import { useAppSelector } from "src/data/store";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "src/data/api/graphql/queries.generated";
import { Role } from "src/data/types/generated";

export const UserProfile = () => {
  const params = useParams<string>();
  const { currentUser } = useAppSelector((state) => state.users);
  const { isLoading, isSuccess } = useGetUserQuery({ getUserId: params.id || "" });

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
                      {currentUser?.firstName + " " + currentUser?.lastName}
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
                            value={currentUser?.firstName}
                          />
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Last name"
                            name="lastName"
                            onChange={handleChange}
                            required
                            value={currentUser?.lastName}
                          />
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            onChange={handleChange}
                            required
                            value={currentUser?.email}
                          />
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Country"
                            name="country"
                            onChange={handleChange}
                            required
                            value={"Algeria"}
                          />
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Select Role"
                            name="state"
                            onChange={handleChange}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={currentUser?.role}
                          >
                            {Object.values(Role).map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </TextField>
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
