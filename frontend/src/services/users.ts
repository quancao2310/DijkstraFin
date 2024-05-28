import { apiSlice } from ".";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User" }],
    }),
    getUserCategories: builder.query({
      query: (id) => `/users/${id}/categories`,
      providesTags: (result, error, id) => [{ type: "User" }],
    }),
    getUserBudgets: builder.query({
      query: (id) => `/users/${id}/budgets`,
      providesTags: (result, error, id) => [{ type: "User" }],
    }),
    getUserMoneySources: builder.query({
      query: (id) => `/users/${id}/money-sources`,
      providesTags: (result, error, id) => [{ type: "User" }],
    }),
    getUserGoals: builder.query({
      query: (id) => `/users/${id}/goals`,
      providesTags: (result, error, id) => [{ type: "User" }],
    }),
    getUserRecords: builder.query({
      query: (id) => `/users/${id}/records`,
      providesTags: (result, error, id) => [{ type: "User" }],
    }),
  }),
  overrideExisting: true, // Add this line to allow overriding existing endpoints
});

export const {
  useGetUserByIdQuery,
  useGetUserCategoriesQuery,
  useGetUserBudgetsQuery,
  useGetUserMoneySourcesQuery,
  useGetUserGoalsQuery,
  useGetUserRecordsQuery,
} = usersApiSlice;
