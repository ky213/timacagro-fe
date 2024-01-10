import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { USERS_API_URL } from "src/config/constants";
import { IAPIResult, IPagination } from "src/data/types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: USERS_API_URL }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<IAPIResult, IPagination>({
      query: ({ page = 1, pageSize = 10 }) => `?page=${page}&results=1000&seed=abc`,
    }),
  }),
});

export const { useGetUsersQuery } = api;
