import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { GraphQLClient } from "graphql-request";

import { API_URL } from "src/config/constants";

const client = new GraphQLClient(`${API_URL}`, { credentials: "include" });

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    client,
    customErrors({ response }) {
      return {
        message: response.errors?.map(({ message }) => message),
      };
    },
  }),
  endpoints: () => ({}),
});
