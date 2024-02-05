import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, CircularProgress, RenderIf, Stack, Typography } from "src/components";
import { useConfirmEmailMutation } from "src/data/api/graphql/mutations.generated";
import { resetGlobalState } from "src/data/store/reducers/global";

export const ConfirmEmailPage = () => {
  const [query] = useSearchParams();
  const dispatch = useDispatch();
  const goTo = useNavigate();
  const [confirmEmail, { isLoading, isSuccess, isError }] = useConfirmEmailMutation();

  useEffect(() => {
    confirmEmail({ token: `${query.get("token")}` });
    return () => {
      dispatch(resetGlobalState({}));
    };
  }, []);

  useEffect(() => {
    if (!isLoading && isSuccess) goTo("/auth/login");
  }, [isLoading, isSuccess]);

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
      <Stack display={"flex"} alignItems={"center"}>
        <CircularProgress color="primary" size="50px" />

        <RenderIf
          isTrue={isLoading}
          component={
            <Typography ml={-2} mt={3} variant="h6">
              Confirming your email...
            </Typography>
          }
        />
      </Stack>
    </Box>
  );
};
