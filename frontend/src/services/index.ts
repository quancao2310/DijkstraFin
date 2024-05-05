import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  // baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.4:3001" }),
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://deployed-dijkstra-fin-demo-c26ahvae6-nghia-dos-projects.vercel.app/",
  }),
  endpoints: () => ({}),
});
