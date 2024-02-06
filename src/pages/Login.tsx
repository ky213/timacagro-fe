import React, { useEffect } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Box, Button, Link, Stack, TextField, Typography } from "src/components";
import {
  LoginMutationVariables,
  useLoginMutation,
} from "src/data/api/graphql/mutations.generated";
import { resetGlobalState } from "src/data/store/reducers/global";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/data/store";
import { useLazyGetSessionQuery } from "src/data/api/graphql/queries.generated";

export const LoginPage = () => {
  const { session, loading, success } = useAppSelector((state) => state.global);
  const [login] = useLoginMutation();
  const [refetchSession, {}] = useLazyGetSessionQuery();
  const dispatch = useDispatch();
  const goTo = useNavigate();
  const [params] = useSearchParams();
  const {
    register: registerField,
    handleSubmit,
    formState: { errors: fieldErrors },
  } = useForm<LoginMutationVariables>();

  useEffect(() => {
    if (session) goTo(params.get("from") || "/");
    else refetchSession();

    return () => {
      dispatch(resetGlobalState({}));
    };
  }, []);

  useEffect(() => {
    if (success && !loading) goTo("/dashboard/overview");
  }, [success]);

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
        <Box component="form" noValidate onSubmit={handleSubmit(login)} sx={{ mt: 3 }}>
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
          <Button
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            type="submit"
            variant="contained"
            disabled={loading}
          >
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
