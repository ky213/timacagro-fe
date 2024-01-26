import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { PreloadedState } from "@reduxjs/toolkit";

import { api } from "../api";
import globalReducer from "./reducers/global";
import usersReducer from "./reducers/users";
import { notificationMiddleware } from "./middlewares/notification";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  global: globalReducer,
  users: usersReducer,
});

export const setupStore = (preloadedState?: PreloadedState<IRootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, notificationMiddleware),
    preloadedState,
  });
};

export const useAppDispatch = () => useDispatch<IAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

export type IRootState = ReturnType<typeof rootReducer>;
export type IAppStore = ReturnType<typeof setupStore>;
export type IAppDispatch = IAppStore["dispatch"];
