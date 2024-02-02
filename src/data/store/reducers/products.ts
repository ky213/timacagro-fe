import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api as queries } from "src/data/api/graphql/queries.generated";
import { Product, ProductsList } from "src/data/types/generated";

type IProductsState = {
  list: ProductsList;
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  success: boolean;
};

export const createProduct = createAsyncThunk<Product, Product>(
  "products/createProduct",
  async (newProduct: Product) => {
    return new Promise<Product>((resolve, reject) => {
      try {
        const t = setTimeout(() => resolve(newProduct), 3000);
      } catch (error) {
        reject(error);
      }
    });
  }
);

const initialState: IProductsState = {
  list: { page: 0, perPage: 0, products: [], total: 0 },
  currentProduct: null,
  loading: false,
  success: false,
  error: null,
};

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.list = initialState.list;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      queries.endpoints.ListProducts.matchFulfilled,
      (state, { payload }) => {
        state.list = payload.listProducts;
      }
    );

    builder.addMatcher(
      queries.endpoints.GetProduct.matchFulfilled,
      (state, { payload }) => {
        state.currentProduct = payload.getProduct || null;
      }
    );
  },
});

export default slice.reducer;

export const { resetProducts } = slice.actions;
