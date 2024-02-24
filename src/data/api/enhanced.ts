import { API_URL } from "src/config/constants";
import { api as queries } from "./graphql/queries.generated";
import { OrderCreatedDocument } from "./graphql/subscriptions.generated";

queries.enhanceEndpoints({
  endpoints: {
    ListProducts: {
      async onCacheEntryAdded({ page, perPage }, { dispatch }) {
        const url = new URL(API_URL);

        url.searchParams.append("query", OrderCreatedDocument);

        const source: EventSource = new EventSource(url, { withCredentials: true });

        source.addEventListener("next", () => {
          dispatch(queries.endpoints.ListProducts.initiate({ page, perPage }));
        });

        source.addEventListener<"error">("error", (e) => {});

        source.addEventListener("complete", () => {
          source.close();
        });
      },
    },
  },
});

export const { useListProductsQuery } = queries;
