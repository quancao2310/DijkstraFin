import { apiSlice } from ".";
import { MoneySource } from "../types";

export const moneySourcesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSource: builder.query<MoneySource[], void>({
      query: () => "/money-sources",
      providesTags: ["MoneySource"],
    }),
    createMoneySource: builder.mutation<MoneySource, Partial<MoneySource>>({
      query: (body) => ({
        url: "/money-sources",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["MoneySource"],
    }),
  }),
});

export const { useGetAllSourceQuery, useCreateMoneySourceMutation } =
  moneySourcesApiSlice;
