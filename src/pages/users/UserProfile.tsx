import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { default as Grid } from "@mui/material/Unstable_Grid2";

import { Region, Role, User } from "src/data/types/generated";
import { useAppSelector } from "src/data/store";
import { useGetUserQuery } from "src/data/api/graphql/queries.generated";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "src/data/api/graphql/mutations.generated";
import { resetUsers } from "src/data/store/reducers/users";
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
  ConfirmDeleteEntity,
} from "src/components";
import { useForm } from "react-hook-form";
import { EMAIL_REG_EXR } from "src/config/constants";

export const UserProfile = () => {
  const [openDeleteUserDialog, setOpenDeleteUserDialog] = useState<boolean>(false);
  const params = useParams();
  const goTo = useNavigate();
  const dispatch = useDispatch();
  const [deleteUser, { isSuccess: isDeleted }] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  useGetUserQuery({
    getUserId: Number(params.id),
  });
  const { currentUser: user } = useAppSelector((state) => state.users);
  const {
    handleSubmit,
    register: registerField,
    formState: { errors: fieldErrors },
  } = useForm<User>();

  const progress = (
    ((user?.currentPoints || 0) / (user?.targetPoints || 1)) *
    100
  ).toFixed(1);

  useEffect(() => {
    if (isDeleted) goTo(-1);
  }, [isDeleted]);

  useEffect(
    () => () => {
      dispatch(resetUsers());
    },
    []
  );

  const handleCloseDialog = (ok: boolean) => {
    if (ok) deleteUser({ deleteUserId: Number(params.id) });
    else setOpenDeleteUserDialog(false);
  };

  const onSubmit = async (userData: User) => {
    const { id, createdAt, updatedAt, ...userInfo } = userData;

    updateUser({ updateUserId: Number(user?.id), userInfo });
  };

  if (!user) return null;

  return (
    <Container maxWidth="lg">
      <ConfirmDeleteEntity open={openDeleteUserDialog} onClose={handleCloseDialog} />
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
              <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
                <Card>
                  <CardHeader subheader="The information can be edited" title="Profile" />
                  <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5 }}>
                      <Grid container spacing={3}>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="First name"
                            defaultValue={user.firstName}
                            {...registerField("firstName", { required: true })}
                            error={Boolean(fieldErrors.firstName)}
                            helperText={
                              Boolean(fieldErrors.firstName) && "This field is required"
                            }
                          />
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Last name"
                            defaultValue={user.lastName}
                            {...registerField("lastName", {
                              required: true,
                            })}
                            error={Boolean(fieldErrors.lastName)}
                            helperText={
                              Boolean(fieldErrors.lastName) && "This field is required"
                            }
                          />
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            defaultValue={user.email}
                            label="Email Address"
                            {...registerField("email", {
                              pattern: EMAIL_REG_EXR,
                              required: true,
                            })}
                            error={Boolean(fieldErrors.email)}
                            helperText={
                              Boolean(fieldErrors.email) && " A valid email is required"
                            }
                          />
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            select
                            fullWidth
                            label="Region"
                            defaultValue={user.region}
                            SelectProps={{ native: true }}
                            {...registerField("region", { required: true })}
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
                            select
                            fullWidth
                            label="Role"
                            defaultValue={user.role}
                            SelectProps={{ native: true }}
                            {...registerField("role", { required: true })}
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
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={Boolean(isUpdating)}
                    >
                      Save details
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setOpenDeleteUserDialog(true)}
                    >
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
