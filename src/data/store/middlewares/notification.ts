import { isPending, isRejected, isFulfilled } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

import { setError, setLoading, setSucess } from "../reducers/global";

export const notificationMiddleware: Middleware =
  ({ dispatch }: MiddlewareAPI) =>
  (next) =>
  (action) => {
    if (isPending(action)) dispatch(setLoading({}));

    if (isRejected(action)) {
      dispatch(setError([action.payload?.message || "Unknown error."]));
      enqueueSnackbar(action.error?.message || "Unknown error.", { variant: "error" });
    }

    if (isFulfilled(action)) {
      dispatch(setSucess({}));

      if (action.meta.arg?.type !== "query")
        enqueueSnackbar("Success ", { variant: "success", autoHideDuration: 2000 });
    }

    return next(action);
  };
