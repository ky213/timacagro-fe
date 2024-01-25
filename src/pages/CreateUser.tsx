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
} from "@mui/material";

import { IUser } from "src/data/types";
import { createUser, resetUsers } from "src/data/store/reducers/users";
import { EMAIL_REG_EXR, NATIONALITIES, PHONE_REG_EXR } from "src/config/constants";
import { IRootState, useAppDispatch, useAppSelector } from "src/data/store";
import { useLoginMutation } from "src/data/User.generated";

const CreateUserPage = () => {
  const { loading, success, error } = useAppSelector((state: IRootState) => state.users);
  const [login, {}] = useLoginMutation();
  const dispatch = useAppDispatch();
  const gotTo = useNavigate();
  const {
    handleSubmit,
    register: registerField,
    formState: { errors: fieldErrors, touchedFields },
  } = useForm<IUser>();

  const onSubmit = async (newUser: IUser) => {
    try {
      login({ email: "dfghj", password: "rtyhj" });
      newUser.id = { name: "id", value: (Math.random() * 1000).toFixed(0) };
      dispatch(createUser(newUser));
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
          marginTop: 8,
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
        {<LinearProgress />}
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
                {...registerField("name.first", { required: true })}
                error={Boolean(fieldErrors.name?.first)}
                helperText={Boolean(fieldErrors.name?.first) && "This field is required"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
                {...registerField("name.last", { required: true })}
                error={Boolean(fieldErrors.name?.last)}
                helperText={Boolean(fieldErrors.name?.last) && "This field is required"}
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
          </Grid>
          <Grid item xs={12} mt={2}>
            <FormControl error={Boolean(fieldErrors.gender)} fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select id="gender" labelId="gender-label" fullWidth {...registerField("gender", { required: true })}>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
              {Boolean(fieldErrors.gender) && <FormHelperText color={"danger"}>Must select a gender</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} mt={2}>
            <FormControl error={Boolean(fieldErrors.nat)} fullWidth>
              <InputLabel id="nat-label">Nationality</InputLabel>
              <Select id="nat" labelId="nat-label" fullWidth {...registerField("nat", { required: true })}>
                {NATIONALITIES.map((nat) => (
                  <MenuItem key={nat} value={nat}>
                    {nat}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(fieldErrors.nat) && <FormHelperText color={"danger"}>Must select a gender</FormHelperText>}
            </FormControl>
          </Grid>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={Boolean(loading)}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateUserPage;
