import { apiSlice } from ".";
import { Budget } from "../types/budget.type";
import { RootState } from "../store";
import { useSelector } from "react-redux";
export const budgetsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBudget: builder.mutation<Budget, Partial<Budget>>({
      query: (body) => ({
        url: "/budgets",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [
        {
          type: "User",
        },
      ],
    }),
    getBudgets: builder.query<Budget[], void>({
      query: () => "/budgets",
    }),
    getBudgetById: builder.query<Budget, string>({
      query: (id) => `/budgets/${id}`,
    }),
    updateBudget: builder.mutation<Budget, Partial<Budget>>({
      query: ({ _id, ...body }) => ({
        url: `/budgets/${_id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    deleteBudget: builder.mutation<Budget, string>({
      query: (id) => ({
        url: `/budgets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
  overrideExisting: true, // Add this line to allow overriding existing endpoints
});

export const {
  useCreateBudgetMutation,
  useGetBudgetsQuery,
  useGetBudgetByIdQuery,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
} = budgetsApiSlice;
