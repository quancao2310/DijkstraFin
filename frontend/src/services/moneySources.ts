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
    deleteMoneySource: builder.mutation<MoneySource, string>({
      query: (id) => ({
        url: `/money-sources/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MoneySource"],
    }),
  }),
});

export const {
  useGetAllSourceQuery,
  useCreateMoneySourceMutation,
  useDeleteMoneySourceMutation,
} = moneySourcesApiSlice;
