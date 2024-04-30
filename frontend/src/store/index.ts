import { configureStore } from "@reduxjs/toolkit";
import tmpReducer from "./reducers/tmp";
import { apiSlice } from "../services";

export const store = configureStore({
  reducer: {
    tmp: tmpReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
