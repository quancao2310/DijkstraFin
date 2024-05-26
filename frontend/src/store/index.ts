import { configureStore } from "@reduxjs/toolkit";
import tmpReducer from "./reducers/tmp";
import { apiSlice } from "../services";
import addMoneySrcModalReducer from "./reducers/addMoneySrcModal.reducer";
import loginStatusReducer from "./reducers/login.reducer";

export const store = configureStore({
  reducer: {
    tmp: tmpReducer,
    AddMoneySrcModal: addMoneySrcModalReducer,
    LoginStatus: loginStatusReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
