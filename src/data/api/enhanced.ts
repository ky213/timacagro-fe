import { api as queries } from "./graphql/queries.generated";

queries.enhanceEndpoints({
  endpoints: {
    ListProducts: {
      async onCacheEntryAdded(
        args,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        const url = new URL("http://localhost:4000/graphql");
        url.searchParams.append(
          "query",
          "subscription OrderProduct {orderProducts {available label}}"
        );

        const source = new EventSource(url);

        source.addEventListener("next", ({ data }) => {
          const { orderProducts } = JSON.parse(data).data;

          //   TODO: refactor
          dispatch(queries.endpoints.ListProducts.initiate({ page: 0, perPage: 1000 }));
        });

        source.addEventListener("error", (e) => {
          console.error(e);
        });

        source.addEventListener("complete", () => {
          source.close();
        });
      },
    },
  },
});

export const { useListProductsQuery } = queries;
