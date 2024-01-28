import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";

import { API_URL } from "src/config/constants";

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: `${API_URL}`,
    customErrors({ response }) {
      return {
        message: response.errors?.map(({ message }) => message),
      };
    },
  }),
  endpoints: () => ({}),
});
