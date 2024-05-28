import { apiSlice } from ".";
import { Goal } from "../types/goal.type";

export const goalsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGoal: builder.mutation<Goal, Partial<Goal>>({
      query: (body) => ({
        url: "/goals",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [
        {
          type: "User",
        },
      ],
    }),
    getGoals: builder.query<Goal[], void>({
      query: () => "/goals",
    }),
    getGoalById: builder.query<Goal, string>({
      query: (id) => `/goals/${id}`,
    }),
    updateGoal: builder.mutation<Goal, Partial<Goal>>({
      query: ({ _id, ...body }) => ({
        url: `/goals/${_id}`,
        method: "PATCH",
        body: body,
      }),
    }),
    deleteGoal: builder.mutation<Goal, string>({
      query: (id) => ({
        url: `/goals/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: true, // Add this line to allow overriding existing endpoints
});

export const {
  useCreateGoalMutation,
  useGetGoalsQuery,
  useGetGoalByIdQuery,
  useUpdateGoalMutation,
  useDeleteGoalMutation,
} = goalsApiSlice;
