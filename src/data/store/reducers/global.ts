import { createSlice } from "@reduxjs/toolkit";
import { api as mutations } from "src/data/api/graphql/mutations.generated";
import { api as queries } from "src/data/api/graphql/queries.generated";

import { User } from "src/data/types/generated";

type IGlobalState = {
  loading: boolean;
  errors: string[] | null;
  success: boolean;
  session: User | null;
};

const initialState: IGlobalState = {
  loading: false,
  success: false,
  errors: null,
  session: null,
};

const slice = createSlice({
  name: "global",
  initialState,
  reducers: {
    resetGlobalState: (state) => {
      state.loading = false;
      state.success = false;
      state.errors = null;
    },
    clearSession: (state) => {
      state.session = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.success = false;
      state.errors = null;
    },
    setSucess: (state) => {
      state.loading = false;
      state.success = true;
      state.errors = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.errors = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(mutations.endpoints.Login.matchFulfilled, (state, { payload }) => {
      if (payload.login?.__typename) {
        const { __typename, ...user } = payload.login;
        state.session = user;
      } else {
        state.session = payload.login || null;
      }
    });
    builder.addMatcher(mutations.endpoints.Logout.matchFulfilled, (state) => {
      document.cookie =
        "connect.sid" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

      state.session = null;
    });

    builder.addMatcher(
      queries.endpoints.GetSession.matchFulfilled,
      (state, { payload }) => {
        if (payload.getSession?.__typename) {
          const { __typename, ...user } = payload.getSession;
          state.session = user;
        } else {
          state.session = payload.getSession || null;
        }
      }
    );
  },
});

export default slice.reducer;

export const { resetGlobalState, setLoading, setSucess, setError, clearSession } =
  slice.actions;
