import React, { useEffect, useState } from "react";
import { LockOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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

import { createUser, resetUsers } from "src/data/store/reducers/users";
import { EMAIL_REG_EXR, PHONE_REG_EXR, Roles } from "src/config/constants";
import { IRootState, useAppDispatch, useAppSelector } from "src/data/store";
import { CreateUserInput, Role, User } from "src/data/types/generated";
import { useCreateUserMutation } from "src/data/api/graphql/mutations.generated";

export const UserAdd = () => {
  const { loading, success, error } = useAppSelector((state: IRootState) => state.users);
  const [createUser, {}] = useCreateUserMutation();
  const dispatch = useAppDispatch();
  const gotTo = useNavigate();
  const {
    handleSubmit,
    register: registerField,
    formState: { errors: fieldErrors, touchedFields },
  } = useForm<CreateUserInput>();

  const onSubmit = async (newUser: CreateUserInput) => {
    try {
      createUser({ userInfo: newUser });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading && success) gotTo("/dashboard");

    return () => {
      dispatch(resetUsers());
    };
  }, [loading, success]);

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

          {/* <Grid item xs={12} mt={2}>
            <TextField
              required
              fullWidth
              id="phone"
              label="Phone"
              autoComplete="phone"
              {...registerField("phone", { pattern: PHONE_REG_EXR })}
              error={Boolean(fieldErrors.phone)}
              helperText={Boolean(fieldErrors.phone) && "Must be a valid phone number."}
            />
          </Grid> */}
          {/* <Grid item xs={12} mt={2}>
            <FormControl error={Boolean(fieldErrors.gender)} fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select id="gender" labelId="gender-label" fullWidth {...registerField("gender", { required: true })}>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
              {Boolean(fieldErrors.gender) && <FormHelperText color={"danger"}>Must select a gender</FormHelperText>}
            </FormControl>
          </Grid> */}
          <Grid item xs={12} mt={2}>
            <FormControl error={Boolean(fieldErrors.role)} fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                id="role"
                labelId="role-label"
                fullWidth
                {...registerField("role", { required: true })}
              >
                {Roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(fieldErrors.role) && (
                <FormHelperText color={"danger"}>Must select a gender</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={Boolean(loading)}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
