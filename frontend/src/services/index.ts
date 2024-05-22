import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dijkstrafin-backend.vercel.app/api/v1",
  }),
  endpoints: () => ({}),
});
