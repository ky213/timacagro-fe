import { API_URL } from "src/config/constants";
import { api as queries } from "./graphql/queries.generated";
import { OrderCreatedDocument } from "./graphql/subscriptions.generated";

queries.enhanceEndpoints({
  endpoints: {
    ListProducts: {
      async onCacheEntryAdded(_args, { dispatch }) {
        const url = new URL(API_URL);

        url.searchParams.append("query", OrderCreatedDocument);

        const source: EventSource = new EventSource(url, { withCredentials: true });

        source.addEventListener("message", ({ data }) => {
          //   TODO: refactor
          dispatch(queries.endpoints.ListProducts.initiate({ page: 0, perPage: 1000 }));
        });

        source.addEventListener<"error">("error", (e) => {
          console.log("SEE Error: ", e);
        });

        source.addEventListener("complete", () => {
          source.close();
        });
      },
    },
  },
});

export const { useListProductsQuery } = queries;
