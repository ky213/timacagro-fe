import { isRejectedWithValue, isFulfilled } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

export const notificationMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) enqueueSnackbar(action.error.message, { variant: "error" });
  if (isFulfilled(action) && action.meta.arg?.type !== "query") enqueueSnackbar("Success ", { variant: "success" });

  return next(action);
};
