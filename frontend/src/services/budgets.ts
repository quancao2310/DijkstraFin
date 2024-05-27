import { apiSlice } from ".";
import { Budget } from "../types/budget.type";

export const budgetsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBudget: builder.mutation<Budget, Partial<Budget>>({
      query: (body) => ({
        url: "/budgets",
        method: "POST",
        body: body,
      }),
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
    }),
    deleteBudget: builder.mutation<Budget, string>({
      query: (id) => ({
        url: `/budgets/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateBudgetMutation,
  useGetBudgetsQuery,
  useGetBudgetByIdQuery,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
} = budgetsApiSlice;
