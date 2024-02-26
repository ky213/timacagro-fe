import { createSlice } from "@reduxjs/toolkit";

import { api as queries } from "src/data/api/graphql/queries.generated";
import { User, UsersList } from "src/data/types/generated";

type IUsersState = {
  list: UsersList;
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  success: boolean;
};

const initialState: IUsersState = {
  list: { page: 0, perPage: 0, users: [], total: 0 },
  currentUser: null,
  loading: false,
  success: false,
  error: null,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.currentUser = null;
      state.list = initialState.list;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      queries.endpoints.ListUsers.matchFulfilled,
      (state, { payload }) => {
        state.list = payload.listUsers;
      }
    );

    builder.addMatcher(queries.endpoints.GetUser.matchFulfilled, (state, { payload }) => {
      state.currentUser = payload.getUser || null;
    });
  },
});

export default slice.reducer;

export const { resetUsers } = slice.actions;
