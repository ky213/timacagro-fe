import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api as queries } from "src/data/api/graphql/queries.generated";
import { User } from "src/data/types/generated";

type IUsersState = {
  list: User[];
  loading: boolean;
  error: string | null;
  success: boolean;
};

export const createUser = createAsyncThunk<User, User>(
  "users/createUser",
  async (newUser: User) => {
    return new Promise<User>((resolve, reject) => {
      try {
        const t = setTimeout(() => resolve(newUser), 3000);
      } catch (error) {
        reject(error);
      }
    });
  }
);

const initialState: IUsersState = {
  list: [],
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
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      queries.endpoints.ListUsers.matchFulfilled,
      (state, { payload }) => {
        state.list = payload.listUsers.users.map(({ __typename, ...rest }) => ({
          ...rest,
        }));
      }
    );
  },
});

export default slice.reducer;

export const { resetUsers } = slice.actions;
