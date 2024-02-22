import { createSlice } from "@reduxjs/toolkit";

import { api as queries } from "src/data/api/graphql/queries.generated";
import { Client, ClientsList } from "src/data/types/generated";

type IClientsState = {
  list: ClientsList;
  currentClient: Client | null;
  loading: boolean;
  error: string | null;
  success: boolean;
};

const initialState: IClientsState = {
  list: { page: 0, perPage: 0, clients: [], total: 0 },
  currentClient: null,
  loading: false,
  success: false,
  error: null,
};

const slice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    resetClients: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.list = initialState.list;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      queries.endpoints.ListClients.matchFulfilled,
      (state, { payload }) => {
        state.list = payload.listClients;
      }
    );

    builder.addMatcher(
      queries.endpoints.GetClient.matchFulfilled,
      (state, { payload }) => {
        state.currentClient = payload.getClient || null;
      }
    );
  },
});

export default slice.reducer;

export const { resetClients } = slice.actions;
