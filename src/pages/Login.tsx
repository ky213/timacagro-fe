import * as React from "react";
import { NavLink } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import { LoginMutationVariables } from "src/data/api/graphql/mutations.generated";
import { useForm } from "react-hook-form";

export const LoginPage = () => {
  const {
    register: registerField,
    handleSubmit,
    formState: { errors: fieldErrors },
  } = useForm<LoginMutationVariables>();

  const onSubmit = async (credentials: LoginMutationVariables) => {
    console.log(credentials);
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        flex: "1 1 auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 550,
          px: 3,
          py: "100px",
          width: "100%",
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Alert severity="error">{"errorMessage"}</Alert>
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4">Login</Typography>
            <Typography color="text.secondary" variant="body2">
              Don&apos;t have an account? &nbsp;
              <Link
                component={NavLink}
                to="/auth/register"
                underline="hover"
                variant="subtitle2"
              >
                Register
              </Link>
            </Typography>
          </Stack>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              {...registerField("email", { required: true, pattern: /^\S+@\S+\.\S+$/g })}
              error={Boolean(fieldErrors.email)}
              helperText={Boolean(fieldErrors.email) && "Must be a valid email address."}
            />
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              {...registerField("password", {
                required: true,
              })}
              error={Boolean(fieldErrors.password)}
              helperText={Boolean(fieldErrors.password) && "Password required"}
            />
          </Stack>
          <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
            Login
          </Button>
          <NavLink to="/auth/password-reset">
            <Button sx={{ mt: 1 }}>Forgot password? click to reset it.</Button>
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
};
