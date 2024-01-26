import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "src/data/api";
import { User } from "src/data/types/generated";

type IGlobalState = {
  loading: boolean;
  error: string | null;
  success: boolean;
};

const initialState: IGlobalState = { loading: false, success: false, error: null };

const slice = createSlice({
  name: "global",
  initialState,
  reducers: {
    resetGlobalState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    setSucess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    },
  },
  extraReducers: (builder) => {},
});

export default slice.reducer;

export const { resetGlobalState, setLoading, setSucess, setError } = slice.actions;
