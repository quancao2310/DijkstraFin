import { apiSlice } from ".";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postLogin: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { usePostLoginMutation } = authApiSlice;
