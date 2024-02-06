import React, { useEffect } from "react";
import { LockOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  FormControlLabel,
  Checkbox,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  Alert,
  LinearProgress,
  Snackbar,
  InputLabel,
} from "src/components";

import { resetUsers } from "src/data/store/reducers/users";
import { EMAIL_REG_EXR } from "src/config/constants";
import { useAppDispatch } from "src/data/store";
import { CreateUserInput, Region, Role } from "src/data/types/generated";
import { useCreateUserMutation } from "src/data/api/graphql/mutations.generated";

export const UserAdd = () => {
  const [createUser, { isLoading, isSuccess }] = useCreateUserMutation();
  const dispatch = useAppDispatch();
  const gotTo = useNavigate();
  const {
    handleSubmit,
    register: registerField,
    formState: { errors: fieldErrors, touchedFields },
  } = useForm<CreateUserInput>();

  const onSubmit = async (newUser: CreateUserInput) => {
    try {
      //TODO: refactor
      newUser.active = true;
      newUser.password = "1qwerty";
      newUser.targetPoints = Number(newUser.targetPoints || 0);
      createUser({ userInfo: newUser });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoading && isSuccess) gotTo(-1);

    return () => {
      dispatch(resetUsers());
    };
  }, [isLoading, isSuccess]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create new user
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                {...registerField("firstName", { required: true })}
                error={Boolean(fieldErrors.firstName)}
                helperText={Boolean(fieldErrors.firstName) && "This field is required"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
                {...registerField("lastName", { required: true })}
                error={Boolean(fieldErrors.lastName)}
                helperText={Boolean(fieldErrors.lastName) && "This field is required"}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              {...registerField("email", { pattern: EMAIL_REG_EXR })}
              error={Boolean(fieldErrors.email)}
              helperText={Boolean(fieldErrors.email) && "Must be a valid email address."}
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <FormControl error={Boolean(fieldErrors.role)} fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                id="role"
                labelId="role-label"
                fullWidth
                {...registerField("role", { required: true })}
              >
                {Object.values(Role).map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(fieldErrors.role) && (
                <FormHelperText color={"danger"}>Must select a role</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} mt={2}>
            <FormControl error={Boolean(fieldErrors.region)} fullWidth>
              <InputLabel id="region-label">Region</InputLabel>
              <Select
                id="region"
                labelId="region-label"
                fullWidth
                {...registerField("region", { required: true })}
              >
                {Object.values(Region).map((region) => (
                  <MenuItem key={region} value={region}>
                    {region}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(fieldErrors.region) && (
                <FormHelperText color={"danger"}>Must select a region</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} mt={2}>
            <TextField
              fullWidth
              type="number"
              id="targetPoints"
              label="Target points"
              {...registerField("targetPoints")}
              error={Boolean(fieldErrors.targetPoints)}
              helperText={
                Boolean(fieldErrors.targetPoints) &&
                "Target points if ATC role is selected"
              }
            />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={Boolean(isLoading)}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
