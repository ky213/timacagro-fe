import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "src/data/api";
import { IUser } from "src/data/types";

type IUsersState = {
  list: IUser[];
  loading: boolean;
  error: string | null;
  success: boolean;
};

export const createUser = createAsyncThunk<IUser, IUser>("users/createUser", async (newUser: IUser) => {
  return new Promise<IUser>((resolve, reject) => {
    try {
      const t = setTimeout(() => resolve(newUser), 3000);
    } catch (error) {
      reject(error);
    }
  });
});

const initialState: IUsersState = { list: [], loading: false, success: false, error: null };

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.list.unshift(action.payload);
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.error.message || "unknown error.";
    });
    builder.addMatcher(api.endpoints.getUsers.matchFulfilled, (state, { payload }) => {
      state.list.push(...payload.results);
    });
  },
});

export default slice.reducer;

export const { resetUsers } = slice.actions;
